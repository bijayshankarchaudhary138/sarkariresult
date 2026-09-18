import crypto from 'node:crypto';
import { access, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const DATA_DIR = process.env.PUBLISHER_DATA_DIR || '.publisher-data';
const SOCIAL_STATE_FILE = join(DATA_DIR, 'social-state.json');
const SOCIAL_ASSET_DIR = join(DATA_DIR, 'social-assets');
const SOCIAL_INTERVAL_MS = 60_000;
const SOCIAL_DAILY_CAP = Math.min(10, Math.max(5, Number(process.env.SOCIAL_DAILY_CAP || 10)));
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v25.0';
const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || 'http://localhost:4173').replace(/\/$/, '');

const state = {
  version: 1,
  lastRunAt: null,
  queue: [],
  history: []
};

let hydrated = false;
let hydration = Promise.resolve();
let writeChain = Promise.resolve();
let intervalHandle;

function now() {
  return new Date().toISOString();
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function escapeXml(value = '') {
  return String(value).replace(/[&<>\"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&apos;' }[character]));
}

function slugSafe(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100) || 'official-update';
}

function socialUrl(article) {
  return `${PUBLIC_SITE_URL}/updates/${article.slug}`;
}

function assetUrl(slug) {
  return `${PUBLIC_SITE_URL}/media/social/${encodeURIComponent(`${slug}.svg`)}`;
}

function buildCaption(article, type = 'article') {
  const url = socialUrl(article);
  const source = article.officialDomain || article.sourceName || 'official source';
  if (type === 'syllabus') {
    return `आज का Syllabus / Exam Pattern update\n\n${article.title}\n\nSubjects, marks, duration और selection rules केवल official notice से verify करें। पूरा guide और official link: ${url}\n\nSource: ${source}\n\n#SarkariNaukri #Syllabus #ExamPattern #NaukriSetu`;
  }
  return `${article.title}\n\nOfficial update को आसान भाषा में समझें — important dates, eligibility और direct official link के साथ।\n\nपूरा update: ${url}\nSource: ${source}\n\n#SarkariNaukri #GovtJobs #AdmitCard #NaukriSetu`;
}

function buildAsset(article, type = 'article') {
  const title = type === 'syllabus' ? `Syllabus / Pattern\n${article.title}` : article.title;
  const url = socialUrl(article).replace(/^https?:\/\//, '');
  const source = article.officialDomain || article.sourceName || 'Official source';
  const lines = String(title).split(/\s+/).reduce((rows, word) => {
    const current = rows[rows.length - 1] || '';
    if ((current + ' ' + word).trim().length > 34) rows.push(word);
    else rows[rows.length - 1] = `${current} ${word}`.trim();
    return rows;
  }, []).slice(0, 5);
  const titleRows = lines.map((line, index) => `<text x="90" y="${490 + index * 70}" class="title">${escapeXml(line)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(article.title)}</title>
  <desc id="desc">Official government-job update from ${escapeXml(source)}</desc>
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#102b4e"/><stop offset="1" stop-color="#1f55bb"/></linearGradient><pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse"><path d="M54 0H0V54" fill="none" stroke="#ffffff" stroke-opacity=".06"/></pattern></defs>
  <rect width="1080" height="1350" rx="34" fill="url(#bg)"/><rect width="1080" height="1350" rx="34" fill="url(#grid)"/>
  <circle cx="930" cy="170" r="210" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="2"/><circle cx="930" cy="170" r="150" fill="none" stroke="#f1c15d" stroke-opacity=".25" stroke-width="2"/>
  <text x="90" y="130" fill="#f1c15d" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="4">NAUKRISETU</text>
  <text x="90" y="190" fill="#b8cbed" font-family="Arial, sans-serif" font-size="22">VERIFIED CAREER UPDATE</text>
  <rect x="90" y="270" width="230" height="46" rx="23" fill="#ffffff" fill-opacity=".12"/><text x="205" y="300" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="700">${escapeXml(type === 'syllabus' ? 'SYLLABUS' : 'NEW UPDATE')}</text>
  ${titleRows}
  <line x1="90" y1="890" x2="990" y2="890" stroke="#ffffff" stroke-opacity=".22"/>
  <text x="90" y="960" fill="#dce7ff" font-family="Arial, sans-serif" font-size="23">Official source: ${escapeXml(source)}</text>
  <text x="90" y="1030" fill="#ffffff" font-family="Arial, sans-serif" font-size="25" font-weight="700">पूरा details website पर पढ़ें</text>
  <rect x="90" y="1100" width="900" height="82" rx="14" fill="#f1c15d"/><text x="540" y="1152" text-anchor="middle" fill="#102b4e" font-family="Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(url)}</text>
  <text x="90" y="1260" fill="#a9c0ed" font-family="Arial, sans-serif" font-size="18">Apply / download हमेशा official portal से verify करें.</text>
</svg>`;
}

async function persist() {
  if (!hydrated) return;
  writeChain = writeChain.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(`${SOCIAL_STATE_FILE}.tmp`, JSON.stringify({ ...state, savedAt: now() }, null, 2), 'utf8');
    await rename(`${SOCIAL_STATE_FILE}.tmp`, SOCIAL_STATE_FILE);
  }).catch(() => {});
  return writeChain;
}

export async function hydrateSocialState() {
  if (hydrated) return getSocialState();
  try {
    const saved = JSON.parse(await readFile(SOCIAL_STATE_FILE, 'utf8'));
    state.lastRunAt = saved.lastRunAt || null;
    state.queue = Array.isArray(saved.queue) ? saved.queue.slice(0, 500) : [];
    state.history = Array.isArray(saved.history) ? saved.history.slice(0, 100) : [];
  } catch (error) {
    if (error.code !== 'ENOENT') state.history.unshift({ id: crypto.randomUUID(), type: 'error', message: error.message, createdAt: now() });
  }
  hydrated = true;
  return getSocialState();
}

async function ensureAsset(article, type = 'article') {
  await mkdir(SOCIAL_ASSET_DIR, { recursive: true });
  const filename = `${slugSafe(article.slug || article.title)}-${type}.svg`;
  const filePath = join(SOCIAL_ASSET_DIR, filename);
  try {
    await access(filePath);
  } catch {
    await writeFile(filePath, buildAsset(article, type), 'utf8');
  }
  return { filename, filePath, url: `${PUBLIC_SITE_URL}/media/social/${encodeURIComponent(filename)}` };
}

function scheduledSlot(type = 'article') {
  const day = todayKey();
  const sameDay = state.queue.filter(item => item.scheduledFor?.startsWith(day));
  const index = sameDay.length;
  const date = new Date();
  date.setHours(9 + Math.floor(index / 2) * 2, (index % 2) * 30, 0, 0);
  if (date.getTime() < Date.now()) date.setTime(Date.now() + (index + 1) * 5 * 60 * 1000);
  return date.toISOString();
}

function platforms() {
  return ['facebook', 'instagram', 'youtube'];
}

function enqueuePlatformItems(article, type, asset) {
  const sourceKey = `${article.id}:${type}`;
  if (state.queue.some(item => item.sourceKey === sourceKey)) return 0;
  const scheduledFor = scheduledSlot(type);
  const created = platforms().map(platform => ({
    id: crypto.randomUUID(),
    sourceKey,
    articleId: article.id,
    articleSlug: article.slug,
    type,
    platform,
    title: article.title,
    caption: buildCaption(article, type),
    assetFile: asset.filename,
    assetUrl: asset.url,
    scheduledFor,
    status: 'queued',
    attempts: 0,
    createdAt: now(),
    lastAttemptAt: null,
    publishedAt: null,
    remoteId: null,
    error: null
  }));
  state.queue.push(...created);
  return created.length;
}

export function enqueueArticleSocial(article) {
  if (!article?.id || !article?.slug) return;
  ensureAsset(article, 'article').then(asset => {
    enqueuePlatformItems(article, 'article', asset);
    persist();
  }).catch(error => state.history.unshift({ id: crypto.randomUUID(), type: 'asset_error', message: error.message, createdAt: now() }));
}

export function ensureDailySyllabus(article) {
  if (!article?.id || !article?.slug) return;
  const day = todayKey();
  if (state.queue.some(item => item.type === 'syllabus' && item.scheduledFor?.startsWith(day))) return;
  ensureAsset(article, 'syllabus').then(asset => {
    enqueuePlatformItems(article, 'syllabus', asset);
    persist();
  }).catch(() => {});
}

function credentials(platform) {
  if (platform === 'facebook') return Boolean(process.env.META_ACCESS_TOKEN && process.env.META_PAGE_ID);
  if (platform === 'instagram') return Boolean(process.env.META_ACCESS_TOKEN && process.env.META_IG_USER_ID);
  if (platform === 'youtube') return Boolean(process.env.YOUTUBE_ACCESS_TOKEN && process.env.YOUTUBE_CHANNEL_ID && process.env.YOUTUBE_RENDERER_URL);
  return false;
}

async function graphPost(path, params) {
  const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(params) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) throw new Error(payload.error?.message || `Meta API HTTP ${response.status}`);
  return payload;
}

async function publishFacebook(item) {
  return graphPost(`${process.env.META_PAGE_ID}/feed`, { message: item.caption, link: `${PUBLIC_SITE_URL}/updates/${item.articleSlug}`, picture: item.assetUrl, access_token: process.env.META_ACCESS_TOKEN });
}

async function publishInstagram(item) {
  const container = await graphPost(`${process.env.META_IG_USER_ID}/media`, { image_url: item.assetUrl, caption: item.caption, access_token: process.env.META_ACCESS_TOKEN });
  return graphPost(`${process.env.META_IG_USER_ID}/media_publish`, { creation_id: container.id, access_token: process.env.META_ACCESS_TOKEN });
}

async function publishYouTube(item) {
  const response = await fetch(process.env.YOUTUBE_RENDERER_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}` },
    body: JSON.stringify({ channelId: process.env.YOUTUBE_CHANNEL_ID, title: item.title, description: item.caption, assetUrl: item.assetUrl, articleUrl: `${PUBLIC_SITE_URL}/updates/${item.articleSlug}` })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) throw new Error(payload.error || `YouTube renderer HTTP ${response.status}`);
  return payload;
}

async function publishItem(item) {
  if (item.platform === 'facebook') return publishFacebook(item);
  if (item.platform === 'instagram') return publishInstagram(item);
  if (item.platform === 'youtube') return publishYouTube(item);
  throw new Error(`Unknown platform: ${item.platform}`);
}

export async function processSocialQueue({ force = false } = {}) {
  await hydration;
  state.lastRunAt = now();
  const day = todayKey();
  const counts = Object.fromEntries(platforms().map(platform => [platform, state.queue.filter(item => item.platform === platform && item.status === 'published' && item.publishedAt?.startsWith(day)).length]));
  const due = state.queue.filter(item => ['queued', 'awaiting_credentials', 'retry'].includes(item.status) && (force || !item.scheduledFor || item.scheduledFor <= now())).sort((a, b) => String(a.scheduledFor).localeCompare(String(b.scheduledFor)));
  for (const item of due) {
    if (counts[item.platform] >= SOCIAL_DAILY_CAP) continue;
    if (!credentials(item.platform)) {
      item.status = 'awaiting_credentials';
      item.error = `${item.platform} publishing credentials are not configured`;
      item.lastAttemptAt = now();
      continue;
    }
    item.status = 'publishing';
    item.attempts += 1;
    item.lastAttemptAt = now();
    try {
      const result = await publishItem(item);
      item.status = 'published';
      item.publishedAt = now();
      item.remoteId = result.id || result.post_id || null;
      item.error = null;
      counts[item.platform] += 1;
      state.history.unshift({ id: crypto.randomUUID(), type: 'published', platform: item.platform, itemId: item.id, remoteId: item.remoteId, createdAt: item.publishedAt });
    } catch (error) {
      item.status = item.attempts >= 3 ? 'failed' : 'retry';
      item.error = error.message;
      item.scheduledFor = new Date(Date.now() + Math.min(item.attempts * 15, 60) * 60_000).toISOString();
      state.history.unshift({ id: crypto.randomUUID(), type: 'error', platform: item.platform, itemId: item.id, message: item.error, createdAt: now() });
    }
  }
  state.queue = state.queue.slice(-500);
  state.history = state.history.slice(0, 100);
  await persist();
  return getSocialState();
}

export function getSocialAssetPath(filename) {
  const safe = basename(filename);
  if (safe !== filename || !safe.endsWith('.svg')) return null;
  return join(SOCIAL_ASSET_DIR, safe);
}

export function getSocialState() {
  const day = todayKey();
  return {
    lastRunAt: state.lastRunAt,
    dailyCap: SOCIAL_DAILY_CAP,
    platforms: platforms().map(platform => ({ platform, configured: credentials(platform), publishedToday: state.queue.filter(item => item.platform === platform && item.status === 'published' && item.publishedAt?.startsWith(day)).length, queued: state.queue.filter(item => item.platform === platform && ['queued', 'awaiting_credentials', 'retry'].includes(item.status)).length })),
    queue: state.queue.slice(-100),
    history: state.history.slice(0, 30)
  };
}

export function startSocialMonitor() {
  if (intervalHandle) return;
  hydration = hydrateSocialState();
  intervalHandle = setInterval(() => processSocialQueue().catch(() => {}), SOCIAL_INTERVAL_MS);
  intervalHandle.unref?.();
  hydration.then(() => processSocialQueue()).catch(() => {});
}

export function stopSocialMonitor() {
  clearInterval(intervalHandle);
  intervalHandle = undefined;
}
