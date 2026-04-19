"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
} from "lucide-react"
import {
  getItems,
  seedItems,
  deleteItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import {
  ADMIN_MOCK_PRODUCTS,
  ADMIN_MOCK_CATEGORIES,
} from "@/lib/mock-data"
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const refresh = () => {
    const items = getItems<Product>(STORAGE_KEYS.PRODUCTS, [])
    setProducts(items)
  }

  useEffect(() => {
    seedItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS)
    refresh()
    setLoaded(true)
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        !categoryFilter || p.category_id === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [products, search, categoryFilter])

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.PRODUCTS, id)
    setConfirmId(null)
    refresh()
  }

  const categoryName = (id: string) =>
    ADMIN_MOCK_CATEGORIES.find((c) => c.id === id)?.name || "—"

  return (
    <div className="max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">/ Catalog</p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
            Products
          </h1>
          <p className="text-[#6b655e] mt-2">
            {loaded ? `${products.length} total products` : "Loading…"}
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#1a1612]/8 p-5 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a198]"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm min-w-[200px]"
        >
          <option value="">All Categories</option>
          {ADMIN_MOCK_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#1a1612]/8">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Package
              className="w-8 h-8 text-[#a8a198] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#6b655e] text-sm">
              {loaded ? "No products match your filters." : "Loading…"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1612]/8 bg-[#faf8f3]">
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Image
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Brand
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const imageUrl =
                    p.images?.[0]?.image_url ||
                    "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=100&h=100&fit=crop"
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors"
                    >
                      <td className="px-6 py-3">
                        <div className="relative w-12 h-12 bg-[#faf8f3] border border-[#1a1612]/8 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/admin/products/edit?id=${p.id}`}
                          className="text-sm text-[#1a1612] hover:text-[#b8933a] transition-colors"
                        >
                          {p.name}
                        </Link>
                        <div className="text-xs text-[#a8a198] mt-0.5">
                          {p.slug}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-[#6b655e]">
                        {categoryName(p.category_id)}
                      </td>
                      <td className="px-6 py-3 text-sm text-[#6b655e]">
                        {p.brand?.name || "—"}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2 py-1 border ${
                            p.status === "active"
                              ? "text-[#1a6b3c] border-[#1a6b3c]/30 bg-[#1a6b3c]/10"
                              : "text-[#b8933a] border-[#d4a843]/30 bg-[#d4a843]/10"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.status === "active"
                                ? "bg-[#1a6b3c]"
                                : "bg-[#d4a843]"
                            }`}
                          />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/edit?id=${p.id}`}
                            className="p-2 text-[#6b655e] hover:text-[#b8933a] hover:bg-[#faf8f3] transition-all"
                            aria-label="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </Link>
                          <button
                            onClick={() => setConfirmId(p.id)}
                            className="p-2 text-[#6b655e] hover:text-[#c0392b] hover:bg-[#faf8f3] transition-all"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm modal */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1612]/40 backdrop-blur-sm px-6"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="bg-white border border-[#1a1612]/8 p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-playfair text-xl text-[#1a1612] mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-[#6b655e] mb-6">
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c0392b] hover:bg-[#a53122] text-white text-xs tracking-[0.1em] uppercase font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
