import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/common/SEO';

const About = () => {
  return (
    <main id="main" className="min-h-screen bg-white">
      <SEO
        title="Despre noi"
        description="Helenico Advisory — firmă boutique de audit financiar și consultanță. Membri CAFR și ASPAAS. Expertiză solidă, abordare personalizată."
        path="/despre-noi"
      />
      <section className="pt-32 lg:pt-48 pb-24 bg-brand-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-navy mb-4 leading-tight">
            Helenico Advisory
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-navy/80 mb-8 leading-tight">
            Expertiză solidă. Membri CAFR si ASPAAS. Soluții adaptate.
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Helenico Advisory este o firmă boutique construită pe experiență financiară solidă și pe o abordare personalizată pentru fiecare client. Nu oferim soluții de tip "bandă rulantă", ci atenție reală detaliilor care contează pentru afacerea ta.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Transformă-ți afacerea astăzi <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif text-brand-navy mb-6">Certificări și recunoaștere</h2>
              <p className="text-lg text-gray-600 mb-8">
                Suntem membri ai principalelor organisme profesionale din România, garantând respectarea celor mai înalte standarde de etică și calitate în audit și consultanță.
              </p>
              <div className="flex gap-4 items-center">
                <img src="/sigla-aspaas.webp" alt="Autoritatea pentru Supravegherea Publică a Activității de Audit Statutar (ASPAAS)" className="h-16 w-auto object-contain" loading="lazy" />
                <img src="/cafr-sigla.webp" alt="Camera Auditorilor Financiari din România (CAFR)" className="h-16 w-auto object-contain" loading="lazy" />
              </div>
            </div>

            <div className="space-y-8">
              {[
                { title: "Expertiză recunoscută", desc: "În audit financiar și consultanță pentru management." },
                { title: "Abordare personalizată", desc: "Soluții adaptate pentru fiecare companie, identificând rapid riscurile." },
                { title: "Confidențialitate și transparență", desc: "Comunicare clară și protejarea absolută a datelor financiare." },
                { title: "Suport complet", desc: "Asistență pe tot parcursul colaborării, nu doar la emiterea raportului." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-brand-beige p-2 rounded-full shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-brand-navy mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
