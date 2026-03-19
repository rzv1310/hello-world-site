import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { documentCategories } from '@/data/audit';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RequiredDocuments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const prefersReducedMotion = useReducedMotion();

  // Card 0 (Top)
  const rotateY0 = useTransform(scrollYProgress, [0.1, 0.4], [0, -180]);

  // Card 1 (Middle)
  const scale1 = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const rotateY1 = useTransform(scrollYProgress, [0.5, 0.8], [0, -180]);

  // Card 2 (Bottom)
  const scale2 = useTransform(scrollYProgress, [0.1, 0.4, 0.5, 0.8], [0.90, 0.95, 0.95, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.4, 0.5, 0.8], [40, 20, 20, 0]);

  const motionStyles = [
    { rotateY: rotateY0, zIndex: 30, transformOrigin: "left center" as const },
    { rotateY: rotateY1, scale: scale1, y: y1, zIndex: 20, transformOrigin: "left center" as const },
    { scale: scale2, y: y2, zIndex: 10, transformOrigin: "left center" as const }
  ];

  if (prefersReducedMotion) {
    return (
      <section className="bg-[#faf0e6] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Documente necesare pentru auditul statutar</h2>
            <p className="text-lg text-gray-600">
              Pregătirea acestor documente în avans este esențială. O documentație bine organizată eficientizează semnificativ procesul de audit, reduce timpul de intervenție și previne blocajele.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {documentCategories.map((category, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                <div className="w-12 h-12 bg-brand-beige rounded-xl flex items-center justify-center mb-6 shrink-0">
                  <category.icon className="text-brand-gold h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-brand-navy mb-6">{category.title}</h3>
                <ul className="space-y-4 flex-1">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-right text-sm text-gray-400 font-medium">
                  {i + 1} / 3
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#faf0e6] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Documente necesare pentru auditul statutar</h2>
          <p className="text-lg text-gray-600">
            Pregătirea acestor documente în avans este esențială. O documentație bine organizată eficientizează semnificativ procesul de audit, reduce timpul de intervenție și previne blocajele.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-[-16px] md:top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-lg mx-auto h-[460px] md:h-[420px]" style={{ perspective: 1500 }}>
            {documentCategories.map((category, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col"
                style={{ ...motionStyles[i], backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <div className="w-12 h-12 bg-brand-beige rounded-xl flex items-center justify-center mb-6 shrink-0">
                  <category.icon className="text-brand-gold h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-brand-navy mb-6">{category.title}</h3>
                <ul className="space-y-4 flex-1">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-right text-sm text-gray-400 font-medium">
                  {i + 1} / 3
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;
