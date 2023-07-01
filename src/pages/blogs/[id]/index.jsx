import { Client } from '@notionhq/client';

const BlogDetailPage = ({ pageContentProps }) => {
  return <div> BlogDetailPage</div>;
};

export const getServerSideProps = async ({ params }) => {
  const notionSecret = process.env.NOTION_API_KEY;
  const pageId = params.id;

  if (!notionSecret || !pageId) {
    return {
      notFound: true,
    };
  }

  const notion = new Client({ auth: notionSecret });
  const pageContent = await notion.blocks.children.list({
    block_id: pageId,
  });


  return {
    props: {
      pageContentProps: pageContent,
    },
  };
};

export default BlogDetailPage;
