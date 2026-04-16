# Ace Game Room Gallery — Immersive Website Redesign

## Overview

A ground-up rebuild of acegameroom.com as a Next.js App Router application with Supabase backend. The site preserves all existing business content/products but delivers an immersive, animation-rich game room experience with an admin dashboard for product management.

**Business:** Ace Game Room Gallery — Fort Wayne, IN (est. 1992)
**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, GSAP, Three.js (loading screen), Supabase (DB + Auth + Storage), deployed on Vercel.

---

## 1. Brand Identity — Evolved, Not Replaced

The current site uses a red→orange→yellow gradient logo, light blue/cyan accent, white backgrounds, red links, and a charcoal/dark-gray footer. We keep this DNA but elevate it.

### Color System
| Token | Hex | Usage |
|-------|-----|-------|
| `ace-red` | `#c0392b` | Primary CTA, logo base, hover states |
| `ace-orange` | `#e67e22` | Logo gradient mid, accent highlights |
| `ace-gold` | `#f1c40f` | Logo gradient end, star ratings, badges |
| `ace-cyan` | `#5dade2` | Secondary accent, nav underline, links |
| `ace-white` | `#ffffff` | Primary background |
| `ace-cream` | `#faf8f5` | Section alternating backgrounds |
| `ace-charcoal` | `#2c2c2c` | Body text |
| `ace-slate` | `#4a4a4a` | Secondary text |
| `ace-footer-dark` | `#333333` | Footer background |
| `felt-green` | `#1a6b3c` | Game room themed accents, pool table felt |

### Typography
- **Headings:** Playfair Display (serif) — matches the classic game room feel
- **Body:** Inter (sans-serif) — clean, modern readability
- **Logo/Brand:** Custom gradient text matching their existing ACE style
- **Accent/Nav:** Bebas Neue (condensed) — for category labels, badges

### Logo Treatment
Use their actual logo image (`/data/logo.png`) as the primary mark. For text-only contexts, recreate the ACE gradient with CSS `background-clip: text`.

---

## 2. Loading Screen — Pool Break Animation

The signature moment. When the site first loads:

1. **Black screen** fades in with a felt-green textured surface (SVG pattern)
2. **Cue ball** slides in from off-screen left, driven by GSAP/Three.js
3. **Cue stick** follows, pulls back, then **strikes** the cue ball
4. **Pool break** — the triangle of 15 balls scatters with realistic 2D physics (matter.js or custom)
5. Balls bounce off table rails, gradually slowing
6. The **8-ball** rolls to center screen, morphs into the ACE logo
7. **"ACE GAME ROOM GALLERY"** text fades up beneath
8. The felt surface **lifts up like a curtain**, revealing the homepage underneath
9. Total duration: 3-4 seconds. Skip button available. Only plays on first visit (sessionStorage flag).

**Tech:** Canvas-based using Three.js for the 3D ball rendering with realistic shadows/reflections, or a high-quality 2D approach with matter.js physics + GSAP for the choreography. Preloads homepage content behind the animation.

---

## 3. Site Structure & Pages

### 3.1 Navigation
**Top utility bar** (slim, light gray bg):
- Phone number, Hours, Location link
- Account / Admin login link

**Main nav** (white bg, sticky on scroll with shadow):
- ACE logo (left)
- Billiards | Games | Furniture | Playsets | Outdoor | Services | Contact
- Search icon + Cart icon (right)

**Mega dropdown menus** on hover — each category shows subcategories with thumbnail images. Dropdown animates in with a subtle card-flip effect (Framer Motion).

**Mobile:** Hamburger menu with full-screen overlay. Menu items slide in staggered from the right. Category accordion with smooth expand animations.

### 3.2 Homepage Sections

**Hero Section:**
- Full-width image/video carousel (their actual product/promotional banners)
- Parallax depth effect on scroll
- Auto-rotating with dot indicators + swipe on mobile
- Large headline overlay with CTA button ("Explore Our Showroom")
- Subtle floating particle effects (tiny billiard chalk dust)

**Category Grid (6 cards):**
- Billiards, Games, Furniture, Playsets, Outdoor, Services
- Each card has a real product photo background
- On hover: card tilts slightly (3D perspective transform), image zooms, overlay text slides up
- Staggered scroll-reveal animation (cards pop in one by one as you scroll)

