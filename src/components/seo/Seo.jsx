import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE } from '@/constants/site';

const toAbsolute = (src) => {
  if (!src) return null;
  return /^https?:\/\//.test(src) ? src : `${SITE.url}${src}`;
};

/**
 * Server-rendered page metadata: <title>, description, canonical URL,
 * and Open Graph / Twitter cards so shared links show a proper preview.
 */
const Seo = ({
  title,
  description = SITE.description,
  image = SITE.ogImage,
  type = 'website',
  publishedTime,
  noIndex = false,
}) => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  const url = `${SITE.url}${path === '/' ? '' : path}`;
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.author}`;
  const imageUrl = toAbsolute(image);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta
        name="twitter:card"
        content={type === 'article' && image !== SITE.ogImage ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Head>
  );
};

export default Seo;
