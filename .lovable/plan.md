

## Diagnosis

The H1 has `-mt-[65px]` but it's not visually moving up because of two competing forces:

1. **`flex items-center`** on the parent `<section>` (line 217) — this vertically centers the entire content block within the viewport. When you add negative margin to the H1, the flex container simply re-centers the whole block, canceling out the visual shift.

2. **`mt-[50px]`** on the content wrapper (line 225) — this pushes everything down by 50px.

Negative margin on the H1 only collapses space *within* the flex child, but the section's `items-center` recalculates the centering based on the new total height, so the H1 barely moves.

## Fix

Instead of using `-mt-[65px]` on the H1, adjust the vertical positioning of the **entire content container** on mobile. Two changes:

1. **Remove `-mt-[65px]`** from the H1 — it's fighting against flex centering.
2. **On the content wrapper div (line 225)**, change `mt-[50px]` to something like `mt-[-30px] sm:mt-[50px]` — this shifts the whole block upward on mobile since it operates on the flex child itself, which flex `items-center` won't override (margin on the flex child shifts it from center).

Alternatively, replace `items-center` with `items-start` on mobile and use `pt-[X]` for top padding to position the block exactly where desired: `items-start sm:items-center` on the section, plus a top padding like `pt-[25vh] sm:pt-0` on mobile.

Either approach will give reliable upward movement of the H1 area on mobile without flex centering fighting back.

