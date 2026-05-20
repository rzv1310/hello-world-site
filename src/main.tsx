import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Pages are prerendered to static HTML at build time, so the container already
// holds server-rendered markup in production — hydrate it. In dev (plain SPA)
// the container is empty, so mount a fresh root instead.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
