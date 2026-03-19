import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { services } from '@/data/services';

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.8 : current.offsetWidth * 0.8;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="servicii" className="py-24 bg-[#faf0e6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">Servicii dedicate companiilor care au nevoie de control financiar și conformitate</h2>
            <p className="text-gray-600 text-lg">Soluții personalizate pentru performanță sustenabilă și decizii sigure.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors focus:outline-none"
              aria-label="Previous services"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-brand-navy/20 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors focus:outline-none"
              aria-label="Next services"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-[5px] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 no-scrollbar"
        >
          {services.map((srv, i) => (
            <Link
              key={i}
              to={srv.href}
              className={`shrink-0 w-[80vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start block p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                srv.highlight
                  ? 'bg-brand-navy text-white border-brand-navy shadow-lg'
                  : 'bg-white text-gray-800 border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <srv.icon className={`h-10 w-10 mb-6 ${srv.highlight ? 'text-brand-gold' : 'text-brand-navy'}`} />
              <h3 className={`text-xl font-serif font-medium mb-3 ${srv.highlight ? 'text-white' : 'text-brand-navy'}`}>{srv.title}</h3>
              <p className={srv.highlight ? 'text-white/80' : 'text-gray-600'}>{srv.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
