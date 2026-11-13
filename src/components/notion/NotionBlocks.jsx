import { createContext, useContext, useMemo } from 'react';
import { Paperclip } from 'lucide-react';
import clsx from 'clsx';
import RichText, { notionColorClass } from './RichText';
import CodeBlock from './CodeBlock';
import { notionFileUrl, plainText } from '@/util/notion-rendering-helper';

const HeadingIds = createContext(new Map());

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60) || 'section';

const HEADING_TYPES = ['heading_1', 'heading_2', 'heading_3'];

/**
 * Headings in document order with stable, unique anchor ids.
 * Exported so a page can build a table of contents from the same ids.
 */
export const getHeadings = (blocks = []) => {
  const used = new Map();
  const headings = [];
  const walk = (list) =>
    list.forEach((block) => {
      if (HEADING_TYPES.includes(block.type)) {
        const text = plainText(block[block.type].rich_text);
        const base = slugify(text);
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        headings.push({
          id: block.id,
          slug: count ? `${base}-${count + 1}` : base,
          text,
          level: block.type === 'heading_3' ? 3 : 2,
        });
      }
      if (block.children) walk(block.children);
    });
  walk(blocks);
  return headings;
};

const Children = ({ block }) =>
  block.children?.length ? <Blocks blocks={block.children} /> : null;

const Heading = ({ block }) => {
  const ids = useContext(HeadingIds);
  const value = block[block.type];
  const Tag = block.type === 'heading_3' ? 'h3' : 'h2';
  const slug = ids.get(block.id);

  const heading = (
    <Tag id={slug} className={clsx('group scroll-mt-24', notionColorClass(value.color))}>
      <RichText text={value.rich_text} />
      {slug && (
        <a
          href={`#${slug}`}
          className="ml-2 font-normal text-zinc-300 no-underline opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="Link to this section"
        >
          #
        </a>
      )}
    </Tag>
  );

  if (value.is_toggleable) {
    return (
      <details>
        <summary className="cursor-pointer">{heading}</summary>
        <Children block={block} />
      </details>
    );
  }
  return heading;
};

const ListItem = ({ block }) => {
  const value = block[block.type];
  return (
    <li className={notionColorClass(value.color) ?? undefined}>
      <RichText text={value.rich_text} />
      <Children block={block} />
    </li>
  );
};

const NotionImage = ({ block }) => {
  const value = block.image;
  const src = notionFileUrl(value, { block: block.id });
  const caption = plainText(value.caption);
  if (!src) return null;
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- Notion images have unknown sizes */}
      <img
        src={src}
        alt={caption}
        loading="lazy"
        decoding="async"
        className="w-full rounded-2xl bg-zinc-50 ring-1 ring-zinc-900/5"
      />
      {value.caption?.length > 0 && (
        <figcaption>
          <RichText text={value.caption} />
        </figcaption>
      )}
    </figure>
  );
};

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const LinkCard = ({ url, caption }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="not-prose my-6 block rounded-xl px-4 py-3 ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:ring-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
  >
    <span className="block text-sm font-medium text-zinc-900">{hostOf(url)}</span>
    <span className="block truncate text-sm text-zinc-500">
      {caption?.length ? plainText(caption) : url}
    </span>
  </a>
);

const youtubeEmbed = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
};

const Video = ({ block }) => {
  const value = block.video;
  const url = value.type === 'external' ? value.external.url : null;
  const embed = url && youtubeEmbed(url);
  if (embed) {
    return (
      <figure>
        <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-900">
          <iframe
            src={embed}
            title={plainText(value.caption) || 'Embedded video'}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </figure>
    );
  }
  return url ? <LinkCard url={url} caption={value.caption} /> : null;
};

