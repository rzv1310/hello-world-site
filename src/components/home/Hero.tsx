import { useEffect, useState } from 'react';
import { ArrowRight, Award, Users } from 'lucide-react';
import ScrollVideoHero from '@/components/home/ScrollVideoHero';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MOBILE_QUERY = '(max-width: 767px)';

const HeroContent = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full sm:mt-[50px]">
    <div className="max-w-2xl text-left">
      <div className="flex flex-col gap-2 sm:gap-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.3] sm:leading-[1.1] mb-0 sm:mb-6">
          Audit statutar clar, riguros și adaptat companiei tale.
        </h1>
        <p className="text-lg sm:text-lg text-white mb-0 sm:mb-8 leading-[1.8] sm:leading-relaxed mt-4 sm:mt-0">
          <span className="sm:hidden">Sprijinim companiile să își îndeplinească<br />obligațiile legale, să reducă riscurile și<br />să obțină situații financiare auditate<br />cu încredere.</span>
          <span className="hidden sm:inline">Sprijinim companiile să își îndeplinească obligațiile legale, să reducă riscurile și să obțină situații financiare auditate cu încredere.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-0 sm:mb-12 justify-start items-start mt-3 sm:mt-0">
          <a href="#calculator" className="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 sm:px-8 sm:py-4 bg-brand-navy hover:bg-brand-navy-light text-white text-[18px] sm:text-lg font-serif font-medium rounded transition-colors shadow-lg hover:shadow-xl w-auto">
            Verifică eligibilitatea <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 text-sm font-medium text-white mt-3 sm:mt-0">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-white" />
            <span>15+ ani expertiză audit & advisory</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-white" />
            <span>Certificări CAFR și ASPAAS</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  // Always start `false` so the server render and the client's first render
  // match; the real viewport size is detected after hydration in the effect.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateViewport = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  const useMobileScrollHero = isMobile && !prefersReducedMotion;

  return (
    <>
      {useMobileScrollHero ? (
        <ScrollVideoHero
          videoSrc="/hero-scroll.mp4"
          fallbackSrc="/hero-mobil-audit-statutar.webp"
          fallbackAlt="Birou de audit financiar profesional"
          fallbackTitle="Birou Helenico Advisory"
          className="md:hidden"
        >
          <div className="absolute inset-0 bg-brand-navy/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A3728]/70 to-[#4A3728]/10" />
          <div className="flex h-full items-start sm:items-center pt-[140px] sm:pt-0 overflow-hidden">
            <HeroContent />
          </div>
        </ScrollVideoHero>
      ) : (
        <section className="relative min-h-screen flex items-start sm:items-center pt-[140px] sm:pt-0 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/hero-mobil-audit-statutar.webp" alt="Birou de audit financiar profesional" title="Birou Helenico Advisory" {...{ fetchpriority: "high" }} className="w-full h-full object-cover md:hidden" />
            <img src="/hero-audit-statutar.webp" alt="Echipa Helenico Advisory în ședință de audit statutar" title="birou audit statutar" {...{ fetchpriority: "high" }} className="w-full h-full object-cover hidden md:block" />
            <div className="absolute inset-0 bg-brand-navy/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A3728]/70 to-[#4A3728]/10" />
          </div>

          <HeroContent />
        </section>
      )}
      <div className="h-[50px] bg-[#faf0e6]" />
    </>
  );
};

export default Hero;
