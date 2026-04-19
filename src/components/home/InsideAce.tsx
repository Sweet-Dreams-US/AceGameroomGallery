"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const FEATURES = [
  {
    num: "01",
    title: "Olhausen Tables",
    desc: "American hardwood. Unbeatable warranty. The Cadillac of pool tables, built in Tennessee since 1972.",
  },
  {
    num: "02",
    title: "Championship Felt",
    desc: "Simonis 860 — the same cloth every BCA pro tournament plays on. Nothing else feels right.",
  },
  {
    num: "03",
    title: "Pinball & Arcade",
    desc: "New Stern and Jersey Jack releases. Curated classics. The machines that made your childhood.",
  },
  {
    num: "04",
    title: "Rainbow Play Sets",
    desc: "Cedar playsets built to last through three kids. Residential & commercial. Free installation.",
  },
  {
    num: "05",
    title: "Darafeev Furniture",
    desc: "Hand-rubbed solid wood bars and pub tables. Family-owned Illinois craftsmanship since 1946.",
  },
  {
    num: "06",
    title: "McDermott Cues",
    desc: "American-made. Lifetime warranty on the shaft. The cue you hand down to your grandkids.",
  },
  {
    num: "07",
    title: "Shuffleboard",
    desc: "9-foot to 22-foot tables. Butcher-block tops. Polymer playing surfaces that never warp.",
  },
  {
    num: "08",
    title: "Springfree Trampolines",
    desc: "The world's safest trampoline. No exposed springs. Free delivery + install on every model.",
  },
]

export function InsideAce() {
  return (
    <section className="bg-[#080808] py-24 lg:py-40 relative">
      {/* Subtle vertical divider lines */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto px-6 lg:px-10 hidden lg:grid grid-cols-4 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-start-2 border-l border-white/[0.02]" style={{ gridColumnStart: i + 1 }} />
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div className="mb-16 lg:mb-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="section-number mb-4">/ 003 — INSIDE ACE</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
              What you&apos;ll find
              <br />
              <span className="gold-gradient-text italic">when you walk in.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-[#a8a198] leading-relaxed">
              10,000 square feet of the most specific, best-in-class recreational
              goods you&apos;ll find anywhere in Indiana.
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative bg-[#080808] p-8 lg:p-10 hover:bg-[#0f0f0f] transition-colors duration-500 min-h-[280px] flex flex-col"
            >
              <span className="text-xs font-display tracking-[0.25em] text-[#6b655e] mb-6">
                / {feature.num}
              </span>
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-[#f5f1ea] mb-4 group-hover:text-[#d4a843] transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-sm text-[#a8a198] leading-relaxed flex-1">
                {feature.desc}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/collection" className="btn-primary">
            Browse the Full Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
