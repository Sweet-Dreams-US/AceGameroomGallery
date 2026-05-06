"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  Download,
  Receipt,
  Truck,
  Store,
  Package,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import {
  getItems,
  seedItems,
  setItems,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { ADMIN_MOCK_ORDERS } from "@/lib/mock-data"
import { formatPrice, type Order, type OrderStatus } from "@/lib/commerce"

const STATUS_FILTERS: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
]

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "text-[#b8933a] border-[#d4a843]/30 bg-[#d4a843]/10",
  paid: "text-[#1d4ed8] border-[#1d4ed8]/30 bg-[#1d4ed8]/10",
  fulfilled: "text-[#1a6b3c] border-[#1a6b3c]/30 bg-[#1a6b3c]/10",
  cancelled: "text-[#6b655e] border-[#6b655e]/30 bg-[#6b655e]/10",
}

const STATUS_DOTS: Record<OrderStatus, string> = {
  pending: "bg-[#d4a843]",
  paid: "bg-[#1d4ed8]",
  fulfilled: "bg-[#1a6b3c]",
  cancelled: "bg-[#6b655e]",
}

const FULFILLMENT_ICONS = {
  pickup: Store,
  delivery: Truck,
  shipping: Package,
} as const

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<OrderStatus | "all">("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = () => {
    const items = getItems<Order>(STORAGE_KEYS.ORDERS, []).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setOrders(items)
  }

  useEffect(() => {
    seedItems<Order>(
      STORAGE_KEYS.ORDERS,
      ADMIN_MOCK_ORDERS as unknown as Order[],
    )
    refresh()
    setLoaded(true)
  }, [])

  const filtered = useMemo(() => {
    if (filter === "all") return orders
    return orders.filter((o) => o.status === filter)
  }, [orders, filter])

  const counts = useMemo(() => {
    const map: Record<string, number> = {
      all: orders.length,
      pending: 0,
      paid: 0,
      fulfilled: 0,
      cancelled: 0,
    }
    for (const o of orders) map[o.status] = (map[o.status] || 0) + 1
    return map
  }, [orders])

  const updateStatus = (id: string, status: OrderStatus) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o))
    setItems(STORAGE_KEYS.ORDERS, next)
    setOrders(next)
  }

  const itemSummary = (order: Order) => {
    if (order.items.length === 0) return "—"
    const first = order.items[0]
    const totalAddons = order.items.reduce((s, i) => s + i.addons.length, 0)
    const restCount =
      order.items.length - 1 + (totalAddons > 0 ? totalAddons : 0)
    if (restCount === 0) return first.productName
    const label =
      order.items.length > 1
        ? `${order.items.length - 1} more item${order.items.length > 2 ? "s" : ""}`
        : `${totalAddons} addon${totalAddons > 1 ? "s" : ""}`
    return `${first.productName} + ${label}`
  }

  const exportCsv = () => {
    const headers = [
      "Order #",
      "Date",
      "Customer",
      "Email",
      "Phone",
      "Items",
      "Fulfillment",
      "Subtotal",
      "Tax",
      "Total",
      "Status",
    ]
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toISOString(),
      o.customer.name,
      o.customer.email,
      o.customer.phone,
      itemSummary(o),
      o.fulfillment,
      (o.subtotalCents / 100).toFixed(2),
      (o.taxCents / 100).toFixed(2),
      (o.totalCents / 100).toFixed(2),
      o.status,
    ])
    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => escape(String(c))).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">/ Commerce</p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612] flex items-baseline gap-3">
            Orders
            {loaded && (
              <span className="text-base font-display tracking-[0.25em] text-[#b8933a]">
                {orders.length}
              </span>
            )}
          </h1>
          <p className="text-[#6b655e] mt-2">
            {loaded ? "Manage incoming orders and fulfillment." : "Loading…"}
          </p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={orders.length === 0}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => {
          const active = filter === s.value
          const count = counts[s.value] ?? 0
          return (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
                active
                  ? "bg-[#1a1612] text-white border-[#1a1612]"
                  : "bg-white text-[#6b655e] border-[#1a1612]/15 hover:border-[#d4a843]/40 hover:text-[#1a1612]"
              }`}
            >
              {s.label}
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

      {/* Table */}
      <div className="bg-white border border-[#1a1612]/8">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Receipt
              className="w-8 h-8 text-[#a8a198] mx-auto mb-4"
              strokeWidth={1.5}
            />
            <h3 className="font-playfair text-lg text-[#1a1612] mb-1">
              {orders.length === 0 ? "No orders yet." : "No matching orders."}
            </h3>
            <p className="text-sm text-[#6b655e]">
              {orders.length === 0
                ? "They'll appear here when customers complete checkout."
                : "Try a different status filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1612]/8 bg-[#faf8f3]">
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Order
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Items
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Fulfillment
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const isOpen = expanded === order.id
                  const FIcon =
                    FULFILLMENT_ICONS[order.fulfillment] || Package
                  return (
                    <Fragment key={order.id}>
                      <tr
                        onClick={() =>
                          setExpanded(isOpen ? null : order.id)
                        }
                        className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-[#1a1612] font-mono">
                          #{order.id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-xs text-[#6b655e] whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#1a1612]">
                            {order.customer.name}
                          </div>
                          <div className="text-xs text-[#a8a198] mt-0.5">
                            {order.customer.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b655e] max-w-[260px]">
                          <span className="truncate block">
                            {itemSummary(order)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#6b655e] capitalize">
                            <FIcon
                              className="w-3.5 h-3.5 text-[#b8933a]"
                              strokeWidth={1.5}
                            />
                            {order.fulfillment}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-[#1a1612] font-medium tabular-nums">
                          {formatPrice(order.totalCents)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2 py-1 border ${STATUS_STYLES[order.status]}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[order.status]}`}
                            />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronDown
                            className={`w-4 h-4 text-[#a8a198] transition-transform ${
                              isOpen ? "rotate-180 text-[#b8933a]" : ""
                            }`}
                            strokeWidth={1.5}
                          />
                        </td>
                      </tr>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.tr
                            key={`${order.id}-exp`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="border-b border-[#1a1612]/8"
                          >
                            <td
                              colSpan={8}
                              className="px-6 py-0 bg-[#faf8f3]"
                            >
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: [0.23, 1, 0.32, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="py-7 grid grid-cols-1 lg:grid-cols-3 gap-7">
                                  {/* Items */}
                                  <div className="lg:col-span-2">
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8933a] mb-3">
                                      Line Items
                                    </p>
                                    <div className="space-y-3">
                                      {order.items.map((item) => (
                                        <div
                                          key={item.lineId}
                                          className="bg-white border border-[#1a1612]/8 p-4"
                                        >
                                          <div className="flex items-baseline justify-between gap-4">
                                            <div className="min-w-0">
                                              <div className="text-sm text-[#1a1612] font-medium truncate">
                                                {item.productName}
                                              </div>
                                              <div className="text-xs text-[#a8a198] mt-0.5">
                                                {item.brandName} · Qty{" "}
                                                {item.quantity}
                                              </div>
                                            </div>
                                            <div className="text-sm text-[#1a1612] tabular-nums whitespace-nowrap">
                                              {formatPrice(
                                                item.unitPrice *
                                                  item.quantity,
                                              )}
                                            </div>
                                          </div>
                                          {item.addons.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-[#1a1612]/8 space-y-1.5">
                                              {item.addons.map((a) => (
                                                <div
                                                  key={a.id}
                                                  className="flex items-baseline justify-between gap-4 text-xs text-[#6b655e]"
                                                >
                                                  <span className="truncate">
                                                    + {a.name}
                                                  </span>
                                                  <span className="tabular-nums whitespace-nowrap">
                                                    {formatPrice(a.price)}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="mt-5 pt-5 border-t border-[#1a1612]/8 space-y-1.5">
                                      <div className="flex justify-between text-sm text-[#6b655e]">
                                        <span>Subtotal</span>
                                        <span className="tabular-nums">
                                          {formatPrice(order.subtotalCents)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-sm text-[#6b655e]">
                                        <span className="capitalize">
                                          {order.fulfillment}
                                        </span>
                                        <span className="tabular-nums">
                                          {formatPrice(order.fulfillmentCost)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-sm text-[#6b655e]">
                                        <span>Tax</span>
                                        <span className="tabular-nums">
                                          {formatPrice(order.taxCents)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-base text-[#1a1612] font-medium pt-2 border-t border-[#1a1612]/8">
                                        <span>Total</span>
                                        <span className="tabular-nums font-playfair text-lg">
                                          {formatPrice(order.totalCents)}
                                        </span>
                                      </div>
                                    </div>

                                    {order.notes && (
                                      <div className="mt-5 p-4 bg-[#d4a843]/8 border border-[#d4a843]/20">
                                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8933a] mb-1.5">
                                          Customer Notes
                                        </p>
                                        <p className="text-sm text-[#3d3834]">
                                          {order.notes}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Customer + actions */}
                                  <div>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8933a] mb-3">
                                      Customer
                                    </p>
                                    <div className="bg-white border border-[#1a1612]/8 p-4 space-y-2.5">
                                      <div>
                                        <div className="text-sm text-[#1a1612] font-medium">
                                          {order.customer.name}
                                        </div>
                                      </div>
                                      <a
                                        href={`mailto:${order.customer.email}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-start gap-2 text-xs text-[#6b655e] hover:text-[#b8933a] transition-colors break-all"
                                      >
                                        <Mail
                                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#b8933a]"
                                          strokeWidth={1.5}
                                        />
                                        {order.customer.email}
                                      </a>
                                      <a
                                        href={`tel:${order.customer.phone}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-start gap-2 text-xs text-[#6b655e] hover:text-[#b8933a] transition-colors"
                                      >
                                        <Phone
                                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#b8933a]"
                                          strokeWidth={1.5}
                                        />
                                        {order.customer.phone}
                                      </a>
                                      {order.customer.address && (
                                        <div className="flex items-start gap-2 text-xs text-[#6b655e] pt-1.5 border-t border-[#1a1612]/8">
                                          <MapPin
                                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#b8933a]"
                                            strokeWidth={1.5}
                                          />
                                          <div>
                                            <div>
                                              {order.customer.address.line1}
                                            </div>
                                            {order.customer.address.line2 && (
                                              <div>
                                                {order.customer.address.line2}
                                              </div>
                                            )}
                                            <div>
                                              {order.customer.address.city},{" "}
                                              {order.customer.address.state}{" "}
                                              {order.customer.address.zip}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 space-y-2">
                                      {order.status !== "fulfilled" &&
                                        order.status !== "cancelled" && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              updateStatus(
                                                order.id,
                                                "fulfilled",
                                              )
                                            }}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-white bg-[#1a6b3c] hover:bg-[#155730] transition-colors"
                                          >
                                            <CheckCircle2
                                              className="w-3.5 h-3.5"
                                              strokeWidth={1.5}
                                            />
                                            Mark Fulfilled
                                          </button>
                                        )}
                                      {order.status !== "cancelled" &&
                                        order.status !== "fulfilled" && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              updateStatus(
                                                order.id,
                                                "cancelled",
                                              )
                                            }}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-[0.15em] uppercase text-[#c0392b] border border-[#c0392b]/30 hover:bg-[#c0392b]/10 transition-colors"
                                          >
                                            <XCircle
                                              className="w-3.5 h-3.5"
                                              strokeWidth={1.5}
                                            />
                                            Cancel Order
                                          </button>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
