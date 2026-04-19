# Ace Game Room Gallery

Immersive website rebuild for **Ace Game Room Gallery** — Fort Wayne, Indiana's premier pool table and game room showroom since 1992.

Live demo: https://sweet-dreams-us.github.io/AceGameroomGallery/

## Stack

- **Next.js 16** (App Router, static export for GitHub Pages)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **TypeScript**
- **localStorage** (admin demo — no backend needed)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

Outputs a fully static site to `out/`.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

The `basePath` in `next.config.ts` is set to `/AceGameroomGallery` for the project-pages URL. Update that if you fork the repo.

## Admin demo

Navigate to `/admin/login` — any credentials work. Products, inquiries, banners, testimonials, FAQs, and content are stored in `localStorage` so the demo is persistent within the user's browser without a backend.

## Design system

Dark luxury aesthetic inspired by modern boutique retail. Core tokens:

- `#0a0a0a` — primary background
- `#d4a843` — gold accent (links, CTAs, dividers)
- `#f5f1ea` — primary text
- `#a8a198` — secondary text
- ACE brand gradient — `#c0392b → #e67e22 → #d4a843`

Typography:
- **Playfair Display** — headlines (italic + bold for emphasis)
- **Inter** — body text
- **Bebas Neue** — uppercase labels

## Project structure

```
src/
  app/
    (public)/
      [category]/              — Category + product detail pages
      about, contact, faq,
      services, *-league/      — Info pages
    (admin)/
      admin/                   — localStorage-backed CRUD demo
    globals.css                — Design system + utility classes
    layout.tsx, page.tsx
  components/
    home/                      — Homepage sections
    layout/                    — Navbar, MobileMenu, Footer
    animations/                — ScrollReveal, CountUp, marquee, etc.
  lib/
    mock-data.ts               — Hardcoded product catalogue
    admin-storage.ts           — localStorage helpers
    animations.ts              — Framer Motion presets
    utils.ts                   — cn, slugify, etc.
```

---

Built with conviction. Fort Wayne, IN.
