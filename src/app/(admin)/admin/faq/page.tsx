"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X, GripVertical } from "lucide-react"
import { ADMIN_MOCK_FAQ } from "@/lib/mock-data"
import type { FaqEntry } from "@/lib/types"

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqEntry[]>(ADMIN_MOCK_FAQ)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const [formQuestion, setFormQuestion] = useState("")
  const [formAnswer, setFormAnswer] = useState("")
  const [formSortOrder, setFormSortOrder] = useState(0)
  const [formIsActive, setFormIsActive] = useState(true)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const startAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormQuestion("")
    setFormAnswer("")
    setFormSortOrder(faqs.length + 1)
    setFormIsActive(true)
  }

  const startEdit = (faq: FaqEntry) => {
    setIsAdding(false)
    setEditingId(faq.id)
    setFormQuestion(faq.question)
    setFormAnswer(faq.answer)
    setFormSortOrder(faq.sort_order)
    setFormIsActive(faq.is_active)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
  }

  const handleSave = () => {
    if (isAdding) {
      const newFaq: FaqEntry = {
        id: `faq-new-${Date.now()}`,
        question: formQuestion,
        answer: formAnswer,
        category: null,
        sort_order: formSortOrder,
        is_active: formIsActive,
        created_at: new Date().toISOString(),
      }
      setFaqs((prev) => [...prev, newFaq])
      showToast("FAQ added!")
    } else if (editingId) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? { ...f, question: formQuestion, answer: formAnswer, sort_order: formSortOrder, is_active: formIsActive }
            : f
        )
      )
      showToast("FAQ updated!")
    }
    cancelEdit()
  }

  const handleDelete = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id))
    showToast("FAQ deleted!")
  }

  const toggleActive = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, is_active: !f.is_active } : f))
    )
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
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">FAQ</h2>
          <p className="text-sm text-gray-500 mt-1">Manage frequently asked questions</p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="bg-white rounded-xl border-2 border-ace-cyan/30 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">New FAQ Entry</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input type="text" value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)} placeholder="Enter the question..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea value={formAnswer} onChange={(e) => setFormAnswer(e.target.value)} rows={4} placeholder="Enter the answer..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y" />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input type="number" value={formSortOrder} onChange={(e) => setFormSortOrder(parseInt(e.target.value) || 0)} className="w-24 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer mt-5">
              <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan" />
              Active
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={cancelEdit} className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90">Save</button>
          </div>
        </div>
      )}

      {/* FAQ list */}
      <div className="space-y-3">
        {faqs
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-gray-200 p-5">
              {editingId === faq.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                    <input type="text" value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <textarea value={formAnswer} onChange={(e) => setFormAnswer(e.target.value)} rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
                        <input type="number" value={formSortOrder} onChange={(e) => setFormSortOrder(parseInt(e.target.value) || 0)} className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                      </div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer mt-5">
                        <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan" />
                        Active
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={cancelEdit} className="p-2 text-gray-400 hover:text-gray-600 rounded"><X className="w-4 h-4" /></button>
                      <button onClick={handleSave} className="p-2 text-ace-cyan hover:text-ace-cyan/80 rounded"><Check className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 text-sm">{faq.question}</h4>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${faq.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {faq.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleActive(faq.id)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${faq.is_active ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                      {faq.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => startEdit(faq)} className="p-1.5 text-gray-400 hover:text-ace-cyan rounded"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-gray-400 hover:text-ace-red rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
