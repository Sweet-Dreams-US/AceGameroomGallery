"use client"

import { useState } from "react"
import { Save, FileText } from "lucide-react"
import { ADMIN_MOCK_CONTENT } from "@/lib/mock-data"
import type { SiteContent } from "@/lib/types"

export default function AdminContentPage() {
  const [contentBlocks, setContentBlocks] = useState<SiteContent[]>(ADMIN_MOCK_CONTENT)
  const [toast, setToast] = useState("")
  const [savingId, setSavingId] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const handleTitleChange = (id: string, title: string) => {
    setContentBlocks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c))
    )
  }

  const handleContentChange = (id: string, content: string) => {
    setContentBlocks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content } : c))
    )
  }

  const handleSave = (id: string) => {
    setSavingId(id)
    const block = contentBlocks.find((c) => c.id === id)
    console.log("Saving content block:", block)

    // Stub: will call supabase update when connected
    setTimeout(() => {
      setSavingId(null)
      showToast("Content saved!")
    }, 500)
  }

  const formatSectionKey = (key: string) =>
    key
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-playfair">Site Content</h2>
        <p className="text-sm text-gray-500 mt-1">
          Edit text content displayed across the website
        </p>
      </div>

      {/* Content blocks */}
      <div className="space-y-6">
        {contentBlocks.map((block) => (
          <div key={block.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatSectionKey(block.section_key)}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  ({block.section_key})
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={block.title || ""}
                  onChange={(e) => handleTitleChange(block.id, e.target.value)}
                  placeholder="Section title"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Content
                </label>
                <textarea
                  value={block.content}
                  onChange={(e) => handleContentChange(block.id, e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Last updated: {new Date(block.updated_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleSave(block.id)}
                  disabled={savingId === block.id}
                  className="flex items-center gap-2 px-4 py-2 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors disabled:opacity-50"
                >
                  {savingId === block.id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
