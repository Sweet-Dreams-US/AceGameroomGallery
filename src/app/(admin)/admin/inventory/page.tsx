"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  Search,
  Boxes,
  AlertTriangle,
  CheckCircle2,
  Ban,
  Save,
} from "lucide-react"
import {
  getObject,
  setObject,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { getAllProducts } from "@/lib/commerce-overlay"
import { formatPrice } from "@/lib/commerce"
import type { MockProduct } from "@/lib/mock-data"

type StockMap = Record<string, number>
type PriceMap = Record<string, number>
type StatusMap = Record<string, "active" | "draft" | "out-of-stock">

const FILTERS = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
] as const

type FilterValue = (typeof FILTERS)[number]["value"]

interface EditState {
  stock: string
  price: string // dollars input
}

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<MockProduct[]>([])
  const [stockOverrides, setStockOverrides] = useState<StockMap>({})
  const [priceOverrides, setPriceOverrides] = useState<PriceMap>({})
  const [statusOverrides, setStatusOverrides] = useState<StatusMap>({})
  const [filter, setFilter] = useState<FilterValue>("all")
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<{
    slug: string
    field: "stock" | "price"
  } | null>(null)
  const [draft, setDraft] = useState<EditState>({ stock: "", price: "" })
  const [loaded, setLoaded] = useState(false)
  const [savedToast, setSavedToast] = useState(false)

  useEffect(() => {
    setProducts(getAllProducts())
    setStockOverrides(getObject<StockMap>(STORAGE_KEYS.STOCK_OVERRIDES, {}))
    setPriceOverrides(getObject<PriceMap>(STORAGE_KEYS.PRICE_OVERRIDES, {}))
    setStatusOverrides(getObject<StatusMap>("ace-status-overrides", {}))
    setLoaded(true)
  }, [])

  const flashSaved = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 1400)
  }

  const persistStock = (next: StockMap) => {
    setObject(STORAGE_KEYS.STOCK_OVERRIDES, next)
    setStockOverrides(next)
  }
  const persistPrice = (next: PriceMap) => {
    setObject(STORAGE_KEYS.PRICE_OVERRIDES, next)
    setPriceOverrides(next)
  }
  const persistStatus = (next: StatusMap) => {
    setObject("ace-status-overrides", next)
    setStatusOverrides(next)
  }

  const computed = useMemo(() => {
    return products.map((p) => {
      const stock =
        stockOverrides[p.slug] !== undefined
          ? stockOverrides[p.slug]
          : p.stock
      const price =
        priceOverrides[p.slug] !== undefined
          ? priceOverrides[p.slug]
          : p.price
      const explicitStatus = statusOverrides[p.slug]
      let computedStatus: "active" | "draft" | "out-of-stock"
      if (explicitStatus) {
        computedStatus = explicitStatus
      } else if (stock !== undefined && stock <= 0) {
        computedStatus = "out-of-stock"
      } else {
        computedStatus = "active"
      }
      return { product: p, stock, price, status: computedStatus }
    })
  }, [products, stockOverrides, priceOverrides, statusOverrides])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return computed.filter(({ product, stock, status }) => {
      if (q) {
        const matchSearch =
          product.name.toLowerCase().includes(q) ||
          (product.sku || "").toLowerCase().includes(q) ||
          product.slug.toLowerCase().includes(q)
        if (!matchSearch) return false
      }
      if (filter === "in-stock") {
        return stock !== undefined && stock > 2 && status !== "out-of-stock"
      }
      if (filter === "low-stock") {
        return stock !== undefined && stock > 0 && stock <= 2
      }
      if (filter === "out-of-stock") {
        return stock === 0 || status === "out-of-stock"
      }
      return true
    })
  }, [computed, filter, search])

  const counts = useMemo(() => {
    const map = { all: 0, "in-stock": 0, "low-stock": 0, "out-of-stock": 0 }
    for (const c of computed) {
      map.all++
      if (c.stock !== undefined && c.stock === 0) map["out-of-stock"]++
      else if (c.stock !== undefined && c.stock <= 2) map["low-stock"]++
      else if (c.stock !== undefined && c.stock > 2) map["in-stock"]++
    }
    return map
  }, [computed])

  const startEdit = (
    slug: string,
    field: "stock" | "price",
    currentStock: number | undefined,
    currentPriceCents: number | undefined,
  ) => {
    setEditing({ slug, field })
    setDraft({
      stock: currentStock !== undefined ? String(currentStock) : "",
      price:
        currentPriceCents !== undefined
          ? (currentPriceCents / 100).toFixed(2)
          : "",
    })
  }

  const commitEdit = () => {
    if (!editing) return
    const { slug, field } = editing
    if (field === "stock") {
      const n = parseInt(draft.stock, 10)
      if (!isNaN(n) && n >= 0) {
        persistStock({ ...stockOverrides, [slug]: n })
        flashSaved()
      }
    }
    if (field === "price") {
      const dollars = parseFloat(draft.price)
      if (!isNaN(dollars) && dollars >= 0) {
        persistPrice({ ...priceOverrides, [slug]: Math.round(dollars * 100) })
        flashSaved()
      }
    }
    setEditing(null)
  }

  const setAllActive = () => {
    persistStatus({})
    flashSaved()
  }

  const markAllOutOfStock = () => {
    const next: StatusMap = {}
    for (const p of products) {
      next[p.slug] = "out-of-stock"
    }
    persistStatus(next)
    flashSaved()
  }

  return (
    <div className="max-w-[1500px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">/ Catalog</p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612] flex items-baseline gap-3">
            Inventory
            {loaded && (
              <span className="text-base font-display tracking-[0.25em] text-[#b8933a]">
                {products.length}
              </span>
            )}
          </h1>
          <p className="text-[#6b655e] mt-2">
            Real-time stock and pricing. Click any cell to edit.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={setAllActive}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-[#1a6b3c] border border-[#1a6b3c]/30 hover:bg-[#1a6b3c]/10 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            All Active
          </button>
          <button
            type="button"
            onClick={markAllOutOfStock}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-[#c0392b] border border-[#c0392b]/30 hover:bg-[#c0392b]/10 transition-colors"
          >
            <Ban className="w-3.5 h-3.5" strokeWidth={1.5} />
            Mark All Out
          </button>
        </div>
      </div>

      {/* Filters + search */}
      <div className="bg-white border border-[#1a1612]/8 p-5 mb-6 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a198]"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, or slug…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.value
            const count = counts[f.value]
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
                  active
                    ? "bg-[#1a1612] text-white border-[#1a1612]"
                    : "bg-white text-[#6b655e] border-[#1a1612]/15 hover:border-[#d4a843]/40 hover:text-[#1a1612]"
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] tracking-normal ${
                    active ? "text-[#d4a843]" : "text-[#a8a198]"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#1a1612]/8 relative">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Boxes
              className="w-8 h-8 text-[#a8a198] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#6b655e] text-sm">
              {loaded
                ? "No products match your filters."
                : "Loading inventory…"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1612]/8 bg-[#faf8f3]">
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal w-16" />
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Name
                  </th>
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Brand
                  </th>
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Category
                  </th>
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    SKU
                  </th>
                  <th className="text-right px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Stock
                  </th>
                  <th className="text-right px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Price
                  </th>
                  <th className="text-left px-4 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(({ product, stock, price, status }) => {
                  const isEditingStock =
                    editing?.slug === product.slug && editing.field === "stock"
                  const isEditingPrice =
                    editing?.slug === product.slug && editing.field === "price"
                  const lowStock =
                    stock !== undefined && stock > 0 && stock <= 2
                  const outOfStock = stock === 0 || status === "out-of-stock"
                  return (
                    <tr
                      key={product.slug}
                      className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="relative w-12 h-12 bg-[#faf8f3] border border-[#1a1612]/8 overflow-hidden">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-[#1a1612]">
                          {product.name}
                        </div>
                        <div className="text-xs text-[#a8a198] mt-0.5">
                          {product.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6b655e]">
                        {product.brandName || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6b655e] capitalize">
                        {product.categorySlug}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#6b655e] font-mono">
                        {product.sku || "—"}
                      </td>

                      {/* Stock cell — inline editable */}
                      <td
                        className="px-4 py-3 text-right cursor-pointer"
                        onClick={() =>
                          !isEditingStock &&
                          startEdit(product.slug, "stock", stock, price)
                        }
                      >
                        {isEditingStock ? (
                          <input
                            type="number"
                            autoFocus
                            value={draft.stock}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                stock: e.target.value,
                              }))
                            }
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitEdit()
                              if (e.key === "Escape") setEditing(null)
                            }}
                            className="w-20 px-2 py-1 bg-white border border-[#d4a843] text-right text-sm text-[#1a1612] focus:outline-none focus:ring-1 focus:ring-[#d4a843]"
                          />
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 text-sm tabular-nums ${
                              outOfStock
                                ? "text-[#c0392b]"
                                : lowStock
                                  ? "text-[#b8933a]"
                                  : "text-[#1a1612]"
                            }`}
                          >
                            {lowStock && !outOfStock && (
                              <AlertTriangle
                                className="w-3 h-3"
                                strokeWidth={1.5}
                              />
                            )}
                            {stock !== undefined ? stock : "—"}
                          </span>
                        )}
                      </td>

                      {/* Price cell — inline editable */}
                      <td
                        className="px-4 py-3 text-right cursor-pointer"
                        onClick={() =>
                          !isEditingPrice &&
                          startEdit(product.slug, "price", stock, price)
                        }
                      >
                        {isEditingPrice ? (
                          <div className="inline-flex items-center gap-1">
                            <span className="text-sm text-[#6b655e]">$</span>
                            <input
                              type="number"
                              step="0.01"
                              autoFocus
                              value={draft.price}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  price: e.target.value,
                                }))
                              }
                              onBlur={commitEdit}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit()
                                if (e.key === "Escape") setEditing(null)
                              }}
                              className="w-28 px-2 py-1 bg-white border border-[#d4a843] text-right text-sm text-[#1a1612] focus:outline-none focus:ring-1 focus:ring-[#d4a843]"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-[#1a1612] tabular-nums">
                            {price !== undefined ? (
                              formatPrice(price)
                            ) : (
                              <span className="italic text-[#a8a198]">
                                Quote
                              </span>
                            )}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2 py-1 border ${
                            status === "active"
                              ? "text-[#1a6b3c] border-[#1a6b3c]/30 bg-[#1a6b3c]/10"
                              : status === "draft"
                                ? "text-[#b8933a] border-[#d4a843]/30 bg-[#d4a843]/10"
                                : "text-[#c0392b] border-[#c0392b]/30 bg-[#c0392b]/10"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              status === "active"
                                ? "bg-[#1a6b3c]"
                                : status === "draft"
                                  ? "bg-[#d4a843]"
                                  : "bg-[#c0392b]"
                            }`}
                          />
                          {status.replace("-", " ")}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Saved toast */}
        {savedToast && (
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-[#1a6b3c] text-white text-xs tracking-[0.15em] uppercase shadow-lg">
            <Save className="w-3.5 h-3.5" strokeWidth={1.5} />
            Saved
          </div>
        )}
      </div>
    </div>
  )
}
