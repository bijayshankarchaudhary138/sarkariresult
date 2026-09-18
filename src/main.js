import './style.css';

const iconPaths = {
  search: '<circle cx="11" cy="11" r="7.5"></circle><path d="m16.5 16.5 5 5"></path>',
  arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
  external: '<path d="M14 5h5v5"></path><path d="m19 5-8 8"></path><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"></path>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8M8 17h5"></path>',
  graduation: '<path d="m3 9 9-5 9 5-9 5-9-5Z"></path><path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5M21 9v6"></path>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path>',
  shield: '<path d="M12 3 20 6v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6l8-3Z"></path><path d="m8.5 12 2.2 2.2 4.8-5"></path>',
  lightning: '<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  check: '<path d="m5 12 4 4L19 6"></path>',
  chevron: '<path d="m9 18 6-6-6-6"></path>',
  filter: '<path d="M4 5h16M7 12h10m-7 7h4"></path>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"></path>',
  x: '<path d="m6 6 12 12M18 6 6 18"></path>',
  info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path>',
  rocket: '<path d="M14 5c2-2 5-2 5-2s0 3-2 5l-4 4-3-3 4-4Z"></path><path d="m10 9-4 1-3 3 5 1M14 13l-1 4-3 3-1-5"></path><path d="M8 16c-1 2-3 3-5 3 0-2 1-4 3-5"></path>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 3.6 12a2 2 0 0 0-.2 0 2 2 0 0 1 0-4h.2A2 2 0 0 0 5 4.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 11.2.4h.2a2 2 0 0 1 4 0v.2A2 2 0 0 0 18.8 2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 22.8 8h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.4 3.4Z"></path>',
  chart: '<path d="M4 19V5M4 19h17"></path><path d="m7 15 3-4 3 2 5-7"></path>',
  globe: '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3Z"></path>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"></path><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"></path>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"></path>',
  sparkles: '<path d="m12 3-1.1 4.1L7 8.2l3.9 1.1L12 13l1.1-3.7L17 8.2l-3.9-1.1L12 3ZM5 14l-.6 2.4L2 17l2.4.6L5 20l.6-2.4L8 17l-2.4-.6L5 14ZM19 14l-.5 1.5L17 16l1.5.5L19 18l.5-1.5L21 16l-1.5-.5L19 14Z"></path>'
};

