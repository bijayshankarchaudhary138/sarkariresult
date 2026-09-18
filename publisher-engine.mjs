import crypto from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sources from './publisher-sources.json' with { type: 'json' };
import { enqueueArticleSocial, ensureDailySyllabus } from './social-distribution.mjs';

const SCAN_INTERVAL_MS = 60_000;
const FETCH_TIMEOUT_MS = 8_000;
const SOURCE_CONCURRENCY = 18;
const ROBOTS_TIMEOUT_MS = 4_000;
const ROBOTS_RECHECK_MS = 6 * 60 * 60 * 1000;
const MAX_EXCERPT_LENGTH = 420;
const DATA_DIR = process.env.PUBLISHER_DATA_DIR || '.publisher-data';
const STATE_FILE = join(DATA_DIR, 'state.json');
const state = {
  startedAt: new Date().toISOString(),
  lastScanStartedAt: null,
  lastScanFinishedAt: null,
  scanRunning: false,
  scanNumber: 0,
  sources: Object.fromEntries(sources.map(source => [source.id, {
    id: source.id,
    name: source.name,
    category: source.category,
    url: source.url,
    officialDomain: source.officialDomain,
    priority: source.priority,
    status: 'waiting',
    lastCheckedAt: null,
    responseMs: null,
    httpStatus: null,
    contentHash: null,
    etag: null,
    lastModified: null,
    title: null,
    excerpt: null,
    dates: [],
    links: [],
    robotsAllowed: true,
    robotsPolicy: 'not_checked',
    robotsCheckedAt: null,
    nextCheckAt: null,
    changed: false,
    noticeCount: 0,
    error: null
  }])),
  activities: [],
  articles: []
};

const sourceById = Object.fromEntries(sources.map(source => [source.id, source]));
let intervalHandle;
let initialScanHandle;
let storageReady = false;
let storageWrite = Promise.resolve();
let monitorReady = Promise.resolve();
const robotsCache = new Map();

function now() {
  return new Date().toISOString();
}

function serializeState() {
  return JSON.stringify({
    version: 1,
    savedAt: now(),
    lastScanStartedAt: state.lastScanStartedAt,
    lastScanFinishedAt: state.lastScanFinishedAt,
    scanNumber: state.scanNumber,
    sources: state.sources,
    activities: state.activities,
    articles: state.articles
  }, null, 2);
}

async function persistState() {
  if (!storageReady) return;
  storageWrite = storageWrite.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const temporaryFile = `${STATE_FILE}.tmp`;
    await writeFile(temporaryFile, serializeState(), 'utf8');
    await rename(temporaryFile, STATE_FILE);
  }).catch(error => {
    addActivity({ type: 'storage_error', title: 'State save failed', detail: error.message, status: 'error' });
  });
  return storageWrite;
}

export async function hydrateState() {
  try {
    const saved = JSON.parse(await readFile(STATE_FILE, 'utf8'));
    state.lastScanStartedAt = saved.lastScanStartedAt || null;
    state.lastScanFinishedAt = saved.lastScanFinishedAt || null;
    state.scanNumber = Number(saved.scanNumber || 0);
    state.activities = Array.isArray(saved.activities) ? saved.activities.slice(0, 30) : [];
    state.articles = Array.isArray(saved.articles) ? saved.articles.slice(0, 100) : [];
    Object.entries(saved.sources || {}).forEach(([id, sourceState]) => {
      if (state.sources[id]) Object.assign(state.sources[id], sourceState, { status: 'waiting', changed: false });
    });
  } catch (error) {
    if (error.code !== 'ENOENT') addActivity({ type: 'storage_error', title: 'Saved state could not be loaded', detail: error.message, status: 'error' });
  }
  storageReady = true;
  return getState();
}

function addActivity(activity) {
  state.activities.unshift({ id: crypto.randomUUID(), createdAt: now(), ...activity });
  state.activities = state.activities.slice(0, 30);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .slice(0, 90) || `official-update-${Date.now()}`;
}

function stripMarkup(value = '') {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html, source) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return stripMarkup(title || `${source.name} official notice update`);
}

