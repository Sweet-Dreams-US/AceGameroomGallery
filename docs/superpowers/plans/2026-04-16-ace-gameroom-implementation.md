# Ace Game Room Gallery — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an immersive, animation-rich game room website for Ace Game Room Gallery with admin dashboard, product management, and a signature pool-break loading animation.

**Architecture:** Next.js 15 App Router with Supabase for database/auth/storage. Public-facing pages use ISR for performance. Admin dashboard is a protected route group. Animation layer uses Framer Motion for UI transitions + GSAP for complex choreography + Canvas API for the loading screen physics simulation.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, matter.js (physics), Supabase, Vercel, shadcn/ui (admin primitives)

**Spec:** `docs/superpowers/specs/2026-04-16-ace-gameroom-redesign-design.md`

---

## File Structure

```
/                                   — Project root
├── .env.local                      — Supabase keys (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
├── next.config.ts                  — Next.js config (images domains, etc.)
├── tailwind.config.ts              — Tailwind with ACE brand tokens
├── tsconfig.json
├── package.json
│
├── /src
│   ├── /app
│   │   ├── layout.tsx              — Root layout: fonts, metadata, providers, nav + footer
│   │   ├── page.tsx                — Homepage: hero, categories, stats, products, brands, testimonials, map
│   │   ├── globals.css             — Tailwind directives + custom CSS vars + animation keyframes
│   │   │
│   │   ├── /(public)               — Route group for public pages (shares root layout)
│   │   │   ├── /[category]
│   │   │   │   ├── page.tsx        — Category listing (billiards, games, furniture, etc.)
│   │   │   │   └── /[slug]
│   │   │   │       └── page.tsx    — Product detail page
│   │   │   ├── /contact/page.tsx
│   │   │   ├── /about/page.tsx
│   │   │   ├── /services/page.tsx
│   │   │   ├── /faq/page.tsx
│   │   │   ├── /pool-league/page.tsx
│   │   │   └── /dart-league/page.tsx
│   │   │
│   │   ├── /(admin)                — Route group for admin (own layout, no public nav)
│   │   │   └── /admin
│   │   │       ├── layout.tsx      — Admin shell: sidebar + topbar + auth gate
│   │   │       ├── page.tsx        — Dashboard stats
│   │   │       ├── /login/page.tsx — Admin login form
│   │   │       ├── /products
│   │   │       │   ├── page.tsx    — Product list + search/filter
│   │   │       │   ├── /new/page.tsx
│   │   │       │   └── /[id]/edit/page.tsx
│   │   │       ├── /categories/page.tsx
│   │   │       ├── /brands/page.tsx
│   │   │       ├── /inquiries/page.tsx
│   │   │       ├── /banners/page.tsx
│   │   │       ├── /testimonials/page.tsx
│   │   │       ├── /faq/page.tsx
│   │   │       ├── /content/page.tsx
│   │   │       └── /leagues/page.tsx
│   │   │
│   │   └── /api
│   │       ├── /inquiries/route.ts — POST handler for contact form (rate limited)
│   │       └── /revalidate/route.ts — On-demand ISR revalidation webhook
│   │
│   ├── /components
│   │   ├── /ui                     — Button, Input, Card, Badge, Dialog, Select, Textarea, Table, Tabs
│   │   ├── /layout
│   │   │   ├── Navbar.tsx          — Top utility bar + main sticky nav
│   │   │   ├── MegaMenu.tsx        — Animated dropdown per category
│   │   │   ├── MobileMenu.tsx      — Full-screen mobile overlay
│   │   │   ├── Footer.tsx          — Mega footer with sitemap
│   │   │   └── Breadcrumbs.tsx
│   │   ├── /animations
│   │   │   ├── LoadingScreen.tsx   — Pool break loading animation (Canvas + matter.js)
│   │   │   ├── ScrollReveal.tsx    — Wrapper component for scroll-triggered animations
│   │   │   ├── ParallaxSection.tsx — Parallax scroll effect wrapper
│   │   │   ├── CountUp.tsx         — Animated number counter
│   │   │   ├── TiltCard.tsx        — 3D tilt on hover
│   │   │   ├── InfiniteMarquee.tsx — Auto-scrolling brand logos
│   │   │   ├── PageTransition.tsx  — Framer Motion page wrapper
│   │   │   └── PoolBallSpinner.tsx — Loading spinner shaped like pool ball
│   │   ├── /home
│   │   │   ├── HeroCarousel.tsx    — Full-width hero slider with parallax
│   │   │   ├── CategoryGrid.tsx    — 6 category cards with tilt
│   │   │   ├── WhyShopAce.tsx      — Stats + story section
│   │   │   ├── FeaturedProducts.tsx— Horizontal product carousel
│   │   │   ├── BrandPartners.tsx   — Logo marquee
│   │   │   ├── FinancingBanner.tsx — Wells Fargo callout
│   │   │   ├── Testimonials.tsx    — Rotating quotes
│   │   │   └── LocationMap.tsx     — Google Maps + hours card
│   │   ├── /products
│   │   │   ├── ProductCard.tsx     — Grid card with hover lift
│   │   │   ├── ProductGrid.tsx     — Staggered grid with scroll reveal
│   │   │   ├── ProductGallery.tsx  — Image gallery with lightbox
│   │   │   ├── ProductSpecs.tsx    — Specifications table
│   │   │   ├── RelatedProducts.tsx — Related product carousel
│   │   │   └── CategorySidebar.tsx — Filter sidebar
│   │   ├── /forms
│   │   │   ├── ContactForm.tsx     — Full contact form with product selector
│   │   │   ├── ProductSelector.tsx — Multi-select product picker
│   │   │   └── InquiryButton.tsx   — "Add to inquiry" button
│   │   └── /admin
│   │       ├── AdminSidebar.tsx    — Nav sidebar
│   │       ├── AdminTopbar.tsx     — User info + logout
│   │       ├── DataTable.tsx       — Sortable/filterable table
│   │       ├── ImageUploader.tsx   — Drag-drop multi-image upload
│   │       ├── RichEditor.tsx      — Simple rich text editor
│   │       ├── StatsCard.tsx       — Dashboard stat card
│   │       └── SpecsEditor.tsx     — Dynamic key-value spec editor
│   │
│   ├── /lib
│   │   ├── supabase-browser.ts     — createBrowserClient()
│   │   ├── supabase-server.ts      — createServerClient() for RSC
│   │   ├── supabase-admin.ts       — createClient() with service role key
│   │   ├── types.ts                — Database types (generated)
│   │   ├── animations.ts           — Framer Motion variant presets
│   │   └── utils.ts                — cn(), slugify(), formatPhone()
│   │
│   └── /hooks
│       ├── useScrollReveal.ts      — Intersection Observer hook
│       ├── useCountUp.ts           — Animated counter hook
│       └── useInquiryList.ts       — sessionStorage-based inquiry cart
│
├── /public
│   ├── /images                     — Static assets (logo, placeholder images)
│   └── /fonts                      — Self-hosted Playfair Display, Inter, Bebas Neue
│
└── /supabase
    └── /migrations
        └── 001_initial_schema.sql  — Full schema + RLS + seed data
```

