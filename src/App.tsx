import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ConsentNotice from '@/components/layout/ConsentNotice';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Home from '@/components/pages/Home';
import { legalPagesByPath } from '@/data/legal';
import { detailedServicePagesByPath } from '@/data/serviceDetails';

const About = React.lazy(() => import('@/components/pages/About'));
const ContactForm = React.lazy(() => import('@/components/pages/ContactForm'));
const DetailedServicePage = React.lazy(() => import('@/components/pages/DetailedServicePage'));
const LegalPage = React.lazy(() => import('@/components/pages/LegalPage'));
const NotFound = React.lazy(() => import('@/components/pages/NotFound'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-beige">
    <div className="w-8 h-8 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="relative min-h-screen bg-brand-beige selection:bg-brand-gold selection:text-white">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-navy focus:text-white focus:rounded focus:text-sm focus:font-medium">Salt la conținut</a>
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/despre-noi" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/termeni-si-conditii" element={<LegalPage {...legalPagesByPath['/termeni-si-conditii']} />} />
              <Route path="/gdpr" element={<LegalPage {...legalPagesByPath['/gdpr']} />} />
              <Route path="/cookies" element={<LegalPage {...legalPagesByPath['/cookies']} />} />
              <Route path="/servicii/audit-financiar" element={<DetailedServicePage {...detailedServicePagesByPath['/servicii/audit-financiar']} />} />
              <Route path="/servicii/due-diligence" element={<DetailedServicePage {...detailedServicePagesByPath['/servicii/due-diligence']} />} />
              <Route path="/servicii/consultanta-financiara" element={<DetailedServicePage {...detailedServicePagesByPath['/servicii/consultanta-financiara']} />} />
              <Route path="/servicii/risk-compliance" element={<DetailedServicePage {...detailedServicePagesByPath['/servicii/risk-compliance']} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
        <WhatsAppButton />
        <ConsentNotice />
      </div>
    </BrowserRouter>
  );
}
