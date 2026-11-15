import Link from 'next/link';
import clsx from 'clsx';
import { formatDateToString } from '@/util/date-helper';
import { TagList } from '@/components/tag/Tag';

const ArticleDate = ({ dateTime, decorate = false, className }) => (
  <time
    dateTime={dateTime}
    className={clsx('relative z-10 flex items-center text-sm tabular-nums text-zinc-500', decorate && 'pl-3.5', className)}
  >
    {decorate && (
      <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
        <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
      </span>
    )}
    {formatDateToString(dateTime)}
  </time>
);

/**
 * A post in a list. The whole card links to the post.
 * `dateColumn` puts the full date in a fixed left column on wide screens (blog page).
 */
export const ArticleCard = ({ article, dateColumn = false }) => (
  <article className={clsx(dateColumn && 'md:grid md:grid-cols-4 md:items-baseline md:gap-x-8')}>
    {dateColumn && <ArticleDate dateTime={article.posted_date} className="mt-1 hidden md:flex" />}
    <div className={clsx('group relative flex flex-col items-start', dateColumn && 'md:col-span-3')}>
      <div className="absolute -inset-x-4 -inset-y-5 z-0 scale-95 rounded-2xl bg-white opacity-0 shadow-[0_0_0_1px_rgba(24,24,27,0.06),0_12px_28px_-14px_rgba(24,24,27,0.14)] transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6" />
      <ArticleDate
        dateTime={article.posted_date}
        decorate
        className={clsx('order-first mb-3', dateColumn && 'md:hidden')}
      />
      <h3 className="text-base font-semibold tracking-tight text-zinc-900">
        <Link
          href={`/blogs/${article.id}`}
          className="focus-visible:outline-none [&:focus-visible>span:first-child]:ring-2 [&:focus-visible>span:first-child]:ring-teal-500"
        >
          {/* Covers the whole card so any click opens the post; sits above the text layer (z-10). */}
          <span className="absolute -inset-x-4 -inset-y-5 z-20 rounded-2xl sm:-inset-x-6" />
          <span className="relative z-10">{article.title}</span>
        </Link>
      </h3>
      {article.description && (
        <p className="relative z-10 mt-2 text-sm leading-6 text-zinc-600">{article.description}</p>
      )}
      <div className="relative z-10 mt-4 flex w-full flex-wrap items-center justify-between gap-3">
        <TagList items={article.tags.map((tag) => tag.text)} max={2} label="Topics" />
        <span aria-hidden="true" className="text-sm font-medium text-teal-700">
          Read post →
        </span>
      </div>
    </div>
  </article>
);

export default ArticleCard;
