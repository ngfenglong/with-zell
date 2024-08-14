import {
  IKOU_LOGO,
  TRADE_TRACKER_LOGO,
  TTM_LOGO,
  GO_SCRAPE_FLOW_LOGO,
  SPOTIFY_TOP_100_LOGO
} from "./assets";

export const PROJECTS_DETAILS = [
  {
    name: "Ikou Application",
    description:
      "An interactive app helping users discover and plan activities around food, games, and entertainment. Users can add and access unique places.",
    technology: {
      frontend: "React w/ TypeScript",
      backend: "Golang",
      database: "MySQL",
    },
    link: {
      href: "https://ikou-web.netlify.app/",
      label: "ikou-web.netlify.app",
    },
    github: [
      {
        href: "https://github.com/ngfenglong/ikou-website",
        label: "Ikou-frontend-github-repo",
      },
      {
        href: "https://github.com/ngfenglong/Ikou-backend",
        label: "Ikou-backend-github-repo",
      },
    ],
    telegram: {},
    logo: IKOU_LOGO,
  },
  {
    name: "Trade Tracker",
    description:
      "A comprehensive app for tracking trading records, generating metrics, and refining strategies. It also provides individual profit and loss assessments.",
    technology: {
      frontend: "React w/ TypeScript",
      backend: "NodeJS",
      database: "MongoDB",
    },
    link: {
      href: "https://trade-tracker.netlify.app/",
      label: "trade-tracker.netlify.app",
    },
    github: [
      {
        href: "https://github.com/ngfenglong/trade-tracker-frontend",
        label: "Trade-tracker-frontend-repo (soon)",
      },
    ],
    telegram: {},
    logo: TRADE_TRACKER_LOGO,
  },
  {
    name: "Time To Makan",
    description:
      "Time To Makan, a Novena-focused food-choice randomizer, combines a web app and Telegram Bot to resolve lunchtime indecision dilemmas in Singapore.",
    technology: {
      frontend: "React",
      backend: "Golang",
      automation: "Python",
      database: "MySQL",
    },
    link: {
      href: "https://makan-place-randomizer.netlify.app/",
      label: "makan-place-randomizer.netlify.app",
    },
    github: [
      {
        href: "https://github.com/ngfenglong/food-randomizer-bot",
        label: "Food-randomizer-bot-repo",
      },  {
        href: "https://github.com/ngfenglong/food-randomizer-BE",
        label: "Food-randomizer-API",
      },
    ],
    telegram: {
      href: "https://t.me/novena_lunch_bot",
      label: "https://t.me/novena_lunch_bot",
    },
    logo: TTM_LOGO,
  },
  {
    name: "GoScrapeFlow",
    description:
      "A robust Go-based tool tailored for efficient web scraping through sitemaps. Designed with a modular architecture, it provides proxy rotation and future logging and data exporting capabilities.",
    technology: {
      backend: "Golang",
    },
    link: {
      href: "https://github.com/ngfenglong/go-scrape-flow",
    },
    github: [
      {
        href: "https://github.com/ngfenglong/go-scrape-flow",
        label: "Go-scrape-flow-repo",
      },
    ],
    telegram: {},
    logo: GO_SCRAPE_FLOW_LOGO,
  },
  {
    name: "Predicting Spotify Top 100 Hits",
    description:
      "A machine learning project predicting whether a song will appear in Spotify's Top 100 chart. The project includes data preprocessing, feature engineering, model selection, and deployment as a web application.",
    technology: {
      frontend: "HTML, CSS, JavaScript",
      backend: "Python",
    },
    link: {
      href: "https://spotify-top-100-track-classifier.onrender.com/",
      label: "spotify-top-100-track-classifier",
    },
    github: [
      {
        href: "https://github.com/ngfenglong/Predicting-Spotify-Top-100-Hits",
        label: "Predicting-Spotify-Top-100-Hits",
      }
    ],
    telegram: {},
    logo: SPOTIFY_TOP_100_LOGO,
}
];
