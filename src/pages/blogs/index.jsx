import { useState } from 'react';
import Container from '@/components/container/Container';
import PageIntro from '@/components/page-intro/PageIntro';
import Seo from '@/components/seo/Seo';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { getPublishedPosts } from '@/util/notion';
import { transformNotionArticleToPost } from '@/util/notion-rendering-helper';

const POSTS_PER_PAGE = 7;

const pageButton =
  'rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500';

const BlogPage = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          {articles.length === 0 ? (
            <p className="text-base text-zinc-600">No posts yet. Check back soon.</p>
          ) : (
            <div className="flex max-w-3xl flex-col space-y-16">
              {currentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} withTimelineBar />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-16 flex justify-center gap-2" aria-label="Pagination">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${pageButton} bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-100`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                  className={`${pageButton} ${
                    currentPage === pageNum
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${pageButton} bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-100`}
              >
                Next
              </button>
            </nav>
          )}
        </div>
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
