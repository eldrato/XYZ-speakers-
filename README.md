# XYZ Aura One — Scrollytelling Site

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
A sticky, canvas-scrubbed exploded-view sequence of the XYZ Aura One
speaker, synced to five cinematic copy beats.

## Run it

```bash
npm install
npm run dev
```

(https://xyz-speakers.vercel.app/)

> This project was generated in a sandboxed environment with no network
> access, so `npm install` / `npm run build` have not been executed here —
> the code has not been machine-verified end to end. It follows standard
> Next.js 14 App Router + Tailwind + Framer Motion conventions throughout;
> run the install/build locally and it should come up clean, but do a
> normal `npm run dev` smoke test before shipping.

## Structure

```
app/
  layout.tsx        — root layout, Inter font, metadata
  page.tsx           — assembles hero, pinned sequence, story beats, CTA
  globals.css        — base tokens, grid overlay, reduced-motion handling
components/
  Navbar.tsx          — fixed glass nav, fades in on scroll
  ScrollCanvas.tsx     — canvas playback, scroll-to-frame mapping
  ExplodedFallback.tsx — SVG fallback if frames fail to load
  StoryBeat.tsx         — reusable copy-block (align / range / headline / body)
hooks/
  useImageSequence.ts   — preloads the frame sequence, exposes progress
public/sequence/
  frame_0001.jpg … frame_0300.jpg — the real "exploded jog" sequence
  README.md               — frame naming convention / swap instructions
```

## Key constants

- `TOTAL_FRAMES = 300` and `SEQUENCE_PATH = "/sequence"` — in
  `components/ScrollCanvas.tsx`.
- Scroll-beat breakpoints (`HERO_RANGE`, `ENGINEERING_RANGE`, etc.) — at the
  top of `app/page.tsx`, as named tuples rather than inline magic numbers.

## Notes on choices made while building

- The frame sequence you provided has 300 frames, not the 120 the original
  spec assumed — `TOTAL_FRAMES` and the naming in `public/sequence/` were
  adjusted to match rather than dropping 180 frames or renumbering.
- Frames are drawn "contain" (not "cover") inside the canvas, so the full
  speaker is always visible and never cropped, per the spec.
- `prefers-reduced-motion` is respected globally in `globals.css` (animation
  and transition durations collapse to ~0), so the page still functions —
  just without the eased motion — for users who've asked for less motion.
