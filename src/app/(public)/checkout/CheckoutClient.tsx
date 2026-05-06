"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Store,
  Truck,
  Package,
  Lock,
  ArrowRight,
  Check,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
} from "lucide-react"
import { useCart } from "@/hooks/useCart"
import {
  DEFAULT_SETTINGS,
  calcSubtotal,
  calcFulfillmentCost,
  calcTax,
  formatPrice,
  type FulfillmentMethod,
  type Order,
  type Customer,
} from "@/lib/commerce"

const FULFILLMENT_OPTIONS: {
  value: FulfillmentMethod
  label: string
  blurb: string
  detail: string
  icon: typeof Store
}[] = [
  {
    value: "pickup",
    label: "Showroom Pickup",
    blurb: "Free — Always",
    detail: "Pick up at 2525 W Jefferson Blvd, Fort Wayne, IN. Ready in 1-3 business days.",
    icon: Store,
  },
  {
    value: "delivery",
    label: "Local Delivery",
    blurb: "Free over $1,999",
    detail: "White-glove delivery within 30 miles of Fort Wayne. We bring it inside, place it where you want.",
    icon: Truck,
  },
  {
    value: "shipping",
    label: "Ship Nationwide",
    blurb: "From $99",
    detail: "FedEx or freight depending on weight. Free shipping on orders over $999. Tracking included.",
    icon: Package,
  },
]

type Step = "review" | "details" | "payment" | "complete"

