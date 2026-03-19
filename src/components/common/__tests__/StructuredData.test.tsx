import { describe, expect, it } from 'vitest';
import { buildFAQSchema, buildOrganizationSchema, buildServiceSchema } from '@/components/common/StructuredData';

describe('StructuredData', () => {
  it('builds organization schema with stable identity and service catalog', () => {
    const data = buildOrganizationSchema();

    expect(data['@type']).toBe('LocalBusiness');
    expect(data['@id']).toBe('https://audit-statutar.ro/#organization');
    expect(data.logo.url).toBe('https://audit-statutar.ro/logo-helenico-advisory.png');
    expect(data.contactPoint[0].url).toBe('https://audit-statutar.ro/contact');
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(5);
  });

  it('builds service schema with canonical page URL and provider reference', () => {
    const data = buildServiceSchema({
      name: 'Audit statutar',
      description: 'Verificarea situațiilor financiare și asigurarea conformității legale conform standardelor.',
      path: '/servicii/audit-statutar',
    });

    expect(data['@type']).toBe('Service');
    expect(data.url).toBe('https://audit-statutar.ro/servicii/audit-statutar');
    expect(data.mainEntityOfPage).toBe('https://audit-statutar.ro/servicii/audit-statutar');
    expect(data.provider['@id']).toBe('https://audit-statutar.ro/#organization');
    expect(data.availableChannel).toHaveLength(2);
  });

  it('builds FAQ schema from the shared FAQ dataset', () => {
    const data = buildFAQSchema();

    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity.length).toBeGreaterThan(0);
  });
});
