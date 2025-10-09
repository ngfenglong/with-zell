import { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import PageIntro from '@/components/page-intro/PageIntro';
import { getDatabase } from '@/util/notion';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { transformNotionArticleToPost } from '@/util/notion-rendering-helper';

const POSTS_PER_PAGE = 7;

const BlogPage = ({ articlesProp }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'WithZell - Tech & Life Insights';

    const mappedArticles = articlesProp
      .map((article) => transformNotionArticleToPost(article))
      .sort((a, b) => {
        return b.posted_date - a.posted_date;
      });
    setArticles(mappedArticles);
    setIsLoading(false);
  }, [articlesProp]);

  if (isLoading) {
  }

  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Tech & Life Insights: My Personal Journey"
          intro={`It serves as a testament to my ongoing learning journey in the tech sphere, where each post reflects a milestone or a lesson learned.`}
        ></PageIntro>
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                withTimelineBar={true}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-100"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    currentPage === pageNum
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-100"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const notionDatabaseId = process.env.NOTION_DATABASE;
  const notionSecret = process.env.NOTION_API_KEY;

  if (!notionDatabaseId || !notionSecret) {
    return {
      notFound: true,
    };
  }

  const filterOptions = {
    sorts: [{ property: 'created', direction: 'descending' }],
    filter: { property: 'public', checkbox: { equals: true } },
  };
  const database = await getDatabase(notionDatabaseId, filterOptions);

  return {
    props: {
      articlesProp: database ?? [],
    },
    revalidate: 1,
  };
}

export default BlogPage;
