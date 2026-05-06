"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const WORDS = ["RACK.", "BREAK.", "GATHER.", "LIVE.", "REPEAT."]

/**
 * Mantra section — felt-green theme.
 * The site's first deep-color block: emerald billiard cloth with a subtle
 * weave texture, gold-script editorial pull-quote, and a horizontally
 * scrolling word-rail that ties to scroll position.
 */
export function Mantra() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-60%"])

  return (
    <section
      ref={ref}
      className="felt-section py-24 lg:py-40 overflow-hidden relative"
    >
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 mb-20 lg:mb-28">
        {/* Decorative diamond rail at top */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-3 opacity-70">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              />
            ))}
          </div>
          <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]/90">
            / 001 — THE PHILOSOPHY
          </p>
          <div className="flex items-center gap-3 opacity-70">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              />
            ))}
          </div>
        </div>

        {/* Editorial pull-quote in DM Serif Display — fashion magazine vibe */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-normal text-[#f5efe6] leading-[1.05] mb-10">
            We don&apos;t sell pool tables.
            <br />
            <span className="italic text-[#f1c40f]">
              We sell the reason
            </span>
            <br />
            you&apos;ll be home on Friday night.
          </h2>

          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-[#f1c40f]/40 max-w-32" />
            <span className="font-script text-2xl text-[#f1c40f]">
              — the ace difference
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f1c40f]/40 to-[#f1c40f]/40 max-w-32" />
          </div>

          <p className="text-lg text-[#f5efe6]/85 font-light leading-relaxed max-w-2xl mx-auto">
            Every piece in our showroom was chosen for one reason: because
            it&apos;s the kind of thing you only buy once — and we want yours
            to be the one that lasts through decades, through moves, through
            generations.
          </p>
        </div>
      </div>

      {/* Scrolling mantra — bigger, bolder with the new font system */}
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-12 lg:gap-20 relative z-10"
      >
        {Array.from({ length: 3 }).map((_, setIdx) => (
          <div
            key={setIdx}
            className="flex items-center gap-12 lg:gap-20"
          >
            {WORDS.map((word, i) => (
              <div
                key={`${setIdx}-${i}`}
                className="flex items-center gap-12 lg:gap-20"
              >
                <span
                  className={`font-anton text-[18vw] lg:text-[14vw] leading-none ${
                    i % 2 === 0
                      ? "text-[#f5efe6]"
                      : "text-transparent bg-gradient-to-b from-[#f1c40f] via-[#e8a43a] to-[#c0392b] bg-clip-text"
                  }`}
                  style={{ WebkitTextStroke: i % 2 === 0 ? "1px rgba(0,0,0,0.2)" : "none" }}
                >
                  {word}
                </span>
                <span className="w-3 h-3 rotate-45 bg-[#f1c40f] flex-shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Bottom rail accent */}
      <div className="relative z-10 mt-16 lg:mt-24 max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#f1c40f]/30 to-transparent" />
      </div>
    </section>
  )
}
