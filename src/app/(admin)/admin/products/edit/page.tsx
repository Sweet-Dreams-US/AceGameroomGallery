"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ProductForm } from "@/components/admin/ProductForm"
import {
  getItemById,
  seedItems,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { ADMIN_MOCK_PRODUCTS } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

function EditProductInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [product, setProduct] = useState<Product | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      router.replace("/admin/products")
      return
    }
    seedItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS)
    const found = getItemById<Product>(STORAGE_KEYS.PRODUCTS, id)
    if (!found) {
      setNotFound(true)
      return
    }
    setProduct(found)
  }, [id, router])

  if (notFound) {
    return (
      <div className="max-w-[720px]">
        <div className="bg-[#111] border border-white/5 p-10 text-center">
          <h1 className="font-playfair text-2xl text-[#f5f1ea] mb-2">
            Product not found.
          </h1>
          <p className="text-sm text-[#a8a198] mb-6">
            The product you&apos;re looking for has been removed or never
            existed.
          </p>
          <Link href="/admin/products" className="btn-secondary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-[#a8a198] text-sm tracking-[0.25em] uppercase">
        Loading product…
      </div>
    )
  }

  return <ProductForm mode="edit" initial={product} />
}

export default function AdminEditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="text-[#a8a198] text-sm tracking-[0.25em] uppercase">
          Loading product…
        </div>
      }
    >
      <EditProductInner />
    </Suspense>
  )
}
