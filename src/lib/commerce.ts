/**
 * E-commerce types and helpers for Ace Game Room Gallery.
 *
 * NOTE: This is a static-site demo. Cart and orders persist via localStorage.
 * Real Stripe / Square integration would require:
 *   - A backend (Vercel Function, Cloudflare Worker, or similar) holding the
 *     secret API key — never the static client.
 *   - Product creation: POST /v1/products and /v1/prices (Stripe) or
 *     POST /v2/catalog/object (Square) at the time the admin creates a product.
 *   - Checkout: Stripe Checkout Sessions or Square Payments API.
 *   - Webhook to flip our local order status to "paid" upon completion.
 *
 * The admin UI surfaces these touchpoints (processor selector, "sync to Stripe"
 * action, webhook URL) so the wiring is obvious when a backend is added.
 */

export type FulfillmentMethod = "pickup" | "delivery" | "shipping"
export type Processor = "stripe" | "square" | "demo"
export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled"

/**
 * Optional commerce fields that augment a MockProduct. We keep these optional
 * because some items (a $7,000 custom Olhausen) genuinely live in the
 * "request a quote" flow rather than buy-online.
 */
export interface ProductCommerce {
  /** Base price in cents. Omit to render "Request a Quote" CTA. */
  price?: number
  /** Strike-through MSRP, in cents. */
  comparePrice?: number
  /** Inventory count. Omit for unlimited / made-to-order. */
  stock?: number
  /** SKU for inventory and fulfillment. */
  sku?: string
  /** Fulfillment methods available for this product. Defaults to all three. */
  fulfillment?: FulfillmentMethod[]
  /** Approximate weight in lbs (used to estimate shipping). */
  weightLbs?: number
  /** Slate tables, playsets, etc. that require an installer. */
  requiresInstall?: boolean
  /** Addon category keys that apply to this product. */
  addonGroups?: string[]
  /** External processor IDs once synced. Demo: faked. */
  stripeProductId?: string
  squareCatalogId?: string
}

export interface ProductAddon {
  id: string
  name: string
  description: string
  /** Price in cents. */
  price: number
  /** Addon group key — 'cloth', 'install', 'cue', 'accessory', 'service', 'warranty'. */
  group: string
  /** Top-level category slugs this addon is offered for. */
  appliesTo: string[]
  /** Optional thumbnail. */
  imageUrl?: string
}

export interface CartLine {
  /** Stable cart-line ID — distinct per (product + addon set). */
  lineId: string
  productId: string
  productSlug: string
  categorySlug: string
  productName: string
  productImage: string
  brandName: string
  unitPrice: number // cents
  quantity: number
  addons: { id: string; name: string; price: number }[]
}

export interface Customer {
  name: string
  email: string
  phone: string
  /** Required for delivery + shipping. */
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
}

export interface Order {
  id: string
  createdAt: string
  customer: Customer
  items: CartLine[]
  fulfillment: FulfillmentMethod
  /** Cost of fulfillment in cents (free for pickup, calculated otherwise). */
  fulfillmentCost: number
  subtotalCents: number
  taxCents: number
  totalCents: number
  status: OrderStatus
  processor: Processor
  /** Notes/instructions from customer. */
  notes?: string
}

/** Settings configurable by admin. */
export interface CommerceSettings {
  processor: Processor
  /** Stripe publishable key — safe to expose. Secret key lives on backend only. */
  stripePublishableKey?: string
  squareApplicationId?: string
  /** Default shipping rules. */
  shipping: {
    /** Flat rate fallback in cents. */
    flatRateCents: number
    /** Free shipping threshold — above this, shipping is free (cents). */
    freeShippingThresholdCents?: number
    /** Per-pound rate (cents per lb). */
    perPoundCents?: number
  }
  /** Local delivery rules. */
  delivery: {
    /** Cost in cents for local delivery. */
    flatRateCents: number
    /** Distance ranges and fees, in miles → cents. */
    distanceTiers?: { upToMiles: number; cents: number }[]
    /** Free delivery threshold. */
    freeThresholdCents?: number
    /** Service area. */
    serviceArea: string
  }
  /** Tax rate as decimal (0.07 = 7%). */
  taxRate: number
}

export const DEFAULT_SETTINGS: CommerceSettings = {
  processor: "demo",
  shipping: {
    flatRateCents: 9900, // $99 flat
    freeShippingThresholdCents: 99900, // free over $999
    perPoundCents: 25, // $0.25/lb add-on
  },
  delivery: {
    flatRateCents: 4900, // $49 local delivery
    distanceTiers: [
      { upToMiles: 15, cents: 4900 },
      { upToMiles: 30, cents: 7900 },
      { upToMiles: 60, cents: 14900 },
    ],
    freeThresholdCents: 199900, // free local delivery over $1,999
    serviceArea: "Northeast Indiana",
  },
  taxRate: 0.07, // 7%
}

/** Format cents as $X,XXX.XX */
export function formatPrice(cents: number | undefined): string {
  if (cents === undefined || cents === null) return ""
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100)
}

/** Compute a stable cart line ID from product + addon ids. */
export function cartLineId(productId: string, addonIds: string[]): string {
  const sorted = [...addonIds].sort().join("-")
  return sorted ? `${productId}__${sorted}` : productId
}

/** Subtotal across cart lines. */
export function calcSubtotal(items: CartLine[]): number {
  return items.reduce((sum, line) => {
    const addonsTotal = line.addons.reduce((s, a) => s + a.price, 0)
    return sum + (line.unitPrice + addonsTotal) * line.quantity
  }, 0)
}

/** Calculate fulfillment cost based on method, subtotal, and settings. */
export function calcFulfillmentCost(
  method: FulfillmentMethod,
  subtotalCents: number,
  settings: CommerceSettings = DEFAULT_SETTINGS,
): number {
  if (method === "pickup") return 0

  if (method === "delivery") {
    if (
      settings.delivery.freeThresholdCents !== undefined &&
      subtotalCents >= settings.delivery.freeThresholdCents
    ) {
      return 0
    }
    return settings.delivery.flatRateCents
  }

  // shipping
  if (
    settings.shipping.freeShippingThresholdCents !== undefined &&
    subtotalCents >= settings.shipping.freeShippingThresholdCents
  ) {
    return 0
  }
  return settings.shipping.flatRateCents
}

export function calcTax(subtotalCents: number, settings: CommerceSettings = DEFAULT_SETTINGS): number {
  return Math.round(subtotalCents * settings.taxRate)
}
