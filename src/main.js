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

const directorySections = [
  {
    key: 'result',
    title: 'Result',
    hindi: 'सरकारी रिजल्ट 2026',
    icon: 'chart',
    tone: 'red',
    intro: 'Latest exam results, merit list और score card',
    items: [
      { id: 'up-dgmhup', title: 'UP DGMHUP ANM Training Selected Candidate List / Merit List 2026', meta: 'Merit List • 18 Sep 2026' },
      { id: 'nta-ugc', title: 'NTA UGC NET Re Exam Result 2026', meta: 'Result • 18 Sep 2026' },
      { id: 'hpsc-hcs', title: 'Haryana HPSC Civil Services HCS Mains Result 2026', meta: 'Result • 17 Sep 2026' },
      { id: 'navy-inet', title: 'Indian Navy SSR / MR INET Result 2026', meta: 'Result • 17 Sep 2026' },
      { id: 'uppsc-acf', title: 'UPPSC ACF RFO Mains Result 2026', meta: 'Mains Result • 16 Sep 2026' },
      { id: 'dsssb-result', title: 'DSSSB Latest Result 2026', meta: 'Result • 16 Sep 2026' },
      { id: 'emrs-result', title: 'EMRS Teaching and Non Teaching Tier II Final Result 2026', meta: 'Final Result • 15 Sep 2026' },
      { id: 'railway-je-result', title: 'Railway RRB Junior Engineer JE CEN 05/2025 Result', meta: 'Result • 15 Sep 2026' },
      { id: 'rpsc-si-result', title: 'RPSC Sub Inspector SI Physical Result 2026', meta: 'Physical Result • 14 Sep 2026' },
      { id: 'sbi-po-score', title: 'SBI Probationary Officer PO Score Card / Marks 2026', meta: 'Score Card • 13 Sep 2026' }
    ]
  },
  {
    key: 'admit-card',
    title: 'Admit Card',
    hindi: 'एडमिट कार्ड 2026',
    icon: 'file',
    tone: 'blue',
    intro: 'Exam date, city intimation और hall ticket',
    items: [
      { id: 'upsssc-forest', title: 'UPSSSC Forest Guard / Wildlife Guard Mains Exam City 2026', meta: 'Exam City • 18 Sep 2026' },
      { id: 'dsssb-admit', title: 'DSSSB Delhi Admit Card September 2026', meta: 'Admit Card • 18 Sep 2026' },
      { id: 'navy-admit', title: 'Indian Navy SSR / MR INET Stage II Admit Card 2026', meta: 'Admit Card • 17 Sep 2026' },
      { id: 'sbi-clerk-date', title: 'SBI Junior Associates Clerk New Exam Date 2026', meta: 'Exam Date • 17 Sep 2026' },
      { id: 'rrb-section', title: 'RRB Section Controller Application Status 2026', meta: 'Application Status • 16 Sep 2026' },
      { id: 'up-police-home', title: 'UP Police Home Guard PET Admit Card 2026', meta: 'Admit Card • 16 Sep 2026' },
      { id: 'ssc-cgl-schedule', title: 'SSC Combined Graduate Level CGL Exam Schedule 2026', meta: 'Exam Schedule • 15 Sep 2026' },
      { id: 'patna-assistant', title: 'Patna High Court Assistant Admit Card 2026', meta: 'Admit Card • 15 Sep 2026' },
      { id: 'upsc-cds-admit', title: 'UPSC CDS II Exam Admit Card 2026', meta: 'Admit Card • 14 Sep 2026' },
      { id: 'isro-admit', title: 'ISRO ICRB Assistant and Other Post Admit Card 2026', meta: 'Admit Card • 13 Sep 2026' }
    ]
  },
  {
    key: 'latest-job',
    title: 'Latest Job',
    hindi: 'नवीनतम सरकारी नौकरी',
    icon: 'briefcase',
    tone: 'green',
    intro: 'नई भर्ती, online form और vacancy notice',
    items: [
      { id: 'mp-teacher', title: 'MPESB Primary and Middle School Teacher Online Form 2026', meta: 'Last Date: 20/10/2026' },
      { id: 'up-je-agri', title: 'UPSSSC Junior Engineer JE Agriculture Online Form 2026', meta: 'Last Date: 12/10/2026' },
      { id: 'mp-police-asi', title: 'MP Police ASI, Subedar Steno Online Form 2026', meta: 'Last Date: 08/10/2026' },
      { id: 'up-primary', title: 'UP Assistant Teacher Primary Online Form 2026', meta: 'Last Date: 14/10/2026' },
      { id: 'ssc-je', title: 'SSC Junior Engineer JE Online Form 2026', meta: 'Last Date: 30/09/2026' },
      { id: 'ibps-rrb', title: 'IBPS RRB 15th Online Form 2026', meta: 'Last Date: 21/09/2026' },
      { id: 'ssc-chsl', title: 'SSC 10+2 CHSL Online Form 2026', meta: 'Last Date: 18/10/2026' },
      { id: 'railway-paramedical', title: 'Railway RRB Paramedical Online Form 2026', meta: 'Last Date: 09/10/2026' },
      { id: 'bihar-bpssc', title: 'Bihar Police BPSSC Company Commander Online Form 2026', meta: 'Last Date: 15/10/2026' },
      { id: 'bank-of-india', title: 'Bank of India BOI Specialist Officers SO Online Form 2026', meta: 'Last Date: 07/10/2026' }
    ]
  },
  {
    key: 'answer-key',
    title: 'Answer Key',
    hindi: 'आंसर की 2026',
    icon: 'book',
    tone: 'orange',
    intro: 'Answer key, response sheet और objection link',
    items: [
      { id: 'aiapget-key', title: 'NTA AIAPGET Final Answer Key 2026', meta: 'Final Key • 18 Sep 2026' },
      { id: 'rssb-key', title: 'Rajasthan RSSB Computer Instructor Answer Key 2026', meta: 'Answer Key • 18 Sep 2026' },
      { id: 'cds-key', title: 'UPSC CDS II Answer Key 2026', meta: 'Answer Key • 17 Sep 2026' },
      { id: 'nda-key', title: 'UPSC NDA II Answer Key 2026', meta: 'Answer Key • 17 Sep 2026' },
      { id: 'upsssc-jtc-key', title: 'UPSSSC Teacher Cadre JTC Revised Answer Key 2026', meta: 'Revised Key • 16 Sep 2026' },
      { id: 'dsssb-mts-key', title: 'Delhi DSSSB MTS Answer Key 2026', meta: 'Answer Key • 15 Sep 2026' },
      { id: 'ugc-net-key', title: 'NTA UGC NET Re Exam Answer Key 2026', meta: 'Answer Key • 15 Sep 2026' },
      { id: 'bsf-key', title: 'BSF HC Ministerial and ASI Steno Answer Key 2026', meta: 'Answer Key • 14 Sep 2026' },
      { id: 'rrb-group-key', title: 'RRB Railway Group D Answer Key 2026 CEN 09/2025', meta: 'Answer Key • 13 Sep 2026' },
      { id: 'bpsc-key', title: 'Bihar BPSC Prosecution Officer APO Answer Key 2026', meta: 'Answer Key • 12 Sep 2026' }
    ]
  },
  {
    key: 'syllabus',
    title: 'Syllabus',
    hindi: 'परीक्षा सिलेबस 2026',
    icon: 'graduation',
    tone: 'purple',
    intro: 'Exam pattern, syllabus और preparation guide',
    items: [
      { id: 'up-primary-syllabus', title: 'UP Assistant Teacher Primary Class 1 to 5 Exam Syllabus 2026', meta: 'Syllabus • Updated today' },
      { id: 'ssc-chsl-syllabus', title: 'SSC 10+2 CHSL Tier I, Tier II Exam Syllabus 2026', meta: 'Syllabus • Updated today' },
      { id: 'ssc-je-syllabus', title: 'SSC Junior Engineer JE Paper I & II Exam Syllabus 2026', meta: 'Syllabus • Updated today' },
      { id: 'super-tet-syllabus', title: 'UP Super TET Assistant Teacher Syllabus 2026', meta: 'Syllabus • Updated yesterday' },
      { id: 'upsssc-pet-syllabus', title: 'UPSSSC PET 2026 Syllabus and Exam Pattern', meta: 'Syllabus • Updated yesterday' },
      { id: 'clat-syllabus', title: 'CLAT 2027 UG / PG Syllabus', meta: 'Syllabus • Updated 16 Sep' },
      { id: 'uptet-syllabus', title: 'UPTET 2026 Syllabus and New Exam Pattern', meta: 'Syllabus • Updated 15 Sep' },
      { id: 'jhtet-syllabus', title: 'Jharkhand Teacher Eligibility Test JHTET Syllabus 2026', meta: 'Syllabus • Updated 14 Sep' }
    ]
  },
  {
    key: 'admission',
    title: 'Admission',
    hindi: 'एडमिशन और स्कॉलरशिप',
    icon: 'book',
    tone: 'teal',
    intro: 'Entrance form, counselling और scholarship',
    items: [
      { id: 'uprtou-phd', title: 'UPRTOU PhD Entrance Exam Admission Online Form 2026', meta: 'Admission • Apply Online' },
      { id: 'up-scholarship', title: 'UP Scholarship Online Form 2026 (All Course)', meta: 'Scholarship • Apply Online' },
      { id: 'iim-cat', title: 'IIM CAT Admission Online Form 2026 Date Extended', meta: 'Entrance • Date Extended' },
      { id: 'bihar-blet', title: 'Bihar Library Eligibility Test BLET Online Form 2026', meta: 'Entrance • Apply Online' },
      { id: 'rimcee', title: 'NTA RIMCEE Class 8th Admissions Online Form 2027', meta: 'Admission • Apply Online' },
      { id: 'gate', title: 'IIT GATE 2027 Online Form', meta: 'Entrance • Apply Online' },
      { id: 'neet-counselling', title: 'NEET UG 2026 Online Counselling', meta: 'Counselling • Notice' },
      { id: 'clat-admission', title: 'CLAT 2027 Admission Online Form', meta: 'Entrance • Apply Online' }
    ]
  },
  {
    key: 'certificate',
    title: 'Certificate',
    hindi: 'सर्टिफिकेट डाउनलोड',
    icon: 'file',
    tone: 'slate',
    intro: 'Degree, certificate और e-certificate services',
    items: [
      { id: 'uptet-certificate', title: 'UPTET 2026 Certificate Download', meta: 'Certificate • Download' },
      { id: 'csjmu-certificate', title: 'CSJMU Kanpur Degree, Provisional & Migration Certificate', meta: 'Certificate • Download' },
      { id: 'ccsu-certificate', title: 'CCSU Meerut Provisional Certificate Download', meta: 'Certificate • Download' },
      { id: 'prsu-certificate', title: 'PRSU Prayagraj Provisional Certificate Download', meta: 'Certificate • Download' },
      { id: 'htet-certificate', title: 'Haryana TET HTET Certificate Download', meta: 'Certificate • Download' },
      { id: 'ctet-certificate', title: 'CTET February 2026 Certificate Download', meta: 'Certificate • Download' }
    ]
  },
  {
    key: 'outsourcing',
    title: 'Outsourcing / Offline Jobs',
    hindi: 'आउटसोर्सिंग और ऑफलाइन जॉब',
    icon: 'briefcase',
    tone: 'brown',
    intro: 'District-wise contract और offline recruitment',
    items: [
      { id: 'suda-mis', title: 'UP State Urban Development SUDA MIS Assistant Recruitment 2026', meta: 'Offline Job • District-wise' },
      { id: 'special-educator', title: 'UP Special Educator Agra, Mathura, Firozabad Online Form 2026', meta: 'Recruitment • Apply Online' },
      { id: 'ecce-agra', title: 'UP ECCE Educator Agra Online Form 2026', meta: 'Offline Job • Apply Online' },
      { id: 'dairy-deo', title: 'UP Dairy Development DEO Data Entry Operator Recruitment 2026', meta: 'Recruitment • Apply Online' },
      { id: 'bocw-operator', title: 'UPBOCW Computer Operator Online Form 2026', meta: 'Recruitment • Apply Online' },
      { id: 'rajasthan-safai', title: 'Rajasthan Safai Karamchari Worker Online Form 2026', meta: 'Recruitment • Apply Online' }
    ]
  },
  {
    key: 'important',
    title: 'Important',
    hindi: 'जरूरी सेवाएं और फॉर्म',
    icon: 'shield',
    tone: 'gold',
    intro: 'OTR, scholarship, registration और useful tools',
    items: [
      { id: 'voter-id', title: 'Voter ID EPIC Download 2026', meta: 'Citizen Service' },
      { id: 'nielit-ccc', title: 'NIELIT CCC Exam Online Form 2026', meta: 'Online Form' },
      { id: 'up-nursing', title: 'UP Nursing Council Registration Online Form 2026', meta: 'Registration' },
      { id: 'mp-cpct', title: 'MP CPCT Online Form 2026', meta: 'Online Form' },
      { id: 'mp-rojgar', title: 'MP Rojgar Panjiyan Online Registration', meta: 'Registration' },
      { id: 'ssc-otr', title: 'SSC One Time Registration OTR Online Form', meta: 'Registration' }
    ]
  }
];

