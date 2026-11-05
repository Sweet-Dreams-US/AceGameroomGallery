import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Clock, MapPin, Phone } from "lucide-react"
import type { CategoryShowcase, ShowcaseType } from "@/lib/showcase"

function quoteHref(interest: string, about?: string) {
  const params = new URLSearchParams({ interest })
  if (about) params.set("about", about)
  return `/contact?${params.toString()}`
}

export function CategoryShowcasePage({
  name,
  showcase,
}: {
  name: string
  showcase: CategoryShowcase
}) {
  return (
    <div className="bg-[#faf8f3] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[720px] h-[85vh] flex items-end overflow-hidden pt-32">
        <Image
          src={showcase.heroImage}
          alt={showcase.heroImageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: showcase.heroImagePosition }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/10" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 pb-14 lg:pb-20 w-full">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm mb-6">
            <Link href="/" className="text-white/70 hover:text-[#d4a843] transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{name}</span>
          </nav>

          <p className="eyebrow !text-[#d4a843] mb-4">{showcase.eyebrow}</p>
          <h1 className="hero-headline text-white mb-6">
            {showcase.headline}
            <br />
            <span className="ace-gradient-text italic">{showcase.headlineAccent}</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/85 font-light max-w-2xl leading-relaxed mb-8">
            {showcase.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={quoteHref(showcase.interest)} className="btn-primary">
              Request a Quote
            </Link>
            <a
              href="tel:+12604323443"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white border border-white/40 hover:bg-white hover:text-[#1a1612] transition-all duration-300 text-sm font-semibold tracking-[0.1em] uppercase"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              (260) 432-3443
            </a>
          </div>
        </div>
      </section>

      {/* Jump nav */}
      <nav aria-label={`${name} product types`} className="bg-white border-b border-[#1a1612]/8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5 flex flex-wrap gap-2.5">
          {showcase.types.map((type) => (
            <a
              key={type.slug}
              href={`#${type.slug}`}
              className="text-xs font-display tracking-[0.15em] uppercase px-4 py-2.5 border border-[#1a1612]/15 text-[#1a1612] hover:border-[#d4a843] hover:text-[#8a6d24] transition-colors"
            >
              {type.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Product types */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 divide-y divide-[#1a1612]/10">
        {showcase.types.map((type, index) => (
          <TypeRow
            key={type.slug}
            type={type}
            interest={showcase.interest}
            flipped={index % 2 === 1}
          />
        ))}
      </div>

      {/* Services */}
      {showcase.services && (
        <section className="bg-[#f4efe6] border-y border-[#1a1612]/8 py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="section-number mb-3">Services</p>
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-[#1a1612] mb-5 leading-tight">
                {showcase.services.heading}
              </h2>
              <Link href="/services" className="btn-ghost group">
                See all services
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="space-y-4">
              {showcase.services.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-[#1a1612]">
                  <Check className="w-5 h-5 mt-1 shrink-0 text-[#b8933a]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Visit */}
      <section className="dark-section py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Visit the showroom</p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#f5f1ea] mb-6 leading-[1.1]">
              Not sure what you need?{" "}
              <span className="ace-gradient-text italic">Ask us.</span>
            </h2>
            <Link href={quoteHref(showcase.interest)} className="btn-primary">
              Request a Quote
            </Link>
          </div>
          <ul className="space-y-5 text-[#f5f1ea]">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#d4a843]" aria-hidden="true" />
              2525 W Jefferson Blvd, Fort Wayne, IN 46802
            </li>
            <li className="flex items-start gap-4">
              <Clock className="w-5 h-5 mt-0.5 shrink-0 text-[#d4a843]" aria-hidden="true" />
              Monday to Saturday, 10:00 AM to 6:00 PM. Closed Sunday.
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-0.5 shrink-0 text-[#d4a843]" aria-hidden="true" />
              <a href="tel:+12604323443" className="hover:text-[#d4a843] transition-colors">
                (260) 432-3443
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function TypeRow({
  type,
  interest,
  flipped,
}: {
  type: ShowcaseType
  interest: string
  flipped: boolean
}) {
  return (
    <section
      id={type.slug}
      aria-labelledby={`${type.slug}-heading`}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-14 lg:py-20 scroll-mt-24"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-white shadow-sm lg:col-span-5 ${
          flipped ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={type.image}
          alt={type.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 450px"
        />
      </div>

      <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
        <h2
          id={`${type.slug}-heading`}
          className="font-playfair text-3xl lg:text-4xl font-bold text-[#1a1612] mb-4"
        >
          {type.name}
        </h2>
        <p className="text-lg text-[#4f4a44] leading-relaxed mb-6 max-w-xl">{type.blurb}</p>

        {type.highlights && type.highlights.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {type.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[#1a1612]">
                <Check className="w-4 h-4 shrink-0 text-[#b8933a]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {type.brands.length > 0 && (
          <div className="mb-8">
            <h3 className="section-number mb-3">Brands we carry</h3>
            <p className="text-[#1a1612] leading-relaxed">
              {type.brands.join(" · ")}
              {type.moreBrands && " · and more"}
            </p>
          </div>
        )}

        <Link href={quoteHref(interest, type.name)} className="btn-secondary">
          Ask about {type.name.toLowerCase()}
        </Link>
      </div>
    </section>
  )
}
