"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Save, Trash2, X, ImageIcon } from "lucide-react"
import {
  addItem,
  deleteItem,
  getItems,
  seedItems,
  updateItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { ADMIN_MOCK_BANNERS } from "@/lib/mock-data"
import type { HeroBanner } from "@/lib/types"

const EMPTY_BANNER = (): HeroBanner => ({
  id: "",
  title: "",
  subtitle: "",
  image_url: "",
  cta_text: "",
  cta_link: "",
  sort_order: 99,
  is_active: true,
  created_at: new Date().toISOString(),
})

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([])
  const [draft, setDraft] = useState<HeroBanner>(EMPTY_BANNER())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = () => {
    setBanners(
      getItems<HeroBanner>(STORAGE_KEYS.BANNERS, []).sort(
        (a, b) => a.sort_order - b.sort_order,
      ),
    )
  }

  useEffect(() => {
    seedItems<HeroBanner>(STORAGE_KEYS.BANNERS, ADMIN_MOCK_BANNERS)
    refresh()
    setLoaded(true)
  }, [])

  const editing = useMemo(
    () => banners.find((b) => b.id === editingId) ?? null,
    [banners, editingId],
  )

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.image_url.trim()) return
    const now = new Date().toISOString()
    const banner: HeroBanner = {
      ...draft,
      id: `banner-${Date.now()}`,
      created_at: now,
    }
    addItem(STORAGE_KEYS.BANNERS, banner)
    setDraft(EMPTY_BANNER())
    refresh()
  }

  const handleSaveEdit = (banner: HeroBanner) => {
    updateItem(STORAGE_KEYS.BANNERS, banner)
    setEditingId(null)
    refresh()
  }

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.BANNERS, id)
    if (editingId === id) setEditingId(null)
    refresh()
  }

  const toggleActive = (banner: HeroBanner) => {
    updateItem<HeroBanner>(STORAGE_KEYS.BANNERS, {
      ...banner,
      is_active: !banner.is_active,
    })
    refresh()
  }

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow mb-3">/ Marketing</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#f5f1ea]">
          Hero Banners
        </h1>
        <p className="text-[#a8a198] mt-2">
          {loaded ? `${banners.length} banners` : "Loading…"}
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
            Add New Banner
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FieldInput
            label="Title"
            value={draft.title ?? ""}
            onChange={(v) => setDraft({ ...draft, title: v })}
            placeholder="Premium Pool Tables"
          />
          <FieldInput
            label="Subtitle"
            value={draft.subtitle ?? ""}
            onChange={(v) => setDraft({ ...draft, subtitle: v })}
            placeholder="Fort Wayne's #1 Selection"
          />
          <FieldInput
            label="Image URL"
            type="url"
            required
            value={draft.image_url}
            onChange={(v) => setDraft({ ...draft, image_url: v })}
            placeholder="https://…"
            className="lg:col-span-2"
          />
          <FieldInput
            label="CTA Text"
            value={draft.cta_text ?? ""}
            onChange={(v) => setDraft({ ...draft, cta_text: v })}
            placeholder="Shop Billiards"
          />
          <FieldInput
            label="CTA Link"
            value={draft.cta_link ?? ""}
            onChange={(v) => setDraft({ ...draft, cta_link: v })}
            placeholder="/billiards"
          />
          <FieldInput
            label="Sort Order"
            type="number"
            value={String(draft.sort_order)}
            onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })}
            placeholder="1"
          />
          <div className="flex items-center mt-7">
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <Toggle
                active={draft.is_active}
                onChange={(v) => setDraft({ ...draft, is_active: v })}
              />
              <span className="text-sm text-[#f5f1ea]">Active</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Banner</span>
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {banners.length === 0 ? (
          <div className="bg-[#111] border border-white/5 p-16 text-center">
            <ImageIcon
              className="w-8 h-8 text-[#6b655e] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#a8a198] text-sm">
              No banners yet. Add your first one above.
            </p>
          </div>
        ) : (
          banners.map((banner) => {
            const isEditing = editingId === banner.id
            if (isEditing && editing) {
              return (
                <EditRow
                  key={banner.id}
                  banner={editing}
                  onCancel={() => setEditingId(null)}
                  onSave={handleSaveEdit}
                />
              )
            }
            return (
              <div
                key={banner.id}
                className="bg-[#111] border border-white/5 p-5 flex items-center gap-5"
              >
                <div className="relative w-24 h-16 bg-[#0a0a0a] border border-white/10 overflow-hidden flex-shrink-0">
                  {banner.image_url && (
                    <Image
                      src={banner.image_url}
                      alt={banner.title || "Banner"}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-sm text-[#f5f1ea] font-medium">
                      {banner.title || "Untitled Banner"}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                        banner.is_active
                          ? "text-[#d4a843] border-[#d4a843]/30 bg-[#d4a843]/5"
                          : "text-[#6b655e] border-white/10"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          banner.is_active
                            ? "bg-[#d4a843]"
                            : "bg-[#6b655e]"
                        }`}
                      />
                      {banner.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="text-xs text-[#a8a198] mt-1 truncate">
                    {banner.subtitle || "—"} &middot; Order:{" "}
                    {banner.sort_order}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(banner)}
                    className="p-2 text-xs text-[#a8a198] hover:text-[#d4a843] transition-colors tracking-[0.15em] uppercase"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => setEditingId(banner.id)}
                    className="p-2 text-[#a8a198] hover:text-[#d4a843] hover:bg-white/[0.03] transition-all"
                    aria-label="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-[#a8a198] hover:text-[#c0392b] hover:bg-white/[0.03] transition-all"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function EditRow({
  banner,
  onCancel,
  onSave,
}: {
  banner: HeroBanner
  onCancel: () => void
  onSave: (b: HeroBanner) => void
}) {
  const [draft, setDraft] = useState(banner)
  useEffect(() => {
    setDraft(banner)
  }, [banner])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(draft)
      }}
      className="bg-[#111] border border-[#d4a843]/30 p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FieldInput
          label="Title"
          value={draft.title ?? ""}
          onChange={(v) => setDraft({ ...draft, title: v })}
        />
        <FieldInput
          label="Subtitle"
          value={draft.subtitle ?? ""}
          onChange={(v) => setDraft({ ...draft, subtitle: v })}
        />
        <FieldInput
          label="Image URL"
          required
          value={draft.image_url}
          onChange={(v) => setDraft({ ...draft, image_url: v })}
          className="lg:col-span-2"
        />
        <FieldInput
          label="CTA Text"
          value={draft.cta_text ?? ""}
          onChange={(v) => setDraft({ ...draft, cta_text: v })}
        />
        <FieldInput
          label="CTA Link"
          value={draft.cta_link ?? ""}
          onChange={(v) => setDraft({ ...draft, cta_link: v })}
        />
        <FieldInput
          label="Sort Order"
          type="number"
          value={String(draft.sort_order)}
          onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })}
        />
        <div className="flex items-center mt-7">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <Toggle
              active={draft.is_active}
              onChange={(v) => setDraft({ ...draft, is_active: v })}
            />
            <span className="text-sm text-[#f5f1ea]">Active</span>
          </label>
        </div>
      </div>
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

function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  className = "",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-[#a8a198] mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/10 text-[#f5f1ea] placeholder-[#6b655e] focus:border-[#d4a843] focus:outline-none transition-colors text-sm"
      />
    </div>
  )
}

function Toggle({
  active,
  onChange,
}: {
  active: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <span
      className={`relative w-10 h-5 rounded-full transition-colors ${
        active ? "bg-[#d4a843]" : "bg-white/10"
      }`}
    >
      <input
        type="checkbox"
        checked={active}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#0a0a0a] transition-transform ${
          active ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </span>
  )
}
