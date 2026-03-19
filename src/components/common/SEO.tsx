import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = 'https://audit-statutar.ro';

const SEO = ({ title, description, path }: SEOProps) => {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = path === '/'
    ? title
    : `${title} | Helenico Advisory`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="Helenico Advisory" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
