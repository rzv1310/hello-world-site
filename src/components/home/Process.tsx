import { Link } from 'react-router-dom';
import { processSteps } from '@/data/audit';

const Process = () => {
  return (
    <section id="proces" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Un proces clar, structurat și predictibil</h2>
          <p className="text-lg text-gray-600">Metodologia noastră asigură o intervenție eficientă, cu minim de perturbare a activității echipei tale financiare.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-200">
            <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_2px_rgba(212,175,55,0.8)] travel-dot animate-[travelDot_8s_linear_infinite]"></div>
          </div>

          {processSteps.map((step, i) => (
            <div key={i} className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-brand-beige rounded-full flex items-center justify-center border-8 border-white shadow-sm mb-6">
                <span className="text-2xl font-serif font-bold text-brand-gold">{step.num}</span>
              </div>
              <h3 className="text-xl font-medium text-brand-navy text-center mb-6">{step.title}</h3>
              <ul className="space-y-3 bg-brand-beige-dark/30 p-6 rounded-xl">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded transition-colors">
            Solicită o discuție despre procesul aplicat companiei tale
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
