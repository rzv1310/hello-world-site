import { Link } from 'react-router-dom';

const Urgency = () => {
  return (
    <section className="py-16 bg-white text-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif font-medium mb-3 text-brand-navy">Auditul pregătit din timp înseamnă mai puțin stres.</h3>
            <p className="text-brand-navy/80">Documentele și informațiile puse la dispoziție la timp ajută la desfășurarea eficientă a misiunii, iar întârzierile pot genera efort și costuri suplimentare.</p>
          </div>
          <Link to="/contact" className="shrink-0 px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded transition-colors">
            Programează o discuție inițială
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Urgency;
