# Portfolio site

Next.js (App Router, TypeScript, Tailwind CSS v4) with GSAP animations, exported as a static site for GitHub Pages.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to out/
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/profile.ts` | All copy: name, projects, skills, milestones, contact. Edit this to update the site. |
| `src/components/sections/` | One component per page section (Hero, Skills, Work, ...). |
| `src/components/ui/` | Shared building blocks (Container, ButtonLink, icons). |
| `src/lib/gsap.ts` | GSAP plugin registration and the reduced-motion media queries. |
| `src/app/globals.css` | Design tokens (colors, fonts, keyframes). |
| `public/images/` | Project screenshots (WebP) and illustrations. |

## Adding a project

Put a screenshot in `public/images/` (WebP, about 1600px wide) and add an entry to `projects` in `src/content/profile.ts`.

## Motion

All scroll animations run through `gsap.matchMedia()` and are skipped when the visitor prefers reduced motion. The pinned work section only pins on screens 1024px and wider.

## Deployment

`npm run build` produces a fully static site in `out/` that can be served by any static host, including GitHub Pages.
