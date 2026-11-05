# Exsovert

Next.js 16 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis · Three.js / React Three Fiber / Drei · GLSL · SplitType

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | **All copy** — edit text, projects, services, email here |
| `src/app/globals.css` | Design tokens (ink / paper / accent), fonts, grain |
| `src/lib/gsap.ts` | GSAP + ScrollTrigger registration — always import gsap from here |
| `src/components/motion/` | `SmoothScroll` (Lenis↔GSAP), `SplitText`, `WordScrub`, `Magnetic`, `Cursor` |
| `src/components/webgl/` | R3F hero canvas + `shaders/contours.ts` (GLSL) |
| `src/components/sections/` | Page sections |

## Motion primitives

```tsx
<SplitText as="h2" by="lines|words|chars" trigger="scroll|load" delay={0.2}>Text</SplitText>
<WordScrub>Paragraph that brightens word by word on scroll</WordScrub>
<Magnetic><a>Button</a></Magnetic>
<a data-cursor="View">…</a>          // cursor grows with a label
<section data-cursor-invert>…</section> // cursor turns ink on accent backgrounds
```

Everything respects `prefers-reduced-motion`. The WebGL canvas is lazy-loaded, client-only,
and stops rendering when scrolled off-screen.

## Project images

Add `image: "/work/northline.jpg"` to a project in `site.ts` and drop the file in `public/work/`.

## Deploy (Vercel)

```bash
npx vercel        # preview
npx vercel --prod
```
