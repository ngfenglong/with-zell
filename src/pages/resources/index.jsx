import Container from '@/components/container/Container';
import Seo from '@/components/seo/Seo';
import { NotionContent } from '@/components/notion/NotionBlocks';
import { getBlocks } from '@/util/notion';

const ResourcesPage = ({ blocks }) => {
  return (
    <>
      <Seo
        title="Resources"
        description="A personal collection of courses, books and tools from Zell's software engineering journey."
      />
      <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="[text-wrap:balance] text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Resources
          </h1>
          <p className="mt-4 text-base text-zinc-600">
            A personal collection from my software engineering exploration.
          </p>
        </header>
        <NotionContent blocks={blocks} className="mt-12 max-w-2xl" />
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const pageId = process.env.RESOURCE_PAGE_ID;
  if (!process.env.NOTION_API_KEY || !pageId) {
    return { notFound: true };
  }

  const blocks = await getBlocks(pageId);
  return {
    props: { blocks },
    revalidate: 300,
  };
};

export default ResourcesPage;