function officialDomain(title, sectionKey) {
  const text = title.toLowerCase();
  if (text.includes('bpsc') || text.includes('bihar')) return 'bpsc.bihar.gov.in';
  if (text.includes('ssc') || text.includes('dsssb')) return 'ssc.gov.in';
  if (text.includes('upsc') || text.includes('cds') || text.includes('nda')) return 'upsc.gov.in';
  if (text.includes('upsssc')) return 'upsssc.gov.in';
  if (text.includes('rrb') || text.includes('railway')) return 'indianrailways.gov.in';
  if (text.includes('ibps') || text.includes('sbi') || text.includes('bank')) return 'ibps.in';
  if (text.includes('mpesb') || text.includes('mp police') || text.includes('mppsc')) return 'esb.mp.gov.in';
  if (text.includes('rpsc') || text.includes('rssb') || text.includes('rajasthan')) return 'rpsc.rajasthan.gov.in';
  if (text.includes('neet') || text.includes('nta') || text.includes('ugc')) return 'nta.ac.in';
  if (text.includes('up ') || text.includes('uptet') || text.includes('up scholarship')) return 'up.gov.in';
  if (text.includes('navy')) return 'joinindiannavy.gov.in';
  if (text.includes('isro')) return 'isro.gov.in';
  if (text.includes('ctet') || text.includes('tet')) return 'ctet.nic.in';
  return sectionKey === 'admission' ? 'education.gov.in' : 'india.gov.in';
}

