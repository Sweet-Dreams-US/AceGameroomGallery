"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    categorySlug: string
    brandName: string
    imageUrl: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/${product.categorySlug}/${product.slug}`}
      className="group block"
    >
      <div className="card-hover bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand Badge */}
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ace-cyan bg-ace-cyan/10 rounded-full mb-2">
            {product.brandName}
          </span>

          {/* Product Name */}
          <h3 className="font-playfair text-base font-semibold text-ace-charcoal leading-snug mb-3 line-clamp-2 group-hover:text-ace-red transition-colors duration-300">
            {product.name}
          </h3>

          {/* View Details Link */}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ace-red group-hover:gap-2.5 transition-all duration-300">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
