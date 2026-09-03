# Sai Krishna Reddy — Interactive 3D Portfolio

A single-page, scroll-driven WebGL experience for a Senior Software Engineer
working on AI systems and distributed data infrastructure. One fixed
full-screen R3F canvas sits behind the page; four 3D scenes morph into one
another as HTML overlays scroll past.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| 3D | Three.js, React Three Fiber, `@react-three/drei` |
| Post-processing | `@react-three/postprocessing` — bloom, chromatic aberration, grain, vignette |
| Scroll animation | GSAP `ScrollTrigger` |
| UI motion | Framer Motion |
| Styling | Tailwind CSS (dark-only, glassmorphic) |

## The scroll architecture

The whole page shares **one camera** dollying down a single `-Z` corridor.
Each scene owns a slab of that corridor, so "zooming past the avatar into the
network" is a real translation in world space rather than a cross-fade.

| Scroll band | Section | World Z | 3D scene |
| --- | --- | --- | --- |
| 0.00 – 0.16 | Hero | 0 | Avatar + neural particle field |
| 0.16 – 0.42 | Spectrum | −42 | Supervisor → worker → endpoint agent graph |
| 0.42 – 0.67 | Capital One | −58 → −112 | Velocity-driven data tunnel |
| 0.67 – 0.93 | Teradata | −134 | Server rack, 360° rotation |
| 0.93 – 1.00 | Contact | — | Canvas fades out |

Two details make it hold together:

- **No React re-renders on scroll.** `ScrollTrigger` writes into a plain
  mutable object (`src/lib/scroll.ts`) that every `useFrame` reads. Scrolling
  never touches React state.
- **Progress is remapped, not raw.** `ScrollDriver` measures each section in
  the DOM and pins it to the timeline value its scene expects, so a section
  that renders taller than nominal (long capability lists on a narrow phone,
  a fallback font) can't drift the 3D out of sync with the copy in front of it.

## The hero avatar

The hero renders your avatar artwork **inside the canvas** as a floating glass
slab: bowed toward the camera, pointer-tracked, with a 2.5D parallax offset
between subject and background and a grade that pushes the background into the
site palette while keeping the subject warm.

Drop the artwork into `public/` as `avatar.png` (or `.jpg` / `.jpeg` /
`.webp` / `.avif`) — the first candidate that loads wins, no config needed. A
portrait crop around 4:5 with the face in the upper half is ideal.

If no `avatar.*` file is present, the scene falls back to a procedural
sculpted bust so the hero is never empty. See `public/README.md`.

## Performance and accessibility

- Device tier detection (cores / memory / pointer) picks particle counts,
  DPR caps, MSAA and post-processing quality up front, before the canvas mounts.
- `prefers-reduced-motion` is honoured, and there is a manual motion toggle in
  the nav. Reduced motion drops post-processing and freezes the drift and
  blink animations.
- WebGL is feature-detected; without it the page renders a static gradient and
  the full HTML story.
- The complete résumé content ships as crawlable, screen-reader-friendly HTML
  plus `schema.org/Person` JSON-LD, independent of the canvas.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Content

All copy, metrics and section data live in `src/lib/content.ts` — a single
source of truth shared by the 3D scenes, the HTML overlays and the structured
data. Edit that one file to update the site.
