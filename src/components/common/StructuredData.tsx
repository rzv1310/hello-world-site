import { Helmet } from 'react-helmet-async';
import { faqs } from '@/data/faq';
import { services } from '@/data/services';

const SITE_URL = 'https://audit-statutar.ro';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const LOCATION_ID = `${SITE_URL}/#location`;
const LOGO_URL = `${SITE_URL}/logo-helenico-advisory.png`;
const OG_IMAGE_URL = `${SITE_URL}/open-graph.png`;

const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Intrarea Horbotei 12',
  addressLocality: 'București',
  addressRegion: 'București',
  postalCode: '030467',
  addressCountry: 'RO',
};

const geo = {
  '@type': 'GeoCoordinates',
  latitude: 44.4333735209552,
  longitude: 26.160541111508138,
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': ORGANIZATION_ID,
  name: 'Helenico Advisory',
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  description: 'Servicii de audit statutar și financiar pentru companii. Expertiză solidă, abordare personalizată și conformitate legală.',
  image: OG_IMAGE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    caption: 'Helenico Advisory',
  },
  telephone: '+40745300600',
  email: 'office@audit-statutar.ro',
  address,
  geo,
  areaServed: {
    '@type': 'Country',
    name: 'Romania',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+40745300600',
      email: 'office@audit-statutar.ro',
      availableLanguage: 'ro-RO',
      areaServed: 'RO',
      url: `${SITE_URL}/contact`,
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/helenico-advisory',
    'https://www.facebook.com/helenicoadvisory',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicii Helenico Advisory',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      url: `${SITE_URL}${service.href}`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}${service.href}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.desc,
        url: `${SITE_URL}${service.href}`,
      },
    })),
  },
});

export const buildFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

export const OrganizationSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(buildOrganizationSchema())}
    </script>
  </Helmet>
);

export const FAQSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(buildFAQSchema())}
    </script>
  </Helmet>
);

interface ServiceSchemaProps {
  name: string;
  description: string;
  path: string;
}

export const buildServiceSchema = ({ name, description, path }: ServiceSchemaProps) => {
  const url = `${SITE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    mainEntityOfPage: url,
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    provider: {
      '@id': ORGANIZATION_ID,
      '@type': 'LocalBusiness',
      name: 'Helenico Advisory',
      url: SITE_URL,
    },
    availableChannel: [
      {
        '@type': 'ServiceChannel',
        serviceUrl: url,
        availableLanguage: 'ro-RO',
        serviceLocation: {
          '@type': 'Place',
          '@id': LOCATION_ID,
          name: 'Helenico Advisory',
          address,
          geo,
        },
      },
      {
        '@type': 'ServiceChannel',
        serviceUrl: `${SITE_URL}/contact`,
        availableLanguage: 'ro-RO',
      },
    ],
  };
};

export const ServiceSchema = ({ name, description, path }: ServiceSchemaProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(buildServiceSchema({ name, description, path }))}
      </script>
    </Helmet>
  );
};
