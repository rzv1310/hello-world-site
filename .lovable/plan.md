

## Animație mobil cu arce de cerc între 01→02→03

### Problema
Pe mobil, cardurile sunt stacked vertical. O linie dreaptă verticală ar fi acoperită/tăiată de carduri (care au background, padding, rounded corners).

### Soluția: SVG cu arce laterale

Folosim un **SVG absolut poziționat** vizibil doar pe mobil (`md:hidden`) care desenează arce de cerc pe partea dreaptă (sau stângă) a cardurilor, conectând cercul 01 cu 02 și 02 cu 03. Arcele ocolesc cardurile lateral.

```text
    (01)
      \
       )  ← arc de cerc pe dreapta
      /
    (02)
      \
       )  ← arc de cerc pe dreapta  
      /
    (03)
```

### Implementare

1. **SVG overlay pe mobil** (`md:hidden`) - un `<svg>` absolut poziționat peste întregul grid, cu `pointer-events-none`, care conține două curbe Bézier (`<path>`) ce conectează pozițiile cercurilor 01→02 și 02→03, arcuind pe dreapta.

2. **Punct animat pe SVG** - folosim `<circle>` cu `<animateMotion>` nativ SVG care urmează `path`-ul arcelor. Punctul va parcurge ambele arce continuu (un singur path lung 01→02→03). Auriu, cu glow filter SVG.

3. **Poziționare dinamică** - Deoarece înălțimea cardurilor variază, vom folosi un `useEffect` + `useRef` pentru a măsura pozițiile Y ale cercurilor 01/02/03 și a genera path-ul SVG dinamic.

### Modificări
- **`src/App.tsx`** (secțiunea ProcessSection):
  - Adăugare refs pe cercurile 01/02/03
  - Adăugare state pentru coordonatele Y ale cercurilor
  - `useEffect` + `ResizeObserver` pentru a calcula pozițiile
  - SVG overlay cu path curb + `animateMotion` pentru punct auriu
  - Vizibil doar pe mobil (`block md:hidden`)

Nu sunt necesare modificări în `tailwind.config.ts` — animația se face nativ în SVG cu `<animateMotion>`.