**"Why Shop at ACE?" Section:**
- Split layout: text left, showroom photo right
- Key stats animate in (counter animation): "25+ Years", "1000+ Products", "#1 in Fort Wayne"
- Scroll-triggered — numbers count up as section enters viewport

**Featured Products Carousel:**
- Horizontal scroll of featured/new products
- Cards with product image, name, brand, "Inquire" button
- Smooth drag-to-scroll with momentum
- Pool ball numbered badges for "New" / "Popular" / "Sale" items

**Brand Partners Bar:**
- Logo carousel of Olhausen, Valley, McDermott, Rainbow, Darafeev, etc.
- Infinite horizontal scroll animation
- Grayscale → color on hover

**Financing Banner:**
- Wells Fargo financing callout
- "Buy Today, Pay Over Time" with animated credit card illustration

**Testimonials/Reviews:**
- Rotating quote cards with star ratings
- Subtle slide transition between quotes

**Location & Hours:**
- Embedded Google Map (styled to match site theme)
- Address, phone, fax, hours in a clean card layout
- "Get Directions" CTA button

**Footer:**
- Dark charcoal background matching current site
- Full sitemap organized by category (Billiards, Games, Furniture, etc.)
- Social links (Facebook, Instagram)
- Contact info, hours
- Newsletter signup with animated submit button

### 3.3 Product Category Page (`/billiards`, `/games`, etc.)

- Hero banner specific to category (real product photo, full-width)
- Subcategory grid with image cards
- Left sidebar: category tree + manufacturer filter (collapsible on mobile)
- Sort/display controls
- Product grid with scroll-reveal animations
- Each product card: image, name, brand badge, "View Details" with hover lift effect

### 3.4 Product Detail Page (`/billiards/olhausen-augusta`)

- Large image gallery with lightbox (swipe between images)
- Product title, brand, description
- Specifications table (sizes, materials, finishes)
- "Request a Quote" button (opens contact form pre-filled with this product)
- "Add to Inquiry List" button (adds to a session-based inquiry cart)
- Related products carousel at bottom
- Breadcrumb navigation at top

### 3.5 Contact Page (`/contact`)

**Contact form with product selection:**
- Name, email, phone fields
- Message textarea
- **Product interest selector:** Multi-select dropdown populated from the product database. User can pick specific products they're inquiring about.
- **Inquiry list integration:** If user added products to their inquiry list while browsing, those auto-populate here
- Form submission sends email notification + stores in Supabase
- Success animation: pool ball drops into a pocket

**Also includes:**
- Google Map embed
- Address, phone, hours card
- "Request a Quote" variant that pre-selects product categories

### 3.6 About Us Page (`/about`)
- Company story (founded 1992, Bret Almashie)
- Timeline animation showing company milestones
- Showroom photos
- Team section (if they provide team photos)

### 3.7 Services Page (`/services`)
- Billiard services, Pinball services, Playset services
- Each service as an expandable card with description
- Before/after photo sliders for recovery work

### 3.8 League Pages (`/pool-league`, `/dart-league`)
- Standings table with sortable columns
- Schedule display
- Animated league bracket visualization (if applicable)

### 3.9 FAQ Page (`/faq`)
- Accordion-style Q&A
- Smooth expand/collapse animations
- Search/filter functionality

---

## 4. Admin Dashboard (`/admin`)

Protected route requiring Supabase Auth login (email/password). Only accessible to admin users.

### 4.1 Dashboard Home
- Quick stats: total products, total inquiries, recent messages
- Recent activity feed

### 4.2 Product Management
- **Product list** with search, filter by category, sort
- **Add/Edit product form:**
  - Name, description (rich text editor)
  - Category + subcategory (dropdown)
  - Brand/manufacturer (dropdown)
  - Specifications (dynamic key-value pairs)
  - Image upload (multiple, drag & drop, stored in Supabase Storage)
  - Featured flag, status (active/draft)
  - SEO fields (meta title, meta description, slug)
- **Bulk actions:** activate, deactivate, delete
- **Image management:** crop, reorder, set primary

