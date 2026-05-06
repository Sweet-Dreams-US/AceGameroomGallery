"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import { BRAND_IMAGES } from "@/lib/brand-images"

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

/**
 * Testimonials reimagined as an art-book full-screen quote.
 * Massive editorial italic quote, gold opening mark, side-by-side photo,
 * with the next testimonial peeking from the right edge.
 */
export function Testimonials() {
  const [idx, setIdx] = useState(0)
  const current = TESTIMONIALS[idx]

  // Auto-advance every 9s
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length)
    }, 9000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="bg-[#0d0d0d] text-[#f5efe6] py-24 lg:py-36 relative overflow-hidden">
      {/* Background — moody pool table, very dim */}
      <div className="absolute inset-0">
        <Image
          src={BRAND_IMAGES.poolTableBanner}
          alt=""
          fill
          className="object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/60 to-[#0d0d0d]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rotate-45 bg-[#f1c40f]" />
              <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]">
                / 004 — THE PEOPLE
              </p>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#f5efe6] leading-[0.95] uppercase">
              FORT WAYNE
              <br />
              <span className="text-transparent bg-gradient-to-b from-[#f1c40f] to-[#c0392b] bg-clip-text">
                SAYS IT BEST.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <p className="font-anton text-3xl text-[#f1c40f] leading-none">
                {String(idx + 1).padStart(2, "0")}
                <span className="text-[#f5efe6]/40 text-xl">
                  {" "}
                  / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </p>
            </div>
            <button
              onClick={() =>
                setIdx(
                  (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                )
              }
              className="w-12 h-12 rounded-full border border-[#f5efe6]/15 flex items-center justify-center text-[#f5efe6] hover:border-[#f1c40f] hover:text-[#f1c40f] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
              className="w-12 h-12 rounded-full border border-[#f5efe6]/15 flex items-center justify-center text-[#f5efe6] hover:border-[#f1c40f] hover:text-[#f1c40f] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-12 gap-6 lg:gap-12 items-start"
          >
            {/* Massive opening quote mark */}
            <div className="col-span-12 lg:col-span-1">
              <span className="font-editorial italic text-[10rem] lg:text-[14rem] leading-[0.7] text-[#f1c40f] block">
                &ldquo;
              </span>
            </div>

            {/* Quote body */}
            <div className="col-span-12 lg:col-span-8 lg:col-start-2">
              <blockquote className="font-editorial italic text-3xl md:text-4xl lg:text-5xl text-[#f5efe6] leading-[1.2] mb-12">
                {current.quote}
              </blockquote>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f1c40f] to-[#c0392b] flex items-center justify-center font-anton text-2xl text-[#0d0d0d]">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-script text-2xl text-[#f1c40f] leading-tight">
                    {current.name}
                  </p>
                  <p className="text-sm text-[#f5efe6]/70">
                    {current.role}
                  </p>
                  <p className="text-xs text-[#f5efe6]/50 mt-0.5">
                    {current.city}
                  </p>
                </div>

                <div className="ml-auto hidden lg:flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#f1c40f] text-[#f1c40f]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slim progress bar */}
        <div className="mt-16 grid gap-2" style={{ gridTemplateColumns: `repeat(${TESTIMONIALS.length}, 1fr)` }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="relative h-0.5 bg-[#f5efe6]/10 hover:bg-[#f5efe6]/30 transition-colors group"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {i === idx && (
                <motion.span
                  layoutId="testimonial-active"
                  className="absolute inset-0 bg-[#f1c40f]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