const directoryLookup = Object.fromEntries(directorySections.flatMap(section => section.items.map(item => [item.id, { ...item, category: section.key, categoryLabel: section.title, source: `${section.title} • India`, status: section.title, statusClass: section.tone === 'green' ? 'green' : section.tone === 'orange' ? 'amber' : 'blue', date: item.meta, time: 'Live', color: section.tone === 'green' ? 'green' : section.tone === 'orange' ? 'orange' : section.tone === 'purple' ? 'purple' : 'blue', icon: section.icon, tags: [section.title, '2026'], stat: 'Details देखें', official: officialDomain(item.title, section.key), detail: `${item.title} की latest verified जानकारी, important dates और official link यहां देखें।` }])));

const featuredLinks = [
  { title: 'UP Primary Teacher 2026 Apply Online', meta: 'Teacher Recruitment', id: 'up-primary' },
  { title: 'Bihar STET 2026 Apply Online', meta: 'Bihar Education', id: 'bihar-stet' },
  { title: 'UP Anganwadi Worker Apply Online', meta: 'Women & Child Dept.', id: 'anganwadi-worker' },
  { title: 'SSC 10+2 CHSL Apply Online', meta: 'Central Government', id: 'ssc-chsl' },
  { title: 'SSC Junior Engineer 2026 Apply Online', meta: 'Engineering Jobs', id: 'ssc-je' },
  { title: 'UP Scholarship 2026 Apply Online', meta: 'Scholarship', id: 'up-scholarship' },
  { title: 'India Post GDS Apply Online', meta: 'Postal Recruitment', id: 'india-post-gds' },
  { title: 'IBPS RRB 15th Apply Online', meta: 'Banking Jobs', id: 'ibps-rrb' },
  { title: 'Railway Paramedical Apply Online', meta: 'Railway Recruitment', id: 'railway-paramedical' }
];

