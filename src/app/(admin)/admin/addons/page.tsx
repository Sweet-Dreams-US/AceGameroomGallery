"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  PlusSquare,
  X,
  Save,
} from "lucide-react"
import {
  addItem,
  deleteItem,
  getItems,
  seedItems,
  updateItem,
  STORAGE_KEYS,
} from "@/lib/admin-storage"
import { MOCK_ADDONS, ADDON_GROUP_LABELS } from "@/lib/addons-data"
import { formatPrice, type ProductAddon } from "@/lib/commerce"

const GROUP_OPTIONS = [
  { value: "cloth", label: "Cloth & Felt" },
  { value: "install", label: "Install / Service" },
  { value: "cue", label: "Cues" },
  { value: "accessory", label: "Accessory" },
  { value: "warranty", label: "Warranty" },
  { value: "pairing", label: "Pair It With" },
] as const

const CATEGORY_OPTIONS = [
  { value: "billiards", label: "Billiards" },
  { value: "games", label: "Games" },
  { value: "furniture", label: "Furniture" },
  { value: "playsets", label: "Playsets" },
  { value: "outdoor", label: "Outdoor" },
] as const

const GROUP_COLORS: Record<string, string> = {
  cloth: "#1a6b3c",
  install: "#1d4ed8",
  cue: "#b8933a",
  accessory: "#a8a198",
  warranty: "#c0392b",
  pairing: "#7c3aed",
}

