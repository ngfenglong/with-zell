import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Badge from '@/components/badge/badge';
import Container from '@/components/container/Container';
import Seo from '@/components/seo/Seo';
import { NotionContent } from '@/components/notion/NotionBlocks';
import { formatDateToString } from '@/util/date-helper';
import { getBlocks, getPage, getPublishedPosts } from '@/util/notion';
import {
  BlogColumns,
  getReadingTime,
  transformNotionArticleToPost,
} from '@/util/notion-rendering-helper';
import * as ROUTES from '@/constants/routes';

// Re-fetch from Notion at most every 5 minutes. Kept well under the
// ~1 hour lifetime of Notion's signed file URLs.
const REVALIDATE_SECONDS = 300;

const BlogDetailPage = ({ post, blocks, readingTime }) => {
  return (
    <>
      <Seo
        title={post.title}
        description={post.description || undefined}
        image={post.cover ?? undefined}
        type="article"
        publishedTime={post.posted_date}
      />
      <Container className="mt-16 lg:mt-24">
        <div className="mx-auto max-w-2xl">
          <Link
            href={ROUTES.BLOGS}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500"
          >
            <ArrowLeftIcon
              className="h-4 w-4 transition group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All writing
          </Link>

          <article className="mt-10">
            <header className="flex flex-col">
              <p className="flex items-center gap-3 text-sm text-zinc-500">
                <time dateTime={post.posted_date}>
                  {formatDateToString(post.posted_date)}
                </time>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{readingTime} min read</span>
              </p>
              <h1 className="mt-4 [text-wrap:balance] text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                {post.title}
              </h1>
              {post.description && (
                <p className="mt-5 text-lg text-zinc-600">{post.description}</p>
              )}
              {post.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag.text}>
                      <Badge color={tag.color} text={tag.text} />
                    </li>
                  ))}
                </ul>
              )}
            </header>

            <NotionContent blocks={blocks} className="mt-12" />
          </article>
        </div>
      </Container>
    </>
  );
};

export const getStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE;
  if (!databaseId || !process.env.NOTION_API_KEY) {
    return { paths: [], fallback: 'blocking' };
  }
  const posts = await getPublishedPosts(databaseId);
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  if (!process.env.NOTION_API_KEY || !params?.id) {
    return { notFound: true };
  }

  try {
    const page = await getPage(params.id);
    const databaseId = process.env.NOTION_DATABASE?.replaceAll('-', '');
    const parentId = page.parent?.database_id?.replaceAll('-', '');
    const isPublished = page.properties?.[BlogColumns.PUBLIC]?.checkbox === true;

    // Only serve published posts from the blog database.
    if (!isPublished || (databaseId && parentId !== databaseId)) {
      return { notFound: true, revalidate: REVALIDATE_SECONDS };
    }

    const blocks = await getBlocks(page.id);
    return {
      props: {
        post: transformNotionArticleToPost(page),
        blocks,
        readingTime: getReadingTime(blocks),
      },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (error) {
    if (error?.status === 404 || error?.code === 'validation_error') {
      return { notFound: true, revalidate: REVALIDATE_SECONDS };
    }
    throw error;
  }
};

export default BlogDetailPage;
