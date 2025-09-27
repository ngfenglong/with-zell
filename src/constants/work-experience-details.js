import { ACCENTURE_LOGO, GIC_LOGO, NUS_LOGO } from './assets';

export const WORK_EXPERIENCE_DETAILS = [
  {
    companyName: 'Accenture',
    roles: [
      {
        title: ['Lead Software Developer/ ', 'Software Engineering Specialist'],
        start_date: 'Jun 2024',
        end_date: 'Jul 2025',
      },
      {
        title: ['Senior Software Developer/','Business Arch Senior Analyst'],
        start_date: 'Jun 2022',
        end_date: 'May 2024',
      },
      {
        title: ['Software Developer/','Business Arch Analyst'],
        start_date: 'Jan 2021',
        end_date: 'May 2022',
      },    ],
    logo: ACCENTURE_LOGO,
  },

  {
    companyName: 'National University of Singapore',
    roles: [
      {
        title: ['Teaching Assistant'],
        start_date: 'Aug 2020',
        end_date: 'Dec 2020',
      },
    ],
    logo: NUS_LOGO,
  },
  {
    companyName: 'GIC',
    roles: [
      {
        title: ['Full-Stack Software Engineer'],
        start_date: 'Jan 2020',
        end_date: 'Jun 2020',
      },
    ],
    logo: GIC_LOGO,
  },
];
