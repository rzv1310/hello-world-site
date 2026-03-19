import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const criteriaCards = [
  {
    icon: Calculator,
    label: "Total active",
    value: <>peste <br/><span className="text-brand-gold">16.000.000 lei</span></>,
  },
  {
    icon: TrendingUp,
    label: "Cifra de afaceri netă",
    value: <>peste <br/><span className="text-brand-gold">32.000.000 lei</span></>,
  },
  {
    icon: Users,
    label: "Număr mediu de salariați",
    value: <>peste <br/><span className="text-brand-gold">50</span></>,
  },
];

const Criteria = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -270]);

  if (prefersReducedMotion) {
    return (
      <section id="criterii" className="bg-[#faf0e6] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Când are compania ta obligația de audit statutar?</h2>
            <p className="text-lg text-gray-600">
              Conform legislației în vigoare, compania trebuie să îndeplinească cel puțin două dintre următoarele criterii la data bilanțului.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {criteriaCards.map((card, i) => (
              <div key={i} className="bg-brand-navy p-8 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-brand-gold mb-6">
                  <card.icon size={32} />
                </div>
                <div className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">{card.label}</div>
                <div className="text-3xl md:text-4xl font-serif text-white">{card.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-brand-navy text-white p-8 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <AlertTriangle className="h-12 w-12 text-brand-gold mb-4" />
            <h4 className="text-xl md:text-2xl font-serif mb-4">Atenție la praguri</h4>
            <p className="text-white/80 mb-6 text-sm md:text-base">Dacă îndeplinești cel puțin 2 din 3 criterii în două exerciții financiare consecutive, este foarte probabil să ai obligația de audit statutar.</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white bg-transparent hover:bg-white/10 text-white text-sm font-medium rounded transition-colors group">
              Asigură-te că ești în legalitate
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="criterii" className="bg-[#faf0e6] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Când are compania ta obligația de audit statutar?</h2>
          <p className="text-lg text-gray-600">
            Conform legislației în vigoare, compania trebuie să îndeplinească cel puțin două dintre următoarele criterii la data bilanțului.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-[-15px] h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-lg mx-auto h-[320px] px-[5px] md:px-0" style={{ perspective: 2000 }}>
            <motion.div
              className="w-full h-full relative"
              style={{
                transformStyle: "preserve-3d",
                rotateX: rotateX
              }}
            >
              {/* Face 0: Active (Front) */}
              <div
                className="absolute inset-0 bg-brand-navy p-8 md:p-10 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center"
                style={{ transform: "rotateX(0deg) translateZ(160px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-brand-gold mb-6">
                  <Calculator size={32} />
                </div>
                <div className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">Total active</div>
                <div className="text-3xl md:text-4xl font-serif text-white">peste <br/><span className="text-brand-gold">16.000.000 lei</span></div>
              </div>

              {/* Face 1: Cifra de afaceri (Bottom) */}
              <div
                className="absolute inset-0 bg-brand-navy p-8 md:p-10 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center"
                style={{ transform: "rotateX(90deg) translateZ(160px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-brand-gold mb-6">
                  <TrendingUp size={32} />
                </div>
                <div className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">Cifra de afaceri netă</div>
                <div className="text-3xl md:text-4xl font-serif text-white">peste <br/><span className="text-brand-gold">32.000.000 lei</span></div>
              </div>

              {/* Face 2: Salariați (Back) */}
              <div
                className="absolute inset-0 bg-brand-navy p-8 md:p-10 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center"
                style={{ transform: "rotateX(180deg) translateZ(160px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-brand-gold mb-6">
                  <Users size={32} />
                </div>
                <div className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">Număr mediu de salariați</div>
                <div className="text-3xl md:text-4xl font-serif text-white">peste <br/><span className="text-brand-gold">50</span></div>
              </div>

              {/* Face 3: Atenție la praguri (Top) */}
              <div
                className="absolute inset-0 bg-brand-navy text-white p-8 md:p-10 rounded-2xl shadow-xl border border-brand-navy flex flex-col items-center justify-center text-center"
                style={{ transform: "rotateX(270deg) translateZ(160px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <AlertTriangle className="h-12 w-12 text-brand-gold mb-4" />
                <h4 className="text-xl md:text-2xl font-serif mb-4">Atenție la praguri</h4>
                <p className="text-white/80 mb-6 text-sm md:text-base">Dacă îndeplinești cel puțin 2 din 3 criterii în două exerciții financiare consecutive, este foarte probabil să ai obligația de audit statutar.</p>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white bg-transparent hover:bg-white/10 text-white text-sm font-medium rounded transition-colors group">
                  Asigură-te că ești în legalitate
                  <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Criteria;
