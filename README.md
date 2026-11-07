# Exsovert

Next.js 16 · TypeScript · Tailwind v4 · GSAP · Lenis · Geist / Geist Mono / Geist Pixel

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/site.ts` | **All copy**: services, products, ownership matrix, process, examples, FAQ, email |
| `src/app/globals.css` | Design tokens (white / ink / electric blue), grid + dot backgrounds, marquee, caret |
| `src/lib/gsap.ts` | GSAP registration. Always import gsap from here |
| `src/components/ui/kit.tsx` | `SectionHead`, `SlashHeading`, `Button`, `Chip`, `Logo`, `CornerDots` |
| `src/components/ui/art.tsx` | Procedural isometric line art (`IsoArt`) and pixel icons (`PixelIcon`) |
| `src/components/motion/` | `Preloader`, `Scramble`, `TypeLoop`, `Reveal` (`data-reveal`), `SmoothScroll` |
| `src/components/sections/` | One file per page section, in page order in `src/app/page.tsx` |

Everything respects `prefers-reduced-motion`.

## Deploy (Vercel)

```bash
npx vercel        # preview
npx vercel --prod
```
