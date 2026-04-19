"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Save, Trash2, X, Star } from "lucide-react"
import {
  addItem,
  deleteItem,
  getItems,
  seedItems,
  updateItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { ADMIN_MOCK_TESTIMONIALS } from "@/lib/mock-data"
import type { Testimonial } from "@/lib/types"

interface ExtendedTestimonial extends Testimonial {
  role?: string
  city?: string
}

const EMPTY = (): ExtendedTestimonial => ({
  id: "",
  author_name: "",
  content: "",
  rating: 5,
  is_active: true,
  created_at: new Date().toISOString(),
  role: "",
  city: "",
})

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<ExtendedTestimonial[]>([])
  const [draft, setDraft] = useState<ExtendedTestimonial>(EMPTY())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = () => {
    setItems(getItems<ExtendedTestimonial>(STORAGE_KEYS.TESTIMONIALS, []))
  }

  useEffect(() => {
    seedItems<ExtendedTestimonial>(
      STORAGE_KEYS.TESTIMONIALS,
      ADMIN_MOCK_TESTIMONIALS as ExtendedTestimonial[],
    )
    refresh()
    setLoaded(true)
  }, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.author_name.trim() || !draft.content.trim()) return
    addItem<ExtendedTestimonial>(STORAGE_KEYS.TESTIMONIALS, {
      ...draft,
      id: `test-${Date.now()}`,
      created_at: new Date().toISOString(),
    })
    setDraft(EMPTY())
    refresh()
  }

  const handleSaveEdit = (item: ExtendedTestimonial) => {
    updateItem<ExtendedTestimonial>(STORAGE_KEYS.TESTIMONIALS, item)
    setEditingId(null)
    refresh()
  }

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.TESTIMONIALS, id)
    if (editingId === id) setEditingId(null)
    refresh()
  }

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <p className="eyebrow mb-3">/ Social Proof</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#f5f1ea]">
          Testimonials
        </h1>
        <p className="text-[#a8a198] mt-2">
          {loaded ? `${items.length} testimonials` : "Loading…"}
        </p>
      </div>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        className="bg-[#111] border border-white/5 p-7 mb-8"
      >
        <div className="flex items-center gap-2 mb-5">
          <Plus className="w-4 h-4 text-[#d4a843]" strokeWidth={1.5} />
          <h2 className="font-playfair text-lg text-[#f5f1ea]">
            Add Testimonial
          </h2>
        </div>
        <TestimonialFields
          value={draft}
          onChange={setDraft}
        />
        <div className="flex justify-end mt-6">
          <button type="submit" className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-[#111] border border-white/5 p-16 text-center">
            <Star
              className="w-8 h-8 text-[#6b655e] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#a8a198] text-sm">
              No testimonials yet.
            </p>
          </div>
        ) : (
          items.map((item) =>
            editingId === item.id ? (
              <EditTestimonialRow
                key={item.id}
                item={item}
                onCancel={() => setEditingId(null)}
                onSave={handleSaveEdit}
              />
            ) : (
              <div
                key={item.id}
                className="bg-[#111] border border-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <div className="text-sm font-medium text-[#f5f1ea]">
                        {item.author_name}
                      </div>
                      {item.role && (
                        <span className="text-xs text-[#a8a198]">
                          &middot; {item.role}
                        </span>
                      )}
                      {item.city && (
                        <span className="text-xs text-[#a8a198]">
                          &middot; {item.city}
                        </span>
                      )}
                      <StarRow rating={item.rating} />
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                          item.is_active
                            ? "text-[#d4a843] border-[#d4a843]/30 bg-[#d4a843]/5"
                            : "text-[#6b655e] border-white/10"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-[#a8a198] italic leading-relaxed">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingId(item.id)}
                      className="p-2 text-[#a8a198] hover:text-[#d4a843] hover:bg-white/[0.03] transition-all"
                      aria-label="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-[#a8a198] hover:text-[#c0392b] hover:bg-white/[0.03] transition-all"
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

function EditTestimonialRow({
  item,
  onCancel,
  onSave,
}: {
  item: ExtendedTestimonial
  onCancel: () => void
  onSave: (i: ExtendedTestimonial) => void
}) {
  const [draft, setDraft] = useState(item)
  useEffect(() => setDraft(item), [item])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(draft)
      }}
      className="bg-[#111] border border-[#d4a843]/30 p-6"
    >
      <TestimonialFields value={draft} onChange={setDraft} />
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

const INPUT_CLASS =
  "w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/10 text-[#f5f1ea] placeholder-[#6b655e] focus:border-[#d4a843] focus:outline-none transition-colors text-sm"

function TestimonialFields({
  value,
  onChange,
}: {
  value: ExtendedTestimonial
  onChange: (v: ExtendedTestimonial) => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Field label="Author Name" required>
        <input
          type="text"
          value={value.author_name}
          onChange={(e) => onChange({ ...value, author_name: e.target.value })}
          required
          placeholder="Jane Smith"
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="Role / Purchase">
        <input
          type="text"
          value={value.role ?? ""}
          onChange={(e) => onChange({ ...value, role: e.target.value })}
          placeholder="Bought a pool table"
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="City">
        <input
          type="text"
          value={value.city ?? ""}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
          placeholder="Fort Wayne, IN"
          className={INPUT_CLASS}
        />
      </Field>
      <Field label="Quote" required className="lg:col-span-3">
        <textarea
          value={value.content}
          onChange={(e) => onChange({ ...value, content: e.target.value })}
          required
          rows={3}
          placeholder="Best experience buying a pool table…"
          className={`${INPUT_CLASS} resize-y`}
        />
      </Field>
      <Field label="Rating">
        <select
          value={value.rating}
          onChange={(e) =>
            onChange({ ...value, rating: Number(e.target.value) })
          }
          className={INPUT_CLASS}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} star{r === 1 ? "" : "s"}
            </option>
          ))}
        </select>
      </Field>
      <div className="flex items-center mt-7 lg:col-span-2">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <span
            className={`relative w-10 h-5 rounded-full transition-colors ${
              value.is_active ? "bg-[#d4a843]" : "bg-white/10"
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
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0a0a0a] transition-transform ${
                value.is_active ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
          <span className="text-sm text-[#f5f1ea]">Active</span>
        </label>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-[#a8a198] mb-2">
        {label}
        {required && <span className="text-[#d4a843]"> *</span>}
      </label>
      {children}
    </div>
  )
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3 h-3 ${
            n <= rating ? "text-[#d4a843] fill-[#d4a843]" : "text-[#3a3a3a]"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
