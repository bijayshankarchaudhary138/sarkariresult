import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import sources from './publisher-sources.json' with { type: 'json' };

const SCAN_INTERVAL_MS = 60_000;
const FETCH_TIMEOUT_MS = 8_000;
const MAX_EXCERPT_LENGTH = 420;
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

function now() {
  return new Date().toISOString();
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

async function fetchSource(source) {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': 'NaukriSetu-SourceMonitor/1.0 (+official-source-review)',
        accept: 'text/html,application/xhtml+xml,application/pdf;q=0.8,*/*;q=0.5'
      }
    });
    const body = await response.text();
    const text = stripMarkup(body);
    const title = extractTitle(body, source);
    const dates = extractDates(text);
    const links = extractOfficialLinks(body, source.url);
    const fingerprint = JSON.stringify({ title, dates, links: links.map(link => link.url) });
    const hash = crypto.createHash('sha256').update(fingerprint).digest('hex');
    const previousHash = state.sources[source.id].contentHash;
    const changed = Boolean(previousHash && previousHash !== hash);
    const result = {
      id: source.id,
      status: response.ok ? 'online' : 'warning',
      httpStatus: response.status,
      responseMs: Date.now() - started,
      contentHash: hash,
      changed,
      title,
      excerpt: sourceExcerpt(text),
      dates,
      links,
      checkedAt: now(),
      error: response.ok ? null : `HTTP ${response.status}`
    };
    Object.assign(state.sources[source.id], {
      status: result.status,
      httpStatus: result.httpStatus,
      responseMs: result.responseMs,
      contentHash: result.contentHash,
      changed: result.changed,
      lastCheckedAt: result.checkedAt,
      error: result.error
    });
    return { source, result };
  } catch (error) {
    const result = {
      id: source.id,
      status: 'offline',
      httpStatus: null,
      responseMs: Date.now() - started,
      contentHash: null,
      changed: false,
      title: `${source.name} source unavailable`,
      excerpt: '',
      dates: [],
      links: [],
      checkedAt: now(),
      error: error.name === 'AbortError' ? 'Timeout after 8 seconds' : error.message
    };
    Object.assign(state.sources[source.id], {
      status: result.status,
      httpStatus: result.httpStatus,
      responseMs: result.responseMs,
      lastCheckedAt: result.checkedAt,
      error: result.error
    });
    return { source, result };
  } finally {
    clearTimeout(timeout);
  }
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
      description: `${title}. Check official dates, eligibility, important links and the latest notice directly from ${source.officialDomain}.`,
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
    const results = await Promise.all(sources.filter(source => source.enabled).map(source => fetchSource(source)));
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
            addActivity({ type: 'article_published', articleId: article.id, title: article.title, detail: 'Auto-published after source, link and date checks', status: 'published' });
          } else {
            newDrafts += 1;
          }
        }
      }
    });
    addActivity({ type: 'scan_finished', title: `Scan #${state.scanNumber} finished`, detail: changedCount ? `${newDrafts} article draft(s) queued for verification` : 'No new official notice fingerprint detected', status: changedCount ? 'drafts' : 'clean' });
    state.lastScanFinishedAt = now();
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
  addActivity({ type: 'article_published', articleId: article.id, title: article.title, detail: `Published from ${article.officialDomain}`, status: 'published' });
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
  intervalHandle = setInterval(() => {
    scanSources().catch(error => addActivity({ type: 'scan_error', title: 'Scheduled scan failed', detail: error.message, status: 'error' }));
  }, SCAN_INTERVAL_MS);
  intervalHandle.unref?.();
  initialScanHandle = setTimeout(() => {
    scanSources().catch(error => addActivity({ type: 'scan_error', title: 'Initial scan failed', detail: error.message, status: 'error' }));
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
  // Reserved for a database adapter. Keeping the engine in-memory makes the demo safe
  // and avoids writing candidate data during preview; production should use a queue/DB.
  await readFile(new URL('./publisher-sources.json', import.meta.url), 'utf8');
}
