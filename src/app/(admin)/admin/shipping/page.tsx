"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Truck,
  Package,
  Receipt,
  CreditCard,
  Plus,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import {
  getObject,
  setObject,
  seedObject,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import {
  DEFAULT_SETTINGS,
  type CommerceSettings,
  type Processor,
} from "@/lib/commerce"
import { getAllProducts } from "@/lib/commerce-overlay"

type Tab = "shipping" | "delivery" | "tax" | "processor"

const TABS: { value: Tab; label: string; icon: typeof Truck }[] = [
  { value: "shipping", label: "Shipping", icon: Package },
  { value: "delivery", label: "Local Delivery", icon: Truck },
  { value: "tax", label: "Tax", icon: Receipt },
  { value: "processor", label: "Processor", icon: CreditCard },
]

export default function AdminShippingPage() {
  const [tab, setTab] = useState<Tab>("shipping")
  const [settings, setSettings] = useState<CommerceSettings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)
  const [savedToast, setSavedToast] = useState(false)
  const [showSyncModal, setShowSyncModal] = useState(false)

  useEffect(() => {
    const seeded = seedObject<CommerceSettings>(
      STORAGE_KEYS.SETTINGS,
      DEFAULT_SETTINGS,
    )
    setSettings(seeded)
    setLoaded(true)
  }, [])

  const flashSaved = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 1600)
  }

  const save = (next: CommerceSettings) => {
    setObject(STORAGE_KEYS.SETTINGS, next)
    setSettings(next)
    flashSaved()
  }

  return (
    <div className="max-w-[1100px]">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow mb-3">/ Configuration</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
          Shipping & Settings
        </h1>
        <p className="text-[#6b655e] mt-2">
          Configure how customers pay and how their orders ship.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-[#1a1612]/8">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.value
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`relative inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.15em] uppercase transition-colors ${
                active
                  ? "text-[#1a1612]"
                  : "text-[#6b655e] hover:text-[#1a1612]"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  active ? "text-[#b8933a]" : "text-[#6b655e]"
                }`}
                strokeWidth={1.5}
              />
              {t.label}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#d4a843]" />
              )}
            </button>
          )
        })}
      </div>

      {!loaded ? (
        <div className="bg-white border border-[#1a1612]/8 p-10 text-center text-sm text-[#6b655e]">
          Loading settings…
        </div>
      ) : (
        <div className="relative">
          {tab === "shipping" && (
            <ShippingTab settings={settings} onSave={save} />
          )}
          {tab === "delivery" && (
            <DeliveryTab settings={settings} onSave={save} />
          )}
          {tab === "tax" && <TaxTab settings={settings} onSave={save} />}
          {tab === "processor" && (
            <ProcessorTab
              settings={settings}
              onSave={save}
              onSyncOpen={() => setShowSyncModal(true)}
            />
          )}
        </div>
      )}

      {/* Saved toast */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a6b3c] text-white text-xs tracking-[0.15em] uppercase shadow-lg z-50">
          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          Settings saved
        </div>
      )}

      {showSyncModal && (
        <SyncModal
          processor={settings.processor}
          onClose={() => setShowSyncModal(false)}
        />
      )}
    </div>
  )
}

// ============================================================
// Shipping tab
// ============================================================

function ShippingTab({
  settings,
  onSave,
}: {
  settings: CommerceSettings
  onSave: (s: CommerceSettings) => void
}) {
  const [flatRate, setFlatRate] = useState(
    (settings.shipping.flatRateCents / 100).toFixed(2),
  )
  const [freeThreshold, setFreeThreshold] = useState(
    settings.shipping.freeShippingThresholdCents !== undefined
      ? (settings.shipping.freeShippingThresholdCents / 100).toFixed(2)
      : "",
  )
  const [perPound, setPerPound] = useState(
    settings.shipping.perPoundCents !== undefined
      ? String(settings.shipping.perPoundCents)
      : "",
  )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...settings,
      shipping: {
        flatRateCents: Math.round(parseFloat(flatRate || "0") * 100),
        freeShippingThresholdCents: freeThreshold
          ? Math.round(parseFloat(freeThreshold) * 100)
          : undefined,
        perPoundCents: perPound ? parseInt(perPound, 10) : undefined,
      },
    })
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1a1612]/8 p-7">
      <h2 className="font-playfair text-xl text-[#1a1612] mb-1">
        Shipping (Carrier)
      </h2>
      <p className="text-sm text-[#6b655e] mb-7">
        Defaults for boxed-shipping items. Cues, cloth, accessories.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CurrencyField
          label="Flat Rate"
          value={flatRate}
          onChange={setFlatRate}
          hint="Default fallback charge per order."
        />
        <CurrencyField
          label="Free Shipping Threshold"
          value={freeThreshold}
          onChange={setFreeThreshold}
          hint="Free shipping above this subtotal. Leave blank to disable."
        />
        <NumberField
          label="Per-Pound Rate (cents)"
          value={perPound}
          onChange={setPerPound}
          hint="Optional add-on per lb of weight."
          suffix="¢"
        />
      </div>

      <div className="flex justify-end pt-7 mt-7 border-t border-[#1a1612]/8">
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" />
          <span>Save Shipping</span>
        </button>
      </div>
    </form>
  )
}

