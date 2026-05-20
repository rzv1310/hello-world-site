# How this website works

Marketing site for **Helenico Advisory** (audit statutar & financiar). It is a
React app that is **prerendered to static HTML at build time** — every page
ships as a real HTML file and then "comes alive" (hydrates) in the browser.

---

## Stack

| Concern        | Tool                                             |
| -------------- | ------------------------------------------------ |
| UI             | React 18 + TypeScript                            |
| Build tool     | Vite 6                                           |
| Routing        | React Router 6                                   |
| `<head>` / SEO | `react-helmet-async`                             |
| Styling        | Tailwind CSS                                     |
| Animation      | `motion`                                         |
| Icons          | `lucide-react`                                   |
| Fonts          | `@fontsource-variable` (Inter, Playfair Display) |
| Tests          | Vitest + Testing Library                         |
| Hosting        | Netlify (deployed via Netlify Drop)              |

---

## Pages & routing

Routes are declared in `src/App.tsx`:

| Path                              | Component             | Content source              |
| --------------------------------- | --------------------- | --------------------------- |
| `/`                               | `Home`                | `src/components/home/*`     |
| `/despre-noi`                     | `About`               | —                           |
| `/contact`                        | `ContactForm`         | Netlify Forms               |
| `/termeni-si-conditii`            | `LegalPage`           | `src/data/legal.ts`         |
| `/gdpr`                           | `LegalPage`           | `src/data/legal.ts`         |
| `/cookies`                        | `LegalPage`           | `src/data/legal.ts`         |
| `/servicii/audit-financiar`       | `DetailedServicePage` | `src/data/serviceDetails.ts`|
| `/servicii/due-diligence`         | `DetailedServicePage` | `src/data/serviceDetails.ts`|
| `/servicii/consultanta-financiara`| `DetailedServicePage` | `src/data/serviceDetails.ts`|
| `/servicii/risk-compliance`       | `DetailedServicePage` | `src/data/serviceDetails.ts`|
| `*` (anything else)               | `NotFound`            | prerendered as `404.html`   |

Page content lives in plain TypeScript data files under `src/data/` (`faq.ts`,
`services.ts`, `legal.ts`, `serviceDetails.ts`, `calculator.ts`,
`navigation.ts`, `audit.ts`). To change copy, edit those files — not the
components.

All page components (`About`, `ContactForm`, `LegalPage`,
`DetailedServicePage`, `NotFound`) are lazy-loaded so each route ships as its
own JS chunk.

---

## Rendering: prerendering + hydration

The site is **not** a plain single-page app and **not** a runtime server. Each
route is rendered to a finished HTML file when you build, and React then
hydrates that HTML in the browser. This gives SEO/crawler-friendly HTML and a
fast first paint, with no server to run.

Four pieces make this work:

- **`index.html`** — the HTML template. Contains `<div id="root"></div>` and an
  `<!--app-head-->` placeholder. It has **no** `<title>` or SEO `<meta>` tags;
  those are produced per page by `react-helmet-async`.

- **`src/main.tsx`** — the client entry. If `#root` already contains
  prerendered markup (production) it calls `hydrateRoot`; if `#root` is empty
  (plain `vite` dev server) it calls `createRoot`. Wraps the app in
  `BrowserRouter` + `HelmetProvider`.

- **`src/entry-server.tsx`** — the server entry. Exports `render(url)`, which
  renders a route to an HTML string + its `<head>` content using
  `renderToPipeableStream` (its `onAllReady` callback guarantees lazy route
  chunks are fully resolved before the HTML is read) inside a `StaticRouter`
  and `HelmetProvider`. Also exports the `routes` list to prerender.

- **`scripts/prerender.mjs`** — run after the builds. For each route it calls
  `render()`, injects the result into the template (`<!--app-head-->` →
  Helmet tags, `<div id="root">` → app HTML), and writes
  `dist/<route>/index.html` (and `dist/404.html`). It also writes
  `dist/_headers`.

