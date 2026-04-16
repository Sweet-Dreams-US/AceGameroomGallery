"use client"

import { useState } from "react"
import { Plus, X, Pencil, Trash2, GripVertical } from "lucide-react"
import { ADMIN_MOCK_BANNERS } from "@/lib/mock-data"
import type { HeroBanner } from "@/lib/types"

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>(ADMIN_MOCK_BANNERS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [toast, setToast] = useState("")

  const [formTitle, setFormTitle] = useState("")
  const [formSubtitle, setFormSubtitle] = useState("")
  const [formImageUrl, setFormImageUrl] = useState("")
  const [formCtaText, setFormCtaText] = useState("")
  const [formCtaLink, setFormCtaLink] = useState("")
  const [formSortOrder, setFormSortOrder] = useState(0)
  const [formIsActive, setFormIsActive] = useState(true)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const openAdd = () => {
    setEditingId(null)
    setFormTitle("")
    setFormSubtitle("")
    setFormImageUrl("")
    setFormCtaText("")
    setFormCtaLink("")
    setFormSortOrder(banners.length + 1)
    setFormIsActive(true)
    setModalOpen(true)
  }

  const openEdit = (banner: HeroBanner) => {
    setEditingId(banner.id)
    setFormTitle(banner.title || "")
    setFormSubtitle(banner.subtitle || "")
    setFormImageUrl(banner.image_url)
    setFormCtaText(banner.cta_text || "")
    setFormCtaLink(banner.cta_link || "")
    setFormSortOrder(banner.sort_order)
    setFormIsActive(banner.is_active)
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingId
            ? { ...b, title: formTitle || null, subtitle: formSubtitle || null, image_url: formImageUrl, cta_text: formCtaText || null, cta_link: formCtaLink || null, sort_order: formSortOrder, is_active: formIsActive }
            : b
        )
      )
      showToast("Banner updated!")
    } else {
      const newBanner: HeroBanner = {
        id: `banner-new-${Date.now()}`,
        title: formTitle || null,
        subtitle: formSubtitle || null,
        image_url: formImageUrl,
        cta_text: formCtaText || null,
        cta_link: formCtaLink || null,
        sort_order: formSortOrder,
        is_active: formIsActive,
        created_at: new Date().toISOString(),
      }
      setBanners((prev) => [...prev, newBanner])
      showToast("Banner created!")
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id))
    showToast("Banner deleted!")
  }

  const toggleActive = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, is_active: !b.is_active } : b))
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
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">Banners</h2>
          <p className="text-sm text-gray-500 mt-1">Manage hero banners on the homepage</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </button>
      </div>

      {/* Banner list */}
      <div className="space-y-3">
        {banners
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden flex"
            >
              {/* Image preview */}
              <div className="w-48 h-32 flex-shrink-0 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image_url}
                  alt={banner.title || "Banner"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="flex-1 p-4 flex items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <h4 className="font-medium text-gray-900">{banner.title || "Untitled"}</h4>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        banner.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {banner.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {banner.subtitle && (
                    <p className="text-sm text-gray-500 mt-0.5">{banner.subtitle}</p>
                  )}
                  {banner.cta_text && (
                    <p className="text-xs text-gray-400 mt-1">
                      CTA: {banner.cta_text} -&gt; {banner.cta_link}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      banner.is_active
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {banner.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => openEdit(banner)} className="p-1.5 text-gray-400 hover:text-ace-cyan rounded">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="p-1.5 text-gray-400 hover:text-ace-red rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Banner" : "New Banner"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Banner title" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input type="text" value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)} placeholder="Banner subtitle" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-ace-red">*</span></label>
                <input type="url" value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                  <input type="text" value={formCtaText} onChange={(e) => setFormCtaText(e.target.value)} placeholder="Shop Now" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                  <input type="text" value={formCtaLink} onChange={(e) => setFormCtaLink(e.target.value)} placeholder="/billiards" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" value={formSortOrder} onChange={(e) => setFormSortOrder(parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan" />
                    Active
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-ace-cyan text-white font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors">{editingId ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