function extractDates(text) {
  const matches = text.match(/\b(?:\d{1,2}[\/.\-]\d{1,2}[\/.\-](?:20)?\d{2}|\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2})\b/gi) || [];
  return [...new Set(matches)].slice(0, 12);
}

function extractOfficialLinks(html, sourceUrl) {
  const links = [];
  const anchorPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(html)) && links.length < 12) {
    const label = stripMarkup(match[2]);
    const href = match[1];
    const looksUseful = /notification|advertisement|recruit|result|admit|answer|syllabus|apply|download|pdf|notice|form|exam/i.test(`${label} ${href}`);
    if (!looksUseful) continue;
    try {
      const url = new URL(href, sourceUrl).toString();
      const domain = new URL(url).hostname;
      if (!domain.endsWith(new URL(sourceUrl).hostname.replace(/^www\./, '')) && !new URL(sourceUrl).hostname.endsWith(domain.replace(/^www\./, ''))) continue;
      links.push({ label: label.slice(0, 110) || 'Official notice', url });
    } catch {
      // Skip malformed links without interrupting the source scan.
    }
  }
  return links;
}

function sourceExcerpt(text) {
  const signal = text.search(/(notification|advertisement|recruitment|result|admit card|answer key|online form)/i);
  const excerpt = text.slice(signal > -1 ? signal : 0, (signal > -1 ? signal : 0) + MAX_EXCERPT_LENGTH);
  return excerpt || 'Official source content fetched successfully. Open the source link to review the latest notice.';
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mapWithConcurrency(items, worker, limit = SOURCE_CONCURRENCY) {
  const results = new Array(items.length);
  let cursor = 0;
  async function runner() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runner));
  return results;
}

function robotsAllows(body, sourceUrl) {
  const blocks = String(body || '').split(/\n\s*\n/);
  const applicable = blocks.filter(block => /(^|\n)\s*user-agent\s*:\s*(\*|naukrisetu-source-monitor)\s*($|\n)/im.test(block));
  if (!applicable.length) return true;
  const path = new URL(sourceUrl).pathname || '/';
  let allowLength = -1;
  let disallowLength = -1;
  applicable.join('\n').split(/\r?\n/).forEach(line => {
    const match = line.trim().match(/^(allow|disallow)\s*:\s*(.*)$/i);
    if (!match || !match[2].trim()) return;
    const rule = match[2].trim().split('#')[0].trim();
    if (!rule) return;
    const patternSource = rule.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    const pattern = new RegExp(`^${patternSource}`);
    if (!pattern.test(path)) return;
    if (match[1].toLowerCase() === 'allow') allowLength = Math.max(allowLength, rule.length);
    else disallowLength = Math.max(disallowLength, rule.length);
  });
  return allowLength >= disallowLength;
}

async function getRobotsPolicy(source) {
  const origin = new URL(source.url).origin;
  const cached = robotsCache.get(origin);
  if (cached && Date.now() - cached.checkedAt < ROBOTS_RECHECK_MS) return cached;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ROBOTS_TIMEOUT_MS);
  const checkedAt = Date.now();
  try {
    const response = await fetch(`${origin}/robots.txt`, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'NaukriSetu-SourceMonitor/1.0 (+official-source-review)', accept: 'text/plain' }
    });
    if (!response.ok) {
      const policy = { allowed: true, policy: 'unavailable', checkedAt };
      robotsCache.set(origin, policy);
      return policy;
    }
    const body = await response.text();
    const allowed = robotsAllows(body, source.url);
    const policy = { allowed, policy: allowed ? 'allowed' : 'disallowed', checkedAt };
    robotsCache.set(origin, policy);
    return policy;
  } catch {
    const policy = { allowed: true, policy: 'unavailable', checkedAt };
    robotsCache.set(origin, policy);
    return policy;
  } finally {
    clearTimeout(timeout);
  }
}