### 4.3 Category Management
- Add/edit/reorder categories and subcategories
- Category image upload
- Category description

### 4.4 Inquiry/Message Management
- List of all contact form submissions
- Filter by date, read/unread, product interest
- View full message with product selections
- Mark as read, reply (opens email client), archive
- Export to CSV

### 4.5 Brand/Manufacturer Management
- Add/edit brands
- Logo upload
- Website URL

### 4.6 Content Management
- Edit homepage hero banners (image upload, title, CTA link)
- Edit "Why Shop at ACE" content
- Manage testimonials
- Edit FAQ entries
- Edit league schedules/standings

---

## 5. Animation System — The Immersive Layer

Every interaction should feel like you're IN a game room. Animations are the #1 priority for this build.

### Global Micro-interactions
- **Page transitions:** Smooth crossfade between pages using Next.js layout transitions + Framer Motion AnimatePresence
- **Scroll reveals:** Every section animates in on scroll (fade up, slide in, scale up — varied per section)
- **Button hovers:** Buttons have a subtle "rack 'em up" feel — slight 3D press effect with shadow change
- **Link hovers:** Underline slides in from left like a cue sliding across felt
- **Loading states:** Small spinning pool ball instead of generic spinners
- **Cursor trail:** Optional subtle chalk-dust particle trail on mouse move (can be toggled off)

### Section-Specific Animations
- **Category cards:** 3D tilt on hover (vanilla-tilt.js or Framer Motion)
- **Product cards:** Lift + shadow expansion on hover, staggered grid entrance
- **Stats counters:** Number count-up animation on scroll into view
- **Brand logos:** Infinite marquee scroll, grayscale → color on hover
- **Testimonials:** Card carousel with 3D flip between quotes
- **FAQ accordion:** Smooth height animation with rotating chevron

### Hero Section
- Ken Burns slow-zoom effect on hero images
- Parallax depth on scroll (image moves slower than content)
- Floating chalk dust particles in hero area

### Navigation
- Mega menu drops down with staggered card reveals
- Active nav item has an animated underline (slides to follow active item)
- Mobile menu: full-screen overlay with items sliding in from the right

### Contact Form
- Form fields animate in staggered on page load
- Validation errors shake the field
- Submit success: animated pool ball rolling into a corner pocket

---

## 6. Database Schema (Supabase)

### Tables

**categories**
- id (uuid, PK)
- name (text)
- slug (text, unique)
- description (text, nullable)
- image_url (text, nullable)
- parent_id (uuid, FK → categories.id, nullable)
- sort_order (int)
- created_at, updated_at (timestamptz)

**brands**
- id (uuid, PK)
- name (text)
- slug (text, unique)
- logo_url (text, nullable)
- website_url (text, nullable)
- created_at (timestamptz)

**products**
- id (uuid, PK)
- name (text)
- slug (text, unique)
- description (text)
- category_id (uuid, FK → categories.id)
- brand_id (uuid, FK → brands.id, nullable)
- specifications (jsonb) — flexible key/value specs
- is_featured (boolean, default false)
- status (text: 'active' | 'draft')
- meta_title (text, nullable)
- meta_description (text, nullable)
- sort_order (int)
- created_at, updated_at (timestamptz)

**product_images**
- id (uuid, PK)
- product_id (uuid, FK → products.id, ON DELETE CASCADE)
- image_url (text)
- alt_text (text, nullable)
- is_primary (boolean, default false)
- sort_order (int)
- created_at (timestamptz)

**inquiries**
- id (uuid, PK)
- name (text)
- email (text)
- phone (text, nullable)
- message (text)
- product_ids (uuid[], nullable) — array of product IDs they're interested in
- is_read (boolean, default false)
- is_archived (boolean, default false)
- created_at (timestamptz)

**hero_banners**
- id (uuid, PK)
- title (text, nullable)
- subtitle (text, nullable)
- image_url (text)
- cta_text (text, nullable)
- cta_link (text, nullable)
- sort_order (int)
- is_active (boolean, default true)
- created_at (timestamptz)