`src/App.tsx` is intentionally router-agnostic (no `BrowserRouter` inside) so
the same component tree works under `BrowserRouter` (client) and `StaticRouter`
(prerender).

### Hydration safety

Server-rendered HTML and the client's first render must match exactly.
Anything that depends on the browser (viewport size, `prefers-reduced-motion`,
`localStorage`) must therefore **start with a fixed default and only read the
real value inside `useEffect`** — effects don't run during prerendering. See
`src/hooks/useReducedMotion.ts`, `src/components/home/Hero.tsx`, and
`src/components/layout/ConsentNotice.tsx` for the pattern. Breaking it causes
React hydration-mismatch warnings.

---

## Build pipeline

`npm run build` (or `bun run build`) runs three steps:

1. `vite build` — builds client assets + the `index.html` template into `dist/`.
2. `vite build --ssr src/entry-server.tsx --outDir dist-server` — builds the
   server `render` function into `dist-server/`.
3. `node scripts/prerender.mjs` — prerenders every route into `dist/`.

Result in `dist/`:

```
dist/
  index.html                    →  /
  despre-noi/index.html          →  /despre-noi
  contact/index.html             →  /contact
  termeni-si-conditii/index.html →  /termeni-si-conditii
  gdpr/index.html                →  /gdpr
  cookies/index.html             →  /cookies
  servicii/<slug>/index.html     →  /servicii/<slug>
  404.html                       →  any unknown URL (HTTP 404)
  _headers                       →  security + cache headers
  assets/                        →  hashed JS / CSS / fonts
  <static files copied from public/>
```

`dist-server/` is a build-only artifact (gitignored, not deployed).

The `preloadFonts` plugin in `vite.config.ts` adds `<link rel="preload">` font
tags to `dist/index.html` after the client build; it skips the SSR build pass.

---

## Deployment — Netlify Drop

The site is deployed by uploading the prebuilt folder:

1. `bun run build` (or `npm run build`)
2. Drag the **`dist`** folder onto <https://app.netlify.com/drop>

No git commit or Netlify build is required — the `dist` folder is the finished
site.

**Important:** never put a `netlify.toml` inside `dist/`. A `netlify.toml` with
a `[build]` section makes Netlify Drop try to *run a build* inside the uploaded
(source-less) folder, which fails with a missing-`package.json` error. Headers
are therefore shipped as `dist/_headers` (a headers-only format that cannot
trigger a build), generated by `scripts/prerender.mjs`.

The repo-root `netlify.toml` applies **only** to git-connected Netlify deploys
and is otherwise unused.

Because every route is a real file, Netlify serves `/<route>` →
`/<route>/index.html` directly, and unknown paths fall back to `404.html` with
a proper 404 status. No SPA redirect rule is needed.

---

## SEO & metadata

- `src/components/common/SEO.tsx` — per-page `<title>`, description, canonical,
  `hreflang`, Open Graph and Twitter tags via `react-helmet-async`. Every page
  renders a `<SEO>`.
- `src/components/common/StructuredData.tsx` — JSON-LD (`LocalBusiness`,
  `FAQPage`, `Service`) injected through Helmet.
- During prerender, all of the above is captured and written into the static
  HTML's `<head>`, so crawlers see complete metadata without running JS.

---

## Development

```bash
npm install        # or: bun install
npm run dev        # Vite dev server (plain SPA, http://localhost:8080)
npm run lint       # tsc --noEmit (type-check)
npm test           # Vitest
npm run build      # full prerendered production build → dist/
npm run preview    # serve the built dist/ locally
```

`npm run dev` runs a normal client-only SPA — prerendering only happens in
`npm run build`. In `npm run preview`, request sub-routes with a trailing slash
(e.g. `/contact/`); that is a quirk of Vite's preview server only — Netlify
resolves `/contact` correctly.

`npm run build:client` runs just step 1 (client build, no prerender) if needed.
