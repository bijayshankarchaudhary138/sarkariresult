# नौकरीसेतु

A Hindi-first government-career update portal prototype with a classic SarkariResult-style one-page directory and an original visual system/brand.

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
- Publisher Console demo with a 60-second source monitor, 42-source registry indicator, Detect → Extract → Optimize → Publish pipeline, activity log, content health score and auto-publish rules.
- SEO basics in `index.html`: title, description, Open Graph tags and WebSite SearchAction JSON-LD.
- Fully responsive desktop and mobile layout.

The source-monitor and auto-publish console is intentionally a front-end workflow demo. A real deployment needs a server-side queue, approved RSS/sitemap/webhook feeds from each official portal, change detection and deduplication, a human/source verification policy, a CMS API, structured article templates, and an alert provider. No tool can guarantee Google position #1; accurate original content, source verification, accessibility, page speed and ongoing SEO work are required.
