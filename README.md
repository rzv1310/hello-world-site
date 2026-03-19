# audit-statutar.ro

Marketing site for Helenico Advisory, built with React, TypeScript, Vite, Tailwind CSS, and `react-router-dom`.

The app is a client-rendered SPA with lazy-loaded route pages, reusable SEO helpers, Netlify form handling, and a small Vitest + Testing Library suite.

## Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS
- `motion` for animation
- `react-helmet-async` for SEO metadata
- `react-router-dom` for routing
- Vitest + Testing Library for tests

## Local Development

Prerequisites:

- Node.js 18+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Vite is configured to run on `http://localhost:8080`.

## Available Scripts

```bash
npm run dev        # start local dev server
npm run build      # production build to dist/
npm run build:dev  # development-mode build
npm run preview    # preview the production build
npm run lint       # TypeScript typecheck (tsc --noEmit)
npm test           # run Vitest in watch mode
npm test -- --run  # run tests once
```

## Project Structure

```text
src/
  components/
    common/        # SEO and structured data helpers
    home/          # homepage sections
    layout/        # navbar, footer, scroll handling, floating CTA
    pages/         # route-level page components
  data/            # navigation, services, FAQ, audit, calculator content
  hooks/           # shared hooks such as reduced-motion handling
  test/            # Vitest setup
  types/           # shared TypeScript types
```

Important entry points:

- `src/main.tsx`: app bootstrap and `HelmetProvider`
- `src/App.tsx`: router shell and lazy-loaded routes
- `src/components/pages/Home.tsx`: homepage composition
- `src/components/common/SEO.tsx`: reusable page metadata
- `src/components/common/StructuredData.tsx`: JSON-LD schemas

## Routes

Configured routes:

- `/`
- `/despre-noi`
- `/contact`
- `/servicii/audit-statutar`
- `/servicii/audit-financiar`
- `/servicii/due-diligence`
- `/servicii/consultanta-financiara`
- `/servicii/risk-compliance`

`public/_redirects` and `netlify.toml` are both set up so SPA routes resolve correctly on Netlify.

## SEO and Content

The site includes:

- canonical URLs
- route-level `<title>` and meta descriptions
- Open Graph basics
- LocalBusiness, FAQPage, and Service JSON-LD schemas
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`

Most reusable content now lives in `src/data/`.

## Forms

The contact page uses a Netlify-compatible HTML form:

- hidden detection form in `index.html`
- `data-netlify="true"` form in `src/components/pages/ContactForm.tsx`
- client-side validation for name, company, email, and phone

If you change the form fields, update both the hidden form in `index.html` and the rendered form component so Netlify continues to detect submissions correctly.

## Accessibility and Motion

The refactor added:

- `prefers-reduced-motion` handling in CSS and React
- reduced-motion fallbacks for animated homepage sections
- improved image alt text
- title/label improvements for interactive elements

## Testing

Tests are configured in `vite.config.ts` with `jsdom` and setup from `src/test/setup.ts`.

Current coverage in the repo focuses on the audit calculator:

- calculator requirement logic
- calculator UI integration
- validation behavior

Run once:

```bash
npm test -- --run
```

## Deployment

Netlify is the intended deployment target.

Build settings:

- build command: `npm run build`
- publish directory: `dist`

Relevant files:

- `netlify.toml`
- `public/_redirects`

## Asset Notes

- Public static assets live under `public/`
- certification logos imported by React live under `src/assets/`
- route metadata currently references `/open-graph.png`; add that file under `public/` if you want social previews to resolve cleanly

## Maintenance Notes

- Keep shared copy in `src/data/` instead of hardcoding duplicate strings across components
- Prefer updating shared types in `src/types/index.ts` when changing component contracts
- Keep route metadata aligned with page paths when adding new pages
- If you add new tests, follow the existing Vitest + Testing Library setup instead of introducing a second test runner
