"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Inbox,
  Image as ImageIcon,
  Star,
  HelpCircle,
  FileText,
  LogOut,
  User,
} from "lucide-react"
import { STORAGE_KEYS } from "@/lib/admin-storage"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Banners", href: "/admin/banners", icon: ImageIcon },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Content", href: "/admin/content", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname() ?? ""
  const [authed, setAuthed] = useState<boolean | null>(null)

  const isLoginRoute =
    pathname === "/admin/login" || pathname === "/admin/login/"

  useEffect(() => {
    if (typeof window === "undefined") return
    const token = window.localStorage.getItem(STORAGE_KEYS.AUTH)
    if (!token && !isLoginRoute) {
      router.replace("/admin/login")
      return
    }
    setAuthed(Boolean(token))
  }, [isLoginRoute, router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.AUTH)
    }
    router.replace("/admin/login")
  }

  // Login page renders standalone, no sidebar.
  if (isLoginRoute) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f1ea]">
        {children}
      </div>
    )
  }

  // Loading / auth-gate flash
  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#a8a198] text-sm tracking-[0.3em] uppercase">
          Loading
        </div>
      </div>
    )
  }

  if (!authed) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f1ea] flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-[260px] border-r border-white/5 bg-[#080808] flex flex-col z-40">
        {/* Logo */}
        <div className="px-7 py-7 border-b border-white/5">
          <Link href="/admin" className="block">
            <div className="font-display text-2xl tracking-[0.3em] text-[#f5f1ea]">
              ACE
            </div>
            <div className="mt-1 text-[10px] tracking-[0.35em] uppercase text-[#6b655e]">
              Admin Panel
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = item.exact
              ? pathname === item.href || pathname === `${item.href}/`
              : pathname === item.href ||
                pathname === `${item.href}/` ||
                pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-7 py-3 text-sm transition-all ${
                  active
                    ? "text-[#d4a843] bg-[#d4a843]/5"
                    : "text-[#a8a198] hover:text-[#f5f1ea] hover:bg-white/[0.02]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 inset-y-0 w-[2px] bg-[#d4a843]" />
                )}
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer logout */}
        <div className="border-t border-white/5 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#a8a198] hover:text-[#d4a843] hover:bg-white/[0.02] transition-all"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/5">
          <div className="flex items-center justify-between px-10 py-4">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-[#d4a843] font-display">
                / Admin
              </div>
              <div className="font-playfair text-xl text-[#f5f1ea] mt-0.5">
                Dashboard
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-white/5 rounded-full">
                <User className="w-3.5 h-3.5 text-[#d4a843]" strokeWidth={1.5} />
                <span className="text-xs text-[#a8a198] tracking-wide">
                  Demo User
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs tracking-[0.15em] uppercase text-[#a8a198] hover:text-[#d4a843] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-10 py-10">{children}</main>
      </div>
    </div>
  )
}
