import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return MOCK_CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = MOCK_CATEGORIES.find((c) => c.slug === category)
  if (!cat) return { title: "Not Found" }
  return {
    title: cat.name,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const cat = MOCK_CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const products = MOCK_PRODUCTS.filter((p) => p.categorySlug === category)

  return (
    <div className="bg-[#faf8f3] min-h-screen">
      {/* Category Hero — dark overlay on photo stays for image-on-image contrast */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={cat.imageUrl}
            alt={cat.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          <div className="flex items-center gap-3 text-sm mb-6">
            <Link href="/" className="text-white/70 hover:text-[#d4a843] transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{cat.name}</span>
          </div>

          <p className="eyebrow mb-4">THE {cat.name.toUpperCase()} COLLECTION</p>
          <h1 className="hero-headline text-white mb-6">
            {cat.name}
          </h1>
          <p className="text-lg lg:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
            {cat.description}
          </p>
        </div>
      </section>

      {/* Subcategories */}
      {cat.children.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <p className="section-number mb-4">/ BROWSE BY TYPE</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#1a1612]/8">
              {cat.children.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/${cat.slug}#${sub.slug}`}
                  className="group bg-white p-6 lg:p-8 hover:bg-[#f4efe6] transition-all duration-500 text-center"
                >
                  <div className="relative aspect-square mb-4 overflow-hidden">
                    <Image
                      src={sub.imageUrl}
                      alt={sub.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  </div>
                  <h3 className="text-sm lg:text-base font-medium text-[#1a1612] group-hover:text-[#d4a843] transition-colors">
                    {sub.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-20 lg:py-28 border-t border-[#1a1612]/8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12 lg:mb-16">
            <div>
              <p className="section-number mb-3">/ FEATURED IN {cat.name.toUpperCase()}</p>
              <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612]">
                {products.length > 0 ? "The Collection" : "Available in Showroom"}
              </h2>
            </div>
            <p className="text-[#6b655e] text-sm">
              {products.length} {products.length === 1 ? "product" : "products"} · Visit showroom for full inventory
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/${product.categorySlug}/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white mb-5 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="scarcity-badge text-[10px] !py-1 !px-3">
                        {product.brandName}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#1a1612]/10 flex items-center justify-center text-[#1a1612] group-hover:bg-[#d4a843] group-hover:border-[#d4a843] group-hover:text-white transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-[#1a1612] group-hover:text-[#b8933a] transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#6b655e] line-clamp-2">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-[#1a1612]/8 bg-white p-16 text-center">
              <p className="text-lg text-[#6b655e] mb-6">
                Our full {cat.name.toLowerCase()} collection is curated in-store.
              </p>
              <Link href="/contact" className="btn-primary">
                Request a Quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
