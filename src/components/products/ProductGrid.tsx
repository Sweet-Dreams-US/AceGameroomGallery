"use client"

import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  products: {
    id: string
    name: string
    slug: string
    categorySlug: string
    brandName: string
    imageUrl: string
  }[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-ace-slate">
          No products found in this category.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Check back soon for new arrivals!
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={staggerItem}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
