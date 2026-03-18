/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronRight, ChevronLeft, CheckCircle2, ArrowRight,
  ShieldCheck, TrendingUp, Users, FileText, AlertTriangle,
  Clock, Award, Briefcase, Phone, Mail, MapPin, ChevronDown,
  BarChart3, Scale, Calculator, Search, ShieldAlert,
  FileSpreadsheet, Landmark, FolderOpen, CheckCircle
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Despre noi', href: '/despre-noi' },
    {
      name: 'Servicii',
      href: '#',
      dropdown: [
        { name: 'Audit statutar', href: '/servicii/audit-statutar' },
        { name: 'Audit financiar', href: '/servicii/audit-financiar' },
        { name: 'Due diligence', href: '/servicii/due-diligence' },
        { name: 'Consultanță financiară', href: '/servicii/consultanta-financiara' },
        { name: 'Risk & compliance', href: '/servicii/risk-compliance' }
      ]
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo-helenico-advisory.webp" alt="Helenico Advisory" className="h-16 -my-3 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors py-2">
                      {link.name} <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 py-2 overflow-hidden"
                        >
                          {link.dropdown.map(dropLink => (
                            <Link
                              key={dropLink.name}
                              to={dropLink.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-beige hover:text-brand-gold transition-colors"
                            >
                              {dropLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link to={link.href} className="text-sm font-medium text-gray-700 hover:text-brand-gold transition-colors py-2">
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white text-sm font-medium rounded transition-colors">
              Programează o discuție
            </Link>
            <button
              className="md:hidden text-brand-navy p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-gray-50">
                  {link.dropdown ? (
                    <div className="py-2">
                      <div className="text-base font-medium text-gray-800 mb-2">{link.name}</div>
                      <div className="pl-4 flex flex-col gap-2 border-l-2 border-brand-gold/20 ml-2">
                        {link.dropdown.map(dropLink => (
                          <Link
                            key={dropLink.name}
                            to={dropLink.href}
                            className="text-sm text-gray-600 py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="block text-base font-medium text-gray-800 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white text-base font-medium rounded"
              >
                Programează o discuție
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img src="/hero-mobil-audit-statutar.webp" alt="" className="w-full h-full object-cover md:hidden" />
        <img src="/hero-audit-statutar.webp" alt="" className="w-full h-full object-cover hidden md:block" />
        <div className="absolute inset-0 bg-brand-navy/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-[50px]">
        <div
          className="max-w-2xl text-left"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1] mb-6 -mt-5 sm:mt-0"
              style={{ transform: "translateZ(40px)" }}
            >
              Audit statutar clar, riguros și adaptat companiei tale.
            </h1>
            <p
              className="text-base sm:text-lg text-brand-navy mb-8 leading-relaxed"
              style={{ transform: "translateZ(30px)" }}
            >
              Sprijinim companiile să își îndeplinească obligațiile legale, să reducă riscurile și să obțină situații financiare auditate cu încredere.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-start"
              style={{ transform: "translateZ(50px)" }}
            >
              <a href="#calculator" className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded transition-colors shadow-lg hover:shadow-xl">
                Verifică eligibilitatea <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div
              className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 text-sm font-medium text-white/70"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-brand-navy" />
                <span>15+ ani expertiză audit & advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-navy" />
                <span>Certificări CAFR si ASPAAS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    { icon: MapPin, text: "Audit statutar pentru companii din România" },
    { icon: Users, text: "Suport pe parcursul întregii misiuni" },
  ];

  const items2 = [
    { icon: ShieldCheck, text: "Abordare confidențială" },
    { icon: Clock, text: "Proces structurat, cu termene definite" },
  ];

  const items3 = [
    { icon: Phone, text: "Comunicare directă cu auditorul" },
    { icon: FileText, text: "Raportare transparentă" },
  ];

  // Duplicate items to create a seamless scrolling effect
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  const duplicatedItems2 = [...items2, ...items2, ...items2, ...items2, ...items2, ...items2];
  const duplicatedItems3 = [...items3, ...items3, ...items3, ...items3, ...items3, ...items3];

  return (
    <div className="relative overflow-hidden h-[calc(26.8vw+220px)] bg-white flex items-center justify-center">
      <div className="absolute w-[150vw] flex flex-col transform -rotate-[15deg]">
        <div className="bg-brand-navy py-6 overflow-hidden flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {duplicatedItems.map((item, i) => (
              <div key={`group1-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {duplicatedItems.map((item, i) => (
              <div key={`group2-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-y border-gray-100 py-6 overflow-hidden flex">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {duplicatedItems2.map((item, i) => (
              <div key={`group3-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse whitespace-nowrap" aria-hidden="true">
            {duplicatedItems2.map((item, i) => (
              <div key={`group4-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-navy py-6 overflow-hidden flex">
          <div className="flex animate-marquee-bottom whitespace-nowrap">
            {duplicatedItems3.map((item, i) => (
              <div key={`group5-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-bottom whitespace-nowrap" aria-hidden="true">
            {duplicatedItems3.map((item, i) => (
              <div key={`group6-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Criteria = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cube rotates from 0 to -270 degrees (4 faces)
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -270]);

  return (
    <section id="criterii" className="bg-brand-beige pt-24">
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

const AuditCalculator = () => {
  const [assets, setAssets] = useState<string>('');
  const [turnover, setTurnover] = useState<string>('');
  const [employees, setEmployees] = useState<string>('');
  const [result, setResult] = useState<'none' | 'required' | 'not_required'>('none');

  const calculate = () => {
    const a = Number(assets) || 0;
    const t = Number(turnover) || 0;
    const e = Number(employees) || 0;

    let met = 0;
    if (a > 16000000) met++;
    if (t > 32000000) met++;
    if (e > 50) met++;

    setResult(met >= 2 ? 'required' : 'not_required');
  };

  return (
    <section id="calculator" className="py-12 bg-brand-beige pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-brand-beige-dark rounded-full flex items-center justify-center shrink-0">
                <Calculator className="text-brand-navy h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-brand-navy">Calculator Eligibilitate Audit</h3>
                <p className="text-gray-500 text-sm">Introduceți datele financiare pentru a verifica dacă aveți obligația legală.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Active (LEI)</label>
                <input
                  type="number"
                  value={assets}
                  onChange={(e) => setAssets(e.target.value)}
                  placeholder="ex: 18000000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cifra de Afaceri (LEI)</label>
                <input
                  type="number"
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  placeholder="ex: 35000000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Număr Mediu Salariați</label>
                <input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder="ex: 55"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full md:w-auto px-8 py-3 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded-lg transition-colors"
            >
              Calculează Rezultatul
            </button>
          </div>

          <AnimatePresence>
            {result !== 'none' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-50"
              >
                <div className="p-8 md:p-10">
                  {result === 'required' ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
                        <div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">Obligație de audit statutar detectată</h4>
                          <p className="text-gray-600">Conform datelor introduse, compania dumneavoastră îndeplinește cel puțin 2 din cele 3 criterii. Dacă această situație se menține pe parcursul a două exerciții financiare consecutive, aveți obligația legală de a contracta un auditor financiar.</p>
                        </div>
                      </div>
                      <Link to="/contact" className="shrink-0 px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-white font-medium rounded transition-colors">
                        Cere o ofertă
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-8 w-8 text-emerald-500 shrink-0 mt-1" />
                        <div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">Nu aveți obligație legală (probabil)</h4>
                          <p className="text-gray-600">Conform datelor introduse, nu depășiți pragurile legale. Totuși, un audit financiar voluntar vă poate oferi un avantaj competitiv major în relația cu băncile, investitorii sau partenerii de afaceri.</p>
                        </div>
                      </div>
                      <Link to="/contact" className="shrink-0 px-6 py-3 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-medium rounded transition-colors">
                        Discută cu noi
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Risks = () => {
  const risks = [
    "Amenzi și sancțiuni administrative",
    "Probleme de conformitate legală",
    "Suspendarea sau retragerea autorizării",
    "Pierderea încrederii partenerilor / investitorilor",
    "Riscuri suplimentare în caz de fraudă sau neglijență"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Neconformitatea poate costa mai mult decât auditul.</h2>
            <p className="text-lg text-gray-600 mb-8">
              Amânarea contractării unui auditor autorizat sau întârzierea documentației poate duce la sancțiuni severe și afectarea credibilității companiei pe termen lung.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors">
              <span className="border-b border-brand-navy hover:border-brand-gold pb-0.5">Discută cu un auditor înainte să apară blocaje</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="bg-brand-beige-dark/50 p-8 md:p-10 rounded-2xl">
            <ul className="space-y-6">
              {risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <ShieldAlert className="h-6 w-6 text-brand-navy" />
                  </div>
                  <span className="text-gray-800 font-medium text-lg">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-serif text-brand-navy mb-6">Certificări și recunoaștere</h2>
              <p className="text-lg text-gray-600 mb-8">
                Suntem membri ai principalelor organisme profesionale din România, garantând respectarea celor mai înalte standarde de etică și calitate în audit și consultanță.
              </p>
              <div className="flex gap-4">
                <div className="bg-brand-beige px-6 py-3 rounded-lg border border-brand-gold/20 font-medium tracking-wider text-brand-navy">ASPAAS</div>
                <div className="bg-brand-beige px-6 py-3 rounded-lg border border-brand-gold/20 font-medium tracking-wider text-brand-navy">CAFR</div>
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

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by approximately one card width
      const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.8 : current.offsetWidth * 0.8;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Audit statutar",
      desc: "Verificarea situațiilor financiare și asigurarea conformității legale conform standardelor.",
      icon: Scale,
      href: "/servicii/audit-statutar",
      highlight: true
    },
    {
      title: "Audit financiar",
      desc: "Audit statutar și voluntar conform standardelor locale și internaționale aplicabile.",
      icon: FileText,
      href: "/servicii/audit-financiar",
      highlight: false
    },
    {
      title: "Due diligence",
      desc: "Analiză financiară detaliată pentru decizii sigure de investiții și achiziții.",
      icon: Search,
      href: "/servicii/due-diligence",
      highlight: false
    },
    {
      title: "Consultanță financiară",
      desc: "Optimizare procese, raportare managerială și consolidarea controlului intern.",
      icon: TrendingUp,
      href: "/servicii/consultanta-financiara",
      highlight: false
    },
    {
      title: "Risk & compliance",
      desc: "Evaluarea riscurilor operaționale și financiare și asigurarea conformității.",
      icon: ShieldCheck,
      href: "/servicii/risk-compliance",
      highlight: false
    }
  ];

  return (
    <section id="servicii" className="py-24 bg-brand-beige overflow-hidden">
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
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-[5px] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide scrollbar for webkit */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

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

const Process = () => {
  const steps = [
    {
      num: "01",
      title: "Pregătirea misiunii",
      items: ["Înțelegem activitatea companiei", "Analizăm politicile contabile", "Evaluăm sistemul de control intern", "Stabilim documentele necesare"]
    },
    {
      num: "02",
      title: "Executarea auditului",
      items: ["Efectuăm testele de audit", "Verificăm documentele și tranzacțiile", "Analizăm controalele contabile", "Clarificăm punctual aspectele importante"]
    },
    {
      num: "03",
      title: "Concluzii și raport",
      items: ["Opinia auditorului", "Baza pentru opinie", "Aspecte cheie de audit", "Observații și conformitate legală"]
    }
  ];

  return (
    <section id="proces" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-6">Un proces clar, structurat și predictibil</h2>
          <p className="text-lg text-gray-600">Metodologia noastră asigură o intervenție eficientă, cu minim de perturbare a activității echipei tale financiare.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-200"></div>

          {steps.map((step, i) => (
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

const RequiredDocuments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 0 (Top)
  // 0.0 - 0.1: Pause (fully visible, opaque)
  // 0.1 - 0.4: Flip
  const rotateY0 = useTransform(scrollYProgress, [0.1, 0.4], [0, -180]);

  // Card 1 (Middle)
  // 0.1 - 0.4: Move to front
  // 0.4 - 0.5: Pause (fully visible, opaque)
  // 0.5 - 0.8: Flip
  const scale1 = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const rotateY1 = useTransform(scrollYProgress, [0.5, 0.8], [0, -180]);

  // Card 2 (Bottom)
  // 0.1 - 0.4: Move to middle
  // 0.5 - 0.8: Move to front
  // 0.8 - 1.0: Pause (fully visible, opaque)
  const scale2 = useTransform(scrollYProgress, [0.1, 0.4, 0.5, 0.8], [0.90, 0.95, 0.95, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.4, 0.5, 0.8], [40, 20, 20, 0]);

  const docs = [
    {
      title: "Documente Financiare & Contabile",
      icon: FileSpreadsheet,
      items: [
        "Balanțe de verificare lunare și anuale",
        "Registrul jurnal și cartea mare",
        "Situațiile financiare preliminare",
        "Evidența mijloacelor fixe și a amortizării"
      ],
      style: { rotateY: rotateY0, zIndex: 30, transformOrigin: "left center" }
    },
    {
      title: "Documente Juridice & Corporative",
      icon: Landmark,
      items: [
        "Actul constitutiv actualizat",
        "Hotărârile AGA și ale Consiliului de Administrație",
        "Contracte semnificative (clienți, furnizori, credite)",
        "Certificate constatatoare"
      ],
      style: { rotateY: rotateY1, scale: scale1, y: y1, zIndex: 20, transformOrigin: "left center" }
    },
    {
      title: "Documente Operaționale & HR",
      icon: FolderOpen,
      items: [
        "Organigrama companiei",
        "Statele de plată și declarațiile aferente",
        "Proceduri interne și manuale de politici contabile",
        "Rapoarte de inventariere anuale"
      ],
      style: { scale: scale2, y: y2, zIndex: 10, transformOrigin: "left center" }
    }
  ];

  return (
    <section className="bg-brand-beige-dark/30 pt-24">
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
            {docs.map((category, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col"
                style={{ ...category.style, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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

const Benefits = () => {
  const benefits = [
    "Raport transparent pentru acționari",
    "Încredere sporită pentru autorități și parteneri externi",
    "Imagine profesională consolidată",
    "Vizibilitate mai bună asupra riscurilor financiare",
    "Fundament mai bun pentru decizii de management"
  ];

  return (
    <section className="py-24 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Mai mult decât o obligație legală: un plus de credibilitate</h2>
            <p className="text-lg text-white/80 mb-8">
              Un audit statutar realizat corect transformă o cerință legală într-un instrument valoros pentru creșterea și stabilitatea afacerii tale.
            </p>
          </div>
          <div className="grid gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center gap-4">
                <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Target = () => {
  return (
    <section className="py-24 bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-12 max-w-3xl mx-auto">
          Lucrăm cel mai bine cu firme care au nevoie de claritate, conformitate și comunicare eficientă
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h4 className="font-medium text-lg text-brand-navy mb-3">Companii care depășesc pragurile legale</h4>
            <p className="text-gray-600 text-sm">Și au nevoie de un partener de încredere pentru a asigura conformitatea fără stres.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h4 className="font-medium text-lg text-brand-navy mb-3">Companii care pregătesc relația cu investitori</h4>
            <p className="text-gray-600 text-sm">Sau finanțatori, unde situațiile financiare auditate sunt o condiție obligatorie.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h4 className="font-medium text-lg text-brand-navy mb-3">Companii care vor un proces riguros, dar fluid</h4>
            <p className="text-gray-600 text-sm">Care apreciază comunicarea directă cu partenerul coordonator, fără birocrație inutilă.</p>
          </div>
        </div>

        <Link to="/contact" className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-brand-gold transition-colors">
          <span className="border-b border-brand-navy hover:border-brand-gold pb-0.5">Vezi dacă ne potrivim</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

const Urgency = () => {
  return (
    <section className="py-16 bg-brand-gold text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif font-medium mb-3">Auditul pregătit din timp înseamnă mai puțin stres.</h3>
            <p className="text-white/90">Documentele și informațiile puse la dispoziție la timp ajută la desfășurarea eficientă a misiunii, iar întârzierile pot genera efort și costuri suplimentare.</p>
          </div>
          <Link to="/contact" className="shrink-0 px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded transition-colors">
            Rezervă o discuție inițială
          </Link>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Când este obligatoriu auditul statutar?",
      a: "Auditul statutar este obligatoriu când compania depășește cel puțin două din următoarele trei criterii în două exerciții financiare consecutive: Total active > 16.000.000 lei, Cifra de afaceri netă > 32.000.000 lei, Număr mediu de salariați > 50."
    },
    {
      q: "Ce documente trebuie pregătite?",
      a: "În general, vom avea nevoie de balanțele de verificare, registrul jurnal, situațiile financiare preliminare, contracte semnificative, extrase de cont și detalii privind politicile contabile. O listă exactă va fi furnizată în etapa de pregătire a misiunii."
    },
    {
      q: "Cât durează procesul?",
      a: "Durata variază în funcție de complexitatea și dimensiunea companiei, precum și de promptitudinea furnizării documentelor. Un proces standard poate dura între 2 și 6 săptămâni de la primirea datelor complete."
    },
    {
      q: "Care este diferența dintre audit statutar și audit financiar voluntar?",
      a: "Auditul statutar este impus de lege pentru companiile care depășesc anumite praguri. Auditul voluntar este solicitat proactiv de acționari sau management pentru a crește credibilitatea financiară în fața băncilor, investitorilor sau partenerilor, urmând aceleași standarde riguroase."
    },
    {
      q: "Cum se stabilește onorariul?",
      a: "Onorariul este stabilit în funcție de volumul de activitate, complexitatea tranzacțiilor, calitatea sistemului de control intern și timpul estimat necesar echipei de audit. Se facturează de obicei în tranșe (ex: 50% la contractare, 50% la emiterea draftului)."
    },
    {
      q: "Cine va comunica direct cu noi pe parcursul misiunii?",
      a: "La Helenico Advisory, punem accent pe relația directă. Veți comunica direct cu partenerul coordonator / auditorul financiar responsabil de misiune, asigurând claritate și decizii rapide."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-navy mb-12 text-center">Întrebări frecvente despre auditul statutar</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-brand-navy pr-8">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-24 pt-32 lg:pt-40 bg-brand-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* CTA Text */}
          <div className="bg-brand-navy text-white p-10 md:p-12 rounded-2xl flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Hai să discutăm dacă firma ta are nevoie de audit statutar.</h2>
            <p className="text-lg text-white/80 mb-10">
              Într-o discuție scurtă putem clarifica obligațiile, etapele și pașii potriviți pentru compania ta. Fără obligații, doar claritate.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-brand-gold h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Sună-ne direct</div>
                  <a href="tel:0745300600" className="text-xl font-medium hover:text-brand-gold transition-colors">0745 300 600</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-brand-gold h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Trimite-ne un email</div>
                  <a href="mailto:Elena.Iliuta@gmail.com" className="text-xl font-medium hover:text-brand-gold transition-colors">Elena.Iliuta@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-serif text-brand-navy mb-6">Solicită o discuție inițială</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nume *</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Companie *</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cum te putem ajuta?</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="intent" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-600">Cred că firma mea intră în criteriile de audit</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="intent" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" />
                    <span className="text-sm text-gray-600">Am nevoie de o ofertă comercială</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="intent" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" />
                    <span className="text-sm text-gray-600">Vreau doar o discuție introductivă</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj (opțional)</label>
                <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-brand-gold hover:bg-brand-gold-hover text-white font-medium rounded-lg transition-colors mt-2">
                Trimite solicitarea
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img src="/logo-helenico-advisory.webp" alt="Helenico Advisory" className="h-16 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              Servicii de audit statutar și consultanță financiară pentru companii care urmăresc performanță sustenabilă, conformitate și decizii sigure.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-lg">Linkuri utile</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/despre-noi" className="hover:text-brand-gold transition-colors">Despre noi</Link></li>
              <li><Link to="/servicii/audit-statutar" className="hover:text-brand-gold transition-colors">Servicii</Link></li>
              <li><a href="/#criterii" className="hover:text-brand-gold transition-colors">Criterii audit</a></li>
              <li><a href="/#faq" className="hover:text-brand-gold transition-colors">Întrebări frecvente</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Elena Iliuta</li>
              <li>Partener / Auditor financiar</li>
              <li><a href="tel:0745300600" className="hover:text-brand-gold transition-colors">0745 300 600</a></li>
              <li><a href="mailto:Elena.Iliuta@gmail.com" className="hover:text-brand-gold transition-colors">Elena.Iliuta@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Helenico Advisory. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Politică de confidențialitate</a>
            <a href="#" className="hover:text-white transition-colors">Termeni și condiții</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => (
  <main>
    <Hero />
    <TrustStrip />
    <Criteria />
    <AuditCalculator />
    <Risks />
    <Services />
    <Process />
    <RequiredDocuments />
    <Benefits />
    <Target />
    <Urgency />
    <FAQ />
  </main>
);

const ServicePage = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
  <main className="pt-32 pb-24 min-h-screen bg-brand-beige flex items-center">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white p-12 md:p-16 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 mx-auto bg-brand-beige rounded-2xl flex items-center justify-center mb-8">
          <Icon className="h-10 w-10 text-brand-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-brand-navy mb-6">{title}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">{desc}</p>
        <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-medium rounded-lg transition-colors">
          Solicită o ofertă
        </Link>
      </div>
    </div>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-beige selection:bg-brand-gold selection:text-white pb-[72px] md:pb-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/servicii/audit-statutar" element={<ServicePage title="Audit statutar" desc="Verificarea situațiilor financiare și asigurarea conformității legale conform standardelor. Un proces riguros și transparent, adaptat specificului companiei tale." icon={Scale} />} />
          <Route path="/servicii/audit-financiar" element={<ServicePage title="Audit financiar" desc="Audit statutar și voluntar conform standardelor locale și internaționale aplicabile. Creștem credibilitatea financiară a companiei în fața investitorilor și partenerilor." icon={FileText} />} />
          <Route path="/servicii/due-diligence" element={<ServicePage title="Due diligence" desc="Analiză financiară detaliată pentru decizii sigure de investiții și achiziții. Identificăm riscurile ascunse și validăm ipotezele de business." icon={Search} />} />
          <Route path="/servicii/consultanta-financiara" element={<ServicePage title="Consultanță financiară" desc="Optimizare procese, raportare managerială și consolidarea controlului intern. Soluții practice pentru creșterea performanței financiare." icon={TrendingUp} />} />
          <Route path="/servicii/risk-compliance" element={<ServicePage title="Risk & compliance" desc="Evaluarea riscurilor operaționale și financiare și asigurarea conformității. Protejăm valoarea companiei prin identificarea și atenuarea proactivă a riscurilor." icon={ShieldCheck} />} />
        </Routes>
        <Footer />

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 md:hidden z-50 flex justify-center shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)]">
          <a href="tel:0745300600" className="w-full bg-brand-navy hover:bg-brand-navy-light text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <Phone size={18} />
            Sună acum
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}