---

### Task 1: Project Scaffold + Tailwind + Fonts

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/utils.ts`, `src/lib/animations.ts`, `.gitignore`, `public/images/.gitkeep`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd "C:/Users/cole/Desktop/SweetDreamsMusicLLC/SweetDreamsBusiness/clients/PotentialClients/AceGameroomGallery/Website"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes --turbopack
```

If the directory is not empty, say yes to overwrite. This gives us Next.js 15 with App Router, TypeScript, Tailwind CSS v4, ESLint.

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion gsap matter-js @supabase/supabase-js @supabase/ssr clsx tailwind-merge lucide-react embla-carousel-react embla-carousel-autoplay
npm install -D @types/matter-js
```

Packages:
- `framer-motion` — UI animations, page transitions, scroll reveals
- `gsap` — Complex choreographed animations (loading screen, counters)
- `matter-js` — 2D physics engine for pool break simulation
- `@supabase/supabase-js` + `@supabase/ssr` — Database client
- `clsx` + `tailwind-merge` — className utility
- `lucide-react` — Icons
- `embla-carousel-react` + `embla-carousel-autoplay` — Carousel

- [ ] **Step 3: Download and place fonts**

Download Google Fonts (Playfair Display, Inter, Bebas Neue) and place them in `public/fonts/`. Use next/font/local in layout.tsx for optimal loading.

Alternatively, use `next/font/google` for simpler setup:

```tsx
// In layout.tsx — use Google Fonts via next/font
import { Playfair_Display, Inter, Bebas_Neue } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
```

- [ ] **Step 4: Configure Tailwind with ACE brand tokens**

Write `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ace: {
          red: "#c0392b",
          orange: "#e67e22",
          gold: "#f1c40f",
          cyan: "#5dade2",
          cream: "#faf8f5",
          charcoal: "#2c2c2c",
          slate: "#4a4a4a",
          footer: "#333333",
        },
        felt: {
          green: "#1a6b3c",
          light: "#2d8a56",
          dark: "#0d4a26",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "tilt-in": "tilt-in 0.6s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "count-up": "count-up 2s ease-out",
        "pool-spin": "pool-spin 1s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "tilt-in": {
          "0%": { transform: "perspective(500px) rotateX(10deg)", opacity: "0" },
          "100%": { transform: "perspective(500px) rotateX(0deg)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pool-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Write globals.css with CSS custom properties + animation utilities**

Write `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ace-red: #c0392b;
    --ace-orange: #e67e22;
    --ace-gold: #f1c40f;
    --ace-cyan: #5dade2;
    --felt-green: #1a6b3c;
  }

  body {
    @apply font-inter text-ace-charcoal bg-white antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-playfair;
  }
}

@layer components {
  .ace-gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, var(--ace-red), var(--ace-orange), var(--ace-gold));
  }

  .ace-gradient-bg {
    background: linear-gradient(135deg, var(--ace-red), var(--ace-orange), var(--ace-gold));
  }

  .felt-texture {
    background-color: var(--felt-green);
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .btn-ace {
    @apply px-6 py-3 bg-ace-red text-white font-semibold rounded-lg transition-all duration-300;
    @apply hover:bg-ace-red/90 hover:shadow-lg hover:shadow-ace-red/20 hover:-translate-y-0.5;
    @apply active:translate-y-0 active:shadow-md;
  }

  .btn-ace-outline {
    @apply px-6 py-3 border-2 border-ace-red text-ace-red font-semibold rounded-lg transition-all duration-300;
    @apply hover:bg-ace-red hover:text-white hover:shadow-lg hover:shadow-ace-red/20;
  }

  .card-hover {
    @apply transition-all duration-500 ease-out;
    @apply hover:-translate-y-2 hover:shadow-2xl;
  }

  .link-underline {
    @apply relative;
  }
  .link-underline::after {
    content: '';
    @apply absolute bottom-0 left-0 w-0 h-0.5 bg-ace-cyan transition-all duration-300;
  }
  .link-underline:hover::after {
    @apply w-full;
  }
}

@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
}
```

- [ ] **Step 6: Write utility functions**

Write `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`
  }
  return phone
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
```

- [ ] **Step 7: Write Framer Motion animation presets**

Write `src/lib/animations.ts`:

```ts
import { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export const tiltHover = {
  rest: { rotateX: 0, rotateY: 0 },
  hover: (custom: { x: number; y: number }) => ({
    rotateX: custom.y * 10,
    rotateY: custom.x * -10,
    transition: { duration: 0.2 },
  }),
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}
```

- [ ] **Step 8: Write minimal root layout with fonts and metadata**

Write `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Ace Game Room Gallery | Fort Wayne, IN",
    template: "%s | Ace Game Room Gallery",
  },
  description:
    "Fort Wayne's #1 source for pool tables, game room furniture, arcade games, and outdoor recreation. Over 25 years of experience. Premium brands, guaranteed lowest prices.",
  keywords: [
    "pool tables", "game room", "billiards", "arcade games", "Fort Wayne",
    "Olhausen", "bar stools", "shuffleboard", "pinball",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ace Game Room Gallery",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${bebas.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Write placeholder homepage**

Write `src/app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <h1 className="text-5xl font-playfair ace-gradient-text">
        Ace Game Room Gallery
      </h1>
    </main>
  )
}
```

- [ ] **Step 10: Configure next.config.ts for image domains**

Write `next.config.ts`:

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.acegameroom.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 11: Verify dev server starts clean**

```bash
npm run dev
```

Open http://localhost:3000. Should see "Ace Game Room Gallery" in gradient text on white background.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with ACE brand tokens, fonts, and animation presets"
```

---

### Task 2: Supabase Database Schema + Client Setup

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`, `src/lib/supabase-browser.ts`, `src/lib/supabase-server.ts`, `src/lib/supabase-admin.ts`, `src/lib/types.ts`, `.env.local`

**Prerequisites:** A Supabase project must exist. Use the MCP tool `list_projects` to find it, or create one. Store the URL and keys in `.env.local`.

- [ ] **Step 1: Create `.env.local` with Supabase credentials**

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these values from the Supabase dashboard or via `get_project_url` and `get_publishable_keys` MCP tools.

- [ ] **Step 2: Apply the full database migration**

Use the Supabase MCP `apply_migration` tool with the following SQL. This creates all tables, RLS policies, storage buckets, and seed data in one migration:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES (with parent for subcategories)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BRANDS
-- ============================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  specifications JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  meta_title TEXT,
  meta_description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT IMAGES
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INQUIRIES (contact form submissions)
-- ============================================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  product_ids UUID[] DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HERO BANNERS
-- ============================================
CREATE TABLE hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAQ ENTRIES
-- ============================================
CREATE TABLE faq_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEAGUE EVENTS
-- ============================================
CREATE TABLE league_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_type TEXT NOT NULL CHECK (league_type IN ('pool', 'dart')),
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SITE CONTENT (editable text blocks)
-- ============================================
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_inquiries_read ON inquiries(is_read) WHERE is_read = FALSE;

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read active banners" ON hero_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active faq" ON faq_entries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read league events" ON league_events FOR SELECT USING (true);
CREATE POLICY "Public read site content" ON site_content FOR SELECT USING (true);

-- Public insert on inquiries
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users) for all tables
CREATE POLICY "Admin all categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all brands" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all hero_banners" ON hero_banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all faq_entries" ON faq_entries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all league_events" ON league_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA — Categories from current site
-- ============================================
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Billiards', 'billiards', 'Pool tables, cues, cloth, lighting, and accessories', 1),
  ('Games', 'games', 'Pinball, arcade, foosball, air hockey, darts, and more', 2),
  ('Furniture', 'furniture', 'Bars, bar stools, pub tables, game chairs, and neons', 3),
  ('Playsets', 'playsets', 'Rainbow Play Systems for residential and commercial use', 4),
  ('Outdoor', 'outdoor', 'Basketball goals, trampolines, and outdoor games', 5),
  ('Services', 'services', 'Billiard, pinball, and playset services', 6);

-- Subcategories for Billiards
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Billiard Tables', 'billiard-tables', (SELECT id FROM categories WHERE slug = 'billiards'), 1),
  ('Billiard Cloth', 'billiard-cloth', (SELECT id FROM categories WHERE slug = 'billiards'), 2),
  ('Cues', 'cues', (SELECT id FROM categories WHERE slug = 'billiards'), 3),
  ('Cases', 'cases', (SELECT id FROM categories WHERE slug = 'billiards'), 4),
  ('Lighting', 'lighting', (SELECT id FROM categories WHERE slug = 'billiards'), 5),
  ('Accessories', 'accessories', (SELECT id FROM categories WHERE slug = 'billiards'), 6);

-- Subcategories for Games
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Pinball', 'pinball', (SELECT id FROM categories WHERE slug = 'games'), 1),
  ('Arcade Games', 'arcade-games', (SELECT id FROM categories WHERE slug = 'games'), 2),
  ('Foosball', 'foosball', (SELECT id FROM categories WHERE slug = 'games'), 3),
  ('Air Hockey', 'air-hockey', (SELECT id FROM categories WHERE slug = 'games'), 4),
  ('Dome Hockey', 'dome-hockey', (SELECT id FROM categories WHERE slug = 'games'), 5),
  ('Ping Pong', 'ping-pong', (SELECT id FROM categories WHERE slug = 'games'), 6),
  ('Darts and Dartboards', 'darts', (SELECT id FROM categories WHERE slug = 'games'), 7),
  ('Bumper Pool', 'bumper-pool', (SELECT id FROM categories WHERE slug = 'games'), 8),
  ('Shuffleboard Tables', 'shuffleboard', (SELECT id FROM categories WHERE slug = 'games'), 9),
  ('Jukebox', 'jukebox', (SELECT id FROM categories WHERE slug = 'games'), 10);

-- Subcategories for Furniture
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Bars', 'bars', (SELECT id FROM categories WHERE slug = 'furniture'), 1),
  ('Bar Stools', 'bar-stools', (SELECT id FROM categories WHERE slug = 'furniture'), 2),
  ('Pub Tables', 'pub-tables', (SELECT id FROM categories WHERE slug = 'furniture'), 3),
  ('Game Chairs', 'game-chairs', (SELECT id FROM categories WHERE slug = 'furniture'), 4),
  ('Specialty Seating', 'specialty-seating', (SELECT id FROM categories WHERE slug = 'furniture'), 5),
  ('Neons', 'neons', (SELECT id FROM categories WHERE slug = 'furniture'), 6),
  ('Poker and Game Tables', 'poker-tables', (SELECT id FROM categories WHERE slug = 'furniture'), 7);

-- Subcategories for Playsets
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Rainbow Play Systems', 'rainbow-play-systems', (SELECT id FROM categories WHERE slug = 'playsets'), 1),
  ('Rainbow Accessories', 'rainbow-accessories', (SELECT id FROM categories WHERE slug = 'playsets'), 2);

-- Subcategories for Outdoor
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Basketball Goals', 'basketball-goals', (SELECT id FROM categories WHERE slug = 'outdoor'), 1),
  ('Trampolines', 'trampolines', (SELECT id FROM categories WHERE slug = 'outdoor'), 2),
  ('Outdoor Games', 'outdoor-games', (SELECT id FROM categories WHERE slug = 'outdoor'), 3);

-- ============================================
-- SEED DATA — Brands from current site
-- ============================================
INSERT INTO brands (name, slug) VALUES
  ('Olhausen', 'olhausen'),
  ('Valley', 'valley'),
  ('C.L. Bailey', 'cl-bailey'),
  ('Plank and Hide', 'plank-and-hide'),
  ('Championship', 'championship'),
  ('Simonis', 'simonis'),
  ('Proline', 'proline'),
  ('J. Pechauer', 'j-pechauer'),
  ('McDermott', 'mcdermott'),
  ('Lucasi', 'lucasi'),
  ('Viking', 'viking'),
  ('Players', 'players'),
  ('Cuetec', 'cuetec'),
  ('Jacoby', 'jacoby'),
  ('Joss', 'joss'),
  ('Valhalla', 'valhalla'),
  ('Predator', 'predator'),
  ('Darafeev', 'darafeev'),
  ('American Heritage', 'american-heritage'),
  ('Callee', 'callee'),
  ('Holland Bar Stool Co.', 'holland-bar-stool'),
  ('H.J. Scott', 'hj-scott'),
  ('RAM Game Room', 'ram-game-room'),
  ('Z-Lite', 'z-lite'),
  ('Rainbow Play Systems', 'rainbow-play-systems'),
  ('Springfree', 'springfree'),
  ('Presidential Billiards', 'presidential-billiards');

-- ============================================
-- SEED DATA — Site content
-- ============================================
INSERT INTO site_content (section_key, title, content) VALUES
  ('about_story', 'Our Story', 'Ace Game Room Gallery was established in 1992 as a coin-operated amusement supplier serving local businesses with pool tables, pinball machines, video games, and jukeboxes. Two years later, founder Bret Almashie expanded the business model to include retail sales, recognizing the community''s demand for quality recreational products.'),
  ('why_shop', 'Why Shop at ACE?', 'ACE Game Room sells more pool tables than all of the surrounding competition combined. We''re the experts! With over 25 years of experience in the industry, we realize that buying a pool table is an exciting and unique experience. Our goal is to help you find a pool table that best matches your style and budget. We proudly offer Olhausen Billiards, shuffleboards, poker tables, and an assortment of game room furniture. ACE Game Room Gallery has premium brands with exceptional service at guaranteed lowest prices. Stop in today and let us help you!'),
  ('services_billiard', 'Billiard Services', 'Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers.'),
  ('services_pinball', 'Pinball Services', 'Professional pinball machine maintenance and repair services.'),
  ('services_playset', 'Playset Services', 'Installation and maintenance for Rainbow Play Systems residential and commercial playsets.');

-- ============================================
-- SEED DATA — FAQ
-- ============================================
INSERT INTO faq_entries (question, answer, sort_order) VALUES
  ('Does Ace Game Room do services on pool tables?', 'Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers. We do not have the ability to repair damaged wood on tables.', 1),
  ('What brands of pool tables do you carry?', 'We proudly carry Olhausen Billiards, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards pool tables. All are premium American-made brands.', 2),
  ('Do you offer financing?', 'Yes! We offer Wells Fargo financing. Buy today, pay over time with convenient monthly payments to fit your budget.', 3),
  ('Do you deliver and install?', 'Yes, we offer free delivery and installation on qualifying purchases. Our expert technicians handle the complete setup.', 4),
  ('What are your hours?', 'We are open Monday through Saturday from 10:00 AM to 6:00 PM. We are closed on Sundays.', 5);

-- ============================================
-- SEED DATA — Testimonials
-- ============================================
INSERT INTO testimonials (author_name, content, rating) VALUES
  ('Mike R.', 'Best pool table selection in Fort Wayne. The staff really knows their stuff and helped us pick the perfect table for our basement.', 5),
  ('Sarah T.', 'We bought a shuffleboard table and bar stools. The quality is outstanding and the delivery was free! Highly recommend.', 5),
  ('David L.', 'Had our pool table recovered and it looks brand new. Great service at a fair price. Will definitely use them again.', 5);

-- ============================================
-- STORAGE BUCKETS (run these separately in Supabase dashboard or via SQL)
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('product-images', 'product-images', true),
  ('brand-logos', 'brand-logos', true),
  ('hero-banners', 'hero-banners', true),
  ('category-images', 'category-images', true),
  ('general', 'general', true);

-- Storage policies — public read
CREATE POLICY "Public read product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public read brand-logos" ON storage.objects FOR SELECT USING (bucket_id = 'brand-logos');
CREATE POLICY "Public read hero-banners" ON storage.objects FOR SELECT USING (bucket_id = 'hero-banners');
CREATE POLICY "Public read category-images" ON storage.objects FOR SELECT USING (bucket_id = 'category-images');
CREATE POLICY "Public read general" ON storage.objects FOR SELECT USING (bucket_id = 'general');

-- Storage policies — admin write
CREATE POLICY "Admin upload product-images" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update product-images" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete product-images" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
```

- [ ] **Step 3: Write Supabase browser client**

Write `src/lib/supabase-browser.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 4: Write Supabase server client**

Write `src/lib/supabase-server.ts`:

```ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore in Server Components
          }
        },
      },
    }
  )
}
```

- [ ] **Step 5: Write Supabase admin client (service role)**

Write `src/lib/supabase-admin.ts`:

```ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
```

- [ ] **Step 6: Write TypeScript database types**

Write `src/lib/types.ts` with types matching the schema. Alternatively, generate with `generate_typescript_types` MCP tool and paste the output. Manual version:

```ts
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
  created_at: string
  updated_at: string
  children?: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category_id: string
  brand_id: string | null
  specifications: Record<string, string>
  is_featured: boolean
  status: "active" | "draft"
  meta_title: string | null
  meta_description: string | null
  sort_order: number
  created_at: string
  updated_at: string
  // Joined relations
  category?: Category
  brand?: Brand
  images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  product_ids: string[]
  is_read: boolean
  is_archived: boolean
  created_at: string
  // Joined
  products?: Product[]
}

export interface HeroBanner {
  id: string
  title: string | null
  subtitle: string | null
  image_url: string
  cta_text: string | null
  cta_link: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  content: string
  rating: number
  is_active: boolean
  created_at: string
}

export interface FaqEntry {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface LeagueEvent {
  id: string
  league_type: "pool" | "dart"
  title: string
  event_date: string
  event_time: string | null
  description: string | null
  location: string | null
  created_at: string
}

export interface SiteContent {
  id: string
  section_key: string
  title: string | null
  content: string
  updated_at: string
}
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Supabase schema, seed data, and client setup"
```

---

### Task 3: Animation Components (ScrollReveal, TiltCard, CountUp, Marquee, Spinner)

**Files:**
- Create: `src/components/animations/ScrollReveal.tsx`, `src/components/animations/TiltCard.tsx`, `src/components/animations/CountUp.tsx`, `src/components/animations/InfiniteMarquee.tsx`, `src/components/animations/PoolBallSpinner.tsx`, `src/components/animations/PageTransition.tsx`, `src/components/animations/ParallaxSection.tsx`, `src/hooks/useScrollReveal.ts`, `src/hooks/useCountUp.ts`

These are the reusable animation building blocks used across every page. Build them all as client components using Framer Motion.

**ScrollReveal** — wraps any element and animates it in when it enters the viewport via `useInView`. Accepts `variant` prop to choose animation style (fadeUp, slideLeft, scaleIn, etc.) and `delay` prop for staggering.

**TiltCard** — adds 3D perspective tilt on mouse move. Uses `onMouseMove` to track cursor position relative to card center and applies `rotateX`/`rotateY` transforms. Resets on mouse leave.

**CountUp** — animates a number from 0 to target value when scrolled into view. Uses `useInView` to trigger and GSAP or requestAnimationFrame for smooth counting.

**InfiniteMarquee** — duplicates children and scrolls them infinitely using CSS `translateX` animation. Pauses on hover. Direction prop for left/right.

**PoolBallSpinner** — a small spinning pool ball (8-ball style) for loading states. Pure CSS animation with the ball SVG pattern.

**PageTransition** — Framer Motion `AnimatePresence` wrapper for page route transitions. Wraps page content in `motion.div` with `pageTransition` variants from `animations.ts`.

**ParallaxSection** — uses `useScroll` + `useTransform` from Framer Motion to create a parallax speed difference between background image and content.

Each component should be a focused `"use client"` component, properly typed with TypeScript, using the animation presets from `src/lib/animations.ts`.

- [ ] **Step 1:** Write all animation component files as described above
- [ ] **Step 2:** Write the custom hooks (`useScrollReveal.ts` uses `useInView` from Framer Motion, `useCountUp.ts` uses `useInView` + `useMotionValue`)
- [ ] **Step 3:** Verify each component renders by importing in `page.tsx` temporarily
- [ ] **Step 4:** Commit

```bash
git add -A
git commit -m "feat: add reusable animation components — ScrollReveal, TiltCard, CountUp, Marquee, Spinner"
```

---

### Task 4: Layout — Navbar + MegaMenu + MobileMenu + Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/MegaMenu.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/Breadcrumbs.tsx`
- Modify: `src/app/layout.tsx` — add Navbar + Footer wrapping children

Build the full navigation system matching their existing site structure but with immersive animations.

**Navbar** has two tiers:
1. **Top utility bar** — slim strip with phone `(260) 432-3443`, hours "Mon-Sat 10AM-6PM", and location link. Right side: admin login link. Light gray bg (`#f5f5f5`), small text.
2. **Main nav** — white bg, sticky on scroll (adds shadow via scroll listener). Left: ACE logo (use their actual logo URL as `<Image>` with fallback gradient text). Center: category links (Billiards, Games, Furniture, Playsets, Outdoor, Services, Contact). Right: search icon. Active link has animated underline that slides to follow it (use Framer Motion `layoutId` for the underline indicator).

**MegaMenu** — on hover of Billiards/Games/Furniture, a dropdown panel appears showing subcategories as a grid of small cards with thumbnail images. Uses Framer Motion `AnimatePresence` for entrance/exit. Panel has subtle shadow and appears with a `fadeUp` animation. Each card is a link to the subcategory page.

**MobileMenu** — hamburger triggers full-screen overlay. White bg. ACE logo at top. Category accordion (click to expand subcategories). Items stagger in from right using `staggerContainer`/`staggerItem` variants. Close button (X) at top right.

**Footer** — dark charcoal bg (`#333`). Full-width. Contains:
- Sitemap in columns: Billiards, Games, Furniture, Playsets, Outdoor, Services, Contact Us, About Us (matching their current footer exactly)
- Contact info: address, phone, fax
- Hours: Mon-Sat 10:00 AM – 6:00 PM, Sunday Closed
- Social icons: Facebook, Instagram
- Copyright line
- Links use white text with `link-underline` hover effect (cyan underline slides in)

**Breadcrumbs** — simple `Home > Category > Product` trail. Uses `>` separator. Each segment is a link. Last segment is plain text (current page).

After building, update `src/app/layout.tsx` to wrap `{children}` between `<Navbar />` and `<Footer />`. The navbar categories should be fetched server-side from Supabase (query `categories` table where `parent_id IS NULL` ordered by `sort_order`).

- [ ] **Step 1:** Build Navbar with both tiers, sticky behavior, and ACE logo
- [ ] **Step 2:** Build MegaMenu with animated dropdown panels and subcategory grids
- [ ] **Step 3:** Build MobileMenu with full-screen overlay and accordion
- [ ] **Step 4:** Build Footer with full sitemap, contact info, and social links
- [ ] **Step 5:** Build Breadcrumbs component
- [ ] **Step 6:** Update `layout.tsx` to include nav/footer, fetch categories server-side
- [ ] **Step 7:** Test on dev server — verify sticky nav, mega menu hover, mobile menu toggle
- [ ] **Step 8:** Commit

```bash
git add -A
git commit -m "feat: add Navbar with mega menu, mobile menu, and mega footer"
```

---

### Task 5: Homepage — All Sections

**Files:**
- Create: `src/components/home/HeroCarousel.tsx`, `src/components/home/CategoryGrid.tsx`, `src/components/home/WhyShopAce.tsx`, `src/components/home/FeaturedProducts.tsx`, `src/components/home/BrandPartners.tsx`, `src/components/home/FinancingBanner.tsx`, `src/components/home/Testimonials.tsx`, `src/components/home/LocationMap.tsx`
- Modify: `src/app/page.tsx` — compose all sections

Build each homepage section as its own component. The homepage `page.tsx` is a Server Component that fetches data from Supabase and passes to client components.

**Data fetching in `page.tsx`:**
- `hero_banners` WHERE `is_active = true` ORDER BY `sort_order`
- `categories` WHERE `parent_id IS NULL` ORDER BY `sort_order`
- `products` WHERE `is_featured = true` AND `status = 'active'` with joined `images` and `brand`
- `brands` ORDER BY `name`
- `testimonials` WHERE `is_active = true`
- `site_content` WHERE `section_key = 'why_shop'`

**HeroCarousel** — uses Embla Carousel with autoplay plugin. Full-width images from `hero_banners`. Each slide has image bg, optional title/subtitle overlay with text shadow, optional CTA button. Dot indicators at bottom. Ken Burns zoom effect on active slide (CSS animation on the image). Parallax scroll effect using `ParallaxSection` wrapper.

**CategoryGrid** — 3x2 grid (3x1 + 3x1 on desktop, 2x3 on tablet, 1x6 on mobile). Each card uses `TiltCard` wrapper. Card has category image as background (or placeholder from Unsplash if no image), dark overlay gradient from bottom, category name in white bold text, "Shop Now →" text that slides up on hover. Cards use `ScrollReveal` with `staggerContainer` for entrance animation. Each card links to `/[category-slug]`.

**WhyShopAce** — split layout. Left side has the `why_shop` content from `site_content` table rendered as paragraphs. Below the text, three stat boxes in a row: "25+" (years), "1000+" (products), "#1" (in Fort Wayne), each using `CountUp` component triggered on scroll. Right side has a large showroom photo (use an Unsplash image of a beautiful game room or their actual showroom if available). The photo has a subtle `float` animation. Section wrapped in `ScrollReveal`.

**FeaturedProducts** — horizontal scrolling carousel using Embla. Each product card shows: image (from `product_images` where `is_primary`), product name, brand name in a badge, "Inquire" button. Cards use `card-hover` class for lift effect. Drag-to-scroll enabled. Left/right arrow buttons. If no featured products exist yet, show placeholder cards.

**BrandPartners** — `InfiniteMarquee` component containing brand logos. Each logo is an `<Image>` with grayscale CSS filter, transitioning to full color on hover. Logos sourced from the `brands` table `logo_url`, falling back to text if no logo uploaded.

**FinancingBanner** — full-width section with `ace-cream` bg. Text: "Buy Today, Pay Over Time" as headline. Subtext about Wells Fargo credit line benefits. "Learn More" button. Simple illustration or icon on the right side (credit card icon from Lucide).

**Testimonials** — carousel of quote cards. Each card has star rating (filled stars using `ace-gold`), quote text in italics, author name. Auto-rotates. Cards have subtle shadow and white bg. Uses Embla carousel with fade transition.

**LocationMap** — split layout. Left: Google Maps embed (`<iframe>` with their address coordinates: `40.9685,-85.1688`). Right: card with address, phone, fax, hours in clean format. "Get Directions" link opens Google Maps in new tab. Section has `ace-cream` bg.

- [ ] **Step 1:** Build HeroCarousel with Embla + autoplay + Ken Burns
- [ ] **Step 2:** Build CategoryGrid with TiltCard + ScrollReveal
- [ ] **Step 3:** Build WhyShopAce with CountUp stats
- [ ] **Step 4:** Build FeaturedProducts carousel
- [ ] **Step 5:** Build BrandPartners with InfiniteMarquee
- [ ] **Step 6:** Build FinancingBanner
- [ ] **Step 7:** Build Testimonials carousel
- [ ] **Step 8:** Build LocationMap with Google Maps embed
- [ ] **Step 9:** Compose all sections in `page.tsx` with Supabase data fetching
- [ ] **Step 10:** Test full homepage on dev server
- [ ] **Step 11:** Commit

```bash
git add -A
git commit -m "feat: build complete homepage with all sections and animations"
```

---

### Task 6: Product Pages — Category Listing + Product Detail

**Files:**
- Create: `src/app/(public)/[category]/page.tsx`, `src/app/(public)/[category]/[slug]/page.tsx`, `src/components/products/ProductCard.tsx`, `src/components/products/ProductGrid.tsx`, `src/components/products/ProductGallery.tsx`, `src/components/products/ProductSpecs.tsx`, `src/components/products/RelatedProducts.tsx`, `src/components/products/CategorySidebar.tsx`, `src/components/forms/InquiryButton.tsx`, `src/hooks/useInquiryList.ts`

**Category page (`/[category]`)** — Dynamic route. Server Component.
- Fetches category by slug, then fetches subcategories and products.
- If the category has subcategories, show a subcategory grid (similar to CategoryGrid but smaller cards).
- If the category has products directly, show ProductGrid.
- Left sidebar (`CategorySidebar`) shows category tree with current category highlighted + brand filter checkboxes.
- `generateStaticParams` generates paths for all top-level category slugs.
- `generateMetadata` returns category name as title.

**Product detail page (`/[category]/[slug]`)** — Dynamic route. Server Component.
- Fetches product by slug with joined `images`, `brand`, `category`.
- `ProductGallery` — main large image with thumbnail strip below. Clicking thumbnail swaps main image with crossfade animation. Click main image opens lightbox (full-screen overlay with prev/next arrows).
- Product name (h1), brand name with link, description paragraphs.
- `ProductSpecs` — table of specifications from the JSONB field. Each row has key (bold) and value.
- Two CTA buttons: "Request a Quote" (links to `/contact?product=SLUG`) and "Add to Inquiry List" (`InquiryButton`).
- `RelatedProducts` — carousel of other products in the same category. Uses Embla.
- `Breadcrumbs` showing Home > Category > Product Name.

**InquiryButton** — client component. Uses `useInquiryList` hook. Toggles product in/out of session inquiry list. Shows checkmark when added. Animated state change.

**useInquiryList** hook — stores product IDs in `sessionStorage` under key `ace-inquiry-list`. Returns `{ items, addItem, removeItem, toggleItem, isInList, clearList }`. Items persist during the session but not across browser closes.

**ProductCard** — shows product image (primary), product name, brand badge, "View Details" link. Uses `card-hover` effect. Wrapped in `ScrollReveal` with `staggerItem` variant when in a grid.

**ProductGrid** — wraps `ProductCard` components in a responsive grid (3 cols desktop, 2 tablet, 1 mobile). Uses `staggerContainer` for entrance animation.

- [ ] **Step 1:** Build useInquiryList hook
- [ ] **Step 2:** Build ProductCard and ProductGrid
- [ ] **Step 3:** Build CategorySidebar with category tree and brand filter
- [ ] **Step 4:** Build category listing page with data fetching
- [ ] **Step 5:** Build ProductGallery with lightbox
- [ ] **Step 6:** Build ProductSpecs table
- [ ] **Step 7:** Build InquiryButton
- [ ] **Step 8:** Build RelatedProducts carousel
- [ ] **Step 9:** Build product detail page with data fetching
- [ ] **Step 10:** Test navigation from homepage → category → product → back
- [ ] **Step 11:** Commit

```bash
git add -A
git commit -m "feat: add product category and detail pages with gallery, specs, and inquiry list"
```

---

### Task 7: Contact Page + Inquiry API

**Files:**
- Create: `src/app/(public)/contact/page.tsx`, `src/components/forms/ContactForm.tsx`, `src/components/forms/ProductSelector.tsx`, `src/app/api/inquiries/route.ts`

**Contact page** — Server Component that fetches all active products for the selector.

Layout: two-column on desktop, stacked on mobile.
- Left column: `ContactForm` with animated field entrances
- Right column: Google Map embed + contact info card (address, phone, hours)

**ContactForm** — `"use client"` component. Fields:
- Name (text input, required)
- Email (text input, required, email validation)
- Phone (text input, optional)
- Message (textarea, required)
- Product interest (`ProductSelector`)
- Submit button with loading state (PoolBallSpinner)

Reads URL search params on mount — if `?product=SLUG` exists, pre-selects that product. Also reads `useInquiryList` hook and pre-populates any products from the session inquiry list.

On submit: POST to `/api/inquiries` with JSON body. On success: show animated success message (pool ball rolling into pocket — use a simple CSS animation of a circle sliding diagonally and scaling down). On error: show error toast.

Form fields animate in staggered using `ScrollReveal` with `staggerContainer`. Validation errors trigger a `shake` animation on the field (Framer Motion `animate={{ x: [0, -10, 10, -10, 10, 0] }}`).

**ProductSelector** — multi-select dropdown. Shows a searchable list of all products grouped by category. User can check/uncheck products. Selected products show as badges/chips above the dropdown that can be removed. Uses `useState` for open/close, `useState` for search query, filters product list as user types.

**API route `/api/inquiries`** — POST handler:
- Validates required fields (name, email, message)
- Rate limits by IP (simple in-memory map, max 5 submissions per hour)
- Inserts into Supabase `inquiries` table using admin client
- Returns 200 on success, 400 on validation error, 429 on rate limit

- [ ] **Step 1:** Build ProductSelector multi-select component
- [ ] **Step 2:** Build ContactForm with validation, animations, and inquiry list integration
- [ ] **Step 3:** Build API route with validation and rate limiting
- [ ] **Step 4:** Build contact page layout with map and info card
- [ ] **Step 5:** Test: submit form, verify data appears in Supabase `inquiries` table
- [ ] **Step 6:** Test: navigate from product page "Request a Quote" → contact form pre-fills product
- [ ] **Step 7:** Commit

```bash
git add -A
git commit -m "feat: add contact page with product selector, inquiry API, and form animations"
```

---

### Task 8: Static Pages — About, Services, FAQ, Leagues

**Files:**
- Create: `src/app/(public)/about/page.tsx`, `src/app/(public)/services/page.tsx`, `src/app/(public)/faq/page.tsx`, `src/app/(public)/pool-league/page.tsx`, `src/app/(public)/dart-league/page.tsx`

**About page** — fetches `site_content` where `section_key = 'about_story'`. Displays company story with a timeline animation showing milestones (1992: Founded, 1994: Expanded to retail, 2000s: Became #1, Today: 25+ years). Timeline is a vertical line with dots at each milestone, content alternating left/right. Each milestone animates in with `ScrollReveal`. Hero section at top with a showroom photo.

**Services page** — fetches `site_content` for `services_billiard`, `services_pinball`, `services_playset`. Each service is an expandable card (accordion style). Card header shows service icon (from Lucide) + title. Click expands to show description. Uses Framer Motion `AnimatePresence` for smooth height animation. Cards use `ScrollReveal` for entrance.

**FAQ page** — fetches `faq_entries` where `is_active = true` ordered by `sort_order`. Accordion-style Q&A. Each question is a clickable header that expands to show the answer. Smooth height animation using Framer Motion `layout` prop. Rotating chevron icon. Search input at top filters questions as user types.

**League pages** — fetch `league_events` where `league_type = 'pool'` (or `'dart'`). Display as a list/table of upcoming events. Each event shows: title, date, time, location, description. Simple clean table layout with alternating row colors. If no events, show "No upcoming events" message.

- [ ] **Step 1:** Build About page with timeline animation
- [ ] **Step 2:** Build Services page with accordion cards
- [ ] **Step 3:** Build FAQ page with searchable accordion
- [ ] **Step 4:** Build Pool League and Dart League pages
- [ ] **Step 5:** Test all pages render with seed data
- [ ] **Step 6:** Commit

```bash
git add -A
git commit -m "feat: add About, Services, FAQ, and League pages"
```

---

### Task 9: Admin Dashboard — Auth + Layout + Product CRUD

**Files:**
- Create: `src/app/(admin)/admin/layout.tsx`, `src/app/(admin)/admin/login/page.tsx`, `src/app/(admin)/admin/page.tsx`, `src/app/(admin)/admin/products/page.tsx`, `src/app/(admin)/admin/products/new/page.tsx`, `src/app/(admin)/admin/products/[id]/edit/page.tsx`, `src/components/admin/AdminSidebar.tsx`, `src/components/admin/AdminTopbar.tsx`, `src/components/admin/DataTable.tsx`, `src/components/admin/ImageUploader.tsx`, `src/components/admin/SpecsEditor.tsx`, `src/components/admin/StatsCard.tsx`

**Admin login page** — email/password form. Uses Supabase Auth `signInWithPassword`. On success, redirects to `/admin`. Clean centered form with ACE logo.

**Admin layout** — Server Component that checks auth. If not authenticated, redirects to `/admin/login`. Layout has:
- Left sidebar (`AdminSidebar`) with nav links: Dashboard, Products, Categories, Brands, Inquiries, Banners, Testimonials, FAQ, Content, Leagues. Uses Lucide icons. Active link highlighted.
- Top bar (`AdminTopbar`) with "Admin Dashboard" text and logout button.
- Main content area where child pages render.

**Dashboard page** — shows `StatsCard` components in a grid:
- Total products (count from products table)
- Unread inquiries (count where `is_read = false`)
- Active banners count
- Recent inquiries list (last 5)

**Products list page** — `DataTable` showing all products (including drafts). Columns: image thumbnail, name, category, brand, status, featured. Search input filters by name. Category dropdown filters. Click row → navigate to edit page. "Add Product" button → navigate to `/admin/products/new`.

**Product form (new + edit)** — shared form component used by both `/new` and `/[id]/edit`. Fields:
- Name (text, required)
- Slug (auto-generated from name, editable)
- Description (rich text area — use a simple `<textarea>` with markdown support, or basic contenteditable div. Keep it simple.)
- Category (select dropdown, populated from categories)
- Brand (select dropdown, populated from brands, optional)
- Specifications (`SpecsEditor` — dynamic list of key/value pairs. Add row button. Remove row button per row.)
- Images (`ImageUploader` — drag-drop zone. Uploads to Supabase Storage `product-images` bucket. Shows preview thumbnails. Drag to reorder. Set primary checkbox. Delete button per image.)
- Featured (checkbox)
- Status (select: Active / Draft)
- Meta title (text, optional)
- Meta description (textarea, optional)

On save: upserts product in Supabase, uploads images to storage, saves image records. Redirects to products list.

**ImageUploader** — `"use client"`. Drag-drop area with dashed border. Accepts images. On drop/select: uploads to Supabase Storage, creates `product_images` record, shows thumbnail preview. Sortable thumbnails (drag to reorder). Star icon to set primary. Trash icon to delete.

**SpecsEditor** — dynamic form. List of `{key, value}` pairs. "Add Specification" button adds empty row. Each row has key input, value input, and delete button. Converts to/from JSONB for storage.

- [ ] **Step 1:** Build AdminSidebar and AdminTopbar
- [ ] **Step 2:** Build admin layout with auth guard
- [ ] **Step 3:** Build admin login page
- [ ] **Step 4:** Build StatsCard and dashboard page
- [ ] **Step 5:** Build DataTable component (sortable, filterable)
- [ ] **Step 6:** Build products list page
- [ ] **Step 7:** Build SpecsEditor component
- [ ] **Step 8:** Build ImageUploader with Supabase Storage integration
- [ ] **Step 9:** Build product form (shared between new/edit)
- [ ] **Step 10:** Build new product page
- [ ] **Step 11:** Build edit product page (loads existing data)
- [ ] **Step 12:** Test: create product, edit product, verify in Supabase
- [ ] **Step 13:** Commit

```bash
git add -A
git commit -m "feat: add admin dashboard with auth, product CRUD, image upload, and specs editor"
```

---

### Task 10: Admin — Categories, Brands, Inquiries, Content Management

**Files:**
- Create: `src/app/(admin)/admin/categories/page.tsx`, `src/app/(admin)/admin/brands/page.tsx`, `src/app/(admin)/admin/inquiries/page.tsx`, `src/app/(admin)/admin/banners/page.tsx`, `src/app/(admin)/admin/testimonials/page.tsx`, `src/app/(admin)/admin/faq/page.tsx`, `src/app/(admin)/admin/content/page.tsx`, `src/app/(admin)/admin/leagues/page.tsx`

**Categories page** — tree view of categories and subcategories. Inline editing (click name to edit). Add category button opens modal with name, slug, description, parent selector, image upload. Drag to reorder (or up/down buttons).

**Brands page** — simple list with inline add/edit. Name, slug, logo upload, website URL.

**Inquiries page** — DataTable of all inquiries. Columns: date, name, email, phone, message preview, products interested in, read status. Click row to expand full message. "Mark as Read" / "Archive" buttons. Unread rows highlighted. Export to CSV button (client-side generation).

**Banners page** — list of hero banners with image preview. Add/edit form: image upload, title, subtitle, CTA text, CTA link, sort order, active toggle. Drag to reorder.

**Testimonials page** — list with inline add/edit. Author name, content (textarea), rating (1-5 select), active toggle.

**FAQ page** — list with inline add/edit. Question, answer (textarea), category (optional), sort order, active toggle. Drag to reorder.

**Content page** — list of `site_content` entries. Each shows section_key (read-only), title (editable), content (textarea, editable). Save button per entry. These are the editable text blocks for About, Why Shop, Services descriptions, etc.

**Leagues page** — list of league events. Add/edit form: league type (pool/dart select), title, date, time, description, location.

- [ ] **Step 1:** Build categories management page
- [ ] **Step 2:** Build brands management page
- [ ] **Step 3:** Build inquiries management page with CSV export
- [ ] **Step 4:** Build banners management page
- [ ] **Step 5:** Build testimonials management page
- [ ] **Step 6:** Build FAQ management page
- [ ] **Step 7:** Build content management page
- [ ] **Step 8:** Build leagues management page
- [ ] **Step 9:** Test all admin CRUD operations
- [ ] **Step 10:** Commit

```bash
git add -A
git commit -m "feat: add admin pages for categories, brands, inquiries, banners, testimonials, FAQ, content, leagues"
```

---

### Task 11: Pool Break Loading Screen

**Files:**
- Create: `src/components/animations/LoadingScreen.tsx`, `src/components/animations/pool-physics.ts`
- Modify: `src/app/layout.tsx` — wrap page content with LoadingScreen on first visit

This is the signature animation. Build a 2D canvas-based pool break simulation using matter.js for physics.

**`pool-physics.ts`** — physics engine setup:
- Creates a matter.js `Engine`, `World`, `Render` (or manual canvas render loop).
- Defines table boundaries as static bodies (4 walls/rails).
- Creates 15 pool balls in triangle formation at right-center of canvas. Each ball has a number (1-15), color matching real pool balls (1=yellow, 2=blue, 3=red, etc.), and realistic appearance (circle with number, stripe/solid pattern).
- Creates cue ball (white) at left-center.
- Creates cue stick as a visual element (not physics — just animated with GSAP).
- **Animation sequence:**
  1. T=0: Fade in felt-green background with subtle texture
  2. T=0.3s: Cue stick slides in from left behind the cue ball
  3. T=0.8s: Cue stick pulls back (wind-up)
  4. T=1.0s: Cue stick strikes forward — apply force vector to cue ball toward the triangle
  5. T=1.0s: Cue ball rolls forward, hits triangle — matter.js handles the collision physics. Balls scatter realistically.
  6. T=2.5s: Balls are slowing down. 8-ball has been nudged to near center.
  7. T=3.0s: All balls fade out except 8-ball. 8-ball smoothly moves to exact center.
  8. T=3.3s: 8-ball morphs into ACE logo (crossfade — 8-ball shrinks, logo image fades in at same position)
  9. T=3.5s: "ACE GAME ROOM GALLERY" text fades up below logo
  10. T=4.0s: Entire loading screen slides up (curtain lift), revealing homepage below

- **Export function:** `runPoolBreak(canvas: HTMLCanvasElement, onComplete: () => void)`

**`LoadingScreen.tsx`** — `"use client"` component:
- Checks `sessionStorage.getItem('ace-loaded')`. If set, renders nothing (returns null).
- If not set: renders full-screen overlay (`fixed inset-0 z-[9999]`) with a `<canvas>` element.
- On mount: calls `runPoolBreak(canvasRef, onComplete)`.
- `onComplete`: sets `sessionStorage.setItem('ace-loaded', 'true')`, animates overlay out, then unmounts.
- "Skip" button in bottom-right corner — clicking calls `onComplete` immediately.
- Uses `dynamic(() => import(...), { ssr: false })` to prevent server-side rendering.

**Layout integration** — in `layout.tsx`, import `LoadingScreen` dynamically and render it before the page content. The loading screen overlays everything and auto-dismisses.

- [ ] **Step 1:** Write pool-physics.ts with matter.js world setup, ball creation, and cue strike sequence
- [ ] **Step 2:** Write the render loop — draw balls as colored circles with numbers on a felt-green canvas
- [ ] **Step 3:** Write the GSAP timeline for cue stick animation and logo morph sequence
- [ ] **Step 4:** Write LoadingScreen.tsx with canvas, skip button, and sessionStorage check
- [ ] **Step 5:** Integrate into layout.tsx with dynamic import
- [ ] **Step 6:** Test: first visit shows animation, refresh skips it, "Skip" button works
- [ ] **Step 7:** Commit

```bash
git add -A
git commit -m "feat: add pool break loading screen with matter.js physics and GSAP choreography"
```

---

### Task 12: ISR Revalidation + SEO + Final Polish

**Files:**
- Create: `src/app/api/revalidate/route.ts`, `src/app/sitemap.ts`, `src/app/(public)/[category]/opengraph-image.tsx`
- Modify: Various page files for `generateMetadata`, structured data

**Revalidation API** — POST endpoint that accepts a `secret` query param and `path` body param. Calls `revalidatePath(path)`. Used by admin dashboard after content changes to bust ISR cache.

**Sitemap** — `src/app/sitemap.ts` exports a function that queries all categories and products from Supabase and returns sitemap entries. Next.js auto-generates `/sitemap.xml`.

**SEO metadata** — add `generateMetadata` to all pages:
- Category pages: `title: category.name`, `description: category.description`
- Product pages: `title: product.name`, `description: product.meta_description || product.description`
- Static pages: hardcoded appropriate titles and descriptions

**Structured data** — add JSON-LD scripts to:
- Layout: `LocalBusiness` schema with address, phone, hours
- Product detail: `Product` schema with name, description, image, brand
- FAQ page: `FAQPage` schema with all Q&A pairs

**Final polish:**
- Add loading.tsx files in route groups for PoolBallSpinner fallback
- Add error.tsx files for error boundaries
- Add not-found.tsx for 404 page
- Verify all animations work smoothly
- Test mobile responsiveness on all pages

- [ ] **Step 1:** Build revalidation API route
- [ ] **Step 2:** Build dynamic sitemap
- [ ] **Step 3:** Add generateMetadata to all pages
- [ ] **Step 4:** Add JSON-LD structured data
- [ ] **Step 5:** Add loading.tsx, error.tsx, not-found.tsx
- [ ] **Step 6:** Final responsive testing
- [ ] **Step 7:** Commit

```bash
git add -A
git commit -m "feat: add SEO, sitemap, revalidation API, error boundaries, and final polish"
```

---

### Task 13: Data Seeding — Scrape Products from Current Site

**Files:**
- Create: `scripts/seed-products.ts`

Write a script that scrapes product data from the current acegameroom.com site and inserts it into Supabase. The script should:

1. Navigate to each category page on acegameroom.com (via fetch + HTML parsing, or Playwright)
2. Extract product names, descriptions, specifications, images, and brand/category associations
3. Download product images and upload to Supabase Storage
4. Insert product records into the `products` table
5. Insert image records into `product_images` table
6. Map products to correct categories and brands (using the seeded categories/brands from Task 2)

This can be a standalone TypeScript script run with `tsx scripts/seed-products.ts`. It needs the Supabase admin client for writes.

Since many pages on their site return errors, focus on working pages:
- `/store/billiards` → `/store/billiard-tables` → `/store/olhausen-pool-tables` (has product listings)
- Use the product detail pages to get full specs and images

- [ ] **Step 1:** Write the scraping script
- [ ] **Step 2:** Run it and verify products appear in Supabase
- [ ] **Step 3:** Verify products display on the website
- [ ] **Step 4:** Commit

```bash
git add -A
git commit -m "feat: add product seeding script and populate database from current site"
```

---

### Task 14: Deploy to Vercel

- [ ] **Step 1:** Ensure `.env.local` vars are set in Vercel project environment variables
- [ ] **Step 2:** Push to GitHub

```bash
git push origin main
```

- [ ] **Step 3:** Deploy using Vercel MCP tool or `vercel deploy`
- [ ] **Step 4:** Verify production deployment — loading screen, navigation, products, contact form, admin login
- [ ] **Step 5:** Create admin user in Supabase Auth dashboard (email/password for the client)