// ============================================================
// Delivery tab
// ============================================================

function DeliveryTab({
  settings,
  onSave,
}: {
  settings: CommerceSettings
  onSave: (s: CommerceSettings) => void
}) {
  const [flatRate, setFlatRate] = useState(
    (settings.delivery.flatRateCents / 100).toFixed(2),
  )
  const [freeThreshold, setFreeThreshold] = useState(
    settings.delivery.freeThresholdCents !== undefined
      ? (settings.delivery.freeThresholdCents / 100).toFixed(2)
      : "",
  )
  const [serviceArea, setServiceArea] = useState(settings.delivery.serviceArea)
  const [tiers, setTiers] = useState(
    [...(settings.delivery.distanceTiers ?? [])].map((t) => ({
      miles: String(t.upToMiles),
      dollars: (t.cents / 100).toFixed(2),
    })),
  )

  const addTier = () =>
    setTiers((arr) => [...arr, { miles: "", dollars: "" }])
  const removeTier = (i: number) =>
    setTiers((arr) => arr.filter((_, idx) => idx !== i))
  const updateTier = (
    i: number,
    field: "miles" | "dollars",
    value: string,
  ) =>
    setTiers((arr) =>
      arr.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)),
    )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...settings,
      delivery: {
        flatRateCents: Math.round(parseFloat(flatRate || "0") * 100),
        freeThresholdCents: freeThreshold
          ? Math.round(parseFloat(freeThreshold) * 100)
          : undefined,
        serviceArea: serviceArea.trim(),
        distanceTiers: tiers
          .filter((t) => t.miles && t.dollars)
          .map((t) => ({
            upToMiles: parseInt(t.miles, 10),
            cents: Math.round(parseFloat(t.dollars) * 100),
          })),
      },
    })
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1a1612]/8 p-7">
      <h2 className="font-playfair text-xl text-[#1a1612] mb-1">
        Local Delivery
      </h2>
      <p className="text-sm text-[#6b655e] mb-7">
        White-glove delivery within your service area.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
        <CurrencyField
          label="Flat Rate"
          value={flatRate}
          onChange={setFlatRate}
          hint="Default delivery charge."
        />
        <CurrencyField
          label="Free Threshold"
          value={freeThreshold}
          onChange={setFreeThreshold}
          hint="Free above this subtotal."
        />
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
            Service Area
          </label>
          <input
            type="text"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            placeholder="Northeast Indiana"
            className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
          />
          <p className="text-xs text-[#a8a198] mt-1.5">
            Shown on checkout to confirm coverage.
          </p>
        </div>
      </div>

      {/* Distance tiers */}
      <div className="border-t border-[#1a1612]/8 pt-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-playfair text-lg text-[#1a1612]">
              Distance Tiers
            </h3>
            <p className="text-xs text-[#6b655e] mt-1">
              Override the flat rate for trips beyond a given mileage.
            </p>
          </div>
          <button
            type="button"
            onClick={addTier}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-[#6b655e] hover:text-[#b8933a] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            Add Row
          </button>
        </div>

        {tiers.length === 0 ? (
          <p className="text-sm text-[#a8a198] italic">
            No distance tiers — flat rate applies everywhere.
          </p>
        ) : (
          <div className="space-y-2.5">
            {tiers.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
              >
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#a8a198] mb-1">
                    Up to (miles)
                  </label>
                  <input
                    type="number"
                    value={t.miles}
                    onChange={(e) => updateTier(i, "miles", e.target.value)}
                    placeholder="15"
                    className="w-full px-3 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#a8a198] mb-1">
                    Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={t.dollars}
                      onChange={(e) =>
                        updateTier(i, "dollars", e.target.value)
                      }
                      placeholder="49.00"
                      className="w-full pl-8 pr-3 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none text-sm tabular-nums"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeTier(i)}
                  className="p-2.5 text-[#6b655e] hover:text-[#c0392b] hover:bg-[#faf8f3] transition-all mt-5"
                  aria-label="Remove tier"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-7 mt-7 border-t border-[#1a1612]/8">
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" />
          <span>Save Delivery</span>
        </button>
      </div>
    </form>
  )
}

// ============================================================
// Tax tab
// ============================================================

function TaxTab({
  settings,
  onSave,
}: {
  settings: CommerceSettings
  onSave: (s: CommerceSettings) => void
}) {
  const [taxPercent, setTaxPercent] = useState(
    (settings.taxRate * 100).toFixed(2),
  )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const pct = parseFloat(taxPercent || "0")
    onSave({ ...settings, taxRate: pct / 100 })
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1a1612]/8 p-7">
      <h2 className="font-playfair text-xl text-[#1a1612] mb-1">
        Sales Tax
      </h2>
      <p className="text-sm text-[#6b655e] mb-7">
        Applied to all orders at checkout.
      </p>

      <div className="max-w-xs">
        <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
          Tax Rate
        </label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            placeholder="7.00"
            className="w-full pr-8 pl-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
            %
          </span>
        </div>
        <p className="text-xs text-[#a8a198] mt-1.5">
          Indiana statewide rate is 7.00%.
        </p>
      </div>

      <div className="flex justify-end pt-7 mt-7 border-t border-[#1a1612]/8">
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" />
          <span>Save Tax</span>
        </button>
      </div>
    </form>
  )
}

