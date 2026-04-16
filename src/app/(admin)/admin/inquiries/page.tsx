"use client"

import { useState } from "react"
import { Mail, MailOpen, Download, ChevronDown, ChevronUp } from "lucide-react"
import { ADMIN_MOCK_INQUIRIES } from "@/lib/mock-data"
import type { Inquiry } from "@/lib/types"

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(ADMIN_MOCK_INQUIRIES)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const markAsRead = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, is_read: true } : inq))
    )
    showToast("Marked as read")
  }

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Message", "Read"]
    const rows = inquiries.map((inq) => [
      new Date(inq.created_at).toLocaleDateString(),
      inq.name,
      inq.email,
      inq.phone || "",
      `"${inq.message.replace(/"/g, '""')}"`,
      inq.is_read ? "Yes" : "No",
    ])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inquiries-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast("CSV exported!")
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">Inquiries</h2>
          <p className="text-sm text-gray-500 mt-1">
            {inquiries.filter((i) => !i.is_read).length} unread of {inquiries.length} total
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Inquiry list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {inquiries.map((inq) => (
          <div key={inq.id}>
            <div
              onClick={() => toggleExpand(inq.id)}
              className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                !inq.is_read ? "bg-ace-cyan/5" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {inq.is_read ? (
                    <MailOpen className="w-5 h-5 text-gray-300" />
                  ) : (
                    <Mail className="w-5 h-5 text-ace-cyan" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!inq.is_read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                      {inq.name}
                    </span>
                    {!inq.is_read && (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-ace-cyan text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{inq.email}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{inq.message}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                  {expandedId === inq.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded detail */}
            {expandedId === inq.id && (
              <div className="px-6 pb-4 bg-gray-50 border-t border-gray-100">
                <div className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400 block">Name</span>
                      <span className="text-gray-900">{inq.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Email</span>
                      <span className="text-gray-900">{inq.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Phone</span>
                      <span className="text-gray-900">{inq.phone || "Not provided"}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-sm mb-1">Message</span>
                    <p className="text-sm text-gray-800 bg-white p-4 rounded-lg border border-gray-200">
                      {inq.message}
                    </p>
                  </div>
                  {!inq.is_read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(inq.id)
                      }}
                      className="px-4 py-2 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
