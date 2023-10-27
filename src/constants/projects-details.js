import {
  IKOU_LOGO,
  TRADE_TRACKER_LOGO,
  TTM_LOGO,
  GO_SCRAPE_FLOW_LOGO,
} from './assets';

export const PROJECTS_DETAILS = [
  {
    name: 'Ikou Application',
    description:
      'An interactive app helping users discover and plan activities around food, games, and entertainment. Users can add and access unique places.',
    technology: {
      // ['React-typescript,', 'Go lang', 'MySQL'],
      frontend: 'React w/ TypeScript',
      backend: 'Golang',
      database: 'MySQL',
    },
    link: {
      href: 'https://ikou-web.netlify.app/',
      label: 'ikou-web.netlify.app',
    },
    github: [
      {
        href: 'https://github.com/ngfenglong/ikou-website',
        label: 'github.com/ngfenglong/ikou-website',
      },
      {
        href: 'https://github.com/ngfenglong/Ikou-backend',
        label: 'Ikou-backend-github-repo',
      },
    ],
    logo: IKOU_LOGO,
  },
  {
    name: 'Trade Tracker',
    description:
      'A comprehensive app for tracking trading records, generating metrics, and refining strategies. It also provides individual profit and loss assessments.',
    technology: {
      frontend: 'React w/ TypeScript',
      backend: 'NodeJS',
      database: 'MongoDB',
    },
    link: {
      href: 'https://trade-tracker.netlify.app/',
      label: 'trade-tracker.netlify.app',
    },
    github: [
      {
        href: 'https://github.com/ngfenglong/trade-tracker-frontend',
        label: 'Trade-tracker-frontend-repo (soon)',
      },
    ],
    logo: TRADE_TRACKER_LOGO,
  },
  {
    name: 'Time To Makan',
    description:
      'A food-choice randomizer specifically for the Novena area in Singapore, designed to solve the lunchtime indecision dilemma.',
    technology: {
      frontend: 'React',
      backend: 'Golang',
      database: 'MySQL',
    },
    link: {
      href: 'https://makan-place-randomizer.netlify.app/',
      label: 'makan-place-randomizer.netlify.app',
    },
    github: [],
    logo: TTM_LOGO,
  },
  {
    name: 'GoScrapeFlow',
    description:
      'A robust Go-based tool tailored for efficient web scraping through sitemaps. Designed with a modular architecture, it provides proxy rotation and future logging and data exporting capabilities.',
    technology: {
      backend: 'Golang',
    },
    link: {
      href: 'https://github.com/ngfenglong/go-scrape-flow',
    },
    github: [
      {
        href: 'https://github.com/ngfenglong/go-scrape-flow',
        label: 'Go-scrape-flow-repo',
      },
    ],
    logo: GO_SCRAPE_FLOW_LOGO,
  },
];