function sourceIsDue(source, force = false) {
  if (force) return true;
  const sourceState = state.sources[source.id];
  if (sourceState.nextCheckAt && Date.parse(sourceState.nextCheckAt) > Date.now()) return false;
  if (!sourceState.lastCheckedAt) return true;
  const interval = Math.max(60, Number(source.pollIntervalSeconds || 60));
  return Date.now() - Date.parse(sourceState.lastCheckedAt) >= interval * 1000;
}

async function fetchSource(source) {
  const started = Date.now();
  const sourceState = state.sources[source.id];
  const robots = await getRobotsPolicy(source);
  const robotsCheckedAt = new Date(robots.checkedAt).toISOString();
  if (!robots.allowed) {
    const checkedAt = now();
    const result = {
      id: source.id,
      status: 'blocked',
      httpStatus: null,
      responseMs: Date.now() - started,
      contentHash: sourceState.contentHash,
      etag: sourceState.etag,
      lastModified: sourceState.lastModified,
      changed: false,
      title: sourceState.title || `${source.name} robots policy`,
      excerpt: sourceState.excerpt || '',
      dates: sourceState.dates || [],
      links: sourceState.links || [],
      checkedAt,
      robotsAllowed: false,
      robotsPolicy: robots.policy,
      robotsCheckedAt,
      nextCheckAt: new Date(Date.now() + ROBOTS_RECHECK_MS).toISOString(),
      error: 'Robots.txt disallows automated source polling'
    };
    Object.assign(sourceState, result, { lastCheckedAt: checkedAt });
    return { source, result };
  }
  sourceState.robotsAllowed = true;
  sourceState.robotsPolicy = robots.policy;
  sourceState.robotsCheckedAt = robotsCheckedAt;
  sourceState.nextCheckAt = null;
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const headers = {
        'user-agent': 'NaukriSetu-SourceMonitor/1.0 (+official-source-review)',
        accept: 'text/html,application/xhtml+xml,application/pdf;q=0.8,*/*;q=0.5'
      };
      if (sourceState.etag) headers['if-none-match'] = sourceState.etag;
      if (sourceState.lastModified) headers['if-modified-since'] = sourceState.lastModified;
      const response = await fetch(source.url, { signal: controller.signal, redirect: 'follow', headers });
      const checkedAt = now();
      const responseHeaders = {
        etag: response.headers.get('etag') || sourceState.etag || null,
        lastModified: response.headers.get('last-modified') || sourceState.lastModified || null
      };
      if (response.status === 304) {
        const result = {
          id: source.id,
          status: 'online',
          httpStatus: 304,
          responseMs: Date.now() - started,
          contentHash: sourceState.contentHash,
          etag: responseHeaders.etag,
          lastModified: responseHeaders.lastModified,
          changed: false,
          title: sourceState.title || `${source.name} official source`,
          excerpt: sourceState.excerpt || '',
          dates: sourceState.dates || [],
          links: sourceState.links || [],
          checkedAt,
          error: null
        };
        Object.assign(sourceState, result, { lastCheckedAt: checkedAt });
        return { source, result };
      }
      const body = await response.text();
      const text = stripMarkup(body);
      const title = extractTitle(body, source);
      const dates = extractDates(text);
      const links = extractOfficialLinks(body, source.url);
      const fingerprint = JSON.stringify({ title, dates, links: links.map(link => link.url) });
      const hash = crypto.createHash('sha256').update(fingerprint).digest('hex');
      const previousHash = sourceState.contentHash;
      const changed = Boolean(previousHash && previousHash !== hash);
      const result = {
        id: source.id,
        status: response.ok ? 'online' : 'warning',
        httpStatus: response.status,
        responseMs: Date.now() - started,
        contentHash: hash,
        etag: responseHeaders.etag,
        lastModified: responseHeaders.lastModified,
        changed,
        title,
        excerpt: sourceExcerpt(text),
        dates,
        links,
        checkedAt,
        error: response.ok ? null : `HTTP ${response.status}`
      };
      Object.assign(sourceState, result, { lastCheckedAt: checkedAt });
      if (response.status >= 500 && attempt === 0) {
        await wait(350);
        continue;
      }
      return { source, result };
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        await wait(350);
        continue;
      }
    } finally {
      clearTimeout(timeout);
    }
  }
  const checkedAt = now();
  const result = {
    id: source.id,
    status: 'offline',
    httpStatus: null,
    responseMs: Date.now() - started,
    contentHash: sourceState.contentHash,
    etag: sourceState.etag,
    lastModified: sourceState.lastModified,
    changed: false,
    title: sourceState.title || `${source.name} source unavailable`,
    excerpt: sourceState.excerpt || '',
    dates: sourceState.dates || [],
    links: sourceState.links || [],
    checkedAt,
    error: lastError?.name === 'AbortError' ? 'Timeout after 8 seconds' : lastError?.message || 'Source request failed'
  };
  Object.assign(sourceState, result, { lastCheckedAt: checkedAt });
  return { source, result };
}

