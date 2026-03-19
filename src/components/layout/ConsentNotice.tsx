import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'cookie-consent';

const ConsentNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consimțământ cookie-uri"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 sm:p-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          Acest site folosește cookie-uri pentru a asigura funcționarea corectă. Poți citi mai multe în{' '}
          <Link to="/cookies" className="text-brand-gold hover:underline font-medium">Politica de cookies</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handleConsent(false)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            Refuz
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-4 py-2 text-sm bg-brand-gold text-white rounded-lg hover:bg-brand-gold-hover transition-colors font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentNotice;
