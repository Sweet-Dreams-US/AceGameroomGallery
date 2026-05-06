import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data"
import { withCommerce } from "@/lib/commerce-overlay"
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel"
import { PriceTag } from "@/components/commerce/PriceTag"

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: "Product Not Found" }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params
  const baseProduct = MOCK_PRODUCTS.find(
    (p) => p.slug === slug && p.categorySlug === category,
  )
  if (!baseProduct) notFound()
  const product = withCommerce(baseProduct)

  const cat = MOCK_CATEGORIES.find((c) => c.slug === category)
  const related = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === category && p.slug !== slug,
  )
    .slice(0, 3)
    .map(withCommerce)

  const specEntries = Object.entries(product.specifications)

  return (
    <div className="bg-[#faf8f3] min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#6b655e] hover:text-[#b8933a] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#a8a198]">/</span>
          <Link
            href={`/${product.categorySlug}`}
            className="text-[#6b655e] hover:text-[#b8933a] transition-colors"
          >
            {cat?.name ?? "Category"}
          </Link>
          <span className="text-[#a8a198]">/</span>
          <span className="text-[#1a1612] truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-10 lg:py-16">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            {/* Gallery */}
            <div className="col-span-12 lg:col-span-7">
              <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-white mb-4 shadow-sm">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden bg-white border border-[#1a1612]/8"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info + Purchase Panel */}
            <div className="col-span-12 lg:col-span-5">
              <div className="scarcity-badge mb-6">
                {product.brandName.toUpperCase()}
              </div>

              <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1a1612] leading-tight mb-6">
                {product.name}
              </h1>

              <p className="text-lg text-[#6b655e] font-light leading-relaxed mb-8">
                {product.description}
              </p>

              <ProductPurchasePanel product={product} />

              {/* Specs */}
              {specEntries.length > 0 && (
                <div className="mt-12 border-t border-[#1a1612]/8 pt-8">
                  <p className="eyebrow mb-6">Specifications</p>
                  <dl className="overflow-hidden border border-[#1a1612]/8">
                    {specEntries.map(([key, value], idx) => (
                      <div
                        key={key}
                        className={`flex justify-between gap-4 px-4 py-3 ${
                          idx % 2 === 0 ? "bg-white" : "bg-[#faf8f3]"
                        }`}
                      >
                        <dt className="text-sm text-[#6b655e] capitalize">{key}</dt>
                        <dd className="text-sm text-[#1a1612] font-medium text-right">
                          {value}
                        </dd>
                      </div>
                    ))}
                    {product.sku && (
                      <div className="flex justify-between gap-4 px-4 py-3 bg-white">
                        <dt className="text-sm text-[#6b655e]">SKU</dt>
                        <dd className="text-sm text-[#1a1612] font-mono">
                          {product.sku}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28 border-t border-[#1a1612]/8">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <p className="section-number mb-3">/ YOU MAY ALSO LIKE</p>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] mb-12">
              More from{" "}
              <span className="gold-gradient-text italic">{cat?.name}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/${r.categorySlug}/${r.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white mb-5 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                    <Image
                      src={r.imageUrl}
                      alt={r.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-[10px] font-display tracking-[0.2em] text-[#b8933a] uppercase mb-1">
                    {r.brandName}
                  </p>
                  <h3 className="font-playfair text-xl font-bold text-[#1a1612] group-hover:text-[#b8933a] transition-colors mb-2">
                    {r.name}
                  </h3>
                  <PriceTag price={r.price} size="sm" fallback="Inquire" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
