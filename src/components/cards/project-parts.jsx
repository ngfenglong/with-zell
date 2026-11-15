import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { PROJECT_STATUSES } from '@/constants/projects-details';

/**
 * Building blocks shared by AppCard, ProjectCard and the archive table.
 * Link labels and order come from the link key, so data files never carry labels.
 */
export const LINK_TYPES = [
  { key: 'telegram', label: 'Open in Telegram' },
  { key: 'download', label: 'Download' },
  { key: 'site', label: 'Visit site' },
  { key: 'source', label: 'Source' },
];

export const projectLinks = (links = {}, max = 2) =>
  LINK_TYPES.filter(({ key }) => links[key])
    .slice(0, max)
    .map(({ key, label }) => ({ key, label, href: links[key] }));

export const primaryLink = (links) => projectLinks(links, 1)[0] ?? null;

const isExternal = (href) => /^https?:\/\//.test(href);

const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="h-3 w-3 transition motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);

const linkClass =
  'group/link relative z-10 inline-flex items-center gap-1 rounded text-sm font-medium text-zinc-600 transition hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500';

/** A link that opens external URLs in a new tab and internal ones with Next routing. */
export const SmartLink = ({ href, className, children, ...props }) =>
  isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );

export const ProjectActions = ({ links, max = 2, className }) => {
  const items = projectLinks(links, max);
  if (!items.length) return null;
  return (
    <div className={clsx('flex flex-wrap gap-x-5 gap-y-2', className)}>
      {items.map(({ key, label, href }) => (
        <SmartLink key={key} href={href} className={linkClass}>
          {label}
          {isExternal(href) && <ArrowUpRight />}
        </SmartLink>
      ))}
    </div>
  );
};

/** Card title whose link stretches over the whole card (secondary links sit above it). */
export const CardTitleLink = ({ href, children }) => {
  if (!href) return children;
  return (
    <SmartLink
      href={href}
      className="after:absolute after:inset-0 after:z-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
    >
      {children}
    </SmartLink>
  );
};

const STATUS_DOT = {
  active: 'bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]',
  beta: 'bg-amber-400',
  occasional: 'bg-sky-400',
  inactive: 'bg-zinc-300',
};

/** Coloured dot + label, e.g. "Active" or "Not actively maintained". Colour lives only in the dot. */
export const StatusLabel = ({ status }) => {
  const label = PROJECT_STATUSES[status];
  if (!label) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-zinc-600">
      <span aria-hidden="true" className={clsx('h-1.5 w-1.5 rounded-full', STATUS_DOT[status])} />
      {label}
    </span>
  );
};

export const projectYears = ({ start, end }) => {
  if (!end) return `Since ${start}`;
  return end === start ? `${start}` : `${start}–${end}`;
};

/** "Since 2026 · Active" */
export const ProjectMeta = ({ project, className }) => (
  <p className={clsx('flex flex-wrap items-center gap-x-2 text-xs text-zinc-500', className)}>
    <span className="tabular-nums">{projectYears(project)}</span>
    {PROJECT_STATUSES[project.status] && (
      <>
        <span aria-hidden="true">·</span>
        <StatusLabel status={project.status} />
      </>
    )}
  </p>
);

const LOGO_SIZES = {
  sm: { box: 'h-10 w-10', px: 40, text: 'text-xs' },
  md: { box: 'h-12 w-12', px: 48, text: 'text-sm' },
};

/** Round logo badge; falls back to initials when a project has no logo. */
export const ProjectLogo = ({ project, size = 'sm' }) => {
  const { box, px, text } = LOGO_SIZES[size];
  if (!project.logo) {
    const initials = project.name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('');
    return (
      <span
        aria-hidden="true"
        className={clsx('flex flex-none items-center justify-center rounded-full bg-zinc-900 font-semibold text-white', box, text)}
      >
        {initials}
      </span>
    );
  }
  return (
    <span
      className={clsx(
        'flex flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5',
        box
      )}
    >
      <Image
        src={project.logo}
        alt=""
        width={px}
        height={px}
        className="h-[62%] w-[62%] rounded-full object-contain"
        unoptimized
      />
    </span>
  );
};
