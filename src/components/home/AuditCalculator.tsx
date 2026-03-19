import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { calculateAuditRequirement, type AuditResult } from '@/data/calculator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ValidationErrors {
  assets?: string;
  turnover?: string;
  employees?: string;
}

const formatNumber = (value: string): string => {
  const num = Number(value);
  if (!value || isNaN(num)) return value;
  return new Intl.NumberFormat('ro-RO').format(num);
};

const parseFormattedNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};

const ALLOWED_CONTROL_KEYS = [
  'Backspace',
  'Delete',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
];

const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.ctrlKey || e.metaKey || e.altKey) {
    return;
  }

  if (!/^\d$/.test(e.key) && !ALLOWED_CONTROL_KEYS.includes(e.key)) {
    e.preventDefault();
  }
};

const validateField = (name: string, value: string): string | undefined => {
  const num = Number(value);
  if (!value) return 'Câmpul este obligatoriu';
  if (isNaN(num)) return 'Introduceți o valoare numerică validă';
  if (num < 0) return 'Valoarea nu poate fi negativă';
  return undefined;
};

const AuditCalculator = () => {
  const [assets, setAssets] = useState<string>('');
  const [turnover, setTurnover] = useState<string>('');
  const [employees, setEmployees] = useState<string>('');
  const [displayAssets, setDisplayAssets] = useState<string>('');
  const [displayTurnover, setDisplayTurnover] = useState<string>('');
  const [displayEmployees, setDisplayEmployees] = useState<string>('');
  const [result, setResult] = useState<AuditResult>('none');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (
    rawSetter: (v: string) => void,
    displaySetter: (v: string) => void,
    fieldName: string,
    formatDisplay: boolean,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    rawSetter(raw);
    displaySetter(formatDisplay ? formatNumber(raw) : raw);
    if (errors[fieldName as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleBlur = (
    rawValue: string,
    displaySetter: (v: string) => void,
    formatDisplay: boolean,
  ) => () => {
    if (rawValue && formatDisplay) {
      displaySetter(formatNumber(rawValue));
    }
  };

  const handleFocus = (
    rawValue: string,
    displaySetter: (v: string) => void,
    formatDisplay: boolean,
  ) => () => {
    displaySetter(formatDisplay ? formatNumber(rawValue) : rawValue);
  };

  const calculate = () => {
    const newErrors: ValidationErrors = {
      assets: validateField('assets', assets),
      turnover: validateField('turnover', turnover),
      employees: validateField('employees', employees),
    };

    const hasErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    if (hasErrors) return;

    const a = Number(assets) || 0;
    const t = Number(turnover) || 0;
    const emp = Number(employees) || 0;

    setResult(calculateAuditRequirement(a, t, emp));
  };

  const transition = prefersReducedMotion ? { duration: 0 } : undefined;

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
                  type="text"
                  inputMode="numeric"
                  value={displayAssets}
                  onChange={handleChange(setAssets, setDisplayAssets, 'assets', true)}
                  onBlur={handleBlur(assets, setDisplayAssets, true)}
                  onFocus={handleFocus(assets, setDisplayAssets, true)}
                  onKeyDown={preventNonNumeric}
                  placeholder="ex: 18.000.000"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.assets ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all`}
                />
                {errors.assets && <p className="mt-1 text-sm text-red-600">{errors.assets}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cifra de Afaceri (LEI)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayTurnover}
                  onChange={handleChange(setTurnover, setDisplayTurnover, 'turnover', true)}
                  onBlur={handleBlur(turnover, setDisplayTurnover, true)}
                  onFocus={handleFocus(turnover, setDisplayTurnover, true)}
                  onKeyDown={preventNonNumeric}
                  placeholder="ex: 35.000.000"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.turnover ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all`}
                />
                {errors.turnover && <p className="mt-1 text-sm text-red-600">{errors.turnover}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Număr Mediu Salariați</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayEmployees}
                  onChange={handleChange(setEmployees, setDisplayEmployees, 'employees', false)}
                  onBlur={handleBlur(employees, setDisplayEmployees, false)}
                  onFocus={handleFocus(employees, setDisplayEmployees, false)}
                  onKeyDown={preventNonNumeric}
                  placeholder="ex: 55"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.employees ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all`}
                />
                {errors.employees && <p className="mt-1 text-sm text-red-600">{errors.employees}</p>}
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
                transition={transition}
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

export default AuditCalculator;
