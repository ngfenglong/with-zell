import {  useState } from 'react';
import Container from '../../components/container/Container';
import { Client } from '@notionhq/client';
import PageIntro from '@/components/page-intro/PageIntro';
import ArticleCard from '@/components/cards/ArticleCard';

const BlogPage = ({ articlesProp }) => {
  const [articles, setArticles] = useState(articlesProp ?? []);
  console.log(
    'articles',
    articlesProp.map((a) => console.log(a))
  );
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Tech & Life Insights: My Personal Journey"
          intro={`It serves as a testament to my ongoing learning journey in the tech sphere, where each post reflects a milestone or a lesson learned.`}
        ></PageIntro>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const notionDatabaseId = process.env.REACT_APP_NOTION_DATABASE;
  const notionSecret = process.env.REACT_APP_NOTION_API_KEY;

  if (!notionDatabaseId || !notionSecret) {
    return {
      notFound: true,
    };
  }

  const notion = new Client({
    auth: notionSecret,
  });

  const query = await notion.databases.query({
    database_id: notionDatabaseId,
    // sort by the most recently created posts
    sorts: [{ property: 'Created', direction: 'descending' }],
    filter: { property: 'Public', checkbox: { equals: true } },
  });

  return {
    props: {
      articlesProp: query?.results ?? [],
    },
  };
}

export default BlogPage;
