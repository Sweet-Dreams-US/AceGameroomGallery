"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const WORDS = ["RACK.", "BREAK.", "GATHER.", "LIVE.", "REPEAT."]

export function Mantra() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-60%"])

  return (
    <section ref={ref} className="py-24 lg:py-40 bg-[#faf8f3] overflow-hidden relative">
      {/* Decorative rail of diamonds at top — like a pool table sight marker row */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 mb-20 lg:mb-28">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-3 opacity-50">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_2px_rgba(92,30,12,0.3)]"
              />
            ))}
          </div>
          <p className="section-number">/ 001 — THE PHILOSOPHY</p>
          <div className="flex items-center gap-3 opacity-50">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_2px_rgba(92,30,12,0.3)]"
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05] mb-8">
            We don&apos;t sell pool tables.
            <br />
            <span className="gold-gradient-text italic">We sell the reason you&apos;ll be home on Friday night.</span>
          </h2>
          <p className="text-lg text-[#6b655e] font-light leading-relaxed max-w-2xl">
            Every piece in our showroom was chosen for one reason: because it&apos;s the
            kind of thing you only buy once — and we want yours to be the one that
            lasts through decades, through moves, through generations.
          </p>
        </div>
      </div>

      {/* Scrolling mantra */}
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-16 lg:gap-24"
      >
        {Array.from({ length: 3 }).map((_, setIdx) => (
          <div key={setIdx} className="flex items-center gap-16 lg:gap-24">
            {WORDS.map((word, i) => (
              <div key={`${setIdx}-${i}`} className="flex items-center gap-16 lg:gap-24">
                <span
                  className={`font-playfair italic text-[20vw] lg:text-[16vw] font-black leading-none ${
                    i % 2 === 0 ? "text-[#1a1612]" : "gold-gradient-text"
                  }`}
                >
                  {word}
                </span>
                <span className="w-3 h-3 rounded-full bg-[#d4a843] flex-shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
