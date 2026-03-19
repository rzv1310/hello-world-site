import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const currentPath = normalizePath(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (href: string) => currentPath === normalizePath(href);
  const isServicesActive = currentPath.startsWith('/servicii');
  const transition = prefersReducedMotion ? { duration: 0 } : undefined;
  const contactCtaClass = isLinkActive('/contact')
    ? 'bg-brand-navy text-white border-brand-navy'
    : 'bg-[#faf0e6] text-brand-navy border-brand-navy hover:bg-brand-navy hover:text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Link to="/" className="flex items-center md:justify-self-start">
            <img src="/logo-helenico-advisory.webp" alt="Helenico Advisory" className="h-16 -my-3 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center justify-self-center gap-8">
            {navLinks.map((link) => {
              const isDropdownLink = Boolean(link.dropdown);
              const isActive = isDropdownLink ? isServicesActive : isLinkActive(link.href);

              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {isDropdownLink ? (
                    <>
                      <button
                        className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                          isActive ? 'text-brand-gold' : 'text-gray-700 hover:text-brand-gold'
                        }`}
                      >
                        {link.name} <ChevronDown size={14} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={transition}
                            className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 py-2 overflow-hidden"
                          >
                            {link.dropdown?.map((dropLink) => {
                              const isDropActive = isLinkActive(dropLink.href);

                              return (
                                <Link
                                  key={dropLink.name}
                                  to={dropLink.href}
                                  aria-current={isDropActive ? 'page' : undefined}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isDropActive
                                      ? 'bg-brand-beige text-brand-gold'
                                      : 'text-gray-700 hover:bg-brand-beige hover:text-brand-gold'
                                  }`}
                                >
                                  {dropLink.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm font-medium transition-colors py-2 ${
                        isActive ? 'text-brand-gold' : 'text-gray-700 hover:text-brand-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 md:justify-self-end">
            <Link
              to="/contact"
              aria-current={isLinkActive('/contact') ? 'page' : undefined}
              className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 border text-sm font-medium rounded transition-colors ${contactCtaClass}`}
            >
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const isDropdownLink = Boolean(link.dropdown);
                const isActive = isDropdownLink ? isServicesActive : isLinkActive(link.href);

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
                    className="border-b border-gray-50"
                  >
                    {isDropdownLink ? (
                      <div className="py-2">
                        <div className={`text-base font-medium mb-2 ${isActive ? 'text-brand-gold' : 'text-gray-800'}`}>{link.name}</div>
                        <div className={`pl-4 flex flex-col gap-2 border-l-2 ml-2 ${isActive ? 'border-brand-gold/60' : 'border-brand-gold/20'}`}>
                          {link.dropdown?.map((dropLink, di) => {
                            const isDropActive = isLinkActive(dropLink.href);

                            return (
                              <motion.div
                                key={dropLink.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, delay: (index * 0.06) + (di * 0.04) + 0.1 }}
                              >
                                <Link
                                  to={dropLink.href}
                                  aria-current={isDropActive ? 'page' : undefined}
                                  className={`block text-sm py-1 transition-colors ${
                                    isDropActive ? 'text-brand-gold' : 'text-gray-600 hover:text-brand-gold'
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {dropLink.name}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block text-base font-medium py-2 ${
                          isActive ? 'text-brand-gold' : 'text-gray-800'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: navLinks.length * 0.06 + 0.1 }}
              >
                <Link
                  to="/contact"
                  aria-current={isLinkActive('/contact') ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mt-4 inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded transition-colors ${
                    isLinkActive('/contact')
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : 'bg-transparent border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                  }`}
                >
                  Programează o discuție
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
