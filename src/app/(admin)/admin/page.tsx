"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Receipt,
  Inbox,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Plus,
  Boxes,
  Settings,
  Truck,
  Store,
  Package,
} from "lucide-react"
import { getItems, seedItems, STORAGE_KEYS } from "@/lib/admin-storage"
import {
  ADMIN_MOCK_PRODUCTS,
  ADMIN_MOCK_INQUIRIES,
  ADMIN_MOCK_BANNERS,
  ADMIN_MOCK_TESTIMONIALS,
  ADMIN_MOCK_ORDERS,
} from "@/lib/mock-data"
import type {
  Product,
  Inquiry,
  HeroBanner,
  Testimonial,
} from "@/lib/types"
import { formatPrice, type Order } from "@/lib/commerce"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    seedItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS)
    seedItems<Inquiry>(STORAGE_KEYS.INQUIRIES, ADMIN_MOCK_INQUIRIES)
    seedItems<HeroBanner>(STORAGE_KEYS.BANNERS, ADMIN_MOCK_BANNERS)
    seedItems<Testimonial>(STORAGE_KEYS.TESTIMONIALS, ADMIN_MOCK_TESTIMONIALS)
    seedItems<Order>(
      STORAGE_KEYS.ORDERS,
      ADMIN_MOCK_ORDERS as unknown as Order[],
    )

    setOrders(getItems<Order>(STORAGE_KEYS.ORDERS, []))
    setInquiries(getItems<Inquiry>(STORAGE_KEYS.INQUIRIES, []))
    setProducts(getItems<Product>(STORAGE_KEYS.PRODUCTS, []))
    setLoaded(true)
  }, [])

  // ---- Stats ----
  const stats = useMemo(() => {
    const paidOrders = orders.filter(
      (o) => o.status === "paid" || o.status === "fulfilled",
    )
    const revenue = paidOrders.reduce((s, o) => s + o.totalCents, 0)
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisMonthOrders = orders.filter(
      (o) => new Date(o.createdAt) >= monthStart,
    )
    const aov =
      paidOrders.length > 0 ? Math.round(revenue / paidOrders.length) : 0
    return {
      revenue,
      monthlyOrders: thisMonthOrders.length,
      aov,
      inquiries: inquiries.length,
    }
  }, [orders, inquiries])

  // ---- 30-day revenue chart ----
  const chartData = useMemo(() => {
    const days: { date: Date; cents: number }[] = []
    const today = startOfDay(new Date())
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      days.push({ date: d, cents: 0 })
    }
    for (const o of orders) {
      if (o.status === "cancelled") continue
      const day = startOfDay(new Date(o.createdAt)).getTime()
      const bucket = days.find((b) => b.date.getTime() === day)
      if (bucket) bucket.cents += o.totalCents
    }
    return days
  }, [orders])

  const chartMax = useMemo(
    () => Math.max(...chartData.map((d) => d.cents), 100),
    [chartData],
  )

  // ---- Recent orders ----
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 8)
  }, [orders])

  // ---- Top products ----
  const topProducts = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string
        image: string
        units: number
        revenueCents: number
      }
    >()
    for (const order of orders) {
      if (order.status === "cancelled") continue
      for (const item of order.items) {
        const cur = map.get(item.productSlug) || {
          name: item.productName,
          image: item.productImage,
          units: 0,
          revenueCents: 0,
        }
        cur.units += item.quantity
        cur.revenueCents += item.unitPrice * item.quantity
        map.set(item.productSlug, cur)
      }
    }
    return Array.from(map.entries())
      .map(([slug, v]) => ({ slug, ...v }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5)
  }, [orders])

  // ---- Fulfillment breakdown ----
  const fulfillmentBreakdown = useMemo(() => {
    const map = { pickup: 0, delivery: 0, shipping: 0 }
    for (const o of orders) {
      if (o.status === "cancelled") continue
      map[o.fulfillment] = (map[o.fulfillment] || 0) + 1
    }
    const total = map.pickup + map.delivery + map.shipping || 1
    return {
      raw: map,
      total,
      pickup: { count: map.pickup, pct: map.pickup / total },
      delivery: { count: map.delivery, pct: map.delivery / total },
      shipping: { count: map.shipping, pct: map.shipping / total },
    }
  }, [orders])

  const statCards = [
    {
      label: "Total Revenue",
      value: loaded ? formatPrice(stats.revenue) : "—",
      icon: DollarSign,
      hint: "Paid + fulfilled",
    },
    {
      label: "Orders This Month",
      value: loaded ? String(stats.monthlyOrders) : "—",
      icon: Receipt,
      hint: "All statuses",
    },
    {
      label: "Avg Order Value",
      value: loaded ? formatPrice(stats.aov) : "—",
      icon: TrendingUp,
      hint: "Across paid orders",
    },
    {
      label: "Inquiries",
      value: loaded ? String(stats.inquiries) : "—",
      icon: Inbox,
      hint: "Quote requests",
    },
  ]

  return (
    <div className="max-w-[1500px]">
      {/* Welcome */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="eyebrow mb-3">/ Overview</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
          Welcome back.
        </h1>
        <p className="text-[#6b655e] mt-2">
          {loaded
            ? `${products.length} products · ${orders.length} orders · ${inquiries.length} inquiries`
            : "Loading insights…"}
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
      >
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white border border-[#1a1612]/8 p-6"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#d4a843]/20 to-[#b8933a]/10 border border-[#d4a843]/30 flex items-center justify-center">
                  <Icon
                    className="w-4 h-4 text-[#b8933a]"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#a8a198]">
                  {card.hint}
                </span>
              </div>
              <div className="font-playfair text-3xl lg:text-4xl text-[#1a1612] leading-none tabular-nums">
                {card.value}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-[#6b655e]">
                {card.label}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Quick actions */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
      >
        <Link href="/admin/products/new" className="btn-primary !py-3">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
        <Link href="/admin/orders" className="btn-secondary !py-3">
          <Receipt className="w-4 h-4" />
          <span>View Orders</span>
        </Link>
        <Link href="/admin/inventory" className="btn-secondary !py-3">
          <Boxes className="w-4 h-4" />
          <span>Inventory</span>
        </Link>
        <Link href="/admin/shipping" className="btn-secondary !py-3">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </motion.div>

      {/* Revenue chart */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white border border-[#1a1612]/8 mb-10"
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#1a1612]/8">
          <div>
            <p className="eyebrow mb-1">/ Trend</p>
            <h2 className="font-playfair text-xl text-[#1a1612]">
              Revenue · Last 30 Days
            </h2>
          </div>
          <div className="text-right">
            <div className="font-playfair text-2xl text-[#1a1612] tabular-nums">
              {formatPrice(chartData.reduce((s, d) => s + d.cents, 0))}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#a8a198]">
              30-day total
            </div>
          </div>
        </div>
        <div className="px-7 py-7">
          <RevenueChart data={chartData} max={chartMax} />
        </div>
      </motion.div>

      {/* Two-col: Recent orders + Top products / Fulfillment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Recent orders */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-white border border-[#1a1612]/8"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1612]/8">
            <div>
              <p className="eyebrow mb-1">/ Activity</p>
              <h2 className="font-playfair text-xl text-[#1a1612]">
                Recent Orders
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs tracking-[0.15em] uppercase text-[#6b655e] hover:text-[#b8933a] transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-10 text-center text-[#6b655e] text-sm">
              No orders yet.
            </div>
          ) : (
            <table className="w-full">
              <tbody>
                {recentOrders.map((o) => {
                  const FIcon =
                    o.fulfillment === "pickup"
                      ? Store
                      : o.fulfillment === "delivery"
                        ? Truck
                        : Package
                  return (
                    <tr
                      key={o.id}
                      className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors"
                    >
                      <td className="px-6 py-3 text-xs text-[#a8a198] font-mono">
                        #{o.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-3">
                        <div className="text-sm text-[#1a1612] truncate max-w-[180px]">
                          {o.customer.name}
                        </div>
                        <div className="text-xs text-[#a8a198] truncate max-w-[180px]">
                          {o.items[0]?.productName}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-xs text-[#6b655e]">
                        <span className="inline-flex items-center gap-1.5">
                          <FIcon
                            className="w-3 h-3 text-[#b8933a]"
                            strokeWidth={1.5}
                          />
                          {o.fulfillment}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="text-sm text-[#1a1612] tabular-nums">
                          {formatPrice(o.totalCents)}
                        </div>
                        <div
                          className={`text-[10px] tracking-[0.2em] uppercase mt-0.5 ${
                            o.status === "paid"
                              ? "text-[#1d4ed8]"
                              : o.status === "fulfilled"
                                ? "text-[#1a6b3c]"
                                : o.status === "cancelled"
                                  ? "text-[#a8a198]"
                                  : "text-[#b8933a]"
                          }`}
                        >
                          {o.status}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Fulfillment donut */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white border border-[#1a1612]/8"
        >
          <div className="px-6 py-5 border-b border-[#1a1612]/8">
            <p className="eyebrow mb-1">/ Mix</p>
            <h2 className="font-playfair text-xl text-[#1a1612]">
              Fulfillment
            </h2>
          </div>
          <div className="p-7 flex flex-col items-center">
            <FulfillmentDonut
              pickup={fulfillmentBreakdown.pickup.pct}
              delivery={fulfillmentBreakdown.delivery.pct}
              shipping={fulfillmentBreakdown.shipping.pct}
            />
            <div className="w-full mt-7 space-y-2.5">
              <DonutLegend
                color="#d4a843"
                label="Delivery"
                count={fulfillmentBreakdown.delivery.count}
                pct={fulfillmentBreakdown.delivery.pct}
                Icon={Truck}
              />
              <DonutLegend
                color="#1a6b3c"
                label="Pickup"
                count={fulfillmentBreakdown.pickup.count}
                pct={fulfillmentBreakdown.pickup.pct}
                Icon={Store}
              />
              <DonutLegend
                color="#1a1612"
                label="Shipping"
                count={fulfillmentBreakdown.shipping.count}
                pct={fulfillmentBreakdown.shipping.pct}
                Icon={Package}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top products */}
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#1a1612]/8"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1612]/8">
          <div>
            <p className="eyebrow mb-1">/ Best Sellers</p>
            <h2 className="font-playfair text-xl text-[#1a1612]">
              Top Products
            </h2>
          </div>
        </div>
        {topProducts.length === 0 ? (
          <div className="p-10 text-center text-[#6b655e] text-sm">
            Sales data will appear here once orders come in.
          </div>
        ) : (
          <ul>
            {topProducts.map((p, i) => (
              <li
                key={p.slug}
                className="flex items-center gap-5 px-6 py-4 border-b border-[#1a1612]/8 last:border-0"
              >
                <span className="font-playfair text-2xl text-[#a8a198] w-8 tabular-nums">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#1a1612] truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-[#a8a198] mt-0.5">
                    {p.units} unit{p.units > 1 ? "s" : ""} sold
                  </div>
                </div>
                <div className="text-sm text-[#1a1612] tabular-nums">
                  {formatPrice(p.revenueCents)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  )
}

// ============================================================
// Subcomponents
// ============================================================

interface ChartDay {
  date: Date
  cents: number
}

function RevenueChart({ data, max }: { data: ChartDay[]; max: number }) {
  const width = 1000
  const height = 220
  const barWidth = width / data.length - 4

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-[220px]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="bar-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a843" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b8933a" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Baseline */}
      <line
        x1="0"
        y1={height - 1}
        x2={width}
        y2={height - 1}
        stroke="#1a1612"
        strokeOpacity="0.06"
      />

      {data.map((d, i) => {
        const h = max > 0 ? (d.cents / max) * (height - 12) : 0
        const x = i * (barWidth + 4)
        const y = height - h
        return (
          <g key={i}>
            {h > 0 && (
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                fill="url(#bar-gold)"
                rx="1"
              >
                <title>
                  {d.date.toLocaleDateString()}: {formatPrice(d.cents)}
                </title>
              </rect>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function FulfillmentDonut({
  pickup,
  delivery,
  shipping,
}: {
  pickup: number
  delivery: number
  shipping: number
}) {
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 70
  const stroke = 22
  const C = 2 * Math.PI * r

  // Wedges as offsets along the circumference. Order: delivery → pickup → shipping
  const segments = [
    { value: delivery, color: "#d4a843" },
    { value: pickup, color: "#1a6b3c" },
    { value: shipping, color: "#1a1612" },
  ]

  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#1a1612"
        strokeOpacity="0.08"
        strokeWidth={stroke}
      />
      {segments.map((s, i) => {
        const length = s.value * C
        const dasharray = `${length} ${C - length}`
        const dashoffset = -offset
        offset += length
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dasharray 0.4s ease" }}
          />
        )
      })}
      {/* Center label */}
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontFamily="var(--font-playfair, serif)"
        fontSize="22"
        fill="#1a1612"
      >
        {Math.round(((delivery + pickup + shipping) === 0 ? 0 : 100))}%
      </text>
    </svg>
  )
}

function DonutLegend({
  color,
  label,
  count,
  pct,
  Icon,
}: {
  color: string
  label: string
  count: number
  pct: number
  Icon: typeof Truck
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-[#3d3834]">
        <span
          className="w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: color }}
        />
        <Icon className="w-3.5 h-3.5 text-[#6b655e]" strokeWidth={1.5} />
        <span className="text-[#1a1612]">{label}</span>
      </div>
      <div className="text-[#a8a198] tabular-nums">
        {count}{" "}
        <span className="text-[#a8a198]">· {Math.round(pct * 100)}%</span>
      </div>
    </div>
  )
}
