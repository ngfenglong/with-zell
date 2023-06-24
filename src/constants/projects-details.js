import { IKOU_LOGO, TRADE_TRACKER_LOGO, TTM_LOGO } from './assets';

export const PROJECTS_DETAILS = [
  {
    name: 'Ikou Application',
    description:
      'An interactive app helping users discover and plan activities around food, games, and entertainment. Users can add and access unique places.',
    technology: ['React-typescript,', 'Go lang', 'MySQL'],
    link: { href: 'https://ikou-web.netlify.app/', label: 'Ikou-Web' },
    github: [
      {
        href: 'https://github.com/ngfenglong/ikou-website',
        label: 'Ikou-frontend-github-repo',
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
    technology: ['React-typescript,', 'NodeJS', 'MongoDB'],
    link: {
      href: 'https://trade-tracker.netlify.app/',
      label: 'Trade Tracker',
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
      ' food-choice randomizer specifically for the Novena area in Singapore, designed to solve the lunchtime indecision dilemma.',
    technology: ['React,', 'Go lang', 'MySQL'],
    link: {
      href: 'https://makan-place-randomizer.netlify.app/',
      label: 'Time To Makan',
    },
    github: [],
    logo: TTM_LOGO,
  },
];
