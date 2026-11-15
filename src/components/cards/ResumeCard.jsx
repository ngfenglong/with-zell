import Image from 'next/image';
import clsx from 'clsx';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/20/solid';

const ICONS = { Work: BriefcaseIcon, Education: AcademicCapIcon };

/** First part of the title, e.g. "Lead Software Developer" from ['Lead Software Developer/ ', 'Software Engineering Specialist']. */
const shortTitle = (role) => role.title[0].trim().replace(/[/,]\s*$/, '').trim();
/** Every part, e.g. "Lead Software Developer / Software Engineering Specialist" (shown on hover). */
const fullTitle = (role) =>
  role.title
    .map((part) => part.trim().replace(/[/,]\s*$/, '').trim())
    .filter(Boolean)
    .join(' / ');
const roleDates = (role) =>
  role.start_date === role.end_date ? role.start_date : `${role.start_date} – ${role.end_date}`;

/** Work or education timeline: one line per role, title on the left and dates on the right. */
const ResumeCard = ({ title = 'Work', resume }) => {
  const Icon = ICONS[title] ?? BriefcaseIcon;
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-900/[0.06] shadow-[0_1px_2px_rgba(24,24,27,0.04),0_4px_12px_-4px_rgba(24,24,27,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900">
        <Icon className="h-5 w-5 flex-none text-zinc-400" aria-hidden="true" />
        <span className="ml-3">{title}</span>
      </h2>
      <ol className="mt-6 space-y-5">
        {resume.map((org) => (
          <li key={org.companyName} className="flex gap-4">
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
              <Image src={org.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-contain" unoptimized />
            </span>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-medium text-zinc-900">{org.companyName}</p>
              <ul className="mt-0.5 space-y-0.5">
                {org.roles.map((role, index) => (
                  <li
                    key={`${fullTitle(role)}-${role.start_date}`}
                    className={clsx(
                      'flex items-baseline justify-between gap-3 text-xs',
                      index === 0 ? 'text-zinc-600' : 'text-zinc-500'
                    )}
                  >
                    <span className="min-w-0 truncate" title={fullTitle(role)}>
                      <span aria-hidden="true">{shortTitle(role)}</span>
                      <span className="sr-only">{fullTitle(role)}</span>
                    </span>
                    <span className="flex-none whitespace-nowrap tabular-nums text-zinc-500">{roleDates(role)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ResumeCard;