const app = document.querySelector('#app');
let activeTab = 'all';
let searchTerm = '';
let countdown = 42;
let publisherRunning = false;
let remotePublisherState = null;
let remoteScanBusy = false;
let directoryFilter = 'all';

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
          <a class="nav-item" href="#directory" data-nav="syllabus">${icon('graduation')}<span>Syllabus</span></a>
          <a class="nav-item" href="#directory" data-nav="admission">${icon('book')}<span>Admission</span></a>
          <a class="nav-item" href="#directory" data-nav="more">${icon('menu')}<span>More Sections</span></a>
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
              <div class="source-strip"><span>Watching official sources</span><span class="source-badges"><b>BPSC</b><b>SSC</b><b>UPSC</b><b>+11</b></span></div>
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="container stats-grid">
            <div class="stat-cell"><span class="stat-icon blue-icon">${icon('briefcase')}</span><div><strong>1,284</strong><span>Active updates</span></div></div>
            <div class="stat-cell"><span class="stat-icon orange-icon">${icon('globe')}</span><div><strong>14</strong><span>Live source feeds</span></div></div>
            <div class="stat-cell"><span class="stat-icon purple-icon">${icon('external')}</span><div><strong>97%</strong><span>Direct source links</span></div></div>
            <div class="stat-cell"><span class="stat-icon green-icon">${icon('lightning')}</span><div><strong>60 sec</strong><span>Avg. publish time</span></div></div>
            <div class="stat-note"><span class="note-spark">✦</span><span><b>Freshness matters.</b><br />हर update को timestamp मिलता है।</span></div>
          </div>
        </section>

        ${renderDirectory()}

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
              <div class="workflow-step"><div class="step-number">01</div><div class="step-icon">${icon('globe')}</div><div><b>Official source detect</b><p>14 allowlisted portals पर नया notice आते ही signal मिलता है।</p></div><span class="step-status">LIVE</span></div>
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

      <footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><a class="brand footer-brand-link" href="#top"><span class="brand-mark"><span class="brand-mark-line"></span><span class="brand-mark-dot"></span></span><span class="brand-copy"><span class="brand-name">नौकरी<span>सेतु</span></span><span class="brand-subtitle">YOUR NEXT OPPORTUNITY</span></span></a><p>सरकारी अवसरों को थोड़ा आसान,<br />थोड़ा साफ बनाने की कोशिश।</p><div class="footer-socials"><span>in</span><span>𝕏</span><span>▶</span></div></div><div class="footer-column"><b>Explore</b><a href="#updates">Latest Jobs</a><a href="#updates">Results</a><a href="#updates">Admit Card</a><a href="#guides">Guides & Syllabus</a></div><div class="footer-column"><b>For candidates</b><a href="#about">How it works</a><a href="#monitor" data-action="publisher">Publisher Console</a><a href="#updates">Important dates</a><a href="#about">Contact us</a></div><div class="footer-disclaimer"><span>${icon('info')}</span><p><b>नोट:</b> नौकरीसेतु एक private information platform है, कोई सरकारी website नहीं। सभी links संबंधित official website की ओर ले जाते हैं। Apply करने से पहले official notification जरूर पढ़ें।</p></div></div><div class="container footer-bottom"><span>© 2026 नौकरीसेतु. Made for India’s next step.</span><span><a href="/privacy" data-info="privacy">Privacy</a><i></i><a href="/terms" data-info="terms">Terms</a><i></i><a href="/editorial-policy" data-info="editorial">Editorial policy</a><i></i><a href="/sitemap.xml">Sitemap</a></span></div></footer>
    </div>
    <div class="toast" id="toast" role="status"><span class="toast-icon">${icon('check')}</span><span id="toast-message">Done</span></div>
    <div class="modal-backdrop" id="modal-backdrop" hidden></div>
    <section class="modal" id="article-modal" hidden aria-modal="true" role="dialog" aria-label="Article preview"></section>
    <section class="publisher-modal" id="publisher-modal" hidden aria-modal="true" role="dialog" aria-label="Publisher Console"></section>
    <section class="info-modal" id="info-modal" hidden aria-modal="true" role="dialog" aria-label="NaukriSetu information"></section>
  `;
  bindEvents();
}

function renderFeaturedLinks() {
  return featuredLinks.map((item, index) => `<button class="featured-link" data-article="${item.id}"><span class="featured-number">${String(index + 1).padStart(2, '0')}</span><span><b>${item.title}</b><small>${item.meta}</small></span>${icon('external')}</button>`).join('');
}

function renderDirectoryPanel(section) {
  return `<section class="directory-panel tone-${section.tone}" id="panel-${section.key}"><div class="directory-panel-head"><div class="directory-panel-icon">${icon(section.icon)}</div><div><h3>${section.title}</h3><p>${section.intro}</p></div><span class="directory-count">${section.items.length}+</span></div><div class="directory-list">${section.items.map(item => `<button class="directory-link" data-article="${item.id}"><span class="directory-bullet"></span><span class="directory-link-copy"><b>${item.title}</b><small>${item.meta}</small></span>${icon('chevron')}</button>`).join('')}</div><button class="directory-more" data-section="${section.key}">View More ${section.title} ${icon('arrow')}</button></section>`;
}

function renderDirectory() {
  return `<section class="classic-directory" id="directory"><div class="container"><div class="directory-title-row"><div><div class="section-kicker">ONE PAGE • EVERY IMPORTANT UPDATE</div><h2>सारी जानकारी, <span>एक ही जगह।</span></h2><p>Result, admit card, latest job और बाकी सभी sections — list-wise, साफ format में।</p></div><div class="directory-search-wrap">${icon('search')}<input id="directory-search" type="search" placeholder="इस list में खोजें..." aria-label="Search all updates" /><span>⌘ K</span></div></div><div class="directory-filter-row"><span>Browse by:</span><button class="directory-filter active" data-dir-filter="all">All updates</button><button class="directory-filter" data-dir-filter="latest-job">Latest Jobs</button><button class="directory-filter" data-dir-filter="result">Results</button><button class="directory-filter" data-dir-filter="admit-card">Admit Card</button><button class="directory-filter" data-dir-filter="answer-key">Answer Key</button><button class="directory-filter" data-dir-filter="syllabus">Syllabus</button><button class="directory-filter" data-dir-filter="admission">Admission</button></div><div class="featured-links-card"><div class="featured-card-head"><div><b>Top Online Forms</b><span>सबसे ज्यादा देखे जाने वाले forms</span></div><span class="featured-live"><i></i> Updated today</span></div><div class="featured-links-grid">${renderFeaturedLinks()}</div></div><div class="directory-grid">${directorySections.map(renderDirectoryPanel).join('')}</div><div class="department-rail"><span class="department-label">Popular Departments</span><a href="#panel-latest-job">BPSC</a><a href="#panel-admission">UP Scholarship</a><a href="#panel-latest-job">UPSSSC</a><a href="#panel-latest-job">SSC</a><a href="#panel-result">UPSC</a><a href="#panel-admit-card">Air Force</a><a href="#panel-admit-card">Navy</a><a href="#panel-result">RPSC</a><a href="#panel-admit-card">Police</a><a href="#panel-admit-card">Railways</a></div><div class="directory-note">${icon('info')} <span><b>हर list automatic refresh होती है।</b> Notice आते ही source, update time और official link के साथ item publish queue में जुड़ता है।</span><button class="link-button" data-action="publisher">Publisher workflow देखें ${icon('arrow')}</button></div></div></section>`;
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

function filterDirectory(value = document.querySelector('#directory-search')?.value || '') {
  const query = value.trim().toLowerCase();
  document.querySelectorAll('.directory-panel').forEach(panel => {
    const panelKey = panel.id.replace('panel-', '');
    const sectionMatches = directoryFilter === 'all' || directoryFilter === panelKey;
    let visible = 0;
    panel.querySelectorAll('.directory-link').forEach(link => {
      const matches = sectionMatches && (!query || link.textContent.toLowerCase().includes(query));
      link.hidden = !matches;
      if (matches) visible += 1;
    });
    panel.hidden = !sectionMatches || visible === 0;
  });
  document.querySelectorAll('.featured-link').forEach(link => {
    link.hidden = directoryFilter !== 'all' || Boolean(query) && !link.textContent.toLowerCase().includes(query);
  });
}

function bindEvents() {
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    activeTab = button.dataset.filter;
    document.querySelector('#feed-list').innerHTML = renderFeed();
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeTab));
    document.querySelector('#updates').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article)));
  document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => showToast(`${button.dataset.section} section की पूरी list जल्द available होगी`)));
  document.querySelector('#directory-search')?.addEventListener('input', event => filterDirectory(event.target.value));
  document.querySelectorAll('[data-dir-filter]').forEach(button => button.addEventListener('click', () => {
    directoryFilter = button.dataset.dirFilter;
    document.querySelectorAll('[data-dir-filter]').forEach(item => item.classList.toggle('active', item.dataset.dirFilter === directoryFilter));
    filterDirectory();
  }));
  document.querySelectorAll('[data-action="publisher"]').forEach(button => button.addEventListener('click', openPublisher));
  document.querySelectorAll('[data-info]').forEach(button => button.addEventListener('click', event => { event.preventDefault(); openInfo(button.dataset.info); }));
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

function slugifyClient(value = '') {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-').slice(0, 90) || 'official-update';
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>\"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[character]));
}

function setArticleSeo(item, slug) {
  const description = `${item.detail || item.title} Official dates, eligibility, important links and verified source details.`;
  document.title = `${item.title} | नौकरीसेतु`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  descriptionMeta?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = `${window.location.origin}/updates/${slug}`;
  document.querySelector('#dynamic-article-schema')?.remove();
  const schema = document.createElement('script');
  schema.id = 'dynamic-article-schema';
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description,
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'नौकरीसेतु Editorial Desk' },
    publisher: { '@type': 'Organization', name: 'नौकरीसेतु' },
    mainEntityOfPage: `${window.location.origin}/updates/${slug}`
  });
  document.head.appendChild(schema);
}

function restoreHomeSeo() {
  document.title = 'नौकरीसेतु — Latest Sarkari Jobs, Results & Admit Card';
  document.querySelector('meta[name="description"]')?.setAttribute('content', 'नौकरीसेतु पर सरकारी नौकरी, रिजल्ट, एडमिट कार्ड, आंसर की और ऑनलाइन फॉर्म की verified जानकारी — official links के साथ।');
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'नौकरीसेतु — हर सरकारी अवसर, एक भरोसेमंद जगह');
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'सरकारी नौकरी और परीक्षा अपडेट, official source से सीधे आपके लिए।');
  document.querySelector('#dynamic-article-schema')?.remove();
  document.querySelector('link[rel="canonical"]')?.remove();
}

function openArticle(id, remoteItem = null) {
  const featured = featuredLinks.find(link => link.id === id);
  const item = remoteItem || updates.find(update => update.id === id) || directoryLookup[id] || {
    id,
    category: 'jobs',
    categoryLabel: 'Latest Job',
    source: `${featured?.meta || 'Government Update'} • India`,
    title: featured?.title || 'Government Recruitment Update 2026',
    detail: `${featured?.title || 'Government Recruitment Update 2026'} की eligibility, dates, notification और official apply link की पूरी जानकारी।`,
    stat: 'Apply Online',
    status: 'नई भर्ती',
    statusClass: 'green',
    date: '18 Sep 2026',
    time: 'Live',
    color: 'green',
    icon: 'briefcase',
    tags: [featured?.meta || 'Recruitment', '2026'],
    official: 'india.gov.in'
  };
  const articleSlug = item.slug || `${item.id}-${slugifyClient(item.title)}`;
  if (window.location.pathname !== `/updates/${articleSlug}`) window.history.pushState({ article: articleSlug }, '', `/updates/${articleSlug}`);
  setArticleSeo(item, articleSlug);
  const officialHref = item.sourceUrl || (String(item.official || '').startsWith('http') ? item.official : `https://${item.official}`);
  const detectedDates = item.sourceArticle?.facts?.dates || [];
  const applyBegin = detectedDates[0] || 'Official notice में देखें';
  const lastDate = detectedDates[1] || detectedDates[0] || 'Official notice में देखें';
  const sourceEvidence = item.sourceArticle?.facts?.sourceExcerpt ? `<div class="source-evidence"><span>${icon('shield')} Official source evidence</span><p>${escapeHtml(item.sourceArticle.facts.sourceExcerpt)}</p><small>Fetched: ${escapeHtml(item.sourceArticle.facts.sourceLastChecked || item.date || 'Latest scan')}</small></div>` : '';
  const extractedLinkRows = (item.sourceArticle?.facts?.officialLinks || []).slice(0, 5).map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer"><span>${icon('external')} ${escapeHtml(link.label)}</span>${icon('arrow')}</a>`).join('');
  const modal = document.querySelector('#article-modal');
  modal.innerHTML = `
    <div class="modal-header"><div class="modal-breadcrumb">नौकरीसेतु <span>/</span> ${item.categoryLabel} <span>/</span> Full Information</div><button class="close-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></div>
    <div class="article-modal-grid"><article class="article-reader sr-article">
      <div class="article-reader-top"><span class="status-badge ${item.statusClass}"><i></i>${item.status}</span><span>Post Date / Update: ${item.date}</span><span>•</span><span>${icon('clock')} 8 min read</span></div>
      <h1>${item.title}</h1>
      <div class="classic-info-table">
        <div class="classic-info-row"><b>Name Of Post :</b><strong>${item.title}</strong></div>
        <div class="classic-info-row"><b>Post Date / Update :</b><strong>${item.date} <span class="verified-text">✓ Source checked</span></strong></div>
        <div class="classic-info-row"><b>Short Information :</b><p>${item.detail} यह page official notice के आधार पर तैयार किया गया है। यहां आपको eligibility, important dates, application fee, vacancy details, selection process, documents और direct official links एक ही जगह मिलेंगे। आवेदन करने से पहले original notification जरूर पढ़ें।</p></div>
      </div>
      <div class="article-social-row"><span>Share this update</span><button>Telegram</button><button>WhatsApp</button><button data-action="share">Copy link</button><span class="article-updated">${icon('pulse')} Auto-checked every 60 sec</span></div>
      <div class="article-source-heading"><div><div class="section-kicker">${item.source.toUpperCase()}</div><h2>${item.title}</h2><p>Complete notification summary • official source linked below</p></div><span class="article-source-seal">${icon('shield')}<small>Source<br />verified</small></span></div>${sourceEvidence}
      <p>अगर आप <b>${item.title}</b> से जुड़ी latest information खोज रहे हैं, तो यह detailed guide आपके लिए है। किसी भी भर्ती, result, admit card या answer key के मामले में केवल headline देखना पर्याप्त नहीं होता; application window, required qualification, fee, age limit और official instructions को साथ में देखना जरूरी है। हमने इस article को उसी one-page format में व्यवस्थित किया है, जिससे candidate को अलग-अलग pages पर भटकना न पड़े।</p>
      <p>इस page पर दी गई जानकारी candidate convenience के लिए आसान भाषा में है। Notice में बाद में कोई correction, date extension या नया official link आता है, तो source monitor इस page के update record में नया timestamp जोड़ता है। अंतिम eligibility और selection का निर्णय संबंधित विभाग की original notification से ही मान्य होगा।</p>
      <div class="article-highlight-grid"><div><span>${icon('calendar')} Important dates</span><b>Apply window और exam timeline</b></div><div><span>${icon('file')} Direct links</span><b>Official portal तक one click</b></div><div><span>${icon('shield')} Verified source</span><b>${item.official}</b></div></div>
      <h2>Important Dates</h2><p>नीचे दिए गए dates इस update को समझने के लिए हैं। Apply करने या result check करने से पहले official notice पर latest date जरूर verify करें।</p><div class="sr-table date-table"><div class="sr-table-head"><b>Event</b><b>Date / Status</b></div><div class="sr-table-row"><span>Application / Notice Begin</span><strong>${applyBegin}</strong></div><div class="sr-table-row"><span>Last Date for Apply Online</span><strong>${lastDate}</strong></div><div class="sr-table-row"><span>Last Date Pay Exam Fee</span><strong>${lastDate}</strong></div><div class="sr-table-row"><span>Exam / Result / Next Stage</span><strong>Official schedule के अनुसार</strong></div><div class="sr-table-row"><span>Correction / Objection Window</span><strong>Notice में उपलब्ध होने पर</strong></div></div>
      <div class="article-two-col"><section><h2>Application Fee</h2><div class="sr-table compact-table"><div class="sr-table-row"><span>General / OBC / EWS</span><strong>As per notification</strong></div><div class="sr-table-row"><span>SC / ST / PH</span><strong>As per notification</strong></div><div class="sr-table-row"><span>Payment Mode</span><strong>Online fee mode</strong></div></div><p class="small-note">Fee payment के लिए Debit Card, Credit Card, Net Banking या department द्वारा दिए गए माध्यम का उपयोग करें।</p></section><section><h2>Age Limit</h2><div class="sr-table compact-table"><div class="sr-table-row"><span>Minimum Age</span><strong>18 Years</strong></div><div class="sr-table-row"><span>Maximum Age</span><strong>Notification के अनुसार</strong></div><div class="sr-table-row"><span>Age Relaxation</span><strong>Rules के अनुसार</strong></div></div><p class="small-note">Age की गणना और reserved category relaxation के लिए original notification देखें।</p></section></div>
      <h2>Vacancy / Update Details</h2><p>इस update के मुख्य details को नीचे simple table में रखा गया है। अगर किसी particular post, region या category के लिए अलग requirement है, तो notification में दिए गए annexure को जरूर पढ़ें।</p><div class="sr-table vacancy-table"><div class="sr-table-head"><b>Post / Update</b><b>Details</b></div><div class="sr-table-row"><span>${item.categoryLabel}</span><strong>${item.stat}</strong></div><div class="sr-table-row"><span>Department / Board</span><strong>${item.source.split('•')[0].trim()}</strong></div><div class="sr-table-row"><span>Qualification</span><strong>Post के अनुसार 10th / 12th / Graduate</strong></div><div class="sr-table-row"><span>Selection Process</span><strong>Exam, document verification / notice rules</strong></div><div class="sr-table-row"><span>Job / Exam Location</span><strong>India / संबंधित State</strong></div></div>
      <div class="article-two-col"><section><h2>Salary / Pay Scale</h2><div class="sr-table compact-table"><div class="sr-table-row"><span>Pay Level</span><strong>Official notification के अनुसार</strong></div><div class="sr-table-row"><span>Basic Pay</span><strong>Post और department पर निर्भर</strong></div><div class="sr-table-row"><span>Allowances</span><strong>Rules के अनुसार</strong></div></div><p class="small-note">Exact salary, probation और service conditions के लिए post-wise official advertisement देखें।</p></section><section><h2>Selection Process</h2><div class="sr-table compact-table"><div class="sr-table-row"><span>Stage 1</span><strong>Written / CBT / Preliminary</strong></div><div class="sr-table-row"><span>Stage 2</span><strong>Mains / Skill / PET, if applicable</strong></div><div class="sr-table-row"><span>Final stage</span><strong>DV / Interview / Medical</strong></div></div><p class="small-note">हर recruitment का final selection method source notification में अलग हो सकता है।</p></section></div>
      <h2>Eligibility और जरूरी Documents</h2><p>Candidate को form भरने से पहले अपनी educational qualification, age, category और experience को official eligibility से match करना चाहिए। सामान्य रूप से नीचे दिए गए documents ready रखने पर application process आसान रहता है:</p><ul class="article-list detailed-list"><li>${icon('check')} शैक्षिक योग्यता की marksheet और certificate</li><li>${icon('check')} Valid photo ID proof: Aadhaar, PAN, Voter ID या अन्य accepted document</li><li>${icon('check')} Recent passport size photograph और signature की scanned file</li><li>${icon('check')} Caste / EWS / PwD / domicile certificate, यदि लागू हो</li><li>${icon('check')} Active mobile number, email ID और fee payment details</li><li>${icon('check')} Result या admit card के लिए registration number / roll number</li></ul>
      <div class="article-callout">${icon('info')} <span><b>Candidate tip:</b> Photo, signature और certificate को prescribed size/format में पहले से resize कर लें। Final submit से पहले preview में नाम, जन्मतिथि, category और uploaded files को दोबारा check करें।</span></div>
      <h2>How to Fill Form / Check Result / Download Admit Card</h2><p>नीचे general step-by-step process है। इस update के अनुसार button का नाम Apply Online, Download Admit Card, View Result या Answer Key हो सकता है:</p><ol class="numbered-list detailed-steps"><li><span>1</span><p>इस page के Important Links section में दिए गए <b>Official Website</b> button को खोलें। Domain और notice title को जरूर match करें।</p></li><li><span>2</span><p>Official portal पर registration / login करें। पहली बार user हैं तो अपना mobile number और email verify करें।</p></li><li><span>3</span><p>Notification को पूरा पढ़ें और अपनी age, qualification, category, district तथा post preference check करें।</p></li><li><span>4</span><p>Form में basic details भरें, documents upload करें और required fee online pay करें। Result/admit card के लिए roll number और date of birth सही डालें।</p></li><li><span>5</span><p>Preview page पर सभी columns ध्यान से check करके final submit करें। गलत जानकारी बाद में correction window के बिना बदल नहीं सकती।</p></li><li><span>6</span><p>Final submitted form, payment receipt, result PDF या admit card को download करके print / PDF में सुरक्षित रखें।</p></li></ol>
      <h2>Syllabus / Exam Pattern</h2><p>Exam का pattern post और recruitment board के अनुसार बदल सकता है। Preparation शुरू करने से पहले official syllabus PDF, sections, marks, duration, negative marking और qualifying criteria को verify करें।</p><div class="quick-facts syllabus-facts"><div><span>Mode</span><b>Official notice के अनुसार</b></div><div><span>Questions / Marks</span><b>Notification में देखें</b></div><div><span>Duration</span><b>Board द्वारा निर्धारित</b></div><div><span>Negative marking</span><b>Post-wise rules देखें</b></div></div>
      <h2>Important Links</h2><div class="official-links"><a href="${officialHref}" target="_blank" rel="noreferrer"><span class="link-icon">${icon('external')}</span><span><b>Official Website / Apply Online</b><small>${item.official} • Direct source link</small></span>${icon('arrow')}</a><a href="#" data-action="download"><span class="link-icon download">${icon('file')}</span><span><b>Download Notification / Details</b><small>Original notice और instructions पढ़ें</small></span>${icon('arrow')}</a><a href="#" data-action="download"><span class="link-icon green-link">${icon('calendar')}</span><span><b>Important Dates / Exam Schedule</b><small>Dates को save करके रखें</small></span>${icon('arrow')}</a><a href="#" data-action="download"><span class="link-icon purple-link">${icon('shield')}</span><span><b>Official Helpdesk / Objection Link</b><small>केवल department portal पर submit करें</small></span>${icon('arrow')}</a></div>${extractedLinkRows ? `<div class="extracted-links"><b>Source links detected from official page</b>${extractedLinkRows}</div>` : ''}
      <h2>Frequently Asked Questions</h2><div class="article-faq"><details open><summary>${item.title} का official link कहां मिलेगा?</summary><p>Official website का direct link इस article के Important Links section में दिया गया है। Apply करने से पहले domain और original notification दोनों verify करें।</p></details><details><summary>क्या इस update में dates बदल सकती हैं?</summary><p>हां, department द्वारा correction, extension या revised schedule जारी किया जा सकता है। इस page का update time और official notice सबसे पहले check करें।</p></details><details><summary>Application submit करने से पहले क्या check करें?</summary><p>Eligibility, category, photo/signature, fee payment, preview और final acknowledgement को जरूर check करें।</p></details><details><summary>क्या यह government official website है?</summary><p>नहीं। नौकरीसेतु एक private information platform है। हम official sources को सरल भाषा में summarize करते हैं; अंतिम निर्णय संबंधित government department की website और notification का होगा।</p></details><details><summary>Notification PDF या admit card download नहीं हो रहा है तो क्या करें?</summary><p>Official portal का server load, browser cache और login details check करें। किसी third-party link पर personal information share न करें।</p></details></div>
      <div class="article-seo-footer"><span>${icon('check')} Content checklist complete</span><span>${icon('external')} Source linked</span><span>${icon('clock')} Last reviewed ${item.date}</span></div><div class="article-disclaimer">${icon('shield')} यह जानकारी candidate convenience के लिए है। नौकरीसेतु किसी सरकारी विभाग, परीक्षा बोर्ड या recruiting agency की official website नहीं है। सभी dates, vacancies, results और links को apply करने से पहले संबंधित official notification से verify करें।</div>
    </article><aside class="article-aside"><div class="apply-card"><span class="apply-card-label">READY TO TAKE THE NEXT STEP?</span><div class="apply-card-icon">${icon('rocket')}</div><h3>Official portal पर<br />सीधे जाएँ</h3><p>हम आपको source तक पहुंचाते हैं — final decision हमेशा official notice देखकर लें।</p><a class="apply-button" href="${officialHref}" target="_blank" rel="noreferrer">Official website खोलें ${icon('external')}</a><small>${icon('shield')} Verified domain: ${item.official}</small></div><div class="aside-card article-outline"><b>इस guide में</b><a href="#">Short Information <span>01</span></a><a href="#">Important Dates <span>02</span></a><a href="#">Fee & Eligibility <span>03</span></a><a href="#">How to apply <span>04</span></a><a href="#">Important Links <span>05</span></a><a href="#">FAQ <span>06</span></a></div><div class="aside-source-card">${icon('pulse')}<b>Auto update enabled</b><p>Official source में नया notice detect होने पर update queue में जाता है।</p></div></aside></div>`;
  openModal('article-modal');
  modal.querySelector('[data-action="close-modal"]').addEventListener('click', closeModals);
  modal.querySelectorAll('[data-action="share"]').forEach(button => button.addEventListener('click', () => showToast('Article link copy करने की सुविधा ready है')));
  modal.querySelectorAll('[data-action="download"]').forEach(button => button.addEventListener('click', event => { event.preventDefault(); showToast('Official document link open होगा'); }));
}

