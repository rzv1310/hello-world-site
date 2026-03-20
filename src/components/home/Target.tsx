import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { targetCards } from '@/data/audit';

const Target = () => {
  return (
    <section className="py-24 bg-[#faf0e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-12 max-w-3xl mx-auto">
          Lucrăm cel mai bine cu firme care au nevoie de claritate, conformitate și comunicare eficientă
        </h3>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {targetCards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="font-medium text-lg text-brand-navy mb-3">{card.title}</h4>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/contact" className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors">
          <span className="border-b border-brand-navy hover:border-brand-gold pb-0.5">Vezi dacă ne potrivim</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Target;
