import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MessageSquareQuote } from "lucide-react"
import {
  MOCK_CATEGORIES,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/mock-data"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ProductGallery from "@/components/products/ProductGallery"
import ProductSpecs from "@/components/products/ProductSpecs"
import RelatedProducts from "@/components/products/RelatedProducts"
import InquiryButton from "@/components/forms/InquiryButton"
import ScrollReveal from "@/components/animations/ScrollReveal"

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    return { title: "Product Not Found" }
  }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Find the parent category for breadcrumbs
  const category = MOCK_CATEGORIES.find((c) => c.slug === categorySlug)
  const categoryName = category?.name || categorySlug

  // Get related products
  const related = getRelatedProducts(product)

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: categoryName, href: `/${categorySlug}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-12 mt-4">
          {/* Left Column: Gallery */}
          <ScrollReveal variant="fadeIn">
            <ProductGallery images={product.images} />
          </ScrollReveal>

          {/* Right Column: Product Info */}
          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div className="mt-8 lg:mt-0 lg:sticky lg:top-28">
              {/* Brand Badge */}
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ace-cyan bg-ace-cyan/10 rounded-full mb-3">
                {product.brandName}
              </span>

              {/* Product Name */}
              <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-ace-charcoal leading-tight mb-6">
                {product.name}
              </h1>

              {/* Description */}
              <div className="space-y-4 text-ace-slate leading-relaxed mb-8">
                {product.description.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="btn-ace flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  Request a Quote
                </Link>
                <InquiryButton
                  productId={product.id}
                  productName={product.name}
                />
              </div>

              {/* Specs Table */}
              <ProductSpecs specs={product.specifications} />

              {/* Contact nudge */}
              <div className="mt-6 p-4 bg-ace-cream rounded-xl text-sm text-ace-slate">
                <p className="font-semibold text-ace-charcoal mb-1">
                  Questions about this product?
                </p>
                <p>
                  Call us at{" "}
                  <a
                    href="tel:+12604323443"
                    className="text-ace-red font-medium hover:underline"
                  >
                    (260) 432-3443
                  </a>{" "}
                  or{" "}
                  <Link
                    href="/contact"
                    className="text-ace-red font-medium hover:underline"
                  >
                    send us a message
                  </Link>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Related Products */}
        {related.length > 0 && <RelatedProducts products={related} />}
      </div>
    </div>
  )
}
