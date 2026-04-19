"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Mike R.",
    role: "Bought a 9ft Olhausen Augusta",
    city: "Fort Wayne, IN",
    quote:
      "I spent six months shopping online before I walked into ACE. Bret took an hour with me, showed me the difference between slate grades, and I left knowing exactly what I wanted. The table's been in my basement for four years. Still feels like day one.",
    rating: 5,
  },
  {
    name: "Sarah T.",
    role: "Full game room build",
    city: "Fort Wayne, IN",
    quote:
      "We bought a shuffleboard, a bar, six stools, and a neon — all in one afternoon. Free delivery, free install. Three months later the rubbers needed a nudge and they came out same-day. These guys are who Fort Wayne should be buying from.",
    rating: 5,
  },
  {
    name: "David L.",
    role: "Re-felt & refurb",
    city: "Huntington, IN",
    quote:
      "I had a 25-year-old Brunswick that needed everything — new cloth, new rails, new pockets. ACE treated it like a new sale. I thought I'd spend $3,000. I spent $800. Table looks better than when I bought it.",
    rating: 5,
  },
  {
    name: "Angela W.",
    role: "Rainbow Play Set + Springfree",
    city: "New Haven, IN",
    quote:
      "Kids destroy things. Five years in, the playset is still perfect. Trampoline is still perfect. I know the business across town sells a cheaper version — I also know why it's cheaper. Buy once, cry once.",
    rating: 5,
  },
]

export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const current = TESTIMONIALS[idx]

  return (
    <section className="bg-[#faf8f3] py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="mb-16 lg:mb-20 flex items-end justify-between gap-6">
          <div>
            <p className="section-number mb-4">/ 004 — THE PEOPLE</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
              What Fort Wayne
              <br />
              <span className="gold-gradient-text italic">families say.</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-[#1a1612]/12 flex items-center justify-center text-[#1a1612] hover:border-[#d4a843] hover:text-[#b8933a] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-[#1a1612]/12 flex items-center justify-center text-[#1a1612] hover:border-[#d4a843] hover:text-[#b8933a] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 lg:gap-12"
        >
          <div className="col-span-12 lg:col-span-2">
            <div className="flex lg:flex-col gap-1">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#d4a843] text-[#d4a843]" />
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-10 relative">
            <span className="gold-gradient-text absolute -top-8 -left-2 font-playfair text-8xl leading-none opacity-40">
              &ldquo;
            </span>
            <blockquote className="font-playfair italic text-2xl lg:text-4xl text-[#1a1612] leading-[1.3] mb-10 relative">
              {current.quote}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a843] to-[#c0392b] flex items-center justify-center font-playfair text-xl font-black text-white">
                {current.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-[#1a1612]">{current.name}</div>
                <div className="text-sm text-[#6b655e]">
                  {current.role} · {current.city}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-3 mt-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`transition-all duration-500 h-0.5 ${
                i === idx ? "w-12 bg-[#d4a843]" : "w-6 bg-[#1a1612]/12 hover:bg-[#1a1612]/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex lg:hidden items-center gap-4 mt-8 justify-center">
          <button
            onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="w-12 h-12 rounded-full border border-[#1a1612]/12 flex items-center justify-center text-[#1a1612]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
            className="w-12 h-12 rounded-full border border-[#1a1612]/12 flex items-center justify-center text-[#1a1612]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
