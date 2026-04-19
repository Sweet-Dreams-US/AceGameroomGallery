"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Save, Trash2, X, HelpCircle } from "lucide-react"
import {
  addItem,
  deleteItem,
  getItems,
  seedItems,
  updateItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { ADMIN_MOCK_FAQ } from "@/lib/mock-data"
import type { FaqEntry } from "@/lib/types"

const INPUT_CLASS =
  "w-full px-4 py-2.5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm"

const EMPTY = (): FaqEntry => ({
  id: "",
  question: "",
  answer: "",
  category: null,
  sort_order: 99,
  is_active: true,
  created_at: new Date().toISOString(),
})

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqEntry[]>([])
  const [draft, setDraft] = useState<FaqEntry>(EMPTY())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = () => {
    setItems(
      getItems<FaqEntry>(STORAGE_KEYS.FAQS, []).sort(
        (a, b) => a.sort_order - b.sort_order,
      ),
    )
  }

  useEffect(() => {
    seedItems<FaqEntry>(STORAGE_KEYS.FAQS, ADMIN_MOCK_FAQ)
    refresh()
    setLoaded(true)
  }, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.question.trim() || !draft.answer.trim()) return
    addItem(STORAGE_KEYS.FAQS, {
      ...draft,
      id: `faq-${Date.now()}`,
      created_at: new Date().toISOString(),
    })
    setDraft(EMPTY())
    refresh()
  }

  const handleSaveEdit = (item: FaqEntry) => {
    updateItem(STORAGE_KEYS.FAQS, item)
    setEditingId(null)
    refresh()
  }

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.FAQS, id)
    if (editingId === id) setEditingId(null)
    refresh()
  }

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <p className="eyebrow mb-3">/ Support</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
          Frequently Asked Questions
        </h1>
        <p className="text-[#6b655e] mt-2">
          {loaded ? `${items.length} entries` : "Loading…"}
        </p>
      </div>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        className="bg-white border border-[#1a1612]/8 p-7 mb-8"
      >
        <div className="flex items-center gap-2 mb-5">
          <Plus className="w-4 h-4 text-[#b8933a]" strokeWidth={1.5} />
          <h2 className="font-playfair text-lg text-[#1a1612]">
            Add FAQ Entry
          </h2>
        </div>
        <FaqFields value={draft} onChange={setDraft} />
        <div className="flex justify-end mt-6">
          <button type="submit" className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-white border border-[#1a1612]/8 p-16 text-center">
            <HelpCircle
              className="w-8 h-8 text-[#a8a198] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#6b655e] text-sm">No FAQ entries yet.</p>
          </div>
        ) : (
          items.map((item) =>
            editingId === item.id ? (
              <EditFaqRow
                key={item.id}
                item={item}
                onCancel={() => setEditingId(null)}
                onSave={handleSaveEdit}
              />
            ) : (
              <div
                key={item.id}
                className="bg-white border border-[#1a1612]/8 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#b8933a]">
                        #{item.sort_order}
                      </span>
                      {item.category && (
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b655e] px-2 py-0.5 bg-[#faf8f3] border border-[#1a1612]/8">
                          {item.category}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                          item.is_active
                            ? "text-[#1a6b3c] border-[#1a6b3c]/30 bg-[#1a6b3c]/10"
                            : "text-[#a8a198] border-[#1a1612]/10 bg-[#faf8f3]"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <h3 className="font-playfair text-lg text-[#1a1612] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-sm text-[#6b655e] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingId(item.id)}
                      className="p-2 text-[#6b655e] hover:text-[#b8933a] hover:bg-[#faf8f3] transition-all"
                      aria-label="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-[#6b655e] hover:text-[#c0392b] hover:bg-[#faf8f3] transition-all"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ),
          )
        )}
      </div>
    </div>
  )
}

function EditFaqRow({
  item,
  onCancel,
  onSave,
}: {
  item: FaqEntry
  onCancel: () => void
  onSave: (i: FaqEntry) => void
}) {
  const [draft, setDraft] = useState(item)
  useEffect(() => setDraft(item), [item])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(draft)
      }}
      className="bg-white border border-[#d4a843]/40 p-6 shadow-sm"
    >
      <FaqFields value={draft} onChange={setDraft} />
      <div className="flex justify-end gap-2 mt-5">
        <button type="button" onClick={onCancel} className="btn-secondary">
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </form>
  )
}

function FaqFields({
  value,
  onChange,
}: {
  value: FaqEntry
  onChange: (v: FaqEntry) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
          Question <span className="text-[#d4a843]">*</span>
        </label>
        <input
          type="text"
          value={value.question}
          onChange={(e) => onChange({ ...value, question: e.target.value })}
          required
          placeholder="Do you offer financing?"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
          Answer <span className="text-[#d4a843]">*</span>
        </label>
        <textarea
          value={value.answer}
          onChange={(e) => onChange({ ...value, answer: e.target.value })}
          required
          rows={3}
          placeholder="Yes! We offer Wells Fargo financing…"
          className={`${INPUT_CLASS} resize-y`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
            Category (optional)
          </label>
          <input
            type="text"
            value={value.category ?? ""}
            onChange={(e) =>
              onChange({ ...value, category: e.target.value || null })
            }
            placeholder="Financing, Services, Hours…"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
            Sort Order
          </label>
          <input
            type="number"
            value={value.sort_order}
            onChange={(e) =>
              onChange({ ...value, sort_order: Number(e.target.value) || 0 })
            }
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex items-center mt-7">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <span
              className={`relative w-10 h-5 rounded-full transition-colors ${
                value.is_active ? "bg-[#d4a843]" : "bg-[#1a1612]/15"
              }`}
            >
              <input
                type="checkbox"
                checked={value.is_active}
                onChange={(e) =>
                  onChange({ ...value, is_active: e.target.checked })
                }
                className="sr-only"
              />
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                  value.is_active ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </span>
            <span className="text-sm text-[#1a1612]">Active</span>
          </label>
        </div>
      </div>
    </div>
  )
}