export function CheckoutClient() {
  const { items, clear } = useCart()
  const [hydrated, setHydrated] = useState(false)
  const [step, setStep] = useState<Step>("review")
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("pickup")
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", city: "", state: "IN", zip: "" },
  })
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const subtotal = useMemo(() => calcSubtotal(items), [items])
  const fulfillmentCost = useMemo(
    () => calcFulfillmentCost(fulfillment, subtotal, DEFAULT_SETTINGS),
    [fulfillment, subtotal],
  )
  const tax = useMemo(() => calcTax(subtotal, DEFAULT_SETTINGS), [subtotal])
  const total = subtotal + fulfillmentCost + tax

  const requiresAddress = fulfillment !== "pickup"

  function validateDetails(): boolean {
    const e: Record<string, string> = {}
    if (!customer.name.trim()) e.name = "Required"
    if (!customer.email.trim()) e.email = "Required"
    else if (!/\S+@\S+\.\S+/.test(customer.email)) e.email = "Invalid email"
    if (!customer.phone.trim()) e.phone = "Required"
    if (requiresAddress) {
      if (!customer.address?.line1?.trim()) e.line1 = "Required"
      if (!customer.address?.city?.trim()) e.city = "Required"
      if (!customer.address?.zip?.trim()) e.zip = "Required"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleProceedFromDetails() {
    if (!validateDetails()) return
    setStep("payment")
  }

  /**
   * In production: this is where we'd POST to a backend that creates a
   * Stripe Checkout Session (or Square Payment) and redirects.
   * For demo, we save to localStorage and show success.
   */
  function handleCompleteDemo() {
    const order: Order = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items,
      fulfillment,
      fulfillmentCost,
      subtotalCents: subtotal,
      taxCents: tax,
      totalCents: total,
      status: "paid",
      processor: "demo",
      notes: notes.trim() || undefined,
    }
    // Persist for the admin Orders page
    try {
      const existing = JSON.parse(
        window.localStorage.getItem("ace-orders") ?? "[]",
      )
      window.localStorage.setItem(
        "ace-orders",
        JSON.stringify([order, ...existing]),
      )
    } catch {
      /* ignore */
    }
    clear()
    setCompletedOrder(order)
    setStep("complete")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Empty cart state
  if (hydrated && items.length === 0 && step !== "complete") {
    return (
      <div className="bg-[#faf8f3] min-h-[80vh] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/30 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-9 h-9 text-[#b8933a]" />
          </div>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1a1612] mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#6b655e] mb-8">
            Find something you love in the collection, then come back to check out.
          </p>
          <Link href="/billiards" className="btn-primary">
            Browse the Collection
          </Link>
        </div>
      </div>
    )
  }

  // Success state
  if (step === "complete" && completedOrder) {
    return <CheckoutComplete order={completedOrder} />
  }

  return (
    <div className="bg-[#faf8f3] min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#6b655e] hover:text-[#b8933a] transition-colors">
            Home
          </Link>
          <span className="text-[#a8a198]">/</span>
          <span className="text-[#1a1612]">Checkout</span>
        </div>
      </div>

      <header className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <p className="section-number mb-3">/ CHECKOUT</p>
        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1a1612]">
          Almost yours.
        </h1>
      </header>

      {/* Step indicator */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <ol className="flex items-center gap-2">
          {(["review", "details", "payment"] as Step[]).map((s, i) => {
            const active = step === s
            const done = ["review", "details", "payment"].indexOf(step) > i
            return (
              <li key={s} className="flex items-center gap-2 flex-1">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    done
                      ? "bg-[#1a6b3c] text-white"
                      : active
                        ? "ace-gradient-bg text-white"
                        : "bg-white border border-[#1a1612]/15 text-[#a8a198]"
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <span
                  className={`text-xs font-display tracking-[0.15em] uppercase ${
                    active || done ? "text-[#1a1612]" : "text-[#a8a198]"
                  }`}
                >
                  {s === "review" ? "Review" : s === "details" ? "Details" : "Payment"}
                </span>
                {i < 2 && (
                  <span
                    className={`flex-1 h-px ${done ? "bg-[#1a6b3c]" : "bg-[#1a1612]/10"}`}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {step === "review" && (
              <motion.section
                key="review"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-[#1a1612]/8 p-6 lg:p-8"
              >
                <h2 className="font-playfair text-2xl font-bold text-[#1a1612] mb-6">
                  Review your order
                </h2>

                {/* Cart items */}
                <ul className="space-y-5">
                  {items.map((line) => {
                    const addonsTotal = line.addons.reduce(
                      (s, a) => s + a.price,
                      0,
                    )
                    const lineTotal = (line.unitPrice + addonsTotal) * line.quantity
                    return (
                      <li
                        key={line.lineId}
                        className="flex gap-4 pb-5 border-b border-[#1a1612]/8 last:border-b-0 last:pb-0"
                      >
                        <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 overflow-hidden bg-[#faf8f3] border border-[#1a1612]/8">
                          <Image
                            src={line.productImage}
                            alt={line.productName}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-display tracking-[0.2em] text-[#b8933a] uppercase mb-0.5">
                            {line.brandName}
                          </p>
                          <p className="font-playfair text-base lg:text-lg text-[#1a1612] leading-tight">
                            {line.productName}
                          </p>
                          <p className="text-xs text-[#6b655e] mt-1">
                            Qty {line.quantity}
                          </p>
                          {line.addons.length > 0 && (
                            <ul className="mt-2 space-y-0.5">
                              {line.addons.map((a) => (
                                <li
                                  key={a.id}
                                  className="text-xs text-[#6b655e]"
                                >
                                  + {a.name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <span className="font-playfair text-lg font-bold text-[#1a1612] flex-shrink-0">
                          {formatPrice(lineTotal)}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/billiards" className="btn-secondary">
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => setStep("details")}
                    className="btn-primary group flex-1 justify-center"
                  >
                    Continue to Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.section>
            )}

            {step === "details" && (
              <motion.section
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Fulfillment selector */}
                <div className="bg-white border border-[#1a1612]/8 p-6 lg:p-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#1a1612] mb-2">
                    How would you like to receive it?
                  </h2>
                  <p className="text-sm text-[#6b655e] mb-6">
                    Pickup is always free. Delivery is free over $1,999. Shipping
                    is free over $999.
                  </p>
                  <div className="space-y-3">
                    {FULFILLMENT_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      const selected = fulfillment === opt.value
                      const cost = calcFulfillmentCost(
                        opt.value,
                        subtotal,
                        DEFAULT_SETTINGS,
                      )
                      return (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-4 p-4 lg:p-5 border cursor-pointer transition-all ${
                            selected
                              ? "border-[#d4a843] bg-[#d4a843]/5"
                              : "border-[#1a1612]/8 hover:border-[#1a1612]/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="fulfillment"
                            value={opt.value}
                            checked={selected}
                            onChange={() => setFulfillment(opt.value)}
                            className="sr-only peer"
                          />
                          <span
                            className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                              selected
                                ? "border-[#d4a843]"
                                : "border-[#1a1612]/25"
                            }`}
                          >
                            {selected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#d4a843]" />
                            )}
                          </span>
                          <Icon className="w-5 h-5 text-[#b8933a] mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="font-playfair text-lg text-[#1a1612]">
                                {opt.label}
                              </span>
                              <span className="font-display tracking-[0.1em] text-sm uppercase text-[#1a1612]">
                                {cost === 0 ? "Free" : formatPrice(cost)}
                              </span>
                            </div>
                            <p className="text-xs text-[#6b655e] mt-1 leading-relaxed">
                              {opt.detail}
                            </p>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Customer details */}
                <div className="bg-white border border-[#1a1612]/8 p-6 lg:p-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#1a1612] mb-6">
                    Your details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Full Name"
                      required
                      value={customer.name}
                      onChange={(v) => setCustomer({ ...customer, name: v })}
                      error={errors.name}
                    />
                    <Field
                      label="Phone"
                      required
                      type="tel"
                      value={customer.phone}
                      onChange={(v) => setCustomer({ ...customer, phone: v })}
                      error={errors.phone}
                    />
                    <Field
                      label="Email"
                      required
                      type="email"
                      value={customer.email}
                      onChange={(v) => setCustomer({ ...customer, email: v })}
                      error={errors.email}
                      className="sm:col-span-2"
                    />
                  </div>

                  {requiresAddress && (
                    <div className="mt-6 pt-6 border-t border-[#1a1612]/8">
                      <p className="eyebrow mb-4">
                        {fulfillment === "delivery" ? "Delivery Address" : "Shipping Address"}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                        <Field
                          label="Street Address"
                          required
                          value={customer.address?.line1 ?? ""}
                          onChange={(v) =>
                            setCustomer({
                              ...customer,
                              address: { ...customer.address!, line1: v },
                            })
                          }
                          error={errors.line1}
                          className="sm:col-span-6"
                        />
                        <Field
                          label="Apt / Suite"
                          value={customer.address?.line2 ?? ""}
                          onChange={(v) =>
                            setCustomer({
                              ...customer,
                              address: { ...customer.address!, line2: v },
                            })
                          }
                          className="sm:col-span-2"
                        />
                        <Field
                          label="City"
                          required
                          value={customer.address?.city ?? ""}
                          onChange={(v) =>
                            setCustomer({
                              ...customer,
                              address: { ...customer.address!, city: v },
                            })
                          }
                          error={errors.city}
                          className="sm:col-span-2"
                        />
                        <Field
                          label="State"
                          required
                          value={customer.address?.state ?? "IN"}
                          onChange={(v) =>
                            setCustomer({
                              ...customer,
                              address: { ...customer.address!, state: v },
                            })
                          }
                          className="sm:col-span-1"
                        />
                        <Field
                          label="ZIP"
                          required
                          value={customer.address?.zip ?? ""}
                          onChange={(v) =>
                            setCustomer({
                              ...customer,
                              address: { ...customer.address!, zip: v },
                            })
                          }
                          error={errors.zip}
                          className="sm:col-span-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-[#1a1612]/8">
                    <label className="block">
                      <span className="block text-xs font-display tracking-[0.15em] uppercase text-[#6b655e] mb-2">
                        Notes (optional)
                      </span>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Stairs to navigate, gate code, preferred install times…"
                        className="w-full bg-white border border-[#1a1612]/15 px-4 py-3 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] outline-none transition-colors text-sm"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setStep("review")}
                    className="btn-secondary"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handleProceedFromDetails}
                    className="btn-primary group flex-1 justify-center"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.section>
            )}

            {step === "payment" && (
              <motion.section
                key="payment"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-white border border-[#1a1612]/8 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-playfair text-2xl font-bold text-[#1a1612]">
                      Payment
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[10px] font-display tracking-[0.2em] uppercase text-[#1a6b3c] px-2 py-0.5 bg-[#1a6b3c]/10 rounded">
                      <Lock className="w-2.5 h-2.5" />
                      Secure
                    </span>
                  </div>
                  <p className="text-sm text-[#6b655e] mb-6">
                    Final step. Card details handled by our payment processor —
                    we never see them.
                  </p>

                  {/* Demo notice */}
                  <div className="bg-[#d4a843]/10 border border-[#d4a843]/30 p-4 mb-6 rounded">
                    <div className="flex gap-3">
                      <CreditCard className="w-5 h-5 text-[#b8933a] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-[#1a1612] mb-1">
                          Demo mode — no real charge
                        </p>
                        <p className="text-[#6b655e] text-xs leading-relaxed">
                          In production, clicking Place Order routes to{" "}
                          <span className="font-mono">Stripe Checkout</span> or{" "}
                          <span className="font-mono">Square Payments</span> with
                          the cart pre-loaded. Admin chooses the processor in
                          Settings.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mock card form */}
                  <div className="space-y-4">
                    <Field
                      label="Card Number"
                      value="4242 4242 4242 4242"
                      onChange={() => {}}
                      placeholder="1234 5678 9012 3456"
                      readOnly
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <Field
                        label="Expires"
                        value="12 / 30"
                        onChange={() => {}}
                        readOnly
                      />
                      <Field
                        label="CVC"
                        value="•••"
                        onChange={() => {}}
                        readOnly
                      />
                      <Field
                        label="ZIP"
                        value={customer.address?.zip ?? "46802"}
                        onChange={() => {}}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-[#6b655e]">
                    <ShieldCheck className="w-4 h-4 text-[#1a6b3c]" />
                    Encrypted, PCI-compliant, never stored on our servers.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setStep("details")}
                    className="btn-secondary"
                  >
                    Back to Details
                  </button>
                  <button
                    onClick={handleCompleteDemo}
                    className="btn-primary group flex-1 justify-center"
                  >
                    <Lock className="w-4 h-4" />
                    Place Order — {formatPrice(total)}
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar — order summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-[#1a1612]/8 p-6 lg:p-7 lg:sticky lg:top-28">
            <h3 className="font-playfair text-xl font-bold text-[#1a1612] mb-5">
              Order Summary
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#6b655e]">Subtotal</dt>
                <dd className="text-[#1a1612] font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6b655e]">
                  {fulfillment === "pickup"
                    ? "Pickup"
                    : fulfillment === "delivery"
                      ? "Local delivery"
                      : "Shipping"}
                </dt>
                <dd className="text-[#1a1612] font-medium">
                  {fulfillmentCost === 0 ? "Free" : formatPrice(fulfillmentCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6b655e]">Tax (7%)</dt>
                <dd className="text-[#1a1612] font-medium">{formatPrice(tax)}</dd>
              </div>
              <div className="pt-3 border-t border-[#1a1612]/8 flex justify-between items-baseline">
                <dt className="font-playfair text-base text-[#1a1612]">Total</dt>
                <dd className="font-playfair text-2xl font-bold text-[#1a1612]">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 pt-6 border-t border-[#1a1612]/8 space-y-2 text-[11px] text-[#6b655e]">
              <p className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#1a6b3c]" />
                Wells Fargo financing available
              </p>
              <p className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#1a6b3c]" />
                Price match guarantee
              </p>
              <p className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#1a6b3c]" />
                Lifetime support on premium tables
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
  className?: string
  readOnly?: boolean
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  placeholder,
  className = "",
  readOnly = false,
}: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-display tracking-[0.15em] uppercase text-[#6b655e]">
          {label}
          {required && <span className="text-[#c0392b] ml-1">*</span>}
        </span>
        {error && <span className="text-[10px] text-[#c0392b]">{error}</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full bg-white border px-4 py-3 text-[#1a1612] placeholder-[#a8a198] outline-none transition-colors text-sm ${
          error
            ? "border-[#c0392b] focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b]"
            : "border-[#1a1612]/15 focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843]"
        } ${readOnly ? "bg-[#faf8f3] cursor-not-allowed" : ""}`}
      />
    </label>
  )
}

function CheckoutComplete({ order }: { order: Order }) {
  return (
    <div className="bg-[#faf8f3] min-h-[80vh] py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="w-20 h-20 rounded-full ace-gradient-bg flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>

        <p className="eyebrow mb-3">ORDER #{order.id.split("_")[1]}</p>
        <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] mb-6">
          Thank you, {order.customer.name.split(" ")[0]}.
        </h1>
        <p className="text-lg text-[#6b655e] mb-10 leading-relaxed">
          We&apos;ve sent a confirmation to{" "}
          <span className="text-[#1a1612] font-medium">{order.customer.email}</span>.
          {" "}
          {order.fulfillment === "pickup"
            ? "We'll text you the moment your order is ready for pickup."
            : order.fulfillment === "delivery"
              ? "Our delivery team will reach out to schedule a window."
              : "Tracking info arrives within 24 hours."}
        </p>

        <div className="bg-white border border-[#1a1612]/8 p-6 lg:p-8 text-left mb-8">
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="eyebrow mb-1">Total</p>
              <p className="font-playfair text-2xl font-bold text-[#1a1612]">
                {formatPrice(order.totalCents)}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-1">Method</p>
              <p className="font-medium text-[#1a1612] capitalize">
                {order.fulfillment === "pickup"
                  ? "Showroom pickup"
                  : order.fulfillment === "delivery"
                    ? "Local delivery"
                    : "Nationwide shipping"}
              </p>
            </div>
            <div className="col-span-2 pt-4 border-t border-[#1a1612]/8">
              <p className="eyebrow mb-2">Items ({order.items.length})</p>
              <ul className="space-y-1 text-[#1a1612]">
                {order.items.map((i) => (
                  <li key={i.lineId} className="flex justify-between gap-3">
                    <span className="truncate">
                      {i.productName}
                      {i.quantity > 1 ? ` × ${i.quantity}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-secondary">
            Return Home
          </Link>
          <Link href="/billiards" className="btn-primary group">
            Keep Shopping
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
