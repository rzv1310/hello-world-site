import { useState, useEffect } from 'react';



export function useReducedMotion(): boolean {
  // Always start `false` so the server render and the client's first render
  // match; the real value is read from the media query after hydration.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    setPrefersReducedMotion(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
