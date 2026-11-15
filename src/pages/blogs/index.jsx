import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { Search, X } from 'lucide-react';
import Container from '@/components/container/Container';
import PageIntro from '@/components/page-intro/PageIntro';
import Seo from '@/components/seo/Seo';
import { ArticleCard } from '@/components/cards/ArticleCard';
import YearFilter from '@/components/blog/YearFilter';
import Pagination from '@/components/blog/Pagination';
import { getYear } from '@/util/date-helper';
import { getPublishedPosts } from '@/util/notion';
import { transformNotionArticleToPost } from '@/util/notion-rendering-helper';

const POSTS_PER_PAGE = 10;

/** Every word in the query must appear in the title, description or topics. */
const matches = (article, query) => {
  const haystack = [article.title, article.description, ...article.tags.map((tag) => tag.text)]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
};

const BlogPage = ({ articles }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const query = typeof router.query.q === 'string' ? router.query.q : '';
  const year = Number(router.query.year) || null;

  const years = useMemo(() => {
    const counts = new Map();
    articles.forEach((article) => {
      const y = getYear(article.posted_date);
      counts.set(y, (counts.get(y) ?? 0) + 1);
    });
    return [...counts].map(([y, count]) => ({ year: y, count })).sort((a, b) => b.year - a.year);
  }, [articles]);

  const filtered = articles.filter(
    (article) => (!year || getYear(article.posted_date) === year) && (!query.trim() || matches(article, query))
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const page = Math.min(Math.max(Number(router.query.page) || 1, 1), totalPages);
  const visible = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const isFiltering = Boolean(year || query.trim());

  /** Update the URL (?q=&year=&page=). Changing a filter resets to page 1. */
  const updateParams = (changes) => {
    const next = { q: query, year, page, ...changes };
    if (!('page' in changes)) next.page = 1;
    const params = {};
    if (next.q) params.q = next.q;
    if (next.year) params.year = String(next.year);
    if (next.page > 1) params.page = String(next.page);
    router.replace({ pathname: router.pathname, query: params }, undefined, { shallow: true, scroll: false });
  };
  const setQuery = (value) => updateParams({ q: value });
  const clearFilters = () => updateParams({ q: '', year: null });
  const goToPage = (number) => {
    updateParams({ page: number });
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Press "/" anywhere on the page to jump to the search box.
  useEffect(() => {
    const onKeyDown = (event) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (event.key === '/' && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Seo
        title="Writing"
        description="Notes on software engineering, system design, building products and growing as a developer."
      />
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Tech & Life Insights: My Personal Journey"
          intro="It serves as a testament to my ongoing learning journey in the tech sphere, where each post reflects a milestone or a lesson learned."
        />

        {articles.length === 0 ? (
          <p className="text-base text-zinc-600">No posts yet. Check back soon.</p>
        ) : (
          <>
            <div className="max-w-xl">
              <label htmlFor="post-search" className="sr-only">
                Search posts
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  id="post-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
                  placeholder="Search posts by title or topic"
                  autoComplete="off"
                  className="w-full rounded-xl bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 shadow-[0_1px_2px_rgba(24,24,27,0.04)] ring-1 ring-zinc-900/10 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-zinc-400 transition hover:text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4">
              <YearFilter years={years} selected={year} onSelect={(value) => updateParams({ year: value })} />
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-zinc-500">
              {isFiltering
                ? `${filtered.length} of ${articles.length} posts${year ? ` from ${year}` : ''}${
                    query.trim() ? ` matching "${query.trim()}"` : ''
                  }`
                : `${articles.length} posts`}
              {totalPages > 1 && ` · page ${page} of ${totalPages}`}
            </p>

            {visible.length === 0 ? (
              <div className="mt-12">
                <p className="text-base text-zinc-600">No posts match these filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 rounded text-sm font-medium text-teal-700 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  Show all posts
                </button>
              </div>
            ) : (
              <div ref={listRef} className="mt-12 scroll-mt-24">
                <div className="md:border-l md:border-zinc-100 md:pl-6">
                  <div className="flex max-w-3xl flex-col space-y-16">
                    {visible.map((article) => (
                      <ArticleCard key={article.id} article={article} dateColumn />
                    ))}
                  </div>
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.NOTION_DATABASE;
  if (!databaseId || !process.env.NOTION_API_KEY) {
    return { notFound: true };
  }

  const posts = await getPublishedPosts(databaseId);
  const articles = posts
    .map(transformNotionArticleToPost)
    .sort((a, b) => b.posted_date.localeCompare(a.posted_date));

  return {
    props: { articles },
    revalidate: 300,
  };
}

export default BlogPage;
