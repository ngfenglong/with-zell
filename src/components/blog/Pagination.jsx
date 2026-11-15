import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const baseButton =
  'inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium tabular-nums transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500';

/** Previous / page numbers / next. Renders nothing when there is only one page. */
const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={clsx(baseButton, 'gap-1 text-zinc-600 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40')}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          aria-current={number === page ? 'page' : undefined}
          aria-label={`Page ${number}`}
          className={clsx(
            baseButton,
            number === page ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          )}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={clsx(baseButton, 'gap-1 text-zinc-600 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-40')}
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
