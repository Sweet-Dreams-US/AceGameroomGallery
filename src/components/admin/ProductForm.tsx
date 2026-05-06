"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Save,
  Trash2,
  X,
  ArrowLeft,
  Sparkles,
  Truck,
  Store,
  Package,
} from "lucide-react"
import {
  addItem,
  deleteItem,
  updateItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import {
  ADMIN_MOCK_CATEGORIES,
  ADMIN_MOCK_BRANDS,
} from "@/lib/mock-data"
import { slugify } from "@/lib/utils"
import type { Product } from "@/lib/types"

const FULFILLMENT_OPTIONS = [
  { value: "pickup", label: "Pickup", icon: Store },
  { value: "delivery", label: "Local Delivery", icon: Truck },
  { value: "shipping", label: "Shipping", icon: Package },
] as const

const ADDON_GROUP_OPTIONS = [
  { value: "cloth", label: "Cloth & Felt" },
  { value: "install", label: "Install" },
  { value: "cue", label: "Cues" },
  { value: "accessory", label: "Accessory" },
  { value: "warranty", label: "Warranty" },
  { value: "pairing", label: "Pair It With" },
] as const

interface SpecRow {
  id: string
  key: string
  value: string
}

const EMPTY_ROW = (): SpecRow => ({
  id: `row-${Math.random().toString(36).slice(2, 10)}`,
  key: "",
  value: "",
})

function toSpecRows(spec: Record<string, string>): SpecRow[] {
  const entries = Object.entries(spec)
  if (entries.length === 0) {
    return [EMPTY_ROW(), EMPTY_ROW(), EMPTY_ROW()]
  }
  return entries.map(([key, value]) => ({
    id: `row-${key}-${Math.random().toString(36).slice(2, 8)}`,
    key,
    value,
  }))
}

function fromSpecRows(rows: SpecRow[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (const row of rows) {
    if (row.key.trim()) {
      result[row.key.trim()] = row.value
    }
  }
  return result
}

interface Props {
  mode: "new" | "edit"
  initial?: Product
}

export function ProductForm({ mode, initial }: Props) {
  const router = useRouter()

  const [name, setName] = useState(initial?.name ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [slugDirty, setSlugDirty] = useState(Boolean(initial))
  const [categoryId, setCategoryId] = useState(
    initial?.category_id ?? ADMIN_MOCK_CATEGORIES[0]?.id ?? "",
  )
  const [brand, setBrand] = useState(initial?.brand?.name ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [imageUrl, setImageUrl] = useState(
    initial?.images?.[0]?.image_url ?? "",
  )
  const [status, setStatus] = useState<"active" | "draft">(
    initial?.status ?? "active",
  )
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false)
  const [specs, setSpecs] = useState<SpecRow[]>(
    toSpecRows(initial?.specifications ?? {}),
  )
  const [confirmDelete, setConfirmDelete] = useState(false)

  // ---- Commerce fields ----
  const [priceDollars, setPriceDollars] = useState(
    initial?.price !== undefined ? (initial.price / 100).toFixed(2) : "",
  )
  const [comparePriceDollars, setComparePriceDollars] = useState(
    initial?.comparePrice !== undefined
      ? (initial.comparePrice / 100).toFixed(2)
      : "",
  )
  const [stockCount, setStockCount] = useState(
    initial?.stock !== undefined ? String(initial.stock) : "",
  )
  const [sku, setSku] = useState(initial?.sku ?? "")
  const [weightLbs, setWeightLbs] = useState(
    initial?.weightLbs !== undefined ? String(initial.weightLbs) : "",
  )
  const [fulfillment, setFulfillment] = useState<string[]>(
    initial?.fulfillment ?? ["pickup", "delivery", "shipping"],
  )
  const [requiresInstall, setRequiresInstall] = useState(
    initial?.requiresInstall ?? false,
  )
  const [addonGroups, setAddonGroups] = useState<string[]>(
    initial?.addonGroups ?? [],
  )
  const [syncToast, setSyncToast] = useState<string | null>(null)

  const toggleFulfillment = (val: string) =>
    setFulfillment((arr) =>
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    )

  const toggleAddonGroup = (val: string) =>
    setAddonGroups((arr) =>
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    )

  const handleSyncToProcessor = () => {
    const fakeId = `prod_demo_${Math.random().toString(36).slice(2, 10)}`
    setSyncToast(`Synced! Demo Product ID: ${fakeId}`)
    setTimeout(() => setSyncToast(null), 4000)
  }

  // Auto-slug from name until user edits slug manually.
  useEffect(() => {
    if (!slugDirty) {
      setSlug(slugify(name))
    }
  }, [name, slugDirty])

  const addSpec = () => setSpecs((rows) => [...rows, EMPTY_ROW()])
  const removeSpec = (id: string) =>
    setSpecs((rows) => rows.filter((r) => r.id !== id))
  const updateSpec = (id: string, field: "key" | "value", value: string) =>
    setSpecs((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const category = ADMIN_MOCK_CATEGORIES.find((c) => c.id === categoryId)
    const matchedBrand = ADMIN_MOCK_BRANDS.find(
      (b) => b.name.toLowerCase() === brand.trim().toLowerCase(),
    )

    const now = new Date().toISOString()
    const id = initial?.id ?? `prod-${Date.now()}`

    const product: Product = {
      id,
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim(),
      category_id: categoryId,
      brand_id: matchedBrand?.id ?? null,
      specifications: fromSpecRows(specs),
      is_featured: isFeatured,
      status,
      meta_title: initial?.meta_title ?? null,
      meta_description: initial?.meta_description ?? null,
      sort_order: initial?.sort_order ?? 999,
      created_at: initial?.created_at ?? now,
      updated_at: now,
      category: category
        ? {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            image_url: category.image_url,
            parent_id: category.parent_id,
            sort_order: category.sort_order,
            created_at: category.created_at,
            updated_at: category.updated_at,
          }
        : undefined,
      brand: matchedBrand
        ? {
            id: matchedBrand.id,
            name: matchedBrand.name,
            slug: matchedBrand.slug,
            logo_url: matchedBrand.logo_url,
            website_url: matchedBrand.website_url,
            created_at: matchedBrand.created_at,
          }
        : brand
          ? {
              id: `brand-${slugify(brand)}`,
              name: brand,
              slug: slugify(brand),
              logo_url: null,
              website_url: null,
              created_at: now,
            }
          : undefined,
      images: imageUrl
        ? [
            {
              id: initial?.images?.[0]?.id ?? `img-${id}`,
              product_id: id,
              image_url: imageUrl,
              alt_text: name,
              is_primary: true,
              sort_order: 0,
              created_at: initial?.images?.[0]?.created_at ?? now,
            },
          ]
        : [],
      // Commerce
      price:
        priceDollars && !isNaN(parseFloat(priceDollars))
          ? Math.round(parseFloat(priceDollars) * 100)
          : undefined,
      comparePrice:
        comparePriceDollars && !isNaN(parseFloat(comparePriceDollars))
          ? Math.round(parseFloat(comparePriceDollars) * 100)
          : undefined,
      stock:
        stockCount && !isNaN(parseInt(stockCount, 10))
          ? parseInt(stockCount, 10)
          : undefined,
      sku: sku.trim() || undefined,
      weightLbs:
        weightLbs && !isNaN(parseFloat(weightLbs))
          ? parseFloat(weightLbs)
          : undefined,
      fulfillment:
        fulfillment.length > 0
          ? (fulfillment as ("pickup" | "delivery" | "shipping")[])
          : undefined,
      requiresInstall: requiresInstall || undefined,
      addonGroups: addonGroups.length > 0 ? addonGroups : undefined,
      stripeProductId: initial?.stripeProductId,
      squareCatalogId: initial?.squareCatalogId,
    }

    if (mode === "new") {
      addItem(STORAGE_KEYS.PRODUCTS, product)
    } else {
      updateItem(STORAGE_KEYS.PRODUCTS, product)
    }
    router.push("/admin/products")
  }

  const handleDelete = () => {
    if (!initial) return
    deleteItem(STORAGE_KEYS.PRODUCTS, initial.id)
    router.push("/admin/products")
  }

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#6b655e] hover:text-[#b8933a] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to products
          </Link>
          <p className="eyebrow mb-2">
            {mode === "new" ? "/ New" : "/ Edit"}
          </p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
            {mode === "new" ? "Add Product" : "Edit Product"}
          </h1>
        </div>
        {mode === "edit" && initial && (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.15em] uppercase text-[#c0392b] border border-[#c0392b]/30 hover:bg-[#c0392b]/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Details */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-6">
            Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Product name"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value)
                  setSlugDirty(true)
                }}
                placeholder="product-slug"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              >
                {ADMIN_MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Olhausen"
                list="brand-options"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
              <datalist id="brand-options">
                {ADMIN_MOCK_BRANDS.map((b) => (
                  <option key={b.id} value={b.name} />
                ))}
              </datalist>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the product…"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors resize-y"
              />
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-6">
            Primary Image
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5 items-start">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[#a8a198] mt-2">
                Use a full https URL. Demo only — no upload.
              </p>
            </div>
            <div className="relative w-full h-[150px] bg-[#faf8f3] border border-[#1a1612]/8 overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name || "Preview"}
                  fill
                  sizes="200px"
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-[#a8a198] tracking-[0.2em] uppercase">
                  Preview
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-6">
            Visibility
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "active" | "draft")
                }
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none group mt-6">
                <span
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    isFeatured ? "bg-[#d4a843]" : "bg-[#1a1612]/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                      isFeatured ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </span>
                <span className="text-sm text-[#1a1612] tracking-wide">
                  Featured product
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-1">
            Pricing & Inventory
          </h2>
          <p className="text-sm text-[#6b655e] mb-6">
            Leave price blank to render a &ldquo;Request a Quote&rdquo; CTA.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={priceDollars}
                  onChange={(e) => setPriceDollars(e.target.value)}
                  placeholder="999.00"
                  className="w-full pl-8 pr-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Compare-at Price (MSRP)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={comparePriceDollars}
                  onChange={(e) => setComparePriceDollars(e.target.value)}
                  placeholder="1199.00"
                  className="w-full pl-8 pr-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="3"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="OLH-AUG-8FT"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                placeholder="850"
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
              />
              <p className="text-xs text-[#a8a198] mt-1.5">
                Used for shipping calculation.
              </p>
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none mt-2">
                <span
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    requiresInstall ? "bg-[#d4a843]" : "bg-[#1a1612]/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={requiresInstall}
                    onChange={(e) => setRequiresInstall(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                      requiresInstall ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </span>
                <span className="text-sm text-[#1a1612] tracking-wide">
                  Requires professional install
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Fulfillment */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-1">
            Fulfillment
          </h2>
          <p className="text-sm text-[#6b655e] mb-6">
            How customers can receive this product.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FULFILLMENT_OPTIONS.map((opt) => {
              const Icon = opt.icon
              const checked = fulfillment.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleFulfillment(opt.value)}
                  className={`text-left p-4 border transition-all ${
                    checked
                      ? "bg-[#d4a843]/10 border-[#d4a843] text-[#1a1612]"
                      : "bg-white border-[#1a1612]/15 text-[#6b655e] hover:border-[#d4a843]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className={`w-4 h-4 ${
                        checked ? "text-[#b8933a]" : "text-[#6b655e]"
                      }`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`w-3 h-3 border ${
                        checked
                          ? "bg-[#d4a843] border-[#d4a843]"
                          : "border-[#a8a198]"
                      }`}
                    />
                  </div>
                  <div className="text-sm tracking-wide">{opt.label}</div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Addon groups */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <h2 className="font-playfair text-lg text-[#1a1612] mb-1">
            Addon Groups
          </h2>
          <p className="text-sm text-[#6b655e] mb-6">
            Which addon categories appear on the product page for this item.
          </p>
          <div className="flex flex-wrap gap-2">
            {ADDON_GROUP_OPTIONS.map((g) => {
              const checked = addonGroups.includes(g.value)
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => toggleAddonGroup(g.value)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
                    checked
                      ? "bg-[#d4a843]/10 border-[#d4a843] text-[#b8933a]"
                      : "bg-white border-[#1a1612]/15 text-[#6b655e] hover:border-[#d4a843]/40"
                  }`}
                >
                  <span
                    className={`w-3 h-3 border ${
                      checked
                        ? "bg-[#d4a843] border-[#d4a843]"
                        : "border-[#a8a198]"
                    }`}
                  />
                  {g.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-white border border-[#1a1612]/8 p-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-lg text-[#1a1612]">
              Specifications
            </h2>
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-[#6b655e] hover:text-[#b8933a] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              Add Row
            </button>
          </div>
          <div className="space-y-2.5">
            {specs.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center"
              >
                <input
                  type="text"
                  value={row.key}
                  onChange={(e) => updateSpec(row.id, "key", e.target.value)}
                  placeholder="Key (e.g. Table Size)"
                  className="px-3 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm"
                />
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => updateSpec(row.id, "value", e.target.value)}
                  placeholder="Value"
                  className="px-3 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(row.id)}
                  className="p-2.5 text-[#6b655e] hover:text-[#c0392b] hover:bg-[#faf8f3] transition-all"
                  aria-label="Remove spec"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-between pt-2 flex-wrap">
          <button
            type="button"
            onClick={handleSyncToProcessor}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-[#b8933a] border border-[#d4a843]/40 hover:bg-[#d4a843]/10 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            Sync to Stripe / Square
          </button>
          <div className="flex items-center gap-3">
            <Link href="/admin/products" className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4" />
              <span>{mode === "new" ? "Create Product" : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Sync toast */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-4 py-3 bg-[#1a1612] text-white text-sm shadow-2xl z-50 max-w-md">
          <Sparkles className="w-4 h-4 text-[#d4a843]" strokeWidth={1.5} />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Confirm modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1612]/40 backdrop-blur-sm px-6"
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className="bg-white border border-[#1a1612]/8 p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-playfair text-xl text-[#1a1612] mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-[#6b655e] mb-6">
              This will permanently remove &ldquo;{initial?.name}&rdquo;.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
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
