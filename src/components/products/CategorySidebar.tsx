"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarCategory {
  name: string
  slug: string
  children: { name: string; slug: string }[]
}

interface CategorySidebarProps {
  categories: SidebarCategory[]
  currentSlug: string
}

export default function CategorySidebar({
  categories,
  currentSlug,
}: CategorySidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>(() => {
    // Auto-expand the category that contains the current slug
    const parent = categories.find(
      (c) =>
        c.slug === currentSlug ||
        c.children.some((child) => child.slug === currentSlug)
    )
    return parent ? [parent.slug] : []
  })

  const toggleExpand = (slug: string) => {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  const isActive = (slug: string) => slug === currentSlug

  const sidebarContent = (
    <nav className="space-y-1">
      <h3 className="font-playfair text-lg font-bold text-ace-charcoal mb-4">
        Categories
      </h3>
      {categories.map((cat) => {
        const hasChildren = cat.children.length > 0
        const isExpanded = expandedSlugs.includes(cat.slug)
        const isCurrent = isActive(cat.slug)

        return (
          <div key={cat.slug}>
            <div className="flex items-center">
              <Link
                href={`/${cat.slug}`}
                className={cn(
                  "flex-1 flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isCurrent
                    ? "text-ace-cyan bg-ace-cyan/5 border-l-3 border-ace-cyan"
                    : "text-ace-slate hover:text-ace-charcoal hover:bg-gray-50"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(cat.slug)}
                  className="p-2 text-ace-slate hover:text-ace-charcoal transition-colors"
                  aria-label={
                    isExpanded
                      ? `Collapse ${cat.name}`
                      : `Expand ${cat.name}`
                  }
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Subcategories */}
            {hasChildren && isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                {cat.children.map((child) => {
                  const isChildCurrent = isActive(child.slug)
                  return (
                    <Link
                      key={child.slug}
                      href={`/${cat.slug}?sub=${child.slug}`}
                      className={cn(
                        "block px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                        isChildCurrent
                          ? "text-ace-cyan font-medium bg-ace-cyan/5"
                          : "text-gray-500 hover:text-ace-charcoal hover:bg-gray-50"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2.5 w-full bg-white border border-gray-200 rounded-lg text-sm font-medium text-ace-charcoal hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Browse Categories</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 ml-auto transition-transform duration-200",
              mobileOpen && "rotate-180"
            )}
          />
        </button>

        {/* Mobile Dropdown */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 mt-2",
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-28">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          {sidebarContent}
        </div>
      </aside>
    </>
  )
}
