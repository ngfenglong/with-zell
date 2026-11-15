import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** Query every row of a database, following Notion's pagination. */
export const getDatabase = async (databaseId, queryOptions = {}) => {
  const results = [];
  let cursor;
  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      ...queryOptions,
    });
    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  return results;
};

/** Published posts, newest first. */
export const getPublishedPosts = (databaseId) =>
  getDatabase(databaseId, {
    sorts: [{ property: 'created', direction: 'descending' }],
    filter: { property: 'public', checkbox: { equals: true } },
  });

export const getPage = (pageId) => notion.pages.retrieve({ page_id: pageId });

export const getBlock = (blockId) =>
  notion.blocks.retrieve({ block_id: blockId });

const listAllChildren = async (blockId) => {
  const results = [];
  let cursor;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  return results;
};

const LIST_ITEM_TO_LIST = {
  bulleted_list_item: 'bulleted_list',
  numbered_list_item: 'numbered_list',
};

/**
 * Notion returns list items as siblings; wrap consecutive items of the same
 * kind in a synthetic list block so they render as one <ul>/<ol>.
 */
const groupListItems = (blocks) =>
  blocks.reduce((acc, block) => {
    const listType = LIST_ITEM_TO_LIST[block.type];
    if (!listType) {
      acc.push(block);
      return acc;
    }
    const previous = acc[acc.length - 1];
    if (previous?.type === listType) {
      previous[listType].children.push(block);
    } else {
      acc.push({
        id: `${block.id}-list`,
        type: listType,
        [listType]: { children: [block] },
      });
    }
    return acc;
  }, []);

/**
 * Fetch every block of a page (all pages of results, all nesting levels).
 * Nested children are attached as `block.children`.
 */
export const getBlocks = async (blockId) => {
  const blocks = await listAllChildren(blockId);
  const withChildren = await Promise.all(
    blocks.map(async (block) => {
      if (!block.has_children || block.type === 'child_page') return block;
      const children = await getBlocks(block.id);
      return { ...block, children };
    })
  );
  return groupListItems(withChildren);
};
