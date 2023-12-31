import { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import PageIntro from '@/components/page-intro/PageIntro';
import { getDatabase } from '@/util/notion';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { transformNotionArticleToPost } from '@/util/notion-rendering-helper';

const BlogPage = ({ articlesProp }) => {
  const [articles, setArticles] = useState([]);
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

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Tech & Life Insights: My Personal Journey"
          intro={`It serves as a testament to my ongoing learning journey in the tech sphere, where each post reflects a milestone or a lesson learned.`}
        ></PageIntro>
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                withTimelineBar={true}
              />
            ))}
          </div>
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
