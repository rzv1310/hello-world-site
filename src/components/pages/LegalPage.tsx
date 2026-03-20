import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import { legalPages } from '@/data/legal';
import type { LegalPageContent } from '@/types';

const SITE_NAME = 'audit-statutar.ro';
const COMPANY_NAME = 'Helenico Advisory';
const CONTACT_EMAIL = 'office@audit-statutar.ro';
const CONTACT_PHONE = '+40 759 900 800';
const LINK_CLASS = 'text-brand-gold hover:underline font-medium';

function renderParagraphWithSiteLinks(text: string) {
  const pattern = /(audit-statutar\.ro|Helenico Advisory|office@audit-statutar\.ro|\+40 759 900 800)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (part === SITE_NAME) {
      return (
        <Link key={`site-link-${index}`} to="/" className={LINK_CLASS}>
          {SITE_NAME}
        </Link>
      );
    }

    if (part === COMPANY_NAME) {
      return (
        <Link key={`company-link-${index}`} to="/" className={LINK_CLASS}>
          {COMPANY_NAME}
        </Link>
      );
    }

    if (part === CONTACT_EMAIL) {
      return (
        <a key={`email-link-${index}`} href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>
      );
    }

    if (part === CONTACT_PHONE) {
      return (
        <a key={`phone-link-${index}`} href="tel:+40759900800" className={LINK_CLASS}>
          {CONTACT_PHONE}
        </a>
      );
    }

    return part;
  });
}

const LegalPage = ({ title, shortTitle, path, description, intro, sections }: LegalPageContent) => {
  const relatedPages = legalPages.filter((page) => page.path !== path);

  return (
    <main id="main" className="min-h-screen bg-white">
      <SEO
        title={title}
        description={description}
        path={path}
      />

      <section className="pt-32 lg:pt-40 pb-16 bg-brand-beige border-b border-brand-beige-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-brand-gold/20 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-navy/70">
            Informații legale
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl">
            {renderParagraphWithSiteLinks(intro)}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-5">
                {section.title}
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{renderParagraphWithSiteLinks(paragraph)}</p>
                ))}
              </div>

              {section.items && (
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <li key={item} className="rounded-xl bg-brand-beige/60 px-4 py-3 text-sm text-gray-700 border border-brand-beige-dark/10">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-brand-navy text-white p-8 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Vezi și</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-serif">{shortTitle}</h2>
                <p className="mt-3 text-white/75 max-w-2xl">
                  Paginile legale sunt gândite împreună. Pentru context complet, consultați și celelalte documente de mai jos.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                Contact
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {relatedPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <h3 className="text-xl font-serif text-white">{page.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
