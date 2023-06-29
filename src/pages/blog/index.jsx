import { useEffect } from 'react';
import Container from '../../components/container/Container';
import { Client } from '@notionhq/client';

const BlogPage = (articles) => {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <div>Blog Page</div>
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
      articles: query?.results ?? [],
    },
  };
}

export default BlogPage;
