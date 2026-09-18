import http from 'node:http';
import { createReadStream } from 'node:fs';
import { access, readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getArticle, getState, publishArticle, scanSources, startMonitor } from './publisher-engine.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const publicSiteUrl = (process.env.PUBLIC_SITE_URL || `http://localhost:${port}`).replace(/\/$/, '');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('content-type', type);
  res.setHeader('cache-control', 'no-store');
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), 'application/json; charset=utf-8');
}

function readBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { resolve({}); }
    });
  });
}

function sitemapXml() {
  const state = getState();
  const staticPaths = ['/', '/#directory', '/#updates', '/#guides'];
  const articlePaths = state.articles.map(article => `/updates/${article.slug}`);
  const urls = [...new Set([...staticPaths, ...articlePaths])].map(path => `<url><loc>${publicSiteUrl}${path}</loc><changefreq>${path.startsWith('/updates/') ? 'hourly' : 'daily'}</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

async function serveIndex(req, res) {
  let html = await readFile(join(dist, 'index.html'), 'utf8');
  const pathname = new URL(req.url, publicSiteUrl).pathname;
  if (pathname.startsWith('/updates/')) {
    const slug = decodeURIComponent(pathname.slice('/updates/'.length));
    const article = getArticle(slug);
    const title = article?.seo?.title || `${slug.replace(/-/g, ' ')} | नौकरीसेतु`;
    const description = article?.seo?.description || 'सरकारी नौकरी, रिजल्ट, एडमिट कार्ड और official notification की verified जानकारी।';
    const schema = article ? `<script id="server-article-schema" type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description, dateModified: article.updatedAt || article.createdAt, author: { '@type': 'Organization', name: 'नौकरीसेतु Editorial Desk' }, mainEntityOfPage: `${publicSiteUrl}${pathname}` })}</script>` : '';
    html = html
      .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`)
      .replace('</head>', `<link rel="canonical" href="${publicSiteUrl}${pathname}" />${schema}</head>`);
  }
  send(res, 200, html, 'text/html; charset=utf-8');
}

async function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, publicSiteUrl).pathname);
  const requested = normalize(join(dist, pathname));
  if (!requested.startsWith(`${dist}${sep}`) && requested !== dist) return serveIndex(req, res);
  try {
    await access(requested);
    if ((await stat(requested)).isDirectory()) return serveIndex(req, res);
    const extension = extname(requested).toLowerCase();
    res.statusCode = 200;
    res.setHeader('content-type', mimeTypes[extension] || 'application/octet-stream');
    res.setHeader('cache-control', extension === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable');
    createReadStream(requested).pipe(res);
  } catch {
    await serveIndex(req, res);
  }
}

async function handle(req, res) {
  const url = new URL(req.url, publicSiteUrl);
  if (url.pathname === '/api/publisher/state' && req.method === 'GET') return sendJson(res, 200, getState());
  if (url.pathname === '/api/publisher/scan' && req.method === 'POST') return sendJson(res, 200, await scanSources({ force: url.searchParams.get('force') === '1' }));
  if (url.pathname === '/api/publisher/publish' && req.method === 'POST') {
    const body = await readBody(req);
    const article = publishArticle(body.id || body.slug);
    return sendJson(res, article ? 200 : 404, article || { error: 'Article not found' });
  }
  if (url.pathname.startsWith('/api/publisher/article/') && req.method === 'GET') {
    const article = getArticle(decodeURIComponent(url.pathname.slice('/api/publisher/article/'.length)));
    return sendJson(res, article ? 200 : 404, article || { error: 'Article not found' });
  }
  if (url.pathname === '/sitemap.xml') return send(res, 200, sitemapXml(), 'application/xml; charset=utf-8');
  if (url.pathname === '/robots.txt') return send(res, 200, `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${publicSiteUrl}/sitemap.xml\n`);
  if (url.pathname.startsWith('/updates/')) return serveIndex(req, res);
  return serveStatic(req, res);
}

startMonitor();
const server = http.createServer((req, res) => {
  handle(req, res).catch(error => sendJson(res, 500, { error: 'Internal server error', detail: error.message }));
});
server.listen(port, host, () => console.log(`NaukriSetu production server listening on http://${host}:${port}`));
