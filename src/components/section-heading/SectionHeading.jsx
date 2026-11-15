import clsx from 'clsx';

/** Section heading with a short teal marker and an optional one-line description. */
const SectionHeading = ({ id, children, description, action, className }) => (
  <div className={clsx('flex items-end justify-between gap-4', className)}>
    <div>
      <span aria-hidden="true" className="mb-3 block h-0.5 w-6 rounded-full bg-teal-500/70" />
      <h2 id={id} className="text-lg font-semibold tracking-tight text-zinc-900">
        {children}
      </h2>
      {description && <p className="mt-1 text-sm text-zinc-600">{description}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeading;