function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.info}</svg>`;
}

const tabs = [
  { key: 'all', label: 'सभी अपडेट', icon: 'pulse' },
  { key: 'jobs', label: 'Latest Jobs', icon: 'briefcase' },
  { key: 'results', label: 'Results', icon: 'chart' },
  { key: 'admit', label: 'Admit Card', icon: 'file' },
  { key: 'answer', label: 'Answer Key', icon: 'book' }
];

const updates = [
  {
    id: 'bpsc-tre',
    category: 'jobs',
    categoryLabel: 'Latest Jobs',
    source: 'BPSC • Bihar',
    title: 'BPSC TRE 4.0 Recruitment 2026',
    hindiTitle: 'BPSC TRE 4.0 भर्ती 2026',
    detail: 'शिक्षक के 11,098 पदों पर भर्ती — आवेदन और notification details देखें।',
    stat: '11,098 पद',
    status: 'आवेदन शुरू',
    statusClass: 'green',
    date: 'आज, 09:42 AM',
    time: '2 min ago',
    color: 'blue',
    icon: 'graduation',
    tags: ['BPSC', 'Teaching', 'Bihar'],
    accent: 'navy',
    official: 'bpsc.bihar.gov.in'
  },
  {
    id: 'ssc-cgl',
    category: 'jobs',
    categoryLabel: 'Latest Jobs',
    source: 'SSC • Central Govt.',
    title: 'SSC CGL 2026 Online Form',
    hindiTitle: 'SSC CGL 2026 ऑनलाइन फॉर्म',
    detail: 'Combined Graduate Level परीक्षा के लिए online application window खुली।',
    stat: '14 Oct 2026 तक',
    status: 'अंतिम तिथि पास',
    statusClass: 'amber',
    date: 'आज, 08:15 AM',
    time: '1 hr ago',
    color: 'orange',
    icon: 'file',
    tags: ['SSC', 'Graduate'],
    accent: 'orange',
    official: 'ssc.gov.in'
  },
  {
    id: 'upsc-cds',
    category: 'results',
    categoryLabel: 'Result',
    source: 'UPSC • New Delhi',
    title: 'UPSC CDS II Result 2026',
    hindiTitle: 'UPSC CDS II Result 2026 जारी',
    detail: 'Written examination का result PDF और selected candidates list उपलब्ध।',
    stat: 'Result PDF',
    status: 'नया रिजल्ट',
    statusClass: 'purple',
    date: '17 Sep 2026',
    time: 'Yesterday',
    color: 'purple',
    icon: 'chart',
    tags: ['UPSC', 'Defence'],
    accent: 'purple',
    official: 'upsc.gov.in'
  },
  {
    id: 'rrb-ntpc',
    category: 'admit',
    categoryLabel: 'Admit Card',
    source: 'RRB • Railway Board',
    title: 'RRB NTPC Graduate Admit Card 2026',
    hindiTitle: 'RRB NTPC Graduate Admit Card 2026',
    detail: 'CBT-2 परीक्षा के लिए city intimation और admit card download link।',
    stat: 'Exam: 28 Sep',
    status: 'Admit Card live',
    statusClass: 'blue',
    date: '17 Sep 2026',
    time: 'Yesterday',
    color: 'teal',
    icon: 'calendar',
    tags: ['Railway', 'NTPC'],
    accent: 'teal',
    official: 'indianrailways.gov.in'
  },
  {
    id: 'bihar-police',
    category: 'answer',
    categoryLabel: 'Answer Key',
    source: 'CSBC • Bihar',
    title: 'Bihar Police Constable Answer Key 2026',
    hindiTitle: 'Bihar Police Constable Answer Key 2026',
    detail: 'Provisional answer key जारी; objection window और response sheet details।',
    stat: 'Objection: 21 Sep',
    status: 'Objection open',
    statusClass: 'rose',
    date: '16 Sep 2026',
    time: '2 days ago',
    color: 'rose',
    icon: 'shield',
    tags: ['Police', 'Bihar'],
    accent: 'rose',
    official: 'csbc.bihar.gov.in'
  },
  {
    id: 'ibps-po',
    category: 'jobs',
    categoryLabel: 'Latest Jobs',
    source: 'IBPS • Banking',
    title: 'IBPS PO / MT XV Recruitment 2026',
    hindiTitle: 'IBPS PO / MT XV भर्ती 2026',
    detail: 'Probationary Officer posts के लिए notification और eligibility overview।',
    stat: '5,208 posts',
    status: 'Short notice',
    statusClass: 'green',
    date: '16 Sep 2026',
    time: '2 days ago',
    color: 'green',
    icon: 'briefcase',
    tags: ['IBPS', 'Banking'],
    accent: 'green',
    official: 'ibps.in'
  }
];

const deadlines = [
  { date: '22', month: 'SEP', title: 'BPSC TRE 4.0', text: 'आवेदन window खुलने की तारीख', tone: 'blue', icon: 'graduation' },
  { date: '28', month: 'SEP', title: 'RRB NTPC CBT-2', text: 'परीक्षा की संभावित तारीख', tone: 'orange', icon: 'calendar' },
  { date: '05', month: 'OCT', title: 'UPSC CDS II', text: 'अगला document update', tone: 'purple', icon: 'file' },
  { date: '14', month: 'OCT', title: 'SSC CGL 2026', text: 'Online form की अंतिम तिथि', tone: 'green', icon: 'clock' }
];

const app = document.querySelector('#app');
let activeTab = 'all';
let searchTerm = '';
let countdown = 42;
let publisherRunning = false;

function render() {
  app.innerHTML = `
    <div class="site-shell">
      <div class="topline">
        <div class="container topline-inner">
          <div class="topline-left"><span class="top-dot"></span><span>भारत का भरोसेमंद career update network</span><span class="top-separator"></span><span class="top-muted">18 सितम्बर 2026</span></div>
          <div class="topline-right"><span class="top-muted">आपके लिए साफ, सही और समय पर</span><button class="language-toggle" data-action="language"><b>हि</b> / En</button></div>
        </div>
      </div>

      <header class="main-header">
        <div class="container header-inner">
          <a class="brand" href="#top" aria-label="नौकरीसेतु home">
            <span class="brand-mark"><span class="brand-mark-line"></span><span class="brand-mark-dot"></span></span>
            <span class="brand-copy"><span class="brand-name">नौकरी<span>सेतु</span></span><span class="brand-subtitle">YOUR NEXT OPPORTUNITY</span></span>
          </a>
          <form class="header-search" id="search-form">
            ${icon('search')}
            <input id="search-input" type="search" autocomplete="off" placeholder="जॉब, रिजल्ट या परीक्षा खोजें..." aria-label="सर्च" value="${searchTerm}" />
            <kbd>⌘ K</kbd>
            <button type="submit">खोजें</button>
          </form>
          <div class="header-actions">
            <button class="icon-button notification-button" data-action="notifications" aria-label="Notifications">${icon('bell')}<span class="notification-dot"></span></button>
            <button class="publisher-button" data-action="publisher"><span class="publisher-pulse"></span><span>Publisher Console</span>${icon('arrow')}</button>
            <button class="mobile-menu icon-button" data-action="menu" aria-label="Menu">${icon('menu')}</button>
          </div>
        </div>
      </header>

      <nav class="main-nav" id="main-nav">
        <div class="container nav-inner">
          <a class="nav-item active" href="#top" data-nav="home">${icon('globe')}<span>होम</span></a>
          <a class="nav-item" href="#updates" data-nav="jobs">${icon('briefcase')}<span>Latest Jobs</span></a>
          <a class="nav-item" href="#updates" data-nav="results">${icon('chart')}<span>Results</span></a>
          <a class="nav-item" href="#updates" data-nav="admit">${icon('file')}<span>Admit Card</span></a>
          <a class="nav-item" href="#updates" data-nav="answer">${icon('book')}<span>Answer Key</span></a>
          <a class="nav-item" href="#guides" data-nav="guides">${icon('graduation')}<span>Guides & Syllabus</span></a>
          <a class="nav-item" href="#about" data-nav="schemes">${icon('shield')}<span>Yojana</span></a>
          <span class="nav-spacer"></span>
          <a class="nav-live" href="#monitor"><span class="live-ring"></span> Live Monitor</a>
        </div>
      </nav>

      <div class="ticker-bar">
        <div class="container ticker-inner">
          <span class="ticker-label"><span class="ticker-live-dot"></span> अभी अपडेट हुआ</span>
          <div class="ticker-track"><span><b>BPSC TRE 4.0</b> — आवेदन और notification details live हैं</span><span class="ticker-divider">•</span><span><b>UPSC CDS II Result</b> — official PDF उपलब्ध</span><span class="ticker-divider">•</span><span><b>RRB NTPC</b> — admit card check करें</span></div>
          <button class="ticker-next" aria-label="Next update">${icon('arrow')}</button>
        </div>
      </div>

      <main id="top">
        <section class="hero-section">
          <div class="container hero-grid">
            <div class="hero-content">
              <div class="eyebrow"><span class="eyebrow-mark">✦</span> 01 — VERIFIED CAREER UPDATES</div>
              <h1>हर सरकारी अवसर,<br /><em>एक भरोसेमंद जगह।</em></h1>
              <p class="hero-lead">Jobs, results और exams की जानकारी — official source से verify होकर, आसान भाषा में और सही समय पर।</p>
              <div class="hero-actions">
                <button class="primary-button" data-action="scroll-updates">आज की अपडेट देखें ${icon('arrow')}</button>
                <button class="text-button" data-action="how-it-works">कैसे काम करता है? <span class="play-circle">▶</span></button>
              </div>
              <div class="hero-trust"><span class="avatar-stack"><i>R</i><i>S</i><i>A</i><i>+</i></span><span><b>12 लाख+</b> candidates हर महीने जुड़ते हैं</span><span class="trust-divider"></span><span class="trust-check">${icon('check')} Official links first</span></div>
            </div>
            <div class="pulse-card" id="monitor">
              <div class="pulse-card-top"><div><span class="live-label"><span class="live-ring"></span> LIVE PULSE</span><h2>Updates, before<br /><span>you miss them.</span></h2></div><span class="pulse-icon">${icon('lightning')}</span></div>
              <div class="pulse-metric"><div class="metric-number">12</div><div><span>नई updates आज</span><b>+28% <small>vs last week</small></b></div></div>
              <div class="mini-chart" aria-label="Weekly update activity"><span style="height:31%"></span><span style="height:43%"></span><span style="height:38%"></span><span style="height:57%"></span><span style="height:51%"></span><span style="height:73%"></span><span class="chart-current" style="height:94%"></span></div>
              <div class="pulse-footer"><span>${icon('clock')} Last sync <b id="sync-time">09:42:18 AM</b></span><span class="sync-status"><i></i> All systems go</span></div>
              <div class="source-strip"><span>Watching official sources</span><span class="source-badges"><b>BPSC</b><b>SSC</b><b>UPSC</b><b>+39</b></span></div>
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="container stats-grid">
            <div class="stat-cell"><span class="stat-icon blue-icon">${icon('briefcase')}</span><div><strong>1,284</strong><span>Active updates</span></div></div>
            <div class="stat-cell"><span class="stat-icon orange-icon">${icon('globe')}</span><div><strong>42</strong><span>Official sources</span></div></div>
            <div class="stat-cell"><span class="stat-icon purple-icon">${icon('external')}</span><div><strong>97%</strong><span>Direct source links</span></div></div>
            <div class="stat-cell"><span class="stat-icon green-icon">${icon('lightning')}</span><div><strong>60 sec</strong><span>Avg. publish time</span></div></div>
            <div class="stat-note"><span class="note-spark">✦</span><span><b>Freshness matters.</b><br />हर update को timestamp मिलता है।</span></div>
          </div>
        </section>

        <section class="updates-section" id="updates">
          <div class="container">
            <div class="section-heading">
              <div><div class="section-kicker">TODAY, CURATED FOR YOU</div><h2>आज की जरूरी अपडेट</h2><p>महत्वपूर्ण जानकारी, एक नज़र में।</p></div>
              <div class="section-heading-side"><span class="refresh-label"><span class="refresh-dot"></span> Auto-refresh in <b id="countdown">${countdown}s</b></span><button class="outline-button" data-action="all-updates">सभी updates ${icon('arrow')}</button></div>
            </div>
            <div class="updates-layout">
              <div class="updates-main">
                <div class="tab-row" role="tablist">${tabs.map(tab => `<button class="tab-button ${activeTab === tab.key ? 'active' : ''}" data-filter="${tab.key}" role="tab">${icon(tab.icon)}<span>${tab.label}</span><b>${tab.key === 'all' ? updates.length : updates.filter(item => item.category === tab.key).length}</b></button>`).join('')}</div>
                <div class="feed-card" id="feed-list">${renderFeed()}</div>
                <div class="feed-bottom"><span>${icon('info')} सभी links official website तक ले जाते हैं</span><button class="link-button" data-action="all-updates">पूरी list देखें ${icon('arrow')}</button></div>
              </div>
              <aside class="deadline-card">
                <div class="deadline-header"><div><div class="section-kicker">PLAN AHEAD</div><h3>आने वाली dates</h3></div><span class="calendar-orb">${icon('calendar')}</span></div>
                <p class="deadline-intro">अपनी तैयारी का अगला कदम पहले से जानें।</p>
                <div class="deadline-list">${deadlines.map(item => `<div class="deadline-item"><div class="date-badge ${item.tone}"><b>${item.date}</b><small>${item.month}</small></div><div class="deadline-copy"><b>${item.title}</b><span>${item.text}</span></div>${icon('chevron', 'deadline-arrow')}</div>`).join('')}</div>
                <button class="deadline-button" data-action="calendar">पूरा calendar देखें ${icon('arrow')}</button>
              </aside>
            </div>
          </div>
        </section>

        <section class="spotlight-section" id="guides">
          <div class="container">
            <div class="spotlight-heading"><div><div class="section-kicker">DEEP DIVE • SEO-READY GUIDE</div><h2>सिर्फ update नहीं,<br /><span>समझने लायक जानकारी।</span></h2></div><div class="spotlight-heading-copy">हर article में eligibility, dates, fees और apply steps एक साफ format में — ताकि candidate को अलग-अलग tabs न खोलने पड़ें।</div></div>
            <article class="feature-article" data-article="bpsc-tre">
              <div class="article-accent"></div>
              <div class="feature-article-content"><div class="article-meta"><span class="article-label">FEATURED GUIDE</span><span>Updated 2 min ago</span><span class="meta-separator">•</span><span>${icon('clock')} 6 min read</span></div><h3>BPSC TRE 4.0 Recruitment 2026: <br /><span>आवेदन, eligibility और जरूरी dates</span></h3><p>Bihar Teacher Recruitment की पूरी जानकारी — कौन apply कर सकता है, कौन से documents चाहिए और official portal पर form कैसे भरें।</p><div class="article-tags"><span>BPSC</span><span>Teaching Jobs</span><span>Apply Online</span></div><button class="article-read" data-article="bpsc-tre">पूरा guide पढ़ें ${icon('arrow')}</button></div>
              <div class="feature-article-side"><div class="article-illustration"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="illustration-paper"><span>NOTIFICATION</span><b>BPSC<br /><em>TRE 4.0</em></b><small>2026 · BIHAR</small></div><span class="floating-check">${icon('check')}</span><span class="floating-star">✦</span></div><div class="article-side-note"><span class="green-check">${icon('check')}</span><span><b>Official source linked</b><small>bpsc.bihar.gov.in</small></span></div></div>
            </article>
          </div>
        </section>

        <section class="workflow-section" id="about">
          <div class="container workflow-grid">
            <div class="workflow-copy"><div class="section-kicker light-kicker">BUILT FOR SPEED & CLARITY</div><h2>Official खबर से<br /><span>एक-click apply तक।</span></h2><p>नौकरीसेतु का smart workflow candidate की सबसे बड़ी परेशानी हल करता है — सही update को सही समय पर, सही context के साथ सामने लाना।</p><button class="workflow-button" data-action="publisher">Publisher Console खोलें ${icon('arrow')}</button></div>
            <div class="workflow-steps">
              <div class="workflow-line"></div>
              <div class="workflow-step"><div class="step-number">01</div><div class="step-icon">${icon('globe')}</div><div><b>Official source detect</b><p>42 verified portals पर नया notice आते ही signal मिलता है।</p></div><span class="step-status">LIVE</span></div>
              <div class="workflow-step"><div class="step-number">02</div><div class="step-icon">${icon('sparkles')}</div><div><b>Human-first article</b><p>एक consistent format में facts, dates और apply steps draft होते हैं।</p></div><span class="step-status">AUTO</span></div>
              <div class="workflow-step"><div class="step-number">03</div><div class="step-icon">${icon('external')}</div><div><b>Publish & apply</b><p>SEO metadata, internal links और official CTA के साथ live करें।</p></div><span class="step-status">READY</span></div>
              <div class="workflow-footnote">${icon('shield')} हर article पर source, timestamp और disclaimer अपने-आप जुड़ता है।</div>
            </div>
          </div>
        </section>

        <section class="lower-section">
          <div class="container lower-grid">
            <div class="trust-panel"><div class="section-kicker">WHY CANDIDATES STAY</div><h2>कम शोर।<br /><span>ज्यादा clarity.</span></h2><div class="trust-points"><div><span>${icon('check')}</span><b>Official-first</b><p>हर CTA verified source पर जाता है।</p></div><div><span>${icon('check')}</span><b>क्लियर भाषा</b><p>Complex notification, simple summary.</p></div><div><span>${icon('check')}</span><b>काम की detail</b><p>Fees, dates और steps एक जगह।</p></div></div></div>
            <div class="newsletter-panel"><div class="newsletter-orb">${icon('bell')}</div><div class="section-kicker">NEVER MISS AN UPDATE</div><h3>आपके inbox में<br /><em>सही update.</em></h3><p>नई vacancy, result या admit card live होते ही एक short, useful alert पाएँ।</p><form class="subscribe-form" id="subscribe-form"><input type="email" placeholder="आपका email address" aria-label="Email address" required /><button type="submit">जुड़ें ${icon('arrow')}</button></form><small>${icon('shield')} No spam. सिर्फ जरूरी career alerts.</small></div>
          </div>
        </section>
      </main>

      <footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><a class="brand footer-brand-link" href="#top"><span class="brand-mark"><span class="brand-mark-line"></span><span class="brand-mark-dot"></span></span><span class="brand-copy"><span class="brand-name">नौकरी<span>सेतु</span></span><span class="brand-subtitle">YOUR NEXT OPPORTUNITY</span></span></a><p>सरकारी अवसरों को थोड़ा आसान,<br />थोड़ा साफ बनाने की कोशिश।</p><div class="footer-socials"><span>in</span><span>𝕏</span><span>▶</span></div></div><div class="footer-column"><b>Explore</b><a href="#updates">Latest Jobs</a><a href="#updates">Results</a><a href="#updates">Admit Card</a><a href="#guides">Guides & Syllabus</a></div><div class="footer-column"><b>For candidates</b><a href="#about">How it works</a><a href="#monitor" data-action="publisher">Publisher Console</a><a href="#updates">Important dates</a><a href="#about">Contact us</a></div><div class="footer-disclaimer"><span>${icon('info')}</span><p><b>नोट:</b> नौकरीसेतु एक private information platform है, कोई सरकारी website नहीं। सभी links संबंधित official website की ओर ले जाते हैं। Apply करने से पहले official notification जरूर पढ़ें।</p></div></div><div class="container footer-bottom"><span>© 2026 नौकरीसेतु. Made for India’s next step.</span><span>Privacy <i></i> Terms <i></i> Sitemap</span></div></footer>
    </div>
    <div class="toast" id="toast" role="status"><span class="toast-icon">${icon('check')}</span><span id="toast-message">Done</span></div>
    <div class="modal-backdrop" id="modal-backdrop" hidden></div>
    <section class="modal" id="article-modal" hidden aria-modal="true" role="dialog" aria-label="Article preview"></section>
    <section class="publisher-modal" id="publisher-modal" hidden aria-modal="true" role="dialog" aria-label="Publisher Console"></section>
  `;
  bindEvents();
}

function renderFeed() {
  const filtered = updates.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const haystack = `${item.title} ${item.hindiTitle} ${item.source} ${item.tags.join(' ')}`.toLowerCase();
    return matchesTab && (!searchTerm || haystack.includes(searchTerm.toLowerCase()));
  });
  if (!filtered.length) {
    return `<div class="empty-state">${icon('search')}<b>कोई update नहीं मिली</b><span>दूसरे keyword या category के साथ फिर खोजें।</span><button class="link-button" data-action="clear-search">Search clear करें</button></div>`;
  }
  return filtered.map((item, index) => `
    <button class="feed-item" data-article="${item.id}" aria-label="${item.title}">
      <span class="feed-icon ${item.color}">${icon(item.icon)}</span>
      <span class="feed-content"><span class="feed-topline"><span class="feed-source">${item.source}</span><span class="feed-time">${item.time}</span></span><strong>${item.hindiTitle}</strong><span class="feed-detail">${item.detail}</span><span class="feed-tags">${item.tags.map(tag => `<i>${tag}</i>`).join('')}</span></span>
      <span class="feed-side"><span class="status-badge ${item.statusClass}"><i></i>${item.status}</span><b>${item.stat}</b><span class="feed-arrow">${icon('arrow')}</span></span>
    </button>${index < filtered.length - 1 ? '<div class="feed-divider"></div>' : ''}`
  ).join('');
}

function bindEvents() {
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeTab = button.dataset.filter;
    document.querySelector('#feed-list').innerHTML = renderFeed();
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeTab));
    document.querySelector('#updates').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article)));
  document.querySelectorAll('[data-action="publisher"]').forEach(button => button.addEventListener('click', openPublisher));
  document.querySelectorAll('[data-action="scroll-updates"], [data-action="all-updates"]').forEach(button => button.addEventListener('click', () => document.querySelector('#updates').scrollIntoView({ behavior: 'smooth', block: 'start' })));
  document.querySelector('[data-action="how-it-works"]')?.addEventListener('click', () => document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  document.querySelector('[data-action="calendar"]')?.addEventListener('click', () => showToast('Calendar view जल्द आ रहा है — dates save कर लें!'));
  document.querySelector('[data-action="notifications"]')?.addEventListener('click', () => showToast('आप सभी latest alerts देख रहे हैं ✓'));
  document.querySelector('[data-action="language"]')?.addEventListener('click', () => showToast('English mode जल्द उपलब्ध होगा'));
  document.querySelector('[data-action="menu"]')?.addEventListener('click', () => document.querySelector('#main-nav').classList.toggle('open'));
  document.querySelector('[data-action="clear-search"]')?.addEventListener('click', () => { searchTerm = ''; document.querySelector('#search-input').value = ''; document.querySelector('#feed-list').innerHTML = renderFeed(); });

  document.querySelector('#search-form')?.addEventListener('submit', event => {
    event.preventDefault();
    searchTerm = document.querySelector('#search-input').value.trim();
    activeTab = 'all';
    document.querySelector('#feed-list').innerHTML = renderFeed();
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeTab));
    document.querySelector('#updates').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (searchTerm) showToast(`“${searchTerm}” के लिए ${document.querySelectorAll('.feed-item').length} updates मिलीं`);
  });

  document.querySelector('#subscribe-form')?.addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast('आपका alert subscription शुरू हो गया ✓');
  });

  document.querySelector('#modal-backdrop')?.addEventListener('click', closeModals);
  document.addEventListener('keydown', handleKeydown, { once: true });
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeModals();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    document.querySelector('#search-input')?.focus();
  }
  document.addEventListener('keydown', handleKeydown, { once: true });
}

function openArticle(id) {
  const item = updates.find(update => update.id === id) || updates[0];
  const modal = document.querySelector('#article-modal');
  modal.innerHTML = `
    <div class="modal-header"><div class="modal-breadcrumb">नौकरीसेतु <span>/</span> ${item.categoryLabel} <span>/</span> Article</div><button class="close-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></div>
    <div class="article-modal-grid"><article class="article-reader"><div class="article-reader-top"><span class="status-badge ${item.statusClass}"><i></i>${item.status}</span><span>Updated ${item.date}</span><span>•</span><span>${icon('clock')} 6 min read</span></div><h1>${item.title}</h1><p class="article-dek">${item.detail} यहां आपको notification का सार, जरूरी dates और official apply link एक ही जगह मिलेगा।</p><div class="author-row"><span class="author-avatar">NS</span><span><b>नौकरीसेतु Editorial Desk</b><small>Official source verified • ${item.date}</small></span><button class="share-button" data-action="share">${icon('external')} Share</button></div><div class="article-rule"></div><p>किसी भी सरकारी भर्ती या परीक्षा update में सबसे जरूरी है कि जानकारी official notice से मिलाई जाए। हमने इस page पर उपलब्ध facts को आसान भाषा में रखा है, ताकि आप बिना confusion के अगला कदम चुन सकें।</p><h2>Quick overview</h2><div class="quick-facts"><div><span>Department</span><b>${item.source.split('•')[0].trim()}</b></div><div><span>Update type</span><b>${item.categoryLabel}</b></div><div><span>Important detail</span><b>${item.stat}</b></div><div><span>Official portal</span><b>${item.official}</b></div></div><h2>इस update में क्या है?</h2><ul class="article-list"><li>${icon('check')} Official notification और direct link</li><li>${icon('check')} Eligibility, important dates और documents की checklist</li><li>${icon('check')} Apply करने का आसान step-by-step तरीका</li></ul><div class="article-callout">${icon('info')} <span><b>Candidate tip</b><br />Form submit करने से पहले अपना नाम, जन्मतिथि और uploaded documents एक बार जरूर check करें।</span></div><h2>How to apply / check ${item.categoryLabel}</h2><ol class="numbered-list"><li><span>1</span><p>नीचे दिए गए official website button से संबंधित portal खोलें।</p></li><li><span>2</span><p>Notification पढ़कर eligibility और dates verify करें।</p></li><li><span>3</span><p>Application या result page पर मांगी गई details भरें और confirmation save करें।</p></li></ol><h2>Important links</h2><div class="official-links"><a href="https://${item.official}" target="_blank" rel="noreferrer"><span class="link-icon">${icon('external')}</span><span><b>Official website</b><small>${item.official}</small></span>${icon('arrow')}</a><a href="#" data-action="download"><span class="link-icon download">${icon('file')}</span><span><b>Notification / details</b><small>Official document link</small></span>${icon('arrow')}</a></div><div class="article-disclaimer">${icon('shield')} यह जानकारी candidate convenience के लिए है। अंतिम निर्णय और eligibility संबंधित official notification के अनुसार मान्य होगी।</div></article><aside class="article-aside"><div class="apply-card"><span class="apply-card-label">READY TO TAKE THE NEXT STEP?</span><div class="apply-card-icon">${icon('rocket')}</div><h3>Official portal पर<br />सीधे जाएँ</h3><p>हम आपको source तक पहुंचाते हैं — final decision हमेशा official notice देखकर लें।</p><a class="apply-button" href="https://${item.official}" target="_blank" rel="noreferrer">Official website खोलें ${icon('external')}</a><small>${icon('shield')} Verified domain: ${item.official}</small></div><div class="aside-card"><b>इस guide में</b><a href="#">Quick overview <span>01</span></a><a href="#">Eligibility & dates <span>02</span></a><a href="#">How to apply <span>03</span></a><a href="#">Important links <span>04</span></a></div></aside></div>`;
  openModal('article-modal');
  modal.querySelector('[data-action="close-modal"]').addEventListener('click', closeModals);
  modal.querySelector('[data-action="share"]')?.addEventListener('click', () => showToast('Article link copy करने की सुविधा ready है'));
  modal.querySelector('[data-action="download"]')?.addEventListener('click', event => { event.preventDefault(); showToast('Official document link open होगा'); });
}

function openPublisher() {
  const modal = document.querySelector('#publisher-modal');
  modal.innerHTML = `
    <div class="publisher-shell"><div class="publisher-header"><div><div class="publisher-overline"><span class="live-ring"></span> INTERNAL WORKSPACE <span>•</span> DEMO VIEW</div><h2>Auto Publisher <em>Console</em></h2><p>Official notice से publish-ready article तक का live workflow.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></div><div class="publisher-body"><div class="publisher-main"><div class="console-toolbar"><div><span class="console-title">Source monitor</span><span class="console-subtitle">Last scan 09:42:18 AM</span></div><span class="monitoring-pill"><i></i> Monitoring 42 sources</span></div><div class="source-monitor-card"><div class="monitor-head"><span class="monitor-icon">${icon('pulse')}</span><div><b>Official portals</b><small>RSS, sitemap & webhook signals</small></div><span class="monitor-live">LIVE</span></div><div class="source-progress"><span class="progress-fill"></span></div><div class="source-meta"><span>${icon('check')} BPSC checked</span><span>${icon('check')} SSC checked</span><span>${icon('check')} UPSC checked</span><span class="next-scan">Next scan in <b id="publisher-countdown">${countdown}s</b></span></div></div><div class="console-title-row"><span class="console-title">Recent activity</span><button class="refresh-console" data-action="refresh-console">${icon('pulse')} Refresh</button></div><div class="activity-list"><div class="activity-row"><span class="activity-dot green"></span><div><b>BPSC TRE 4.0 notice detected</b><small>Facts extracted • 8 fields verified</small></div><time>2 min</time><span class="activity-state published">Published</span></div><div class="activity-row"><span class="activity-dot blue"></span><div><b>UPSC CDS II Result</b><small>Article draft generated • SEO check passed</small></div><time>1 hr</time><span class="activity-state published">Published</span></div><div class="activity-row"><span class="activity-dot orange"></span><div><b>SSC CGL update</b><small>Awaiting final source confirmation</small></div><time>1 hr</time><span class="activity-state review">Review</span></div></div></div><aside class="publisher-aside"><div class="publish-score"><div class="score-ring"><strong>92</strong><small>/100</small></div><b>Content health</b><span>SEO & source checks passed</span><div class="score-bars"><i style="width:96%"></i><i style="width:88%"></i><i style="width:93%"></i></div><small class="score-labels">Source <span>Structure</span> Links</small></div><div class="publish-settings"><span class="console-title">Publishing rules</span><label><span>Auto-publish after source verification</span><input type="checkbox" checked><i></i></label><label><span>Add FAQ + JSON-LD</span><input type="checkbox" checked><i></i></label><label><span>Send candidate alert</span><input type="checkbox" checked><i></i></label><button class="test-button" data-action="test-publish">Test publish flow ${icon('arrow')}</button></div></aside></div><div class="publisher-footer"><span>${icon('info')} Production setup में RSS/webhook credentials और CMS API जोड़ें।</span><span class="publisher-footer-links">Docs <i></i> Integrations</span></div></div>`;
  openModal('publisher-modal');
  modal.querySelector('[data-action="close-modal"]').addEventListener('click', closeModals);
  modal.querySelector('[data-action="test-publish"]').addEventListener('click', runPublishDemo);
  modal.querySelector('[data-action="refresh-console"]').addEventListener('click', () => showToast('42 official sources फिर से check किए गए ✓'));
}

function runPublishDemo() {
  if (publisherRunning) return;
  publisherRunning = true;
  const button = document.querySelector('[data-action="test-publish"]');
  button.innerHTML = `${icon('pulse')} Running checks...`;
  setTimeout(() => {
    button.innerHTML = `${icon('check')} Published in 48 sec`;
    button.classList.add('success');
    showToast('Demo article successfully published ✓');
    publisherRunning = false;
  }, 1200);
}

function openModal(id) {
  document.querySelector('#modal-backdrop').hidden = false;
  document.querySelector(`#${id}`).hidden = false;
  document.body.classList.add('modal-open');
}

function closeModals() {
  document.querySelector('#modal-backdrop').hidden = true;
  document.querySelector('#article-modal').hidden = true;
  document.querySelector('#publisher-modal').hidden = true;
  document.body.classList.remove('modal-open');
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  document.querySelector('#toast-message').textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3300);
}

function tick() {
  countdown -= 1;
  if (countdown <= 0) {
    countdown = 60;
    document.querySelector('#sync-time')?.replaceChildren(document.createTextNode(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })));
    showToast('Feed refreshed — 1 नई update signal मिली');
  }
  document.querySelector('#countdown')?.replaceChildren(document.createTextNode(`${countdown}s`));
  document.querySelector('#publisher-countdown')?.replaceChildren(document.createTextNode(`${countdown}s`));
}

render();
setInterval(tick, 1000);