function renderSourceRegistry(state = remotePublisherState) {
  const sourceList = state?.sources?.slice(0, 8) || [
    { name: 'BPSC Bihar', status: 'waiting' },
    { name: 'SSC', status: 'waiting' },
    { name: 'UPSC', status: 'waiting' },
    { name: 'Railway RRB', status: 'waiting' },
    { name: 'IBPS', status: 'waiting' },
    { name: 'NTA', status: 'waiting' }
  ];
  return sourceList.map(source => `<span class="registry-chip ${source.status}"><i></i>${source.name}</span>`).join('');
}

function renderRemoteActivity(state = remotePublisherState) {
  if (!state?.activities?.length) return '<div class="activity-row"><span class="activity-dot blue"></span><div><b>Waiting for first source scan</b><small>Allowlisted official portals will appear here</small></div><span class="activity-state review">Queued</span></div>';
  return state.activities.slice(0, 5).map(activity => `<div class="activity-row"><span class="activity-dot ${activity.status === 'error' ? 'orange' : activity.status === 'published' ? 'green' : 'blue'}"></span><div><b>${activity.title}</b><small>${activity.detail || 'Source monitor activity'}</small></div><time>${new Date(activity.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</time><span class="activity-state ${activity.status === 'error' ? 'review' : activity.status === 'published' ? 'published' : 'review'}">${activity.status}</span></div>`).join('');
}

