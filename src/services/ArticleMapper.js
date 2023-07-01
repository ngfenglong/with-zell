export const MapNotionArticleToPost = (article) => {
  const { id, created_time, properties } = article;
  const date = new Date(
    getNotionProperty(properties, BLOG_COLUMNS.RELEASED_DATE) ?? created_time
  );

  return {
    id: id,
    title: getNotionProperty(properties, BLOG_COLUMNS.POST),
    description: getNotionProperty(properties, BLOG_COLUMNS.DESCRIPTION),
    post_image: getNotionProperty(properties, BLOG_COLUMNS.POST_IMAGE),
    posted_date: date,
  };
};

const getNotionProperty = (properties, propertyName) => {
  if (properties[propertyName]) {
    return getValueFromData(properties[propertyName]);
  }
  return null;
};

const getValueFromData = (notionProperty) => {
  switch (notionProperty?.type) {
    case 'date':
      return notionProperty[notionProperty.type]?.start;
    case 'title':
      return notionProperty[notionProperty.type]
        ?.map((title) => title.plain_text)
        ?.join(' ');
    case 'multi_select':
      return notionProperty[notionProperty.type]?.map((select) => select.name);
    case 'checkbox':
      return notionProperty[notionProperty.type];
    case 'created_time':
      return notionProperty[notionProperty.type];
    case 'files':
      return notionProperty[notionProperty.type];
    case 'rich_text':
      return notionProperty[notionProperty.type][0].plain_text;
    default:
      return null;
  }
};

const BLOG_COLUMNS = {
  POST: 'post',
  DESCRIPTION: 'description',
  POST_IMAGE: 'post_image',
  RELEASED_DATE: 'released_date',
  PUBLIC: 'public',
  TAGS: 'tags',
};
