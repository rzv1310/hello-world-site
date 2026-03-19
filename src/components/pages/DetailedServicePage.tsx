import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { ServiceSchema } from '@/components/common/StructuredData';
import { detailedServicePages } from '@/data/serviceDetails';
import type { ServiceDetailPageContent } from '@/types';

const DetailedServicePage = ({
  path,
  title,
  desc,
  icon: Icon,
  eyebrow,
  intro,
  idealFor,
  scope,
  process,
  outcomes,
}: ServiceDetailPageContent) => {
  const relatedPages = detailedServicePages.filter((page) => page.path !== path);

  return (
    <main id="main" className="min-h-screen bg-brand-beige">
      <SEO title={title} description={desc} path={path} />
      <ServiceSchema name={title} description={desc} path={path} />

      <section className="pt-32 lg:pt-40 pb-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Înapoi la pagina principală
          </Link>

          <div className="mt-8 grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center rounded-full border border-brand-gold/20 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-navy/70">
                {eyebrow}
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy leading-tight">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-gray-700 leading-relaxed">
                {intro}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded-lg transition-colors"
                >
                  Solicită o discuție
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-medium rounded-lg transition-colors"
                >
                  Vezi pagina principală
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="w-16 h-16 bg-brand-beige rounded-2xl flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-brand-gold" />
              </div>
              <h2 className="text-2xl font-serif text-brand-navy mb-4">Ce urmărim prin acest serviciu</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {desc}
              </p>
              <div className="space-y-3">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-5">Când este relevant pentru compania ta</h2>
            <p className="text-lg text-gray-600">
              Serviciul este cel mai util în contexte în care ai nevoie de claritate, viteză de decizie și un partener care poate separa riscurile reale de zgomotul operațional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {idealFor.map((item) => (
              <div key={item} className="rounded-2xl border border-gray-100 bg-brand-beige/40 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-brand-gold/10">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-serif mb-5">Ce acoperă intervenția noastră</h2>
            <p className="text-lg text-white/75">
              Fiecare misiune este calibrată la contextul companiei, dar structura de lucru urmărește întotdeauna livrabile clare și un dialog aplicat cu managementul.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scope.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                <p className="text-white/75 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#faf0e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-5">Cum lucrăm</h2>
            <p className="text-lg text-gray-600">
              Menținem aceeași logică de lucru ca pe homepage: proces clar, predictibil și comunicare directă în punctele care contează.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-brand-beige flex items-center justify-center text-brand-gold font-serif text-xl font-bold mb-6">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-serif text-brand-navy mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded-lg transition-colors"
            >
              Discută despre contextul companiei tale
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-12 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-navy/60">Navigare internă</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-serif text-brand-navy">Explorează și celelalte servicii</h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Fiecare dintre aceste pagini are conținut propriu și un unghi diferit. Dacă ești în faza de evaluare, merită să le compari înainte de a programa o discuție.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group rounded-2xl border border-gray-100 bg-[#faf0e6] p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <page.icon className="h-10 w-10 text-brand-navy mb-6" />
                  <h3 className="text-2xl font-serif text-brand-navy mb-3">{page.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{page.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-brand-navy font-medium group-hover:text-brand-gold transition-colors">
                    Vezi pagina
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailedServicePage;