function applyPublisherState(state) {
  remotePublisherState = state;
  state.articles?.map(remoteArticleToItem).forEach(item => {
    if (!updates.some(update => update.id === item.id)) updates.unshift(item);
  });
  if (document.querySelector('#feed-list')) document.querySelector('#feed-list').innerHTML = renderFeed();
  const online = state.sources?.filter(source => source.status === 'online').length || 0;
  const highPriority = state.sources?.filter(source => source.priority === 'high' && source.status === 'online').length || 0;
  const drafts = state.articles?.filter(article => article.status !== 'published').length || 0;
  const lastScan = state.lastScanFinishedAt ? new Date(state.lastScanFinishedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Waiting';
  const monitoring = document.querySelector('#publisher-monitoring');
  if (monitoring) monitoring.innerHTML = `<i></i> Monitoring ${state.activeSourceCount || state.sourceCount || 0} official sources`;
  const lastScanElement = document.querySelector('#publisher-last-scan');
  if (lastScanElement) lastScanElement.textContent = `Last scan ${lastScan} • interval ${state.intervalSeconds || 60} sec`;
  const onlineSummary = document.querySelector('#publisher-online-summary');
  if (onlineSummary) onlineSummary.innerHTML = `${icon('check')} ${online}/${state.activeSourceCount || state.sourceCount || 0} sources online`;
  const highPriorityElement = document.querySelector('#publisher-high-priority');
  if (highPriorityElement) highPriorityElement.innerHTML = `${icon('check')} ${highPriority} high-priority live`;
  const draftSummary = document.querySelector('#publisher-draft-summary');
  if (draftSummary) draftSummary.innerHTML = `${icon('check')} ${drafts} article draft(s)`;
  const liveState = document.querySelector('#publisher-live-state');
  if (liveState) { liveState.textContent = state.scanRunning ? 'SCANNING' : online ? 'LIVE' : 'CHECK'; liveState.className = `monitor-live ${state.scanRunning ? 'scanning' : online ? '' : 'warning'}`; }
  const registry = document.querySelector('#source-registry');
  if (registry) registry.innerHTML = renderSourceRegistry(state);
  const activityList = document.querySelector('#activity-list');
  if (activityList) activityList.innerHTML = renderRemoteActivity(state);
}

async function refreshPublisherState() {
  try {
    const response = await fetch('/api/publisher/state', { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error('Publisher API unavailable');
    applyPublisherState(await response.json());
  } catch {
    // The static build remains usable when the optional publisher API is not mounted.
  }
}

async function runRemoteScan() {
  if (remoteScanBusy) return;
  remoteScanBusy = true;
  const button = document.querySelector('[data-action="scan-now"]');
  if (button) button.innerHTML = `${icon('pulse')} Scanning...`;
  try {
    const response = await fetch('/api/publisher/scan?force=1', { method: 'POST' });
    if (!response.ok) throw new Error('Scan failed');
    applyPublisherState(await response.json());
    showToast('Allowlisted official sources scan complete ✓');
  } catch {
    showToast('Source scan API preview mode में उपलब्ध नहीं है');
  } finally {
    remoteScanBusy = false;
    const currentButton = document.querySelector('[data-action="scan-now"]');
    if (currentButton) currentButton.innerHTML = `${icon('pulse')} Scan now`;
  }
}

function openInfo(type) {
  const content = {
    privacy: { title: 'Privacy Policy', kicker: 'YOUR DATA, YOUR CONTROL', body: '<p>नौकरीसेतु candidate convenience के लिए public career information दिखाता है। Email alerts के लिए दिया गया address केवल alerts और service updates के लिए उपयोग किया जाएगा। हम password, payment details या application credentials store नहीं करते।</p><h3>हम क्या collect कर सकते हैं?</h3><ul><li>Optional email alert subscription</li><li>Anonymous performance and search analytics</li><li>Source monitoring logs और article update timestamps</li></ul><p>Production launch से पहले इस policy में actual data processor, retention अवधि और deletion contact जोड़ा जाएगा।</p>' },
    terms: { title: 'Terms of Use', kicker: 'READ BEFORE YOU APPLY', body: '<p>नौकरीसेतु एक independent information platform है, government department नहीं। Website पर दी गई जानकारी आसान भाषा में summary के रूप में है। Apply, fee payment, exam attendance और document submission से पहले संबंधित official notification पढ़ना जरूरी है।</p><h3>आपकी जिम्मेदारी</h3><ul><li>Official source से eligibility और dates verify करना</li><li>Personal login, OTP और payment details third-party से share न करना</li><li>गलत या outdated information दिखे तो correction team को बताना</li></ul>' },
    editorial: { title: 'Editorial & Source Policy', kicker: 'HOW WE VERIFY', body: '<p>हर publishable update को source URL, detected time और notice fingerprint के साथ store करने का लक्ष्य है। High-confidence notice में official link और date signal होना जरूरी है। Ambiguous change review queue में जाता है; system incomplete source पर facts invent नहीं करता।</p><h3>Correction promise</h3><p>Official notice revise होने पर article में updated timestamp और correction note दिखाया जाएगा। Candidate को अंतिम निर्णय हमेशा issuing authority की website से लेना चाहिए।</p>' },
    correction: { title: 'Report a Correction', kicker: 'HELP US KEEP IT ACCURATE', body: '<p>किसी article में date, fee, vacancy या official link गलत दिखे तो source URL और correction detail के साथ editorial team को report करें। Production deployment में verified support email और correction form यहां connected होंगे।</p>' }
  }[type] || { title: 'नौकरीसेतु', kicker: 'ABOUT THIS PLATFORM', body: '<p>नौकरीसेतु का उद्देश्य government jobs, results और exam updates को साफ, structured और official links के साथ उपलब्ध कराना है।</p>' };
  const modal = document.querySelector('#info-modal');
  modal.innerHTML = `<div class="info-modal-inner"><div class="info-modal-top"><div><div class="section-kicker">${content.kicker}</div><h2>${content.title}</h2></div><button class="close-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></div><div class="info-modal-body">${content.body}</div><div class="info-modal-foot">${icon('shield')} Apply करने से पहले official notification verify करें।</div></div>`;
  openModal('info-modal');
  modal.querySelector('[data-action="close-modal"]').addEventListener('click', closeModals);
}

function openPublisher() {
  const modal = document.querySelector('#publisher-modal');
  modal.innerHTML = `
    <div class="publisher-shell"><div class="publisher-header"><div><div class="publisher-overline"><span class="live-ring"></span> INTERNAL WORKSPACE <span>•</span> PREVIEW API</div><h2>Auto Publisher <em>Console</em></h2><p>Official notice से publish-ready article तक का live workflow.</p></div><button class="close-button" data-action="close-modal" aria-label="Close">${icon('x')}</button></div><div class="publisher-body"><div class="publisher-main"><div class="console-toolbar"><div><span class="console-title">Source monitor</span><span class="console-subtitle" id="publisher-last-scan">Last scan loading • interval 60 sec</span></div><span class="monitoring-pill" id="publisher-monitoring"><i></i> Monitoring sources</span></div><div class="pipeline-strip"><div class="pipeline-step active"><i>01</i><b>Detect</b><small>official notice</small></div><span>${icon('arrow')}</span><div class="pipeline-step active"><i>02</i><b>Extract</b><small>facts + dates</small></div><span>${icon('arrow')}</span><div class="pipeline-step active"><i>03</i><b>Optimize</b><small>SEO + schema</small></div><span>${icon('arrow')}</span><div class="pipeline-step ready"><i>04</i><b>Publish</b><small>CMS + alert</small></div></div><div class="source-monitor-card"><div class="monitor-head"><span class="monitor-icon">${icon('pulse')}</span><div><b>Official portals</b><small>RSS, sitemap & webhook signals</small></div><span class="monitor-live" id="publisher-live-state">LIVE</span></div><div class="source-progress"><span class="progress-fill"></span></div><div class="source-meta"><span id="publisher-online-summary">${icon('check')} Source status loading</span><span id="publisher-high-priority">${icon('check')} High-priority sources</span><span id="publisher-draft-summary">${icon('check')} Draft queue ready</span><span class="next-scan">Next scan in <b id="publisher-countdown">${countdown}s</b></span></div><div class="source-registry" id="source-registry"></div></div><div class="console-title-row"><span class="console-title">Recent activity</span><button class="refresh-console" data-action="scan-now">${icon('pulse')} Scan now</button></div><div class="activity-list" id="activity-list"><div class="activity-row"><span class="activity-dot green"></span><div><b>BPSC TRE 4.0 notice detected</b><small>Facts extracted • 8 fields verified</small></div><time>2 min</time><span class="activity-state published">Published</span></div><div class="activity-row"><span class="activity-dot blue"></span><div><b>UPSC CDS II Result</b><small>Article draft generated • SEO check passed</small></div><time>1 hr</time><span class="activity-state published">Published</span></div><div class="activity-row"><span class="activity-dot orange"></span><div><b>SSC CGL update</b><small>Awaiting final source confirmation</small></div><time>1 hr</time><span class="activity-state review">Review</span></div></div></div><aside class="publisher-aside"><div class="publish-score"><div class="score-ring"><strong>92</strong><small>/100</small></div><b>Content health</b><span>SEO & source checks passed</span><div class="score-bars"><i style="width:96%"></i><i style="width:88%"></i><i style="width:93%"></i></div><small class="score-labels">Source <span>Structure</span> Links</small></div><div class="publish-settings"><span class="console-title">Publishing rules</span><label><span>Auto-publish after source verification</span><input type="checkbox" checked><i></i></label><label><span>Add FAQ + JSON-LD</span><input type="checkbox" checked><i></i></label><label><span>Send candidate alert</span><input type="checkbox" checked><i></i></label><button class="test-button" data-action="test-publish">Publish selected draft ${icon('arrow')}</button></div></aside></div><div class="publisher-footer"><span>${icon('info')} Production setup में RSS/webhook credentials और CMS API जोड़ें।</span><span class="publisher-footer-links">Docs <i></i> Integrations</span></div></div>`;
  openModal('publisher-modal');
  modal.querySelector('[data-action="close-modal"]').addEventListener('click', closeModals);
  modal.querySelector('[data-action="test-publish"]').addEventListener('click', runPublishDemo);
  modal.querySelector('[data-action="scan-now"]').addEventListener('click', runRemoteScan);
  refreshPublisherState();
}

async function runPublishDemo() {
  if (publisherRunning) return;
  publisherRunning = true;
  const button = document.querySelector('[data-action="test-publish"]');
  const selected = remotePublisherState?.articles?.find(article => article.status !== 'published');
  if (button) button.innerHTML = `${icon('pulse')} Running checks...`;
  try {
    if (selected) {
      const response = await fetch('/api/publisher/publish', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: selected.id }) });
      if (!response.ok) throw new Error('Publish failed');
      await refreshPublisherState();
      showToast('Verified source article published ✓');
    } else {
      await new Promise(resolve => setTimeout(resolve, 1200));
      showToast('No verified draft yet — demo checks complete');
    }
  } catch {
    showToast('Publish API unavailable — draft अभी review में है');
  } finally {
    if (button) {
      button.innerHTML = `${icon('check')} ${selected ? 'Publish selected draft' : 'Waiting for draft'} ${icon('arrow')}`;
      if (selected) button.classList.add('success');
    }
    publisherRunning = false;
  }
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
  document.querySelector('#info-modal').hidden = true;
  document.body.classList.remove('modal-open');
  if (window.location.pathname.startsWith('/updates/')) {
    window.history.pushState({}, '', '/');
    restoreHomeSeo();
  }
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  document.querySelector('#toast-message').textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 3300);
}

