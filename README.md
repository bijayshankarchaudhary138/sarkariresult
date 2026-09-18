# नौकरीसेतु

A Hindi-first government-career update portal with a classic SarkariResult-style one-page directory and an original visual system/brand.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite preview shown by Arena. Production server:

```bash
npm run build
PUBLIC_SITE_URL=https://your-domain.example \
PUBLISHER_ADMIN_TOKEN=replace-with-a-secret \
NODE_ENV=production npm start
```

## Included

- Classic one-page directory with **Top Online Forms**, Result, Admit Card, Latest Job, Answer Key, Syllabus, Admission, Certificate, Outsourcing / Offline Jobs and Important sections.
- List-wise cards with category filters, View More actions, department shortcuts and a section-wide search.
- Curated live updates feed, upcoming dates, search, tabs, timestamps and alert subscription interaction.
- Long-form article reader following the familiar government-job information pattern: Name of Post, Post Date / Update, Short Information, Important Dates, Application Fee, Age Limit, Vacancy / Update Details, Eligibility, documents, salary/pay scale, selection process, syllabus, how-to steps, Important Links and FAQ.
- Official-source CTA, source evidence excerpt, source verification badge, candidate checklist, correction/terms/privacy/editorial policy surfaces and candidate disclaimer.
- Publisher Console with a 113-source allowlisted official-source registry, a 60-second scan interval, concurrency-limited conditional HTTP requests, retry handling, SHA-256 change fingerprints, source status, Detect → Extract → Optimize → Publish pipeline, activity log, persistent state, confidence-based auto-publish and review queue.
- Vite middleware API at `/api/publisher/state`, `/api/publisher/scan` and `/api/publisher/publish` for the preview workflow. `publisher-engine.mjs` is the server-side source/publisher boundary.
- Production `server.mjs` serves the built site, dynamic `/sitemap.xml`, `/robots.txt`, API routes and SEO metadata for `/updates/:slug` article URLs.
- Dynamic article URL, canonical metadata, Article JSON-LD and shareable per-update paths.
- `public/robots.txt` starter file; replace its production domain placeholder before launch.
- SEO basics in `index.html`: title, description, robots, Open Graph tags and WebSite SearchAction JSON-LD.
- Fully responsive desktop and mobile layout.

The monitor is intentionally conservative: it only creates content from allowlisted official sources with detected notice links and date signals; otherwise it stays in review. Production still needs approved feed/PDF/OCR adapters for each portal, a CMS/publishing queue, alert provider, authentication, domain-specific parsers and a final editorial policy. No tool can guarantee Google position #1; accurate original content, source verification, accessibility, page speed, authority and ongoing SEO work are required.
