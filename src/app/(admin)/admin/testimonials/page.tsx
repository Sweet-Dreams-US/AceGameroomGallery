"use client"

import { useState } from "react"
import { Plus, Star, Pencil, Trash2, Check, X } from "lucide-react"
import { ADMIN_MOCK_TESTIMONIALS } from "@/lib/mock-data"
import type { Testimonial } from "@/lib/types"

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(ADMIN_MOCK_TESTIMONIALS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [toast, setToast] = useState("")

  const [formAuthor, setFormAuthor] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formRating, setFormRating] = useState(5)
  const [formIsActive, setFormIsActive] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const startAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormAuthor("")
    setFormContent("")
    setFormRating(5)
    setFormIsActive(true)
  }

  const startEdit = (t: Testimonial) => {
    setIsAdding(false)
    setEditingId(t.id)
    setFormAuthor(t.author_name)
    setFormContent(t.content)
    setFormRating(t.rating)
    setFormIsActive(t.is_active)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
  }

  const handleSave = () => {
    if (isAdding) {
      const newTestimonial: Testimonial = {
        id: `test-new-${Date.now()}`,
        author_name: formAuthor,
        content: formContent,
        rating: formRating,
        is_active: formIsActive,
        created_at: new Date().toISOString(),
      }
      setTestimonials((prev) => [...prev, newTestimonial])
      showToast("Testimonial added!")
    } else if (editingId) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, author_name: formAuthor, content: formContent, rating: formRating, is_active: formIsActive }
            : t
        )
      )
      showToast("Testimonial updated!")
    }
    cancelEdit()
  }

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
    showToast("Testimonial deleted!")
  }

  const toggleActive = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
    )
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-ace-gold fill-ace-gold" : "text-gray-200"}`}
      />
    ))

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">Testimonials</h2>
          <p className="text-sm text-gray-500 mt-1">Manage customer reviews</p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Add form (inline at top) */}
      {isAdding && (
        <div className="bg-white rounded-xl border-2 border-ace-cyan/30 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">New Testimonial</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
              <input type="text" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} placeholder="John D." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select value={formRating} onChange={(e) => setFormRating(parseInt(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan">
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} rows={3} placeholder="Customer review content..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan" />
              Active
            </label>
            <div className="flex gap-2">
              <button onClick={cancelEdit} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials list */}
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
            {editingId === t.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input type="text" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select value={formRating} onChange={(e) => setFormRating(parseInt(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan" />
                    Active
                  </label>
                  <div className="flex gap-2">
                    <button onClick={cancelEdit} className="p-2 text-gray-400 hover:text-gray-600 rounded">
                      <X className="w-4 h-4" />
                    </button>
                    <button onClick={handleSave} className="p-2 text-ace-cyan hover:text-ace-cyan/80 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 text-sm">{t.author_name}</span>
                    <div className="flex">{renderStars(t.rating)}</div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t.content}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggleActive(t.id)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${t.is_active ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                    {t.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => startEdit(t)} className="p-1.5 text-gray-400 hover:text-ace-cyan rounded">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-ace-red rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
