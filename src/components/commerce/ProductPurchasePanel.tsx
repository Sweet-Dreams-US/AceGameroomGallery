"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Minus,
  ShoppingBag,
  Check,
  AlertCircle,
  ArrowUpRight,
  Truck,
  Store,
  Package,
} from "lucide-react"
import {
  cartLineId,
  formatPrice,
  type CartLine,
  type FulfillmentMethod,
} from "@/lib/commerce"
import {
  ADDON_GROUP_LABELS,
  getAddonsForProduct,
  groupAddons,
} from "@/lib/addons-data"
import { useCart, useCartDrawer } from "@/hooks/useCart"
import { PriceTag } from "./PriceTag"
import type { MockProduct } from "@/lib/mock-data"

interface ProductPurchasePanelProps {
  product: MockProduct
}

const FULFILLMENT_META: Record<
  FulfillmentMethod,
  { label: string; sub: string; icon: typeof Store }
> = {
  pickup: {
    label: "Pickup",
    sub: "Free at our showroom",
    icon: Store,
  },
  delivery: {
    label: "Local Delivery",
    sub: "Free over $1,999",
    icon: Truck,
  },
  shipping: {
    label: "Ship Nationwide",
    sub: "Calculated at checkout",
    icon: Package,
  },
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addItem } = useCart()
  const { open } = useCartDrawer()

  const [quantity, setQuantity] = useState(1)
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(
    new Set(),
  )
  const [justAdded, setJustAdded] = useState(false)

  // Resolve which addons apply to this product
  const allAddons = useMemo(
    () => getAddonsForProduct(product.categorySlug, product.addonGroups),
    [product.categorySlug, product.addonGroups],
  )
  const addonGroups = useMemo(() => groupAddons(allAddons), [allAddons])

  const selectedAddons = useMemo(
    () => allAddons.filter((a) => selectedAddonIds.has(a.id)),
    [allAddons, selectedAddonIds],
  )

  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0)
  const lineTotal =
    product.price !== undefined ? (product.price + addonsTotal) * quantity : 0

  const fulfillment: FulfillmentMethod[] =
    product.fulfillment ?? ["pickup", "delivery", "shipping"]

  // High-ticket "request quote" mode
  if (product.price === undefined) {
    return (
      <div className="space-y-6">
        <PriceTag price={undefined} size="xl" />
        <p className="text-sm text-[#6b655e] leading-relaxed">
          Pricing for this piece varies by configuration. Request a quote and
          we&apos;ll walk you through finishes, sizing, and install scheduling.
        </p>
        <Link
          href={`/contact?product=${product.slug}`}
          className="btn-primary w-full justify-center group"
        >
          Request a Quote
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <Link href="/contact" className="btn-secondary w-full justify-center">
          Visit Showroom to See In Person
        </Link>
      </div>
    )
  }

  const stockStatus =
    product.stock === undefined
      ? "in-stock"
      : product.stock === 0
        ? "out"
        : product.stock <= 2
          ? "low"
          : "in-stock"

  function toggleAddon(id: string) {
    setSelectedAddonIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAddToCart() {
    if (product.price === undefined) return
    const line: CartLine = {
      lineId: cartLineId(product.id, [...selectedAddonIds]),
      productId: product.id,
      productSlug: product.slug,
      categorySlug: product.categorySlug,
      productName: product.name,
      productImage: product.imageUrl,
      brandName: product.brandName,
      unitPrice: product.price,
      quantity,
      addons: selectedAddons.map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
      })),
    }
    addItem(line)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 2200)
  }

  return (
    <div className="space-y-6">
      {/* Price + stock status */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PriceTag
          price={product.price}
          comparePrice={product.comparePrice}
          size="xl"
        />
        <StockBadge status={stockStatus} count={product.stock} />
      </div>

      {/* Fulfillment options */}
      <div className="border-t border-[#1a1612]/8 pt-6">
        <p className="eyebrow mb-4">Fulfillment</p>
        <div className="grid grid-cols-3 gap-2">
          {(["pickup", "delivery", "shipping"] as const).map((method) => {
            const available = fulfillment.includes(method)
            const meta = FULFILLMENT_META[method]
            const Icon = meta.icon
            return (
              <div
                key={method}
                className={`text-center px-2 py-3 border ${
                  available
                    ? "border-[#d4a843]/40 bg-[#d4a843]/5"
                    : "border-[#1a1612]/10 bg-[#1a1612]/[0.02] opacity-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 mx-auto mb-1.5 ${available ? "text-[#b8933a]" : "text-[#a8a198]"}`}
                />
                <div
                  className={`text-[11px] font-display tracking-[0.15em] uppercase ${available ? "text-[#1a1612]" : "text-[#a8a198]"}`}
                >
                  {meta.label}
                </div>
                <div className="text-[10px] text-[#6b655e] mt-0.5 leading-tight">
                  {available ? meta.sub : "Not available"}
                </div>
              </div>
            )
          })}
        </div>
        {product.requiresInstall && (
          <p className="mt-3 text-[11px] text-[#6b655e] flex items-start gap-1.5">
            <AlertCircle className="w-3 h-3 text-[#b8933a] mt-0.5 flex-shrink-0" />
            Slate item — professional install required. Add it below or we&apos;ll
            include it on the quote.
          </p>
        )}
      </div>

      {/* Addons */}
      {Object.keys(addonGroups).length > 0 && (
        <div className="border-t border-[#1a1612]/8 pt-6 space-y-5">
          {Object.entries(addonGroups).map(([groupKey, addons]) => (
            <div key={groupKey}>
              <p className="eyebrow mb-3">
                {ADDON_GROUP_LABELS[groupKey] ?? groupKey}
              </p>
              <div className="space-y-2">
                {addons.map((addon) => {
                  const checked = selectedAddonIds.has(addon.id)
                  return (
                    <label
                      key={addon.id}
                      className={`group flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                        checked
                          ? "border-[#d4a843] bg-[#d4a843]/5"
                          : "border-[#1a1612]/8 hover:border-[#1a1612]/20 bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(addon.id)}
                        className="sr-only peer"
                      />
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors ${
                          checked
                            ? "bg-[#d4a843] border-[#d4a843]"
                            : "border-[#1a1612]/30 group-hover:border-[#1a1612]/50"
                        }`}
                      >
                        {checked && (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-medium text-[#1a1612]">
                            {addon.name}
                          </span>
                          <span className="text-sm font-semibold text-[#1a1612] flex-shrink-0">
                            +{formatPrice(addon.price)}
                          </span>
                        </span>
                        <span className="block text-xs text-[#6b655e] mt-0.5 leading-snug">
                          {addon.description}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity + Total */}
      <div className="border-t border-[#1a1612]/8 pt-6 flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Quantity</p>
          <div className="inline-flex items-center border border-[#1a1612]/15">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-2.5 hover:text-[#c0392b] transition-colors disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-5 text-base font-medium text-[#1a1612] min-w-[44px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2.5 hover:text-[#b8933a] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="eyebrow mb-2">Total</p>
          <PriceTag price={lineTotal} size="lg" />
        </div>
      </div>

      {/* Add to cart */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={stockStatus === "out"}
          className="btn-primary w-full justify-center group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {stockStatus === "out" ? "Out of Stock" : "Add to Cart"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={open}
          className="btn-secondary w-full justify-center"
        >
          View Cart
        </button>
      </div>

      {/* Trust strip */}
      <div className="pt-6 border-t border-[#1a1612]/8 grid grid-cols-2 gap-3 text-xs">
        <TrustItem label="Free pickup at showroom" />
        <TrustItem label="Pro install available" />
        <TrustItem label="Wells Fargo financing" />
        <TrustItem label="Price match guarantee" />
      </div>
    </div>
  )
}

function StockBadge({
  status,
  count,
}: {
  status: "in-stock" | "low" | "out"
  count?: number
}) {
  if (status === "out") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.2em] uppercase text-[#c0392b]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b]" />
        Out of stock
      </span>
    )
  }
  if (status === "low") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.2em] uppercase text-[#b8933a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b8933a] animate-pulse" />
        Only {count} left
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-display tracking-[0.2em] uppercase text-[#1a6b3c]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#1a6b3c]" />
      In stock
    </span>
  )
}

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2 text-[#6b655e]">
      <Check className="w-3.5 h-3.5 text-[#b8933a] mt-0.5 flex-shrink-0" />
      <span>{label}</span>
    </div>
  )
}