function remoteArticleToItem(article) {
  return {
    id: article.id,
    slug: article.slug,
    category: 'jobs',
    categoryLabel: article.category || 'Official Update',
    source: `${article.sourceName} • Official source`,
    title: article.title,
    detail: article.sections?.overview || `Official update detected from ${article.officialDomain}.`,
    stat: article.facts?.dates?.[0] || 'Official notice',
    status: article.status === 'published' ? 'Published' : 'Source review',
    statusClass: article.confidence === 'high' ? 'green' : 'amber',
    date: new Date(article.updatedAt || article.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: 'Live source',
    color: 'blue',
    icon: 'file',
    tags: [article.category || 'Update', 'Official'],
    official: article.officialDomain,
    sourceUrl: article.sourceUrl,
    sourceArticle: article
  };
}

async function handleArticleRoute() {
  if (!window.location.pathname.startsWith('/updates/')) return;
  const slug = decodeURIComponent(window.location.pathname.replace(/^\/updates\//, ''));
  const localItems = [...updates, ...Object.values(directoryLookup), ...featuredLinks];
  const local = localItems.find(item => `${item.id}-${slugifyClient(item.title || '')}` === slug || item.slug === slug);
  if (local) {
    openArticle(local.id);
    return;
  }
  try {
    const response = await fetch(`/api/publisher/article/${encodeURIComponent(slug)}`);
    if (response.ok) openArticle(slug, remoteArticleToItem(await response.json()));
  } catch {
    showToast('Article source अभी load नहीं हो पाया');
  }
}

window.addEventListener('popstate', () => {
  if (window.location.pathname.startsWith('/updates/')) handleArticleRoute();
  else closeModals();
});

function tick() {
  countdown -= 1;
  if (countdown <= 0) {
    countdown = 60;
    document.querySelector('#sync-time')?.replaceChildren(document.createTextNode(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })));
    if (remotePublisherState) runRemoteScan();
    showToast('Feed refreshed — official source scan cycle complete');
  }
  document.querySelector('#countdown')?.replaceChildren(document.createTextNode(`${countdown}s`));
  document.querySelector('#publisher-countdown')?.replaceChildren(document.createTextNode(`${countdown}s`));
}

render();
handleArticleRoute();
setInterval(tick, 1000);
