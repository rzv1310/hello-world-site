import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { risks } from '@/data/audit';

const Risks = () => {
  return (
    <section className="py-24 bg-[#faf0e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Neconformitatea poate costa mai mult decât auditul.</h2>
            <p className="text-lg text-gray-600 mb-8">
              Amânarea contractării unui auditor autorizat sau întârzierea documentației poate duce la sancțiuni severe și afectarea credibilității companiei pe termen lung.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors">
              <span className="border-b border-brand-navy hover:border-brand-gold pb-0.5">Discută cu un auditor înainte să apară blocaje</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl">
            <ul className="space-y-6">
              {risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <ShieldAlert className="h-6 w-6 text-brand-navy" />
                  </div>
                  <span className="text-gray-800 font-medium text-lg">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Risks;
