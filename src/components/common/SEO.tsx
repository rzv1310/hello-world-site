import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const SITE_URL = 'https://audit-statutar.ro';

const OG_IMAGE = `${SITE_URL}/open-graph.png`;

const SEO = ({ title, description, path, noindex }: SEOProps) => {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = path === '/'
    ? title
    : `${title} | Helenico Advisory`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large'} />
      <meta name="author" content="HELENICO ADVISORY | AUDIT STATUTAR" />
      <meta name="publisher" content="HELENICO ADVISORY" />
      <meta name="keywords" content="audit statutar" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ro" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="Helenico Advisory" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};

export default SEO;
