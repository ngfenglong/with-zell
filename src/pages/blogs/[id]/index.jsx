import Container from '@/components/container/Container';
import { getBlocks, getPage } from '@/util/notion';
import { Text, renderBlock } from '@/util/notion-rendering-helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const BlogDetailPage = ({ page, blocks }) => {
  const router = useRouter();

  return (
    <Container className="mt-16 sm:mt-32">
      <h1 className="text-5xl">
        <Text text={page.properties.post.title} />
      </h1>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <button
          onClick={() => {
            router.back();
          }}
        >
          ← Go home
        </button>
      </section>
    </Container>
  );
};

export const getServerSideProps = async ({ params }) => {
  const notionSecret = process.env.NOTION_API_KEY;
  const id = params.id;

  if (!notionSecret || !id) {
    return {
      notFound: true,
    };
  }

  const page = await getPage(id);
  const blocks = await getBlocks(id);

  return {
    props: {
      page,
      blocks,
    },
  };
};

export default BlogDetailPage;
