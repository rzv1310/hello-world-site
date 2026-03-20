import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/"><img src="/logo-helenico-advisory.webp" alt="Helenico Advisory" title="Logo Helenico Advisory | Audit Statutar" className="h-16 w-auto brightness-0 invert" loading="lazy" /></Link>
              <a href="https://www.linkedin.com/company/helenico-advisory" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-white hover:text-brand-gold transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.facebook.com/helenicoadvisory" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 text-white hover:text-brand-gold transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            <h2 className="text-sm sm:text-lg font-semibold mb-2 whitespace-nowrap"><Link to="/" className="hover:text-brand-gold transition-colors">HELENICO ADVISORY | AUDIT STATUTAR</Link></h2>
            <ul className="space-y-1 text-sm text-white/60">
              <li><a href="https://maps.app.goo.gl/FAFrwd6MW9pisSMi9" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Intrarea Horbotei 12, 030467 București</a></li>
              <li><a href="tel:+40759900800" className="hover:text-brand-gold transition-colors">+40 759 900 800</a></li>
              <li><a href="mailto:office@audit-statutar.ro" className="hover:text-brand-gold transition-colors">office@audit-statutar.ro</a></li>
              <li className="pt-1">Luni - Sâmbătă: 09:00 - 19:00</li>
              <li>Duminică: Închis</li>
            </ul>
            <div className="mt-4 rounded-lg overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.8316227754763!2d26.160541111508138!3d44.4333735209552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1feb5606f19cd%3A0xd44ed50793355!2sAnsambul%20Rezidential%20Noor%2C%20Intrarea%20Horbotei%2012%2C%20077085%20Bucure%C8%99ti!5e1!3m2!1sro!2sro!4v1773855486507!5m2!1sro!2sro" width="100%" height="180" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg" title="Locația Helenico Advisory pe Google Maps"></iframe>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">Linkuri utile</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/despre-noi" className="hover:text-brand-gold transition-colors">Despre Noi</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
              <li><a href="/#faq" className="hover:text-brand-gold transition-colors">Întrebări frecvente</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-6 text-lg">Partener / Auditor financiar</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Elena Iliuță</li>
              <li><a href="tel:+40759900800" className="hover:text-brand-gold transition-colors">+40 759 900 800</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-xs text-white/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p>&copy; {new Date().getFullYear()} Helenico Advisory. Toate drepturile rezervate.</p>
            <div className="flex gap-6 flex-wrap">
              <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni și condiții</Link>
              <Link to="/gdpr" className="hover:text-white transition-colors">GDPR</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANPC-SAL</a>
              <a href="https://consumer-redress.ec.europa.eu/index_ro" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANPC-SOL</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
