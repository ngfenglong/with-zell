import Image from 'next/image';
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
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
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
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return <ul>{value.children.map((child) => renderBlock(child))}</ul>;
    }
    case 'numbered_list': {
      return <ol>{value.children.map((child) => renderBlock(child))}</ol>;
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
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
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
        <div className="rounded-xl border border-current p-5">
          <strong>{value.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className="my-5 overflow-auto rounded-xl bg-gray-200 px-1 py-0.5 leading-9">
          <code className="flex flex-wrap px-5 font-mono" key={id}>
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
        <figure>
          <div className="px-1 py-0.5 no-underline">
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
        <a href={href} target="_brank" className="mb-2.5 block">
          {href}
        </a>
      );
    case 'table': {
      return (
        <table className="collapse border border-current">
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement =
                value.has_column_header && i == 0 ? 'th' : 'td';
              return (
                <tr className="flex" key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement
                        className={`border border-current px-3 py-1.5 ${
                          value.has_column_header && i == 0 ? 'bg-gray-200' : ''
                        }`}
                        key={`${cell.plain_text}-${i}`}
                      >
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
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
//#endregion Transform notion block for rendering
