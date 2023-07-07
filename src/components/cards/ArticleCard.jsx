import { formatDateToString } from '@/util/date-helper';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import Badge from '../badge/badge';

export const ArticleCard = ({ article, withTimelineBar = false }) => {
  return (
    <>
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <div className="group relative flex flex-col items-start md:col-span-3">
          {/* Title */}
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 ">
            <ArticleCardLink href={`/blogs/${article.id}`}>
              {article.title}
            </ArticleCardLink>
          </h2>
          <div className="my-2 flex gap-1 opacity-100 transition group-hover:scale-100 group-hover:opacity-100 ">
            {article.tags.map((tag, id) => (
              <Badge key={tag.text + id} color={tag.color} text={tag.text}></Badge>
            ))}
          </div>

          <ArticleTimeline
            dateTime={new Date()}
            className={withTimelineBar ? 'md:hidden' : ''}
            decorate
          >
            {formatDateToString(article.posted_date)}
          </ArticleTimeline>
          {/* Description */}
          <p className="relative z-10 mt-2 text-sm text-zinc-600">
            {article.description}
          </p>
          <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
          >
            Read post
            <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
          </div>
        </div>
        {withTimelineBar && (
          <ArticleTimeline
            dateTime={new Date()}
            className="mt-1 hidden md:block"
          >
            {formatDateToString(article.posted_date)}
          </ArticleTimeline>
        )}
      </article>
    </>
  );
};

export const ArticleCardWithTimeline = ({ article }) => {
  return (
    <>
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <div className="group relative flex flex-col items-start md:col-span-3">
          {/* Title */}
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 ">
            <ArticleCardLink href={`/blogs/${article.id}`}>
              {article.title}
            </ArticleCardLink>
          </h2>
          <ArticleTimeline dateTime={new Date()} className="md:hidden" decorate>
            {formatDateToString(article.posted_date)}
          </ArticleTimeline>
          {/* Description */}
          <p className="relative z-10 mt-2 text-sm text-zinc-600">
            {article.description}
          </p>
          <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
          >
            Read post
            <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
          </div>
        </div>
        <ArticleTimeline dateTime={new Date()} className="mt-1 hidden md:block">
          {formatDateToString(article.posted_date)}
        </ArticleTimeline>
      </article>
    </>
  );
};

const ArticleCardLink = ({ children, ...props }) => {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

const ArticleTimeline = ({
  className,
  decorate = false,
  children,
  ...props
}) => {
  return (
    <time
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 ',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 " />
        </span>
      )}
      {children}
    </time>
  );
};
