import Container from '@/components/container/Container';
import { getBlocks, getPage } from '@/util/notion';
import { Text, renderBlock } from '@/util/notion-rendering-helper';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const BlogDetailPage = ({ page, blocks }) => {
  const router = useRouter();

  return (
    <Container className="mx-auto mt-16 max-w-screen-md whitespace-pre-line px-5 leading-normal sm:mt-16">
      <h1 className="text-3xl font-extrabold">
        <Text text={page.properties.post.title} />
      </h1>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <div className="lg:mt-12 md:mt-8 mt-4">
          <button
            className="flex flex-row items-center gap-2 text-gray-500 hover:text-teal-500"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon
              className="h-5 w-5 flex-shrink-0 hover:text-teal-500"
              aria-hidden="true"
            />
            <span className="align-text-top">Go back</span>
          </button>
        </div>
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
