"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Package,
  Inbox,
  Image as ImageIcon,
  Star,
  ArrowRight,
  Plus,
  Mail,
} from "lucide-react"
import { seedItems, STORAGE_KEYS } from "@/lib/admin-storage"
import {
  ADMIN_MOCK_PRODUCTS,
  ADMIN_MOCK_INQUIRIES,
  ADMIN_MOCK_BANNERS,
  ADMIN_MOCK_TESTIMONIALS,
} from "@/lib/mock-data"
import type {
  Product,
  Inquiry,
  HeroBanner,
  Testimonial,
} from "@/lib/types"

interface Stats {
  products: number
  inquiries: number
  banners: number
  testimonials: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    inquiries: 0,
    banners: 0,
    testimonials: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Seed initial data on first load.
    const products = seedItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS)
    const inquiries = seedItems<Inquiry>(
      STORAGE_KEYS.INQUIRIES,
      ADMIN_MOCK_INQUIRIES,
    )
    const banners = seedItems<HeroBanner>(
      STORAGE_KEYS.BANNERS,
      ADMIN_MOCK_BANNERS,
    )
    const testimonials = seedItems<Testimonial>(
      STORAGE_KEYS.TESTIMONIALS,
      ADMIN_MOCK_TESTIMONIALS,
    )

    setStats({
      products: products.length,
      inquiries: inquiries.length,
      banners: banners.filter((b) => b.is_active).length,
      testimonials: testimonials.filter((t) => t.is_active).length,
    })

    // Sort inquiries by created_at desc
    const sorted = [...inquiries].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    setRecentInquiries(sorted.slice(0, 5))
    setLoaded(true)
  }, [])

  const statCards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Total Inquiries",
      value: stats.inquiries,
      icon: Inbox,
      href: "/admin/inquiries",
    },
    {
      label: "Active Banners",
      value: stats.banners,
      icon: ImageIcon,
      href: "/admin/banners",
    },
    {
      label: "Published Testimonials",
      value: stats.testimonials,
      icon: Star,
      href: "/admin/testimonials",
    },
  ]

  return (
    <div className="max-w-[1400px]">
      {/* Welcome */}
      <div className="mb-10">
        <p className="eyebrow mb-3">/ Overview</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
          Welcome back.
        </h1>
        <p className="text-[#6b655e] mt-2">
          Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group bg-white border border-[#1a1612]/8 p-6 transition-all hover:border-[#d4a843]/40 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center">
                  <Icon
                    className="w-4 h-4 text-[#b8933a]"
                    strokeWidth={1.5}
                  />
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[#a8a198] group-hover:text-[#b8933a] transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div className="font-playfair text-4xl text-[#1a1612] leading-none">
                {loaded ? card.value : "—"}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.25em] uppercase text-[#6b655e]">
                {card.label}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Two column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-white border border-[#1a1612]/8">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1612]/8">
            <div>
              <p className="eyebrow mb-1">/ Activity</p>
              <h2 className="font-playfair text-xl text-[#1a1612]">
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs tracking-[0.15em] uppercase text-[#6b655e] hover:text-[#b8933a] transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="p-10 text-center text-[#6b655e] text-sm">
              No inquiries yet.
            </div>
          ) : (
            <ul>
              {recentInquiries.map((inq) => (
                <li
                  key={inq.id}
                  className="flex items-start gap-4 px-6 py-4 border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors"
                >
                  <div className="w-9 h-9 bg-[#faf8f3] border border-[#1a1612]/8 flex items-center justify-center flex-shrink-0">
                    <Mail
                      className="w-4 h-4 text-[#b8933a]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="text-sm text-[#1a1612] font-medium truncate">
                        {inq.name}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#a8a198] flex-shrink-0">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs text-[#6b655e] truncate mt-0.5">
                      {inq.email}
                    </div>
                    <p className="text-xs text-[#6b655e] mt-1.5 line-clamp-1">
                      {inq.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-[#1a1612]/8">
          <div className="px-6 py-5 border-b border-[#1a1612]/8">
            <p className="eyebrow mb-1">/ Shortcuts</p>
            <h2 className="font-playfair text-xl text-[#1a1612]">
              Quick Actions
            </h2>
          </div>
          <div className="p-6 space-y-3">
            <Link
              href="/admin/products/new"
              className="btn-primary w-full !py-3"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="btn-secondary w-full !py-3"
            >
              <Inbox className="w-4 h-4" />
              <span>View Inquiries</span>
            </Link>
            <Link
              href="/admin/banners"
              className="btn-secondary w-full !py-3"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Manage Banners</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
