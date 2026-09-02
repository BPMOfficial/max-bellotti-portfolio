# Max Bellotti — Engineering Portfolio

Source for [max-bellotti-portfolio.vercel.app](https://max-bellotti-portfolio.vercel.app).

A single-page portfolio covering Formula SAE suspension manufacturing, manual
machining, Siemens NX drafting, a precision-manufacturing venture, Navier's
electric hydrofoil, plasma-chamber CAD for COMSOL at the Wirz Aerospace Lab,
and pinsetter maintenance — plus coursework, a software project and contact.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind v4
- **`next/image`** handles AVIF/WebP conversion and responsive `srcset` for the
  ~60 photographs
- **No animation library.** Every animation is hand-written: canvas 2D for the
  turning pass, SVG for the mechanisms and drawing annotations, CSS transitions
  for reveals, and one raw WebGL fragment shader for the ion plume. Runtime
  dependencies are Next, React and React DOM — nothing else.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # this is what Vercel runs; it must pass
```

## Layout

```
src/app/          layout, page, global design tokens
src/lib/          content.ts — every piece of copy, caption and spec
src/components/   one file per section animation, plus shared primitives
src/hooks/        visibility gating and reduced-motion detection
public/img/       photographs, grouped by section
```

All copy lives in `src/lib/content.ts`. To change a project write-up, a photo
caption, a spec row, or the experience timeline, edit that file — the
components read from it and nothing is hard-coded in the markup.

## Animation conventions

Two rules, applied everywhere:

1. **Nothing runs off screen.** Every `requestAnimationFrame` loop is gated by
   an `IntersectionObserver` (`src/hooks/useInView.ts`), and canvases cap
   device pixel ratio at 2.
2. **`prefers-reduced-motion` is a real code path, not a disclaimer.** Each
   animated component renders one static, representative frame instead of
   looping. Test it with DevTools → Rendering → Emulate CSS
   `prefers-reduced-motion`.

## Deploying to Vercel

First time:

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `MBellotti-1/max-bellotti-portfolio`
2. Framework is auto-detected as Next.js — no environment variables, nothing to
   change
3. Deploy

After that, every push to `main` redeploys automatically.

### Adding a custom domain later

1. Buy the domain
2. Vercel → the project → **Settings → Domains → Add**
3. Vercel shows the exact DNS records; add them at the registrar
4. Update `SITE` in `src/app/layout.tsx` so Open Graph and Twitter card URLs
   point at the new domain

## Photo credit

Event photography by Formula SAE and Global Formula Racing team photographers.
Navier imagery courtesy of Navier. All other photographs and CAD by Max Bellotti.
