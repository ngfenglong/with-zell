import Container from "../../components/container/Container";
import { getBlocks, getPage } from "@/util/notion";
import { Fragment } from "react";
import { renderBlock } from "@/util/notion-rendering-helper";

const ResourcesPage = ({page, blocks, dateStr}) => {
  return (
    <>
      <Container className="pb-12 pt-16">
        <article>
          <section>
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </section>
        </article>
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  const notionSecret = process.env.NOTION_API_KEY;
  const id = process.env.RESOURCE_PAGE_ID;

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

export default ResourcesPage;