// ============================================================
// Processor tab
// ============================================================

function ProcessorTab({
  settings,
  onSave,
  onSyncOpen,
}: {
  settings: CommerceSettings
  onSave: (s: CommerceSettings) => void
  onSyncOpen: () => void
}) {
  const [processor, setProcessor] = useState<Processor>(settings.processor)
  const [stripeKey, setStripeKey] = useState(
    settings.stripePublishableKey ?? "",
  )
  const [squareApp, setSquareApp] = useState(
    settings.squareApplicationId ?? "",
  )
  const [squareLocation, setSquareLocation] = useState("")
  const [testStatus, setTestStatus] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...settings,
      processor,
      stripePublishableKey: processor === "stripe" ? stripeKey : undefined,
      squareApplicationId: processor === "square" ? squareApp : undefined,
    })
  }

  const handleTestConnection = () => {
    setTestStatus(
      `Demo mode — would call ${processor} API in production. Key prefix: ${(stripeKey || squareApp).slice(0, 8) || "(empty)"}…`,
    )
    setTimeout(() => setTestStatus(null), 4000)
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-[#1a1612]/8 p-7">
      <h2 className="font-playfair text-xl text-[#1a1612] mb-1">
        Payment Processor
      </h2>
      <p className="text-sm text-[#6b655e] mb-7">
        Choose how online payments are collected. Demo mode keeps everything
        local until a backend is wired up.
      </p>

      {/* Radio selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-7">
        <ProcessorRadio
          value="stripe"
          label="Stripe"
          description="Lowest fees, modern checkout."
          selected={processor === "stripe"}
          onSelect={() => setProcessor("stripe")}
        />
        <ProcessorRadio
          value="square"
          label="Square"
          description="Same processor as your in-store POS."
          selected={processor === "square"}
          onSelect={() => setProcessor("square")}
        />
        <ProcessorRadio
          value="demo"
          label="Demo Mode"
          description="No real payments. Orders save locally."
          selected={processor === "demo"}
          onSelect={() => setProcessor("demo")}
        />
      </div>

      {/* Per-processor fields */}
      {processor === "stripe" && (
        <div className="space-y-5 pt-2">
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
              Publishable Key
            </label>
            <input
              type="text"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              placeholder="pk_live_…"
              className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors font-mono text-sm"
            />
            <div className="flex items-start gap-1.5 mt-2 text-xs text-[#a8a198]">
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>
                Secret key lives on backend — never expose it to a static site.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleTestConnection}
            className="btn-secondary !py-2.5 !px-4 text-xs"
          >
            Test Connection
          </button>
          {testStatus && (
            <div className="bg-[#d4a843]/10 border border-[#d4a843]/30 px-4 py-3 text-sm text-[#3d3834]">
              {testStatus}
            </div>
          )}
        </div>
      )}

      {processor === "square" && (
        <div className="space-y-5 pt-2">
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
              Application ID
            </label>
            <input
              type="text"
              value={squareApp}
              onChange={(e) => setSquareApp(e.target.value)}
              placeholder="sq0idp-…"
              className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
              Location ID
            </label>
            <input
              type="text"
              value={squareLocation}
              onChange={(e) => setSquareLocation(e.target.value)}
              placeholder="L1A2B3C4D5E6"
              className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors font-mono text-sm"
            />
            <p className="text-xs text-[#a8a198] mt-2">
              The location to associate orders with — ACE Fort Wayne.
            </p>
          </div>
          <button
            type="button"
            onClick={handleTestConnection}
            className="btn-secondary !py-2.5 !px-4 text-xs"
          >
            Test Connection
          </button>
          {testStatus && (
            <div className="bg-[#d4a843]/10 border border-[#d4a843]/30 px-4 py-3 text-sm text-[#3d3834]">
              {testStatus}
            </div>
          )}
        </div>
      )}

      {processor === "demo" && (
        <div className="bg-[#1a6b3c]/8 border border-[#1a6b3c]/30 p-5 flex items-start gap-3">
          <CheckCircle2
            className="w-5 h-5 text-[#1a6b3c] flex-shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div>
            <h3 className="text-sm text-[#1a6b3c] font-medium tracking-wide mb-1">
              Demo Mode Active
            </h3>
            <p className="text-sm text-[#3d3834]">
              Orders are saved to localStorage only. No real payments are
              processed and no remote API calls happen. Switch to Stripe or
              Square once a backend is provisioned.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 justify-between pt-7 mt-7 border-t border-[#1a1612]/8">
        <button
          type="button"
          onClick={onSyncOpen}
          disabled={processor === "demo"}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.15em] uppercase text-[#b8933a] border border-[#d4a843]/40 hover:bg-[#d4a843]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
          Sync Existing Products
        </button>
        <button type="submit" className="btn-primary">
          <Save className="w-4 h-4" />
          <span>Save Processor</span>
        </button>
      </div>
    </form>
  )
}

// ============================================================
// Reusable inputs
// ============================================================

function CurrencyField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
          $
        </span>
        <input
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full pl-8 pr-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
        />
      </div>
      {hint && <p className="text-xs text-[#a8a198] mt-1.5">{hint}</p>}
    </div>
  )
}

