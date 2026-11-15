import clsx from 'clsx';

/** Small neutral label for a technology or topic. */
const Tag = ({ children, className }) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-md bg-zinc-50 px-1.5 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-900/[0.08]',
      className
    )}
  >
    {children}
  </span>
);

/** A list of tags, capped to `max` so cards never turn into tag soup. */
export const TagList = ({ items = [], max = 3, label = 'Tags', className }) => {
  if (!items.length) return null;
  return (
    <ul className={clsx('flex flex-wrap gap-1.5', className)} aria-label={label}>
      {items.slice(0, max).map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
};

export default Tag;
