import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/common/SEO';

const NotFound = () => (
  <main id="main" className="py-24 pt-32 lg:pt-40 bg-brand-beige min-h-screen flex items-center justify-center">
    <SEO
      title="Pagina nu a fost găsită"
      description="Pagina căutată nu există sau a fost mutată."
      path="/404"
      noindex
    />
    <div className="text-center px-4">
      <h1 className="text-6xl font-serif text-brand-navy mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Pagina nu a fost găsită</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center whitespace-nowrap px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white text-lg font-serif font-medium rounded transition-colors shadow-lg hover:shadow-xl"
      >
        Înapoi la pagina principală <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  </main>
);

export default NotFound;
