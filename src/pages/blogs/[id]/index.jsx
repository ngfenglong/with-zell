import Badge from '@/components/badge/badge';
import Container from '@/components/container/Container';
import { formatDateToString } from '@/util/date-helper';
import { getBlocks, getPage } from '@/util/notion';
import {
  Text,
  getCategoryTags,
  renderBlock,
} from '@/util/notion-rendering-helper';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const BlogDetailPage = ({ page, blocks, dateStr }) => {
  const router = useRouter();
  const tags = getCategoryTags(page.properties);
  return (
    <Container className="mt-16 lg:mt-24">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back to blogs"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 " />
          </button>

          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800 sm:text-2xl">
                <Text text={page.properties.post.title} />
              </h1>
              <div className="my-4 flex gap-1 transition">
                {tags.map((tag, id) => (
                  <Badge
                    key={tag.text + id}
                    color={tag.color}
                    text={tag?.text}
                  ></Badge>
                ))}
              </div>

              <time
                dateTime={new Date(dateStr)}
                className="order-first flex items-center text-base text-zinc-400 "
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
                <span className="ml-3">
                  {formatDateToString(new Date(dateStr))}
                </span>
              </time>
            </header>
            <section>
              {blocks.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
              ))}
            </section>
          </article>
        </div>
      </div>
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

  const created_time = page.created_time;
  const releasedDate = page.properties?.released_date?.date?.start;
  const dateStr = releasedDate ?? created_time;

  return {
    props: {
      page,
      blocks,
      dateStr,
    },
  };
};

export default BlogDetailPage;