function NumberField({
  label,
  value,
  onChange,
  hint,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
  suffix?: string
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full pr-8 pl-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-[#a8a198] mt-1.5">{hint}</p>}
    </div>
  )
}

function ProcessorRadio({
  label,
  description,
  selected,
  onSelect,
}: {
  value: Processor
  label: string
  description: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left p-5 border transition-all ${
        selected
          ? "bg-gradient-to-br from-[#d4a843]/10 to-[#b8933a]/5 border-[#d4a843]"
          : "bg-white border-[#1a1612]/15 hover:border-[#d4a843]/40"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`w-3 h-3 rounded-full border-2 ${
            selected
              ? "bg-[#d4a843] border-[#d4a843]"
              : "border-[#a8a198]"
          }`}
        />
        <span className="text-sm font-medium text-[#1a1612] tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-xs text-[#6b655e] ml-5">{description}</p>
    </button>
  )
}

function SyncModal({
  processor,
  onClose,
}: {
  processor: Processor
  onClose: () => void
}) {
  const products = useMemo(
    () => getAllProducts().filter((p) => p.price !== undefined),
    [],
  )
  const [syncing, setSyncing] = useState(false)
  const [done, setDone] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setDone(true)
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1612]/40 backdrop-blur-sm px-6"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#1a1612]/8 max-w-2xl w-full shadow-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-7 py-6 border-b border-[#1a1612]/8 flex-shrink-0">
          <div>
            <p className="eyebrow mb-1">/ Demo</p>
            <h3 className="font-playfair text-2xl text-[#1a1612]">
              Sync to {processor === "stripe" ? "Stripe" : "Square"}
            </h3>
            <p className="text-sm text-[#6b655e] mt-1">
              {products.length} products would be created in your{" "}
              {processor === "stripe" ? "Stripe" : "Square"} catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6b655e] hover:text-[#1a1612] hover:bg-[#faf8f3] transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-y-auto p-2 flex-1">
          <ul className="divide-y divide-[#1a1612]/8">
            {products.map((p) => (
              <li
                key={p.slug}
                className="flex items-center justify-between gap-4 px-5 py-3"
              >
                <div className="min-w-0">
                  <div className="text-sm text-[#1a1612] truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-[#a8a198] truncate font-mono">
                    {p.sku || p.slug}
                  </div>
                </div>
                <div className="text-sm text-[#1a1612] tabular-nums whitespace-nowrap">
                  {p.price ? `$${(p.price / 100).toFixed(2)}` : "—"}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-7 py-5 border-t border-[#1a1612]/8 flex items-center justify-between flex-shrink-0">
          {done ? (
            <div className="flex items-center gap-2 text-sm text-[#1a6b3c]">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
              {products.length} products synced (demo).
            </div>
          ) : (
            <p className="text-xs text-[#a8a198]">
              Demo only — no real API call is made.
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary !py-2.5 !px-5 text-xs"
            >
              {done ? "Close" : "Cancel"}
            </button>
            {!done && (
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                className="btn-primary !py-2.5 !px-5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{syncing ? "Syncing…" : "Run Sync"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