function articleFromResult(source, result) {
  const leadLink = result.links.find(link => /notification|advertisement|recruit|result|admit|answer|syllabus|apply|form|exam/i.test(link.label)) || result.links[0];
  const title = leadLink?.label || result.title || `${source.name} official update`;
  const slug = slugify(`${source.id}-${title}`);
  const existing = state.articles.find(article => article.slug === slug);
  if (existing) return existing;
  const article = {
    id: crypto.randomUUID(),
    slug,
    title,
    sourceName: source.name,
    category: source.category,
    officialDomain: source.officialDomain,
    sourceUrl: leadLink?.url || source.url,
    detectedAt: result.checkedAt,
    status: 'draft',
    confidence: result.links.length > 0 && result.dates.length > 0 ? 'high' : 'review',
    seo: {
      title: `${title} | Apply Online, Result, Admit Card & Details 2026`,
      description: `${title}. Check official dates, eligibility, important links and the latest notice directly from ${source.officialDomain}.`.slice(0, 155),
      canonicalPath: `/updates/${slug}`
    },
    facts: {
      noticeTitle: title,
      dates: result.dates,
      officialLinks: result.links,
      sourceExcerpt: result.excerpt,
      sourceLastChecked: result.checkedAt
    },
    sections: {
      overview: `यह update ${source.name} की official website से detect हुई है। Candidate को original notice खोलकर eligibility, dates, fee और application instructions verify करने चाहिए।`,
      whyItMatters: `इस notice में भर्ती, परीक्षा, result, admit card या answer key से जुड़ी जानकारी हो सकती है। हमने source title, detected dates और official links को अलग करके रखा है ताकि आपको जरूरी information जल्दी मिल सके।`,
      howToProceed: [
        `सबसे पहले ${source.officialDomain} पर जाकर original notice खोलें।`,
        'अपने post, category और eligibility को notification से match करें।',
        'Required documents और photograph/signature का format check करें।',
        'Application, result, admit card या objection link केवल official portal से खोलें।',
        'Final submit या download के बाद acknowledgement / PDF सुरक्षित रखें।'
      ],
      candidateChecklist: [
        'Official notification का latest version पढ़ें',
        'Important dates और correction window note करें',
        'Name, date of birth और category details carefully verify करें',
        'Fee receipt, submitted form और downloaded document save करें'
      ]
    },
    createdAt: result.checkedAt,
    updatedAt: result.checkedAt
  };
  state.articles.unshift(article);
  state.articles = state.articles.slice(0, 100);
  return article;
}

