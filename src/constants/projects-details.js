import {
  FALLOW_LOGO,
  GO_SCRAPE_FLOW_LOGO,
  IKOU_LOGO,
  SPOTIFY_TOP_100_LOGO,
  STOCK_SCOUTER_BOT_LOGO,
  TRADE_TRACKER_LOGO,
  TTM_LOGO,
} from './assets';

/**
 * PROJECTS: everything shown on /projects and in the home page
 * "What I'm building" strip.
 *
 * Adding a project: copy PROJECT_TEMPLATE, fill in the required fields and
 * add it to PROJECTS. Keep every key, even when it is empty.
 *
 * Links point to the project itself (GitHub, store, site, bot), never to blog posts.
 *
 * Where a project appears is decided automatically (src/util/projects.js):
 *  - "What I'm building": status 'active' or 'beta', at most BUILDING_LIMIT;
 *    extras fall into "Projects".
 *  - "Projects": status 'occasional' or 'inactive' (not archived). The first
 *    PROJECTS_PREVIEW_LIMIT show, the rest sit behind a "Show all" button.
 *  Within each section: sorted by status (in PROJECT_STATUSES order), then
 *  newest `updated` first.
 *  - "Archive": archived: true. Compact row: year, name, stack, one link.
 *
 * Writing style: no em dashes in any text.
 * Day to day: bump `updated` when you ship something.
 */
export const BUILDING_LIMIT = 3;

/** Status values, in display order. New projects usually start as 'beta'. */
export const PROJECT_STATUSES = {
  active: 'Active',
  beta: 'Beta',
  occasional: 'Occasional updates',
  inactive: 'Not actively maintained',
};
export const PROJECTS_PREVIEW_LIMIT = 4;

export const PROJECT_TEMPLATE = {
  // Required
  name: '', // "Fallow"
  pitch: '', // one sentence, max 120 characters
  start: 2026, // year you started
  updated: '2026-11', // YYYY-MM you last worked on it
  stack: [], // 1–4 items, most important first

  // Optional: leave empty when not needed
  end: null, // year it finished; null = still ongoing
  status: 'beta', // 'active' | 'beta' | 'occasional' | 'inactive'
  highlight: null, // one extra sentence, shown on the big cards only
  logo: null, // e.g. FALLOW_LOGO; no logo shows initials
  image: null, // screenshot in /images/project-shots/
  archived: false, // move to the Archive table
  links: {
    telegram: null, // "Open in Telegram"
    download: null, // "Download"
    site: null, // "Visit site"
    source: null, // "Source"
  },
};

export const PROJECTS = [
  {
    name: 'Fallow',
    pitch: 'A Chrome extension that frees up memory from idle tabs without closing them.',
    start: 2026,
    updated: '2026-11',
    stack: ['TypeScript', 'React', 'Chrome Extension'],
    end: null,
    status: 'active',
    highlight:
      'Tabs stay in place and reload when revisited, with manual and automatic unloading, a searchable dashboard and an activity log. All data stays on the device.',
    logo: FALLOW_LOGO,
    image: '/images/project-shots/fallow-dashboard.png',
    archived: false,
    links: {
      telegram: null,
      download: 'https://github.com/ngfenglong/Fallow-Plugin/releases',
      site: null,
      source: 'https://github.com/ngfenglong/Fallow-Plugin',
    },
  },
  {
    name: 'JiakAI',
    pitch: 'An AI food diary on Telegram: log meals by text or photo and get calorie estimates.',
    start: 2025,
    updated: '2026-10',
    stack: ['Python', 'OpenAI', 'Firebase', 'Telegram Bot'],
    end: null,
    status: 'occasional',
    highlight: 'Tracks nutrition over time, right inside Telegram.',
    logo: null,
    image: null,
    archived: false,
    links: {
      telegram: null,
      download: null,
      site: null,
      source: null,
    },
  },
  {
    name: 'Ikou',
    pitch: 'Discover and plan food, games and outings, with places added by the community.',
    start: 2022,
    updated: '2026-10',
    stack: ['TypeScript', 'React', 'Go', 'PostgreSQL'],
    end: null,
    status: 'occasional',
    highlight: 'A Go REST API with token auth and tested routes behind a React frontend.',
    logo: IKOU_LOGO,
    image: null,
    archived: false,
    links: {
      telegram: null,
      download: null,
      site: 'https://ikou-web.netlify.app/',
      source: 'https://github.com/ngfenglong/Ikou-backend',
    },
  },
  {
    name: 'Time To Makan',
    pitch: 'A lunch decider for Novena, Singapore, as a web app and a Telegram bot.',
    start: 2022,
    updated: '2026-09',
    stack: ['Go', 'Python', 'React', 'MySQL'],
    end: null,
    status: 'inactive',
    highlight: 'One Go API serves random picks to both the web app and the bot.',
    logo: TTM_LOGO,
    image: null,
    archived: false,
    links: {
      telegram: 'https://t.me/novena_lunch_bot',
      download: null,
      site: 'https://makan-place-randomizer.netlify.app/',
      source: 'https://github.com/ngfenglong/food-randomizer-BE',
    },
  },
  {
    name: 'Stock Scouter Bot',
    pitch: 'A Telegram bot for swing traders: stock snapshots, market trends and trading plans.',
    start: 2024,
    updated: '2025-06',
    stack: ['Python', 'Flask', 'MySQL', 'Docker'],
    end: null,
    status: 'inactive',
    highlight: 'Deployed to EC2 with CI/CD through GitHub Actions.',
    logo: STOCK_SCOUTER_BOT_LOGO,
    image: null,
    archived: false,
    links: {
      telegram: 'https://t.me/stock_scouter_bot',
      download: null,
      site: null,
      source: null,
    },
  },
  {
    name: 'Predicting Spotify Top 100 Hits',
    pitch: "A machine learning model that predicts whether a song reaches Spotify's Top 100.",
    start: 2024,
    updated: '2025-06',
    stack: ['Python', 'Machine Learning', 'Flask'],
    end: 2025,
    status: 'inactive',
    highlight: null,
    logo: SPOTIFY_TOP_100_LOGO,
    image: null,
    archived: true,
    links: {
      telegram: null,
      download: null,
      site: null,
      source: 'https://github.com/ngfenglong/Predicting-Spotify-Top-100-Hits',
    },
  },
  {
    name: 'Trade Tracker',
    pitch: 'Track trading records, metrics and profit and loss to refine a strategy.',
    start: 2023,
    updated: '2023-10',
    stack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    end: 2023,
    status: 'inactive',
    highlight: null,
    logo: TRADE_TRACKER_LOGO,
    image: null,
    archived: false,
    links: {
      telegram: null,
      download: null,
      site: 'https://trade-tracker.netlify.app/',
      source: null,
    },
  },
  {
    name: 'GoScrapeFlow',
    pitch: 'A Go tool that scrapes sites through their sitemaps, with proxy rotation and Excel export.',
    start: 2023,
    updated: '2023-12',
    stack: ['Go'],
    end: 2023,
    status: 'inactive',
    highlight: null,
    logo: GO_SCRAPE_FLOW_LOGO,
    image: null,
    archived: false,
    links: {
      telegram: null,
      download: null,
      site: null,
      source: 'https://github.com/ngfenglong/go-scrape-flow',
    },
  },
];
