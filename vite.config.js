import { defineConfig } from 'vite';
import { publishArticle, getArticle, getState, scanSources, startMonitor } from './publisher-engine.mjs';

function json(res, payload, status = 200) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(payload));
}

function xml(res, payload) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/xml; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(payload);
}

function sitemapXml() {
  const state = getState();
  const base = (process.env.PUBLIC_SITE_URL || 'http://localhost:5173').replace(/\/$/, '');
  const paths = ['/', '/#directory', '/#updates', '/#guides', ...state.articles.map(article => `/updates/${article.slug}`)];
  const urls = [...new Set(paths)].map(path => `<url><loc>${base}${path}</loc><changefreq>${path.startsWith('/updates/') ? 'hourly' : 'daily'}</changefreq><priority>${path === '/' ? '1.0' : '0.8'}</priority></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function readJsonBody(req) {
  return new Promise(resolve => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve({}); }
    });
  });
}

function publisherApi() {
  return {
    name: 'naukrisetu-publisher-api',
    configureServer(server) {
      startMonitor();
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').split('?')[0] === '/sitemap.xml') return xml(res, sitemapXml());
        next();
      });
      server.middlewares.use('/api/publisher', async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        if (req.method === 'GET' && url.pathname === '/state') {
          json(res, getState());
          return;
        }
        if (req.method === 'POST' && url.pathname === '/scan') {
          const state = await scanSources({ force: url.searchParams.get('force') === '1' });
          json(res, state);
          return;
        }
        if (req.method === 'POST' && url.pathname === '/publish') {
          const body = await readJsonBody(req);
          const article = publishArticle(body.id || body.slug);
          json(res, article || { error: 'Article not found' }, article ? 200 : 404);
          return;
        }
        if (req.method === 'GET' && url.pathname.startsWith('/article/')) {
          const article = getArticle(decodeURIComponent(url.pathname.slice('/article/'.length)));
          json(res, article || { error: 'Article not found' }, article ? 200 : 404);
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      startMonitor();
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').split('?')[0] === '/sitemap.xml') return xml(res, sitemapXml());
        next();
      });
      server.middlewares.use('/api/publisher', async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        if (req.method === 'GET' && url.pathname === '/state') return json(res, getState());
        if (req.method === 'POST' && url.pathname === '/scan') return json(res, await scanSources({ force: true }));
        if (req.method === 'POST' && url.pathname === '/publish') {
          const body = await readJsonBody(req);
          const article = publishArticle(body.id || body.slug);
          return json(res, article || { error: 'Article not found' }, article ? 200 : 404);
        }
        if (req.method === 'GET' && url.pathname.startsWith('/article/')) {
          const article = getArticle(decodeURIComponent(url.pathname.slice('/article/'.length)));
          return json(res, article || { error: 'Article not found' }, article ? 200 : 404);
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [publisherApi()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
