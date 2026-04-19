"use client"

import { useEffect, useState } from "react"
import { Check, Save } from "lucide-react"
import { STORAGE_KEYS } from "@/lib/admin-storage"

interface ContentBlock {
  key: string
  label: string
  description: string
  rows?: number
}

const CONTENT_BLOCKS: ContentBlock[] = [
  {
    key: "hero_headline",
    label: "Hero Headline",
    description:
      "Main homepage hero headline. Keep it short and memorable.",
    rows: 2,
  },
  {
    key: "hero_subheadline",
    label: "Hero Subheadline",
    description: "One-line supporting copy below the hero headline.",
    rows: 2,
  },
  {
    key: "about_story",
    label: "About — Our Story",
    description:
      "The headline paragraph on the About page about ACE's origin.",
    rows: 6,
  },
  {
    key: "why_shop",
    label: "Why Shop at ACE",
    description: "The core pitch for choosing Ace Game Room Gallery.",
    rows: 4,
  },
  {
    key: "services_billiard",
    label: "Services — Billiard",
    description:
      "Description of billiard services (tear-down, moving, recovering).",
    rows: 4,
  },
  {
    key: "services_pinball",
    label: "Services — Pinball",
    description: "Description of pinball machine maintenance & repair.",
    rows: 4,
  },
  {
    key: "services_playset",
    label: "Services — Playset",
    description: "Description of Rainbow Play Systems installation.",
    rows: 4,
  },
  {
    key: "showroom_cta",
    label: "Showroom CTA Copy",
    description:
      "The copy invitation to visit the Fort Wayne showroom.",
    rows: 3,
  },
]

const DEFAULT_CONTENT: Record<string, string> = {
  hero_headline:
    "A pool table isn't furniture. It's the heart of a home.",
  hero_subheadline:
    "Fort Wayne's most curated game room showroom since 1992.",
  about_story:
    "Ace Game Room Gallery was established in 1992 as a coin-operated amusement supplier serving local businesses with pool tables, pinball machines, video games, and jukeboxes. Two years later, founder Bret Almashie expanded the business model to include retail sales.",
  why_shop:
    "ACE Game Room sells more pool tables than all of the surrounding competition combined. We're the experts! With over 25 years of experience in the industry.",
  services_billiard:
    "Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables.",
  services_pinball:
    "Professional pinball machine maintenance and repair services.",
  services_playset:
    "Installation and maintenance for Rainbow Play Systems residential and commercial playsets.",
  showroom_cta:
    "Walk in. See it. Feel the weight of the slate. Our 10,000 sq ft showroom is open Mon–Sat.",
}

export default function AdminContentPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    let stored: Record<string, string> = {}
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.CONTENT)
      if (raw) stored = JSON.parse(raw) as Record<string, string>
    } catch {
      stored = {}
    }
    const merged: Record<string, string> = {}
    for (const block of CONTENT_BLOCKS) {
      merged[block.key] = stored[block.key] ?? DEFAULT_CONTENT[block.key] ?? ""
    }
    setValues(merged)
    // Persist any new default keys.
    try {
      window.localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(merged))
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  const handleChange = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setSaved((s) => ({ ...s, [key]: false }))
  }

  const handleSave = (key: string) => {
    if (typeof window === "undefined") return
    try {
      const next = { ...values }
      window.localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(next))
      setSaved((s) => ({ ...s, [key]: true }))
      setTimeout(() => {
        setSaved((s) => ({ ...s, [key]: false }))
      }, 1800)
    } catch {
      // ignore in demo
    }
  }

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <p className="eyebrow mb-3">/ Copy</p>
        <h1 className="font-playfair text-3xl lg:text-4xl text-[#1a1612]">
          Site Content
        </h1>
        <p className="text-[#6b655e] mt-2">
          Edit the copy that appears across the site. Save each block
          individually.
        </p>
      </div>

      {!loaded ? (
        <div className="bg-white border border-[#1a1612]/8 p-10 text-center text-[#6b655e] text-sm">
          Loading…
        </div>
      ) : (
        <div className="space-y-6">
          {CONTENT_BLOCKS.map((block) => (
            <section
              key={block.key}
              className="bg-white border border-[#1a1612]/8 p-7"
            >
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="font-playfair text-lg text-[#1a1612]">
                      {block.label}
                    </h2>
                    <code className="text-[10px] tracking-[0.2em] uppercase text-[#a8a198]">
                      {block.key}
                    </code>
                  </div>
                  <p className="text-xs text-[#6b655e] mt-1.5">
                    {block.description}
                  </p>
                </div>
              </div>

              <textarea
                value={values[block.key] ?? ""}
                onChange={(e) => handleChange(block.key, e.target.value)}
                rows={block.rows ?? 4}
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors text-sm leading-relaxed resize-y"
              />

              <div className="flex items-center justify-end mt-4 gap-3">
                {saved[block.key] && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#1a6b3c] tracking-wide">
                    <Check className="w-3.5 h-3.5" strokeWidth={2} />
                    Saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleSave(block.key)}
                  className="btn-primary !py-2.5 !px-5 text-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
