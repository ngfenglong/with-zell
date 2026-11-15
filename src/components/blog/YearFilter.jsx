import clsx from 'clsx';

/**
 * One dot per year with its post count. Clicking a year filters to it;
 * clicking the selected year again clears the filter.
 */
const YearFilter = ({ years, selected, onSelect }) => (
  <div role="group" aria-label="Filter by year" className="flex flex-wrap items-center gap-x-1 gap-y-2">
    {years.map(({ year, count }) => {
      const isSelected = selected === year;
      return (
        <button
          key={year}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onSelect(isSelected ? null : year)}
          className={clsx(
            'group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm tabular-nums transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500',
            isSelected ? 'bg-teal-50 font-medium text-teal-800' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              'h-2 w-2 rounded-full transition',
              isSelected
                ? 'bg-teal-600 shadow-[0_0_0_3px_rgba(20,184,166,0.2)]'
                : 'bg-white ring-[1.5px] ring-inset ring-zinc-400 group-hover:ring-zinc-600'
            )}
          />
          {year}
          <span className={clsx('text-xs', isSelected ? 'text-teal-800' : 'text-zinc-500')}>{count}</span>
        </button>
      );
    })}
  </div>
);

export default YearFilter;
