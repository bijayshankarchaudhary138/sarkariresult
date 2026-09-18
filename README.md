# नौकरीसेतु

A Hindi-first government-career update portal with a classic SarkariResult-style one-page directory and an original visual system/brand.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite preview shown by Arena. Production build:

```bash
npm run build
```

## Included

- Classic one-page directory with **Top Online Forms**, Result, Admit Card, Latest Job, Answer Key, Syllabus, Admission, Certificate, Outsourcing / Offline Jobs and Important sections.
- List-wise cards with View More actions, department shortcuts and a section-wide search.
- Curated live updates feed, upcoming dates, search, tabs, timestamps and alert subscription interaction.
- Long-form article reader following the familiar government-job information pattern: Name of Post, Post Date / Update, Short Information, Important Dates, Application Fee, Age Limit, Vacancy / Update Details, Eligibility, documents, how-to steps, Important Links and FAQ.
- Official-source CTA, source verification badge, candidate disclaimer and direct-link placeholders for each article.
- Publisher Console with an allowlisted official-source registry, a 60-second scan interval, source status, Detect → Extract → Optimize → Publish pipeline, SHA-256 change fingerprints, activity log, content health score and auto-publish rules.
- Vite middleware API at `/api/publisher/state`, `/api/publisher/scan` and `/api/publisher/publish` for the preview workflow. `publisher-engine.mjs` is the server-side boundary for the future queue/database/CMS adapter.
- Dynamic article URL, canonical metadata, Article JSON-LD and shareable per-update paths.
- `public/robots.txt` starter file; replace its production domain placeholder before launch.
- SEO basics in `index.html`: title, description, robots, Open Graph tags and WebSite SearchAction JSON-LD.
- Fully responsive desktop and mobile layout.

The source monitor is now wired as a real allowlisted server-side polling boundary, but a production launch still needs a persistent database/queue, approved RSS/sitemap/webhook feeds from each official portal, PDF parsing and change review, a CMS API, alert provider, authentication and domain-specific SEO. It intentionally does not invent facts when an official source is unavailable. No tool can guarantee Google position #1; accurate original content, source verification, accessibility, page speed and ongoing SEO work are required.
