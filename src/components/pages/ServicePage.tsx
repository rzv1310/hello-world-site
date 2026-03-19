import { Link, useLocation } from 'react-router-dom';
import type { ServicePageProps } from '@/types';
import SEO from '@/components/common/SEO';
import { ServiceSchema } from '@/components/common/StructuredData';

const ServicePage = ({ title, desc, icon: Icon }: ServicePageProps) => {
  const { pathname } = useLocation();
  return (
  <main id="main" className="pt-32 pb-24 min-h-screen bg-brand-beige flex items-center">
    <SEO title={title} description={desc} path={pathname} />
    <ServiceSchema name={title} description={desc} path={pathname} />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white p-12 md:p-16 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 mx-auto bg-brand-beige rounded-2xl flex items-center justify-center mb-8">
          <Icon className="h-10 w-10 text-brand-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-brand-navy mb-6">{title}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">{desc}</p>
        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded-lg transition-colors">
          Solicită o ofertă
        </Link>
      </div>
    </div>
  </main>
  );
};

export default ServicePage;