export async function scanSources({ force = false } = {}) {
  if (state.scanRunning) return getState();
  state.scanRunning = true;
  state.scanNumber += 1;
  state.lastScanStartedAt = now();
  addActivity({ type: 'scan_started', title: `Scan #${state.scanNumber} started`, detail: `${sources.filter(source => source.enabled).length} allowlisted official sources checked`, status: 'running' });
  try {
    const enabledSources = sources.filter(source => source.enabled && sourceIsDue(source, force));
    const deferredCount = sources.filter(source => source.enabled).length - enabledSources.length;
    const results = await mapWithConcurrency(enabledSources, source => fetchSource(source));
    let changedCount = 0;
    let newDrafts = 0;
    results.forEach(({ source, result }) => {
      if (result.changed || (force && result.links.length > 0 && result.dates.length > 0)) {
        const article = articleFromResult(source, result);
        state.sources[source.id].noticeCount += 1;
        changedCount += 1;
        const firstSeen = !state.activities.some(activity => activity.articleId === article.id);
        if (firstSeen) {
          const detail = `${source.name} • ${result.dates.length} dates • ${result.links.length} official links`;
          addActivity({ type: 'notice_detected', articleId: article.id, title: article.title, detail, status: article.confidence === 'high' ? 'ready' : 'review' });
          if (article.confidence === 'high') {
            article.status = 'published';
            article.publishedAt = result.checkedAt;
            article.updatedAt = result.checkedAt;
            enqueueArticleSocial(article);
            ensureDailySyllabus(article);
            addActivity({ type: 'article_published', articleId: article.id, title: article.title, detail: 'Auto-published after source, link and date checks; social queue created', status: 'published' });
          } else {
            newDrafts += 1;
          }
        }
      }
    });
    const publishedArticles = state.articles.filter(article => article.status === 'published');
    const rotationStart = publishedArticles.length ? Math.floor(Date.now() / 86_400_000) % publishedArticles.length : 0;
    publishedArticles.slice(0, Math.min(5, publishedArticles.length)).forEach((_, index) => {
      const sourceArticle = publishedArticles[(rotationStart + index) % publishedArticles.length];
      if (sourceArticle) ensureDailySyllabus(sourceArticle);
    });
    const complianceNote = deferredCount ? `; ${deferredCount} source(s) deferred by polling policy` : '';
    addActivity({ type: 'scan_finished', title: `Scan #${state.scanNumber} finished`, detail: changedCount ? `${newDrafts} article draft(s) queued for verification${complianceNote}` : `No new official notice fingerprint detected${complianceNote}`, status: changedCount ? 'drafts' : 'clean' });
    state.lastScanFinishedAt = now();
    await persistState();
  } finally {
    state.scanRunning = false;
  }
  return getState();
}

export function publishArticle(articleId) {
  const article = state.articles.find(item => item.id === articleId || item.slug === articleId);
  if (!article) return null;
  article.status = 'published';
  article.publishedAt = now();
  article.updatedAt = article.publishedAt;
  enqueueArticleSocial(article);
  ensureDailySyllabus(article);
  addActivity({ type: 'article_published', articleId: article.id, title: article.title, detail: `Published from ${article.officialDomain}; social queue created`, status: 'published' });
  persistState();
  return article;
}

export function getArticle(idOrSlug) {
  return state.articles.find(article => article.id === idOrSlug || article.slug === idOrSlug) || null;
}

export function getState() {
  return {
    startedAt: state.startedAt,
    lastScanStartedAt: state.lastScanStartedAt,
    lastScanFinishedAt: state.lastScanFinishedAt,
    scanRunning: state.scanRunning,
    scanNumber: state.scanNumber,
    intervalSeconds: SCAN_INTERVAL_MS / 1000,
    autoPublishHighConfidence: true,
    sourceCount: sources.length,
    activeSourceCount: sources.filter(source => source.enabled).length,
    sources: Object.values(state.sources),
    activities: state.activities,
    articles: state.articles
  };
}

export function startMonitor() {
  if (intervalHandle) return;
  monitorReady = hydrateState();
  intervalHandle = setInterval(() => {
    monitorReady.then(() => scanSources()).catch(error => addActivity({ type: 'scan_error', title: 'Scheduled scan failed', detail: error.message, status: 'error' }));
  }, SCAN_INTERVAL_MS);
  intervalHandle.unref?.();
  initialScanHandle = setTimeout(() => {
    monitorReady.then(() => scanSources()).catch(error => addActivity({ type: 'scan_error', title: 'Initial scan failed', detail: error.message, status: 'error' }));
  }, 1_500);
  initialScanHandle.unref?.();
}

export function stopMonitor() {
  clearInterval(intervalHandle);
  clearTimeout(initialScanHandle);
  intervalHandle = undefined;
  initialScanHandle = undefined;
}

export async function loadPersistedState() {
  return hydrateState();
}
