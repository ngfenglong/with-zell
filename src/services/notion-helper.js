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
}