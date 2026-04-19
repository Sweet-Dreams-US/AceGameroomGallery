"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Download, Inbox, Trash2 } from "lucide-react"
import {
  deleteItem,
  getItems,
  seedItems,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import {
  ADMIN_MOCK_INQUIRIES,
  ADMIN_MOCK_PRODUCTS,
} from "@/lib/mock-data"
import type { Inquiry, Product } from "@/lib/types"

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = () => {
    setInquiries(
      getItems<Inquiry>(STORAGE_KEYS.INQUIRIES, []).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    )
  }

  useEffect(() => {
    seedItems<Inquiry>(STORAGE_KEYS.INQUIRIES, ADMIN_MOCK_INQUIRIES)
    seedItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS)
    setProducts(getItems<Product>(STORAGE_KEYS.PRODUCTS, ADMIN_MOCK_PRODUCTS))
    refresh()
    setLoaded(true)
  }, [])

  const productLookup = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of products) {
      map.set(p.id, p.name)
    }
    return map
  }, [products])

  const getProductNames = (ids: string[]): string => {
    const names = ids.map((id) => productLookup.get(id) || id)
    return names.join(", ")
  }

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.INQUIRIES, id)
    if (expanded === id) setExpanded(null)
    refresh()
  }

  const exportCsv = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Interested In", "Message"]
    const rows = inquiries.map((i) => [
      new Date(i.created_at).toISOString(),
      i.name,
      i.email,
      i.phone ?? "",
      getProductNames(i.product_ids),
      i.message,
    ])
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => escape(String(c))).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inquiries-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">/ Inbox</p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
            Inquiries
          </h1>
          <p className="text-[#6b655e] mt-2">
            {loaded ? `${inquiries.length} total inquiries` : "Loading…"}
          </p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={inquiries.length === 0}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white border border-[#1a1612]/8">
        {inquiries.length === 0 ? (
          <div className="p-16 text-center">
            <Inbox
              className="w-8 h-8 text-[#a8a198] mx-auto mb-4"
              strokeWidth={1.5}
            />
            <h3 className="font-playfair text-lg text-[#1a1612] mb-1">
              No inquiries yet.
            </h3>
            <p className="text-sm text-[#6b655e]">
              They&apos;ll appear here when someone submits the contact form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1612]/8 bg-[#faf8f3]">
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal w-32">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Phone
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Interested In
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Message
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal w-10" />
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => {
                  const isOpen = expanded === inq.id
                  return (
                    <Fragment key={inq.id}>
                      <tr
                        onClick={() => setExpanded(isOpen ? null : inq.id)}
                        className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-xs text-[#6b655e] whitespace-nowrap">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1a1612]">
                          {inq.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b655e]">
                          <a
                            href={`mailto:${inq.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-[#b8933a] transition-colors"
                          >
                            {inq.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b655e]">
                          {inq.phone ?? "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b655e] max-w-[200px] truncate">
                          {inq.product_ids.length > 0
                            ? getProductNames(inq.product_ids)
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6b655e] max-w-[300px] truncate">
                          {inq.message}
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
                            key={`${inq.id}-expanded`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="border-b border-[#1a1612]/8"
                          >
                            <td
                              colSpan={7}
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
                                <div className="py-6">
                                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
                                    <div>
                                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#b8933a] mb-3">
                                        Full message
                                      </p>
                                      <p className="text-[#1a1612] text-sm leading-relaxed whitespace-pre-wrap">
                                        {inq.message}
                                      </p>
                                      {inq.product_ids.length > 0 && (
                                        <div className="mt-5">
                                          <p className="text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                                            Products referenced
                                          </p>
                                          <div className="flex flex-wrap gap-2">
                                            {inq.product_ids.map((pid) => (
                                              <span
                                                key={pid}
                                                className="text-xs px-2.5 py-1 bg-white border border-[#1a1612]/8 text-[#6b655e]"
                                              >
                                                {productLookup.get(pid) || pid}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(inq.id)
                                      }}
                                      className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase text-[#c0392b] border border-[#c0392b]/30 hover:bg-[#c0392b]/10 transition-colors"
                                    >
                                      <Trash2
                                        className="w-3.5 h-3.5"
                                        strokeWidth={1.5}
                                      />
                                      Delete
                                    </button>
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
