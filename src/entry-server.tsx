import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { Writable } from 'node:stream';
import App from './App';
import { legalPagesByPath } from '@/data/legal';
import { detailedServicePagesByPath } from '@/data/serviceDetails';

/** Every path that gets prerendered to its own static HTML file. */
export const routes: string[] = [
  '/',
  '/despre-noi',
  '/contact',
  ...Object.keys(legalPagesByPath),
  ...Object.keys(detailedServicePagesByPath),
];

export interface RenderResult {
  html: string;
  head: string;
}

/**
 * Server-render a single route to an HTML string plus the Helmet-managed
 * `<head>` content. Uses `renderToPipeableStream` + `onAllReady` so that
 * lazily-loaded route components are fully resolved before we read the output.
 */
export function render(url: string): Promise<RenderResult> {
  return new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    let body = '';
    let didError = false;

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          const sink = new Writable({
            write(chunk, _encoding, callback) {
              body += chunk.toString();
              callback();
            },
            final(callback) {
              callback();
              if (didError) return;
              const { helmet } = helmetContext;
              const head = helmet
                ? [
                    helmet.title.toString(),
                    helmet.meta.toString(),
                    helmet.link.toString(),
                    helmet.script.toString(),
                  ]
                    .filter(Boolean)
                    .join('\n    ')
                : '';
              resolve({ html: body, head });
            },
          });
          pipe(sink);
        },
        onError(error) {
          didError = true;
          reject(error);
        },
      },
    );
  });
}
