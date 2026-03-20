import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { benefits } from '@/data/audit';

const Benefits = () => {
  return (
    <section className="py-24 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Mai mult decât o obligație legală: un plus de credibilitate</h2>
            <p className="text-lg text-white/80 mb-8">
              Obții liniște totală și claritate cu un audit statutar complet în 21 de zile, realizat conform standardelor ISA și legislației în vigoare.
            </p>
            <div className="hidden lg:block">
              <Link to="/contact" className="inline-block bg-white text-brand-navy font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors text-lg">
                Solicită o conversație fără obligații înainte să iei o decizie
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center gap-4">
                <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center lg:hidden">
          <Link to="/contact" className="inline-block bg-white text-brand-navy font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors text-lg">
            Solicită o conversație fără obligații înainte să iei o decizie
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
