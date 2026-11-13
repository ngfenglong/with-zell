import clsx from 'clsx';

// Notion colour names mapped to the site palette (full class names so Tailwind keeps them).
const TEXT_COLORS = {
  gray: 'text-zinc-500',
  brown: 'text-amber-800',
  orange: 'text-orange-600',
  yellow: 'text-yellow-700',
  green: 'text-emerald-700',
  blue: 'text-sky-700',
  purple: 'text-violet-700',
  pink: 'text-pink-700',
  red: 'text-red-700',
};

const BACKGROUND_COLORS = {
  gray_background: 'bg-zinc-100',
  brown_background: 'bg-amber-100',
  orange_background: 'bg-orange-100',
  yellow_background: 'bg-yellow-100',
  green_background: 'bg-emerald-100',
  blue_background: 'bg-sky-100',
  purple_background: 'bg-violet-100',
  pink_background: 'bg-pink-100',
  red_background: 'bg-red-100',
};

export const notionColorClass = (color) => {
  if (!color || color === 'default') return null;
  if (BACKGROUND_COLORS[color]) {
    return clsx(BACKGROUND_COLORS[color], 'rounded px-1 box-decoration-clone');
  }
  return TEXT_COLORS[color] ?? null;
};

const isExternal = (href) => /^https?:\/\//.test(href);

const Segment = ({ item }) => {
  const { annotations = {}, href } = item;
  let content =
    item.type === 'equation' ? (
      <code>{item.equation.expression}</code>
    ) : (
      item.plain_text
    );

  if (annotations.code && item.type !== 'equation') content = <code>{content}</code>;
  if (annotations.bold) content = <strong>{content}</strong>;
  if (annotations.italic) content = <em>{content}</em>;
  if (annotations.strikethrough) content = <s>{content}</s>;
  if (annotations.underline) content = <u>{content}</u>;

  const colorClass = notionColorClass(annotations.color);
  if (colorClass) content = <span className={colorClass}>{content}</span>;

  if (href) {
    content = isExternal(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <a href={href}>{content}</a>
    );
  }
  return content;
};

/** Renders a Notion rich_text array: text, mentions and inline equations. */
const RichText = ({ text }) => {
  if (!text?.length) return null;
  return text.map((item, index) => <Segment key={index} item={item} />);
};

export default RichText;
