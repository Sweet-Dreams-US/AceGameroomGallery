"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const WORDS = ["RACK.", "BREAK.", "GATHER.", "LIVE.", "REPEAT."]

/**
 * Mantra section — felt-green theme.
 * Emerald billiard cloth with a horizontally scrolling word-rail tied to
 * scroll position. The philosophy quote now lives in the HeroStory film.
 */
export function Mantra() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "-25%"])

  return (
    <section
      ref={ref}
      className="felt-section py-5 lg:py-7 overflow-hidden relative"
      aria-label="ACE mantra"
    >
      {/* Scrolling mantra — bigger, bolder with the new font system */}
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-6 lg:gap-10 relative z-10"
      >
        {Array.from({ length: 6 }).map((_, setIdx) => (
          <div
            key={setIdx}
            className="flex items-center gap-6 lg:gap-10"
          >
            {WORDS.map((word, i) => (
              <div
                key={`${setIdx}-${i}`}
                className="flex items-center gap-6 lg:gap-10"
              >
                <span
                  className={`font-anton text-[9vw] lg:text-[4.5vw] leading-none ${
                    i % 2 === 0
                      ? "text-[#f5efe6]"
                      : "text-transparent bg-gradient-to-b from-[#f1c40f] via-[#e8a43a] to-[#c0392b] bg-clip-text"
                  }`}
                  style={{ WebkitTextStroke: i % 2 === 0 ? "1px rgba(0,0,0,0.2)" : "none" }}
                >
                  {word}
                </span>
                <span className="w-2 h-2 rotate-45 bg-[#f1c40f] flex-shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
