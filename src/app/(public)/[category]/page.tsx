import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  MOCK_CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/mock-data"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import CategorySidebar from "@/components/products/CategorySidebar"
import ProductGrid from "@/components/products/ProductGrid"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    return { title: "Category Not Found" }
  }
  return {
    title: category.name,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(slug)

  // Transform categories for the sidebar
  const sidebarCategories = MOCK_CATEGORIES.map((c) => ({
    name: c.name,
    slug: c.slug,
    children: c.children.map((child) => ({
      name: child.name,
      slug: child.slug,
    })),
  }))

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 lg:h-72 bg-ace-charcoal overflow-hidden">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ace-charcoal/80 to-ace-charcoal/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: category.name }]} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Sidebar */}
          <div className="lg:pt-4">
            <CategorySidebar
              categories={sidebarCategories}
              currentSlug={slug}
            />
          </div>

          {/* Content Area */}
          <div className="mt-6 lg:mt-0">
            {/* Subcategory Cards */}
            {category.children.length > 0 && (
              <div className="mb-10">
                <h2 className="font-playfair text-xl font-bold text-ace-charcoal mb-5">
                  Browse {category.name}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/${slug}?sub=${sub.slug}`}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 card-hover"
                    >
                      <Image
                        src={sub.imageUrl}
                        alt={sub.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-white text-sm font-semibold">
                          {sub.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid */}
            {products.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-xl font-bold text-ace-charcoal">
                    {category.name} Products
                  </h2>
                  <span className="text-sm text-ace-slate">
                    {products.length} product{products.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <ProductGrid products={products} />
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <p className="text-lg text-ace-slate mb-2">
                  No products listed yet
                </p>
                <p className="text-sm text-gray-400">
                  Browse our subcategories above or contact us for availability.
                </p>
                <Link
                  href="/contact"
                  className="inline-block mt-4 btn-ace text-sm"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
