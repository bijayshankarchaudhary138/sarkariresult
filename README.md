# नौकरीसेतु

A polished, Hindi-first government-career update portal prototype inspired by the information architecture of Sarkari Result, but with an original visual system and content model.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite preview shown by Arena. Production build:

```bash
npm run build
```

## Included in this prototype

- Responsive Hindi-first homepage with latest jobs, results, admit cards and answer keys.
- Search, category tabs, live refresh countdown, dates panel and email alert interaction.
- Article reader with quick facts, apply steps, important links, source verification and candidate disclaimer.
- Publisher Console demo showing the intended official-source monitoring → article checks → publish workflow.
- SEO basics in `index.html`: title, description, Open Graph tags and WebSite SearchAction JSON-LD.

The source-monitor and auto-publish console is intentionally a front-end demo. To make it production-live, connect verified RSS/sitemap/webhook feeds from each official portal to a backend queue, then add human/source verification, a CMS API, structured article templates and an alert provider. Search ranking cannot be guaranteed; accurate, original, regularly reviewed content and technical SEO are required.
