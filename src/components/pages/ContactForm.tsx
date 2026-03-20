import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Check } from 'lucide-react';
import SEO from '@/components/common/SEO';

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

interface TouchedFields {
  name?: boolean;
  company?: boolean;
  email?: boolean;
  phone?: boolean;
}

const validators = {
  name: (v: string) => v.length < 2 ? 'Numele trebuie să aibă cel puțin 2 caractere' : undefined,
  company: (v: string) => v.length < 2 ? 'Compania trebuie să aibă cel puțin 2 caractere' : undefined,
  email: (v: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Introduceți o adresă de email validă' : undefined,
  phone: (v: string) => {
    const digits = v.replace(/\D/g, '');
    return digits.length < 7 || digits.length > 15 ? 'Introduceți un număr de telefon valid (7-15 cifre)' : undefined;
  },
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '' });
  const [gdprChecked, setGdprChecked] = useState(false);

  const isFormValid =
    values.name.length >= 2 &&
    values.company.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
    (() => { const d = values.phone.replace(/\D/g, ''); return d.length >= 7 && d.length <= 15; })() &&
    gdprChecked;

  const validateField = (name: keyof typeof validators, value: string) => {
    const err = validators[name](value);
    setErrors(prev => ({ ...prev, [name]: err }));
    return err;
  };

  const handleBlur = (name: keyof typeof validators) => (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, e.target.value);
  };

  const handleChange = (name: keyof typeof validators) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues(prev => ({ ...prev, [name]: val }));
    if (touched[name]) validateField(name, val);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newErrors: FormErrors = {};
    for (const [key, val] of formData.entries()) {
      if (key in validators) {
        const err = validators[key as keyof typeof validators](val as string);
        if (err) newErrors[key as keyof FormErrors] = err;
      }
    }

    setTouched({ name: true, company: true, email: true, phone: true });
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitting(true);
    setError(false);

    const params = new URLSearchParams();
    for (const [key, val] of formData.entries()) {
      params.append(key, val as string);
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setError(true))
      .finally(() => setSubmitting(false));
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-2.5 rounded-lg border ${touched[field] && errors[field] ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all placeholder:text-gray-400 placeholder:text-sm focus:placeholder:text-transparent`;

  return (
    <main id="main" className="py-24 pt-32 lg:pt-40 bg-brand-beige min-h-screen">
      <SEO
        title="Contact"
        description="Contactează Helenico Advisory pentru servicii de audit statutar și financiar. Programează o discuție inițială gratuită."
        path="/contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          <div className="bg-brand-navy text-white p-10 md:p-12 rounded-2xl flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-serif mb-6">Hai să discutăm dacă firma ta are nevoie de audit.</h1>
            <p className="text-lg text-white/80 mb-10">
              Într-un call scurt putem clarifica pașii potriviți pentru compania ta. Fără obligații, doar claritate.
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
                  <a href="mailto:office@audit-statutar.ro" className="text-base md:text-xl font-medium hover:text-brand-gold transition-colors break-all">office@audit-statutar.ro</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif text-brand-navy mb-6">Solicită o discuție inițială</h2>

            {submitted ? (
              <div className="text-center py-12" aria-live="polite">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-serif text-brand-navy mb-2">Mulțumim pentru mesaj!</h4>
                <p className="text-gray-600">Te vom contacta în cel mai scurt timp.</p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="h-6 mb-1">
                      {values.name && <label htmlFor="name" className="text-sm text-gray-500">Nume</label>}
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nume *"
                      className={inputClass('name')}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      required
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    />
                    <div className="h-6 mt-1">
                      {touched.name && errors.name && <p id="name-error" className="text-xs text-red-600">{errors.name}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="h-6 mb-1">
                      {values.company && <label htmlFor="company" className="text-sm text-gray-500">Companie</label>}
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Companie *"
                      className={inputClass('company')}
                      onChange={handleChange('company')}
                      onBlur={handleBlur('company')}
                      required
                      aria-invalid={touched.company && !!errors.company}
                      aria-describedby={touched.company && errors.company ? 'company-error' : undefined}
                    />
                    <div className="h-6 mt-1">
                      {touched.company && errors.company && <p id="company-error" className="text-xs text-red-600">{errors.company}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="h-6 mb-1">
                      {values.email && <label htmlFor="email" className="text-sm text-gray-500">Email</label>}
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email *"
                      className={inputClass('email')}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      required
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    <div className="h-6 mt-1">
                      {touched.email && errors.email && <p id="email-error" className="text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <div className="h-6 mb-1">
                      {values.phone && <label htmlFor="phone" className="text-sm text-gray-500">Telefon</label>}
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      inputMode="numeric"
                      name="phone"
                      pattern="[0-9+\s]*"
                      placeholder="Telefon *"
                      className={inputClass('phone')}
                      onChange={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      required
                      aria-invalid={touched.phone && !!errors.phone}
                      aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                      onKeyDown={(e) => {
                        if (!/[0-9+\s]/.test(e.key) && !['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'].includes(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
                      }}
                    />
                    <div className="h-6 mt-1">
                      {touched.phone && errors.phone && <p id="phone-error" className="text-xs text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-3">Cum te putem ajuta?</legend>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="intent" value="Cred că firma mea intră în criteriile de audit" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" defaultChecked />
                      <span className="text-sm text-gray-600">Cred că firma mea intră în criteriile de audit</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="intent" value="Am nevoie de o ofertă comercială" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" />
                      <span className="text-sm text-gray-600">Am nevoie de o ofertă comercială</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="intent" value="Vreau doar o discuție introductivă" className="w-4 h-4 text-brand-gold focus:ring-brand-gold border-gray-300" />
                      <span className="text-sm text-gray-600">Vreau doar o discuție introductivă</span>
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj (opțional)</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all resize-none"></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" name="gdpr-consent" id="gdpr-consent" required className="hidden" checked={gdprChecked} onChange={(e) => setGdprChecked(e.target.checked)} />
                  <button type="button" onClick={() => setGdprChecked(!gdprChecked)} className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${gdprChecked ? 'bg-brand-gold border-brand-gold' : 'border-gray-300 bg-white'}`} aria-label="Consimțământ GDPR">
                    {gdprChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <label onClick={() => setGdprChecked(!gdprChecked)} className="text-sm text-gray-600 cursor-pointer">
                    De acord cu <Link to="/gdpr" className="text-brand-gold hover:underline font-medium">Politica de confidențialitate</Link>
                  </label>
                </div>

                <div aria-live="polite">
                  {error && (
                    <p className="text-red-600 text-sm">A apărut o eroare. Vă rugăm încercați din nou.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || !isFormValid}
                  className="w-full py-4 bg-brand-gold hover:enabled:bg-brand-gold-hover text-white font-medium rounded-lg transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Se trimite...' : 'Trimite solicitarea'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactForm;