const Table = ({ block }) => {
  const { has_column_header, has_row_header } = block.table;
  const rows = block.children ?? [];
  const header = has_column_header ? rows[0] : null;
  const body = has_column_header ? rows.slice(1) : rows;

  return (
    <div className="overflow-x-auto">
      <table>
        {header && (
          <thead>
            <tr>
              {header.table_row.cells.map((cell, i) => (
                <th key={i} scope="col">
                  <RichText text={cell} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row) => (
            <tr key={row.id}>
              {row.table_row.cells.map((cell, i) =>
                has_row_header && i === 0 ? (
                  <th key={i} scope="row" className="font-semibold text-zinc-900">
                    <RichText text={cell} />
                  </th>
                ) : (
                  <td key={i}>
                    <RichText text={cell} />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FileLink = ({ block }) => {
  const value = block[block.type];
  const url = value.type === 'external' ? value.external.url : value.file?.url;
  if (!url) return null;
  const name = value.name || decodeURIComponent(url.split('/').pop().split('?')[0]);
  return (
    <p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
        <Paperclip size={16} aria-hidden="true" />
        {name}
      </a>
    </p>
  );
};

const Block = ({ block }) => {
  const value = block[block.type];

  switch (block.type) {
    case 'paragraph':
      if (!value.rich_text.length) return null;
      return (
        <p className={notionColorClass(value.color) ?? undefined}>
          <RichText text={value.rich_text} />
        </p>
      );
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return <Heading block={block} />;
    case 'bulleted_list':
      return (
        <ul>
          {value.children.map((item) => (
            <ListItem key={item.id} block={item} />
          ))}
        </ul>
      );
    case 'numbered_list':
      return (
        <ol>
          {value.children.map((item) => (
            <ListItem key={item.id} block={item} />
          ))}
        </ol>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <ul>
          <ListItem block={block} />
        </ul>
      );
    case 'to_do':
      return (
        <div className="not-prose my-3 flex items-start gap-3 text-base text-zinc-600">
          <input
            type="checkbox"
            checked={value.checked}
            readOnly
            disabled
            className="mt-1.5 h-4 w-4 rounded border-zinc-300 accent-teal-600"
          />
          <span className={clsx(value.checked && 'text-zinc-400 line-through')}>
            <RichText text={value.rich_text} />
          </span>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary className="cursor-pointer font-medium text-zinc-900">
            <RichText text={value.rich_text} />
          </summary>
          <Children block={block} />
        </details>
      );
    case 'quote':
      return (
        <blockquote className={notionColorClass(value.color) ?? undefined}>
          <RichText text={value.rich_text} />
          <Children block={block} />
        </blockquote>
      );
    case 'callout':
      return (
        <aside className="not-prose my-8 flex gap-3 rounded-2xl bg-zinc-50 px-5 py-4 text-base leading-7 text-zinc-700 ring-1 ring-zinc-900/5">
          {value.icon?.type === 'emoji' && (
            <span aria-hidden="true" className="select-none">
              {value.icon.emoji}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <RichText text={value.rich_text} />
            {block.children?.length > 0 && (
              <div className="prose mt-2 max-w-none">
                <Children block={block} />
              </div>
            )}
          </div>
        </aside>
      );
    case 'code':
      return (
        <CodeBlock
          code={plainText(value.rich_text)}
          language={value.language}
          caption={plainText(value.caption)}
        />
      );
    case 'image':
      return <NotionImage block={block} />;
    case 'video':
      return <Video block={block} />;
    case 'bookmark':
    case 'embed':
    case 'link_preview':
      return value.url ? <LinkCard url={value.url} caption={value.caption} /> : null;
    case 'file':
    case 'pdf':
      return <FileLink block={block} />;
    case 'divider':
      return <hr />;
    case 'equation':
      return (
        <pre>
          <code>{value.expression}</code>
        </pre>
      );
    case 'table':
      return <Table block={block} />;
    case 'column_list':
      return (
        <div
          className="not-prose my-8 grid gap-8 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
          style={{ '--cols': block.children?.length ?? 1 }}
        >
          {block.children?.map((column) => (
            <div key={column.id} className="prose max-w-none">
              <Children block={column} />
            </div>
          ))}
        </div>
      );
    case 'column':
    case 'synced_block':
      return <Children block={block} />;
    default:
      // child_page, child_database, table_of_contents, unsupported: render nothing for readers.
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[notion] Unrendered block type: ${block.type}`);
      }
      return null;
  }
};

const Blocks = ({ blocks }) =>
  blocks.map((block) => <Block key={block.id} block={block} />);

/**
 * Renders Notion blocks as article content. Wrap in a `prose` container
 * (see NotionContent) for typography.
 */
export const NotionBlocks = ({ blocks = [] }) => {
  const headingIds = useMemo(
    () => new Map(getHeadings(blocks).map((h) => [h.id, h.slug])),
    [blocks]
  );
  return (
    <HeadingIds.Provider value={headingIds}>
      <Blocks blocks={blocks} />
    </HeadingIds.Provider>
  );
};

/** Notion content with the site's reading typography. */
export const NotionContent = ({ blocks, className }) => (
  <div className={clsx('prose', className)}>
    <NotionBlocks blocks={blocks} />
  </div>
);
