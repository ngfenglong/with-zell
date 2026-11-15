import { getBlock, getPage } from '@/util/notion';

const ID_PATTERN = /^[0-9a-f-]{32,36}$/i;
// Only image blocks and the blog cover property can be resolved here.
const ALLOWED_PROPS = new Set(['post_image']);

const fileUrl = (file) =>
  file?.type === 'external' ? file.external?.url : file?.file?.url;

/**
 * Redirects to a fresh signed URL for a Notion-hosted image.
 *   /api/notion-image?block=<blockId>
 *   /api/notion-image?page=<pageId>&prop=<filesProperty>
 * Notion's signed URLs last ~1 hour, so the redirect is cached for 30 minutes.
 */
export default async function handler(req, res) {
  const { block, page, prop } = req.query;

  try {
    let url;
    if (typeof block === 'string' && ID_PATTERN.test(block)) {
      const result = await getBlock(block);
      if (result.type === 'image') url = fileUrl(result.image);
    } else if (typeof page === 'string' && ID_PATTERN.test(page) && ALLOWED_PROPS.has(prop)) {
      const result = await getPage(page);
      url = fileUrl(result.properties?.[prop]?.files?.[0]);
    }

    if (!url) {
      res.status(404).end();
      return;
    }

    res.setHeader('Cache-Control', 'public, s-maxage=1800, max-age=1800');
    res.redirect(302, url);
  } catch (error) {
    res.status(error?.status === 404 ? 404 : 502).end();
  }
}
