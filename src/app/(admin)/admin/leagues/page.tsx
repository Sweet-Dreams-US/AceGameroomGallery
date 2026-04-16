"use client"

import { useState } from "react"
import { Plus, X, Pencil, Trash2 } from "lucide-react"
import { ADMIN_MOCK_LEAGUES } from "@/lib/mock-data"
import type { LeagueEvent } from "@/lib/types"

export default function AdminLeaguesPage() {
  const [leagues, setLeagues] = useState<LeagueEvent[]>(ADMIN_MOCK_LEAGUES)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [toast, setToast] = useState("")
  const [filterType, setFilterType] = useState<"all" | "pool" | "dart">("all")

  const [formType, setFormType] = useState<"pool" | "dart">("pool")
  const [formTitle, setFormTitle] = useState("")
  const [formDate, setFormDate] = useState("")
  const [formTime, setFormTime] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formLocation, setFormLocation] = useState("")

  const filtered = filterType === "all" ? leagues : leagues.filter((l) => l.league_type === filterType)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const openAdd = () => {
    setEditingId(null)
    setFormType("pool")
    setFormTitle("")
    setFormDate("")
    setFormTime("")
    setFormDescription("")
    setFormLocation("Ace Game Room Gallery")
    setModalOpen(true)
  }

  const openEdit = (event: LeagueEvent) => {
    setEditingId(event.id)
    setFormType(event.league_type)
    setFormTitle(event.title)
    setFormDate(event.event_date)
    setFormTime(event.event_time || "")
    setFormDescription(event.description || "")
    setFormLocation(event.location || "")
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setLeagues((prev) =>
        prev.map((l) =>
          l.id === editingId
            ? { ...l, league_type: formType, title: formTitle, event_date: formDate, event_time: formTime || null, description: formDescription || null, location: formLocation || null }
            : l
        )
      )
      showToast("Event updated!")
    } else {
      const newEvent: LeagueEvent = {
        id: `league-new-${Date.now()}`,
        league_type: formType,
        title: formTitle,
        event_date: formDate,
        event_time: formTime || null,
        description: formDescription || null,
        location: formLocation || null,
        created_at: new Date().toISOString(),
      }
      setLeagues((prev) => [...prev, newEvent])
      showToast("Event created!")
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setLeagues((prev) => prev.filter((l) => l.id !== id))
    showToast("Event deleted!")
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
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">League Events</h2>
          <p className="text-sm text-gray-500 mt-1">Manage pool and dart league events</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "pool", "dart"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filterType === type
                ? "bg-ace-cyan text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {type === "all" ? "All Events" : type === "pool" ? "Pool League" : "Dart League"}
          </button>
        ))}
      </div>

      {/* Events table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                  No events found
                </td>
              </tr>
            ) : (
              filtered.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.league_type === "pool"
                          ? "bg-felt-green/10 text-felt-green"
                          : "bg-ace-red/10 text-ace-red"
                      }`}
                    >
                      {event.league_type === "pool" ? "Pool" : "Dart"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{event.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(event.event_date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {event.event_time
                      ? new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
                      : "--"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{event.location || "--"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(event)} className="p-1.5 text-gray-400 hover:text-ace-cyan rounded">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-1.5 text-gray-400 hover:text-ace-red rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Event" : "New Event"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">League Type <span className="text-ace-red">*</span></label>
                <select value={formType} onChange={(e) => setFormType(e.target.value as "pool" | "dart")} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan">
                  <option value="pool">Pool</option>
                  <option value="dart">Dart</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-ace-red">*</span></label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Event title" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-ace-red">*</span></label>
                  <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" value={formTime} onChange={(e) => setFormTime(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="Ace Game Room Gallery" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Event details..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y" />
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
