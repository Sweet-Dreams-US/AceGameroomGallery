import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data"
import { withCommerce } from "@/lib/commerce-overlay"
import { PriceTag } from "@/components/commerce/PriceTag"
import { BRAND_IMAGES } from "@/lib/brand-images"

export const metadata: Metadata = {
  title: "The Collection — Every Brand, Hand-Selected",
  description:
    "Browse the full Ace Game Room Gallery collection. Pool tables, pinball, arcade, foosball, shuffleboard, bar furniture, playsets, and outdoor — 27 premium brands curated.",
}

export default function CollectionPage() {
  const allProducts = MOCK_PRODUCTS.map(withCommerce)
  const shoppable = allProducts.filter((p) => p.price !== undefined)
  const showroomOnly = allProducts.filter((p) => p.price === undefined)

  // Group by category
  const byCat = MOCK_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.slug] = allProducts.filter((p) => p.categorySlug === cat.slug)
      return acc
    },
    {} as Record<string, typeof allProducts>,
  )

  const totalValue = shoppable.reduce((sum, p) => sum + (p.price ?? 0), 0)

  return (
    <div className="bg-[#faf8f3] min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={BRAND_IMAGES.heroShowroom}
          alt="The Ace Game Room Gallery showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          <div className="flex items-center gap-3 text-sm mb-6">
            <Link
              href="/"
              className="text-white/70 hover:text-[#d4a843] transition-colors"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Collection</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
            <p className="eyebrow !text-[#d4a843]">/ THE COLLECTION</p>
          </div>
          <h1 className="hero-headline text-white mb-6">
            Every brand,
            <br />
            <span className="ace-gradient-text italic">hand-selected.</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/85 font-light max-w-2xl leading-relaxed">
            6 categories. {allProducts.length} products on the page. 1000+ in
            the showroom. If we carry it, we stake our name on it.
          </p>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-white border-y border-[#1a1612]/8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1612]/8">
          <Stat label="Categories" value={String(MOCK_CATEGORIES.length)} />
          <Stat label="Products listed" value={String(allProducts.length)} />
          <Stat label="Brands curated" value="27" />
          <Stat label="Years in business" value="32+" />
        </div>
      </section>

      {/* Category jump nav */}
      <section className="border-b border-[#1a1612]/8">
        <nav className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6 flex flex-wrap gap-3">
          <span className="text-xs font-display tracking-[0.2em] uppercase text-[#a8a198] mr-2 self-center">
            Jump to:
          </span>
          {MOCK_CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="text-xs font-display tracking-[0.15em] uppercase px-4 py-2 border border-[#1a1612]/15 hover:border-[#d4a843] hover:text-[#b8933a] transition-colors"
            >
              {cat.name} <span className="text-[#a8a198]">·</span>{" "}
              <span className="text-[#a8a198]">{byCat[cat.slug]?.length ?? 0}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* Per-category sections */}
      {MOCK_CATEGORIES.filter((cat) => (byCat[cat.slug]?.length ?? 0) > 0).map(
        (cat) => {
          const products = byCat[cat.slug]
          return (
            <section
              key={cat.slug}
              id={cat.slug}
              className="py-20 lg:py-28 odd:bg-[#faf8f3] even:bg-[#f4efe6] scroll-mt-24"
            >
              <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
                <div className="flex items-end justify-between gap-6 flex-wrap mb-10 lg:mb-14">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
                      <p className="section-number">/ {cat.name.toUpperCase()}</p>
                    </div>
                    <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] leading-tight max-w-2xl">
                      {cat.name === "Billiards" &&
                        "Slate, felt, hardwood, soul."}
                      {cat.name === "Games" && "Every kind of fun."}
                      {cat.name === "Furniture" &&
                        "The room your guests don't want to leave."}
                      {cat.name === "Playsets" && "Built to outlast childhood."}
                      {cat.name === "Outdoor" &&
                        "The backyard everyone shows up at."}
                      {cat.name === "Services" && "We deliver, install, repair."}
                    </h2>
                  </div>
                  <Link
                    href={`/${cat.slug}`}
                    className="btn-ghost group"
                  >
                    View {cat.name.toLowerCase()} →
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${product.categorySlug}/${product.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-white mb-3 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[9px] font-display tracking-[0.2em] uppercase px-2 py-1 bg-white/95 text-[#1a1612] backdrop-blur-sm">
                            {product.brandName}
                          </span>
                        </div>
                        {product.stock !== undefined &&
                          product.stock > 0 &&
                          product.stock <= 2 && (
                            <div className="absolute top-2.5 right-2.5">
                              <span className="text-[9px] font-display tracking-[0.15em] uppercase px-2 py-1 bg-[#c0392b] text-white shadow">
                                Only {product.stock}
                              </span>
                            </div>
                          )}
                        <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm border border-[#1a1612]/10 flex items-center justify-center text-[#1a1612] group-hover:bg-[#d4a843] group-hover:border-[#d4a843] group-hover:text-white transition-all duration-500">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="font-playfair text-base lg:text-lg font-bold text-[#1a1612] group-hover:text-[#b8933a] transition-colors leading-tight mb-1.5 line-clamp-2">
                        {product.name}
                      </h3>
                      <PriceTag
                        price={product.price}
                        comparePrice={product.comparePrice}
                        size="sm"
                        fallback="In showroom"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        },
      )}

      {/* Convert CTA */}
      <section className="dark-section py-24 lg:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url('${BRAND_IMAGES.poolTableBanner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/95 via-[#0d0d0d]/85 to-[#121212]/95" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow mb-4">DON&apos;T SEE IT?</p>
          <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] mb-6 leading-[1.05]">
            The website is{" "}
            <span className="ace-gradient-text italic">a fraction</span>
            <br />
            of the showroom.
          </h2>
          <p className="text-lg text-[#a8a198] max-w-xl mx-auto mb-10 leading-relaxed">
            We curate {allProducts.length} products on this site. The 10,000 sq ft
            showroom in Fort Wayne has hundreds more — and the staff who can
            tell you which one&apos;s right for the room you&apos;re building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white border border-white/40 hover:bg-white hover:text-[#1a1612] transition-all duration-300 text-sm font-semibold tracking-[0.1em] uppercase"
            >
              Visit the Showroom
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#6b655e]">
            Or call <a href="tel:+12604323443" className="text-[#d4a843] hover:underline">(260) 432-3443</a> — Bret answers most days.
          </p>
        </div>
      </section>

      {showroomOnly.length > 0 && (
        <section className="py-16 bg-[#faf8f3] border-t border-[#1a1612]/8">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
            <p className="eyebrow mb-3">SHOWROOM EXCLUSIVES</p>
            <p className="text-[#6b655e] max-w-2xl mx-auto">
              {showroomOnly.length} pieces priced at the showroom — typically
              high-configuration items where finishes, sizing, and install
              schedule shape the quote.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-6 py-8 lg:py-10 text-center">
      <div className="font-playfair text-4xl lg:text-5xl font-black gold-gradient-text leading-none mb-2">
        {value}
      </div>
      <div className="text-[10px] lg:text-xs font-display tracking-[0.25em] uppercase text-[#6b655e]">
        {label}
      </div>
    </div>
  )
}