**testimonials**
- id (uuid, PK)
- author_name (text)
- content (text)
- rating (int, 1-5)
- is_active (boolean, default true)
- created_at (timestamptz)

**faq_entries**
- id (uuid, PK)
- question (text)
- answer (text)
- category (text, nullable)
- sort_order (int)
- is_active (boolean, default true)
- created_at (timestamptz)

**league_events**
- id (uuid, PK)
- league_type (text: 'pool' | 'dart')
- title (text)
- event_date (date)
- event_time (time, nullable)
- description (text, nullable)
- location (text, nullable)
- created_at (timestamptz)

**site_content**
- id (uuid, PK)
- section_key (text, unique) — e.g. 'about_story', 'why_shop', 'services_billiard'
- title (text, nullable)
- content (text)
- updated_at (timestamptz)

### Row Level Security
- Public read access on: categories, brands, products, product_images, hero_banners, testimonials, faq_entries, league_events, site_content
- Public insert on: inquiries (with rate limiting via edge function)
- Admin-only write access on all tables (authenticated users with admin role)

### Storage Buckets
- `product-images` — product photos
- `brand-logos` — brand/manufacturer logos
- `hero-banners` — homepage banner images
- `category-images` — category card images
- `general` — miscellaneous uploads

---

## 7. Project Structure

```
/app
  /layout.tsx              — Root layout with nav + footer
  /page.tsx                — Homepage
  /loading.tsx             — Pool break loading animation
  /(public)
    /billiards/page.tsx
    /billiards/[slug]/page.tsx
    /games/page.tsx
    /games/[slug]/page.tsx
    /furniture/page.tsx
    /furniture/[slug]/page.tsx
    /playsets/page.tsx
    /outdoor/page.tsx
    /services/page.tsx
    /contact/page.tsx
    /about/page.tsx
    /faq/page.tsx
    /pool-league/page.tsx
    /dart-league/page.tsx
    /product/[slug]/page.tsx
  /(admin)
    /admin/layout.tsx       — Admin layout with sidebar
    /admin/page.tsx         — Dashboard
    /admin/products/page.tsx
    /admin/products/new/page.tsx
    /admin/products/[id]/edit/page.tsx
    /admin/categories/page.tsx
    /admin/brands/page.tsx
    /admin/inquiries/page.tsx
    /admin/banners/page.tsx
    /admin/testimonials/page.tsx
    /admin/faq/page.tsx
    /admin/content/page.tsx
    /admin/leagues/page.tsx
/components
  /ui                      — Shared UI primitives (Button, Input, Card, etc.)
  /layout                  — Nav, Footer, MobileMenu, MegaDropdown
  /animations              — LoadingScreen, ScrollReveal, ParallaxHero, CountUp
  /products                — ProductCard, ProductGrid, ProductGallery
  /forms                   — ContactForm, ProductSelector, SearchBar
  /admin                   — AdminSidebar, DataTable, ImageUploader, RichEditor
/lib
  /supabase.ts             — Supabase client setup
  /supabase-admin.ts       — Server-side admin client
  /types.ts                — TypeScript types (generated from Supabase)
  /animations.ts           — Shared animation variants for Framer Motion
  /utils.ts                — Utility functions
/hooks
  /useScrollReveal.ts
  /useCountUp.ts
  /useInquiryList.ts       — Session-based inquiry cart
/public
  /images                  — Static images
  /fonts                   — Self-hosted fonts
```

---

## 8. Performance Considerations

- **Loading animation** preloads homepage content in background
- **Images:** Next.js Image component with automatic WebP/AVIF, lazy loading, blur placeholders
- **Animations:** Use `will-change` and `transform` only (GPU-accelerated). No layout-triggering animations.
- **Code splitting:** Dynamic imports for heavy animation libraries (Three.js only loaded for loading screen)
- **ISR:** Product/category pages use Incremental Static Regeneration (revalidate on admin changes)
- **Font loading:** `font-display: swap` with preloaded critical fonts

---

## 9. SEO

- Dynamic meta tags per page (product name, category, etc.)
- Structured data (JSON-LD) for products, local business, FAQ
- Sitemap.xml auto-generated
- Open Graph + Twitter Card images
- Semantic HTML throughout
- Proper heading hierarchy
