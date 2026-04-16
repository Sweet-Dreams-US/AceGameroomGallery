"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { X, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductOption {
  id: string
  name: string
  category: string
}

interface ProductSelectorProps {
  products: ProductOption[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export default function ProductSelector({
  products,
  selectedIds,
  onChange,
}: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  // Filter products by search term
  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [products, search])

  // Group filtered products by category
  const grouped = useMemo(() => {
    const map = new Map<string, ProductOption[]>()
    for (const p of filtered) {
      const list = map.get(p.category) || []
      list.push(p)
      map.set(p.category, list)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const selectedProducts = products.filter((p) => selectedIds.includes(p.id))

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  function removeChip(id: string) {
    onChange(selectedIds.filter((sid) => sid !== id))
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected chips */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedProducts.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-ace-red/10 text-ace-red text-sm rounded-full border border-ace-red/20"
            >
              <span className="max-w-[180px] truncate">{p.name}</span>
              <button
                type="button"
                onClick={() => removeChip(p.id)}
                className="ml-0.5 hover:bg-ace-red/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${p.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input trigger */}
      <div
        className={cn(
          "flex items-center gap-2 w-full border rounded-lg bg-white px-3 py-2.5 transition-all cursor-text",
          isOpen
            ? "border-ace-red ring-2 ring-ace-red/20 shadow-lg"
            : "border-gray-300 hover:border-gray-400"
        )}
        onClick={() => {
          setIsOpen(true)
          inputRef.current?.focus()
        }}
      >
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={
            selectedIds.length > 0
              ? "Search more products..."
              : "Search products by name or category..."
          }
          className="flex-1 bg-transparent outline-none text-sm text-ace-charcoal placeholder:text-gray-400"
        />
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {grouped.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No products found
            </div>
          ) : (
            grouped.map(([category, items]) => (
              <div key={category}>
                {/* Category header */}
                <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 sticky top-0">
                  <span className="text-xs font-semibold text-ace-slate uppercase tracking-wider">
                    {category}
                  </span>
                </div>
                {/* Products in category */}
                {items.map((product) => {
                  const checked = selectedIds.includes(product.id)
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => toggle(product.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                        checked
                          ? "bg-ace-red/5 text-ace-charcoal"
                          : "hover:bg-gray-50 text-ace-slate"
                      )}
                    >
                      {/* Checkbox */}
                      <span
                        className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                          checked
                            ? "bg-ace-red border-ace-red"
                            : "border-gray-300"
                        )}
                      >
                        {checked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="truncate">{product.name}</span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