interface FormState {
  name: string
  description: string
  priceDollars: string
  group: string
  appliesTo: string[]
}

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  priceDollars: "",
  group: "cloth",
  appliesTo: [],
}

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState<ProductAddon[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [loaded, setLoaded] = useState(false)

  const refresh = () =>
    setAddons(getItems<ProductAddon>(STORAGE_KEYS.ADDONS, []))

  useEffect(() => {
    seedItems<ProductAddon>(STORAGE_KEYS.ADDONS, MOCK_ADDONS)
    refresh()
    setLoaded(true)
  }, [])

  const filtered = useMemo(() => {
    if (filter === "all") return addons
    return addons.filter((a) => a.group === filter)
  }, [addons, filter])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: addons.length }
    for (const a of addons) map[a.group] = (map[a.group] || 0) + 1
    return map
  }, [addons])

  const openNew = () => {
    setEditId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (addon: ProductAddon) => {
    setEditId(addon.id)
    setForm({
      name: addon.name,
      description: addon.description,
      priceDollars: (addon.price / 100).toFixed(2),
      group: addon.group,
      appliesTo: addon.appliesTo,
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditId(null)
    setForm(EMPTY_FORM)
  }

  const toggleCategory = (val: string) => {
    setForm((f) =>
      f.appliesTo.includes(val)
        ? { ...f, appliesTo: f.appliesTo.filter((v) => v !== val) }
        : { ...f, appliesTo: [...f.appliesTo, val] },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dollars = parseFloat(form.priceDollars)
    if (!form.name.trim() || isNaN(dollars) || dollars < 0) return
    const payload: ProductAddon = {
      id: editId ?? `addon-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Math.round(dollars * 100),
      group: form.group,
      appliesTo: form.appliesTo,
    }
    if (editId) updateItem(STORAGE_KEYS.ADDONS, payload)
    else addItem(STORAGE_KEYS.ADDONS, payload)
    refresh()
    closeForm()
  }

  const handleDelete = (id: string) => {
    deleteItem(STORAGE_KEYS.ADDONS, id)
    setConfirmId(null)
    refresh()
  }

  return (
    <div className="max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="eyebrow mb-3">/ Catalog</p>
          <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612] flex items-baseline gap-3">
            Addons
            {loaded && (
              <span className="text-base font-display tracking-[0.25em] text-[#b8933a]">
                {addons.length}
              </span>
            )}
          </h1>
          <p className="text-[#6b655e] mt-2">
            Upsells attached to products at checkout — felt, install, cues,
            warranties.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus className="w-4 h-4" />
          <span>Add Addon</span>
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterPill
          label="All"
          active={filter === "all"}
          count={counts.all || 0}
          onClick={() => setFilter("all")}
        />
        {GROUP_OPTIONS.map((g) => (
          <FilterPill
            key={g.value}
            label={g.label}
            active={filter === g.value}
            count={counts[g.value] || 0}
            onClick={() => setFilter(g.value)}
          />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#1a1612]/8">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <PlusSquare
              className="w-8 h-8 text-[#a8a198] mx-auto mb-3"
              strokeWidth={1.5}
            />
            <p className="text-[#6b655e] text-sm">
              {loaded ? "No addons in this group." : "Loading addons…"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1612]/8 bg-[#faf8f3]">
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Group
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Applies To
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal">
                    Price
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6b655e] font-normal w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-[#1a1612]/8 last:border-0 hover:bg-[#faf8f3] transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="text-sm text-[#1a1612]">{a.name}</div>
                      <div className="text-xs text-[#a8a198] mt-0.5 line-clamp-1">
                        {a.description}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2 py-1 border"
                        style={{
                          color: GROUP_COLORS[a.group] ?? "#6b655e",
                          borderColor: `${GROUP_COLORS[a.group] ?? "#6b655e"}30`,
                          backgroundColor: `${GROUP_COLORS[a.group] ?? "#6b655e"}10`,
                        }}
                      >
                        {ADDON_GROUP_LABELS[a.group] ?? a.group}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {a.appliesTo.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] tracking-[0.15em] uppercase px-1.5 py-0.5 bg-[#faf8f3] border border-[#1a1612]/8 text-[#6b655e]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right text-sm text-[#1a1612] tabular-nums">
                      {formatPrice(a.price)}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-2 text-[#6b655e] hover:text-[#b8933a] hover:bg-[#faf8f3] transition-all"
                          aria-label="Edit"
                        >
                          <Pencil
                            className="w-3.5 h-3.5"
                            strokeWidth={1.5}
                          />
                        </button>
                        <button
                          onClick={() => setConfirmId(a.id)}
                          className="p-2 text-[#6b655e] hover:text-[#c0392b] hover:bg-[#faf8f3] transition-all"
                          aria-label="Delete"
                        >
                          <Trash2
                            className="w-3.5 h-3.5"
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1612]/40 backdrop-blur-sm px-6"
          onClick={closeForm}
        >
          <div
            className="bg-white border border-[#1a1612]/8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-7 py-6 border-b border-[#1a1612]/8">
              <div>
                <p className="eyebrow mb-1">
                  {editId ? "/ Edit" : "/ New"}
                </p>
                <h3 className="font-playfair text-2xl text-[#1a1612]">
                  {editId ? "Edit Addon" : "New Addon"}
                </h3>
              </div>
              <button
                onClick={closeForm}
                className="p-2 text-[#6b655e] hover:text-[#1a1612] hover:bg-[#faf8f3] transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Simonis 860 Cloth Upgrade"
                  className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="What this addon does and why customers choose it."
                  className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b655e]">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={form.priceDollars}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          priceDollars: e.target.value,
                        }))
                      }
                      placeholder="99.00"
                      className="w-full pl-8 pr-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors tabular-nums"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                    Group
                  </label>
                  <select
                    value={form.group}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, group: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
                  >
                    {GROUP_OPTIONS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                  Applies To
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((c) => {
                    const checked = form.appliesTo.includes(c.value)
                    return (
                      <label
                        key={c.value}
                        className={`inline-flex items-center gap-2 px-3 py-2 text-xs tracking-[0.15em] uppercase cursor-pointer border transition-all ${
                          checked
                            ? "bg-[#d4a843]/10 border-[#d4a843] text-[#b8933a]"
                            : "bg-white border-[#1a1612]/15 text-[#6b655e] hover:border-[#d4a843]/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(c.value)}
                          className="sr-only"
                        />
                        <span
                          className={`w-3 h-3 border ${
                            checked
                              ? "bg-[#d4a843] border-[#d4a843]"
                              : "border-[#a8a198]"
                          }`}
                        />
                        {c.label}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end pt-4 border-t border-[#1a1612]/8">
                <button
                  type="button"
                  onClick={closeForm}
                  className="btn-secondary !py-2.5 !px-5 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary !py-2.5 !px-5">
                  <Save className="w-3.5 h-3.5" />
                  <span>{editId ? "Save Changes" : "Create Addon"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1612]/40 backdrop-blur-sm px-6"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="bg-white border border-[#1a1612]/8 p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-playfair text-xl text-[#1a1612] mb-2">
              Delete Addon?
            </h3>
            <p className="text-sm text-[#6b655e] mb-6">This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c0392b] hover:bg-[#a53122] text-white text-xs tracking-[0.1em] uppercase font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string
  active: boolean
  count: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all ${
        active
          ? "bg-[#1a1612] text-white border-[#1a1612]"
          : "bg-white text-[#6b655e] border-[#1a1612]/15 hover:border-[#d4a843]/40 hover:text-[#1a1612]"
      }`}
    >
      {label}
      <span
        className={`text-[10px] tracking-normal ${
          active ? "text-[#d4a843]" : "text-[#a8a198]"
        }`}
      >
        {count}
      </span>
    </button>
  )
}
