import Link from 'next/link';
import { Fragment } from 'react';

//#region Transform Notion Article to Blog
const BlogColumns = {
  POST: 'post',
  DESCRIPTION: 'description',
  POST_IMAGE: 'post_image',
  RELEASED_DATE: 'released_date',
  PUBLIC: 'public',
  TAGS: 'tags',
};

/**
 * Transform a Notion article into a blog post
 * @param {Object} article - The article object from notion API
 * @returns {Object} The transformed blog post to display on blog page
 */
export const transformNotionArticleToPost = (article) => {
  const { id, created_time, properties } = article;
  const releasedDate = getPropertyValue(properties, BlogColumns.RELEASED_DATE);
  const date = new Date(releasedDate ?? created_time);

  return {
    id: id,
    title: getPropertyValue(properties, BlogColumns.POST),
    description: getPropertyValue(properties, BlogColumns.DESCRIPTION),
    post_image: getPropertyValue(properties, BlogColumns.POST_IMAGE),
    posted_date: date,
  };
};

/**
 *
 * @param {Object} properties  - The properties object
 * @param {string} propertyName - The property name
 * @returns {string | Array | null} The property valueor null if the property doesnt exist
 */
const getPropertyValue = (properties, propertyName) => {
  if (properties[propertyName]) {
    return extractValueFromProperty(properties[propertyName]);
  }
  return null;
};

/**
 * Extracts the value from a given Notion property based on its type
 * @param {Object} notionProperty - The Notion property
 * @returns {string|Array|string|null} The extracted value or null for unknown types
 */
const extractValueFromProperty = (notionProperty) => {
  const propertyType = notionProperty.type;
  const value = notionProperty[propertyType];

  return matchPropertyTypeToValue(propertyType, value);
};

/**
 * Matches the property type to its corresponding value extraction method
 * @param {string} propertyType - The property type
 * @param {Object} value - The value to be extracted
 * @returns {string|Array|null} The extracted value or null for unknown types
 */
const matchPropertyTypeToValue = (propertyType, value) => {
  switch (propertyType) {
    case 'date':
      return value?.start;
    case 'title':
      return value?.map((title) => title.plain_text)?.join(' ');
    case 'multi_select':
      return value?.map((select) => select.name);
    case 'checkbox':
    case 'created_time':
    case 'files':
      return value;
    case 'rich_text':
      return value[0]?.plain_text;
    default:
      return null;
  }
};
//#endregion Transform Notion Article to Blog

//#region Transform notion block for rendering
export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? 'font-bold' : '',
          code ? 'rounded-sm bg-gray-200 px-1 py-0.5 font-mono' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={text.content}
      >
        {text.link ? (
          <a className="text-blue-500 no-underline" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>;
};

export const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p className="mx-0 my-4 block">
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 className="text-3xl font-extrabold leading-none">
          <Text text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 className="my-3 text-xl font-bold">
          <Text text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 className="my-4 block text-lg font-bold">
          <Text text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return (
        <ul className="my-4 list-disc pl-10">
          {value.children.map((child) => renderBlock(child))}
        </ul>
      );
    }
    case 'numbered_list': {
      return (
        <ol className="my-4 list-decimal pl-10">
          {value.children.map((child) => renderBlock(child))}
        </ol>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input
              className=""
              type="checkbox"
              id={id}
              defaultChecked={value.checked}
            />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className="rounded-lg border border-solid border-gray-300 p-5">
          <strong className="font-bold">{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className="my-4 block">
          <img className="overflow-hidden" src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return (
        <hr
          className="border-1 mx-auto my-2 block overflow-hidden border-solid rtl:mix-blend-normal"
          key={id}
        />
      );
    case 'quote':
      return (
        <blockquote className="mx-10 my-4 block" key={id}>
          {value.rich_text[0].plain_text}
        </blockquote>
      );
    case 'code':
      return (
        <pre className="leading-2.3 my-5 overflow-auto overflow-auto rounded-lg  bg-gray-200 px-1 py-0.5">
          <code className="flex flex-wrap p-5 font-mono" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure className="my-4 block">
          <div className="px-2 py-1 no-underline">
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      const href = value.url;
      return (
        <a
          href={href}
          target="_brank"
          className="mb-2.5 block text-blue-600 no-underline"
        >
          {href}
        </a>
      );
    case 'table': {
      return (
        <table className="table-border table space-x-2 indent-0">
          <tbody className="table-row-group border-current align-middle">
            {block.children?.map((child, i) => {
              const RowElement = ({ key, children }) => {
                return value.has_column_header && i == 0 ? (
                  <th className="border-grey-200 table-cell border bg-gray-200 px-3 py-1.5 text-left text-center align-middle font-bold">
                    {children}
                  </th>
                ) : (
                  <td className="border-grey-200 border px-3 py-1.5">
                    {children}
                  </td>
                );
              };
              return (
                <tr
                  className="table-row border-current align-middle"
                  key={child.id}
                >
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case 'column_list': {
      return (
        <div className="flex">
          {block.children.map((block) => renderBlock(block))}
        </div>
      );
    }
    case 'column': {
      return (
        <div className="flex-1">
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
//#endregion Transform notion block for rendering
