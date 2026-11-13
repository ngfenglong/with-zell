/**
 * Helpers that turn Notion API objects into plain, serialisable data
 * for the blog pages. Rendering lives in src/components/notion/.
 */

// Column names in the Notion blog database
export const BlogColumns = {
  POST: 'post',
  DESCRIPTION: 'description',
  POST_IMAGE: 'post_image',
  RELEASED_DATE: 'released_date',
  PUBLIC: 'public',
  TAGS: 'tags',
};

/** Plain text of a rich_text array. */
export const plainText = (richText = []) =>
  richText.map((t) => t.plain_text ?? '').join('');

/**
 * URL for a Notion file object. Notion-hosted files expire after ~1 hour,
 * so they go through /api/notion-image, which always redirects to a fresh URL.
 * `source` says where to look the file up again: { block } or { page, prop }.
 */
export const notionFileUrl = (file, source) => {
  if (!file) return null;
  if (file.type === 'external') return file.external?.url ?? null;
  const params = new URLSearchParams(source).toString();
  return `/api/notion-image?${params}`;
};

const getPropertyValue = (properties, propertyName) => {
  const property = properties?.[propertyName];
  if (!property) return null;
  const value = property[property.type];
  switch (property.type) {
    case 'date':
      return value?.start ?? null;
    case 'title':
    case 'rich_text':
      return plainText(value) || null;
    case 'multi_select':
      return value?.map((select) => select.name) ?? [];
    case 'checkbox':
    case 'created_time':
    case 'files':
      return value ?? null;
    default:
      return null;
  }
};

export const getCategoryTags = (properties) => {
  const tags = properties?.[BlogColumns.TAGS];
  if (!tags) return [];
  return (tags[tags.type] ?? []).map((x) => ({ text: x.name, color: x.color }));
};

export const getPostDate = (page) =>
  getPropertyValue(page.properties, BlogColumns.RELEASED_DATE) ??
  page.created_time;

export const getPostCover = (page) => {
  const files = getPropertyValue(page.properties, BlogColumns.POST_IMAGE);
  return notionFileUrl(files?.[0], { page: page.id, prop: BlogColumns.POST_IMAGE });
};

/**
 * Serialisable summary of a post for lists and page headers.
 * `posted_date` is an ISO string so it survives getStaticProps.
 */
export const transformNotionArticleToPost = (page) => ({
  id: page.id,
  title: getPropertyValue(page.properties, BlogColumns.POST) ?? 'Untitled',
  description: getPropertyValue(page.properties, BlogColumns.DESCRIPTION) ?? '',
  cover: getPostCover(page),
  posted_date: new Date(getPostDate(page)).toISOString(),
  tags: getCategoryTags(page.properties),
});

const blockText = (block) => {
  const value = block[block.type] ?? {};
  const own = plainText(value.rich_text ?? []);
  const nested = (block.children ?? value.children ?? []).map(blockText).join(' ');
  return `${own} ${nested}`;
};

/** Estimated reading time in minutes (~220 words per minute). */
export const getReadingTime = (blocks = []) => {
  const words = blocks
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};
