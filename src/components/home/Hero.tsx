"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#1a1612]">
      {/* Background image — a moody, cinematic pool table shot */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615722440048-da4fd9202194?w=2400&h=1600&fit=crop&q=85')",
          }}
        />
        {/* Gradient overlays for depth and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-[#1a1612]/60 to-[#1a1612]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1612]/70 via-transparent to-[#1a1612]/30" />
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-10 pb-20 lg:pb-32 pt-40">
        <div className="grid grid-cols-12 gap-6">
          {/* Scarcity + intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                ))}
              </div>
              <div className="scarcity-badge">
                ESTABLISHED 1992 · FORT WAYNE, INDIANA
              </div>
            </div>

            <h1 className="hero-headline text-white mb-8">
              A pool table<br />
              isn&apos;t furniture.<br />
              <span className="ace-gradient-text italic" style={{ filter: "drop-shadow(0 2px 0 rgba(92, 30, 12, 0.4)) drop-shadow(0 4px 14px rgba(192, 57, 43, 0.25))" }}>
                It&apos;s the heart
              </span><br />
              <span className="text-[#f5f1ea]">of a home.</span>
            </h1>

            <p className="text-lg lg:text-xl text-[#e8e2d5] font-light max-w-xl leading-relaxed mb-10">
              For 32 years, Fort Wayne&apos;s families have come to ACE not to buy a game
              — but to build the room where their family gathers.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/collection" className="btn-primary group">
                Explore the Collection
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-white font-semibold text-sm tracking-[0.1em] uppercase border border-white/60 hover:bg-white hover:text-[#1a1612] transition-all duration-[400ms]"
              >
                Visit the Showroom
              </Link>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="col-span-12 lg:col-span-5 lg:col-start-8 hidden lg:block"
          >
            <div className="relative ml-auto max-w-sm">
              <div className="absolute -inset-px bg-gradient-to-br from-[#d4a843]/50 to-transparent rounded-2xl blur-sm" />
              <div className="relative bg-[#faf8f3]/95 backdrop-blur-xl border border-[#d4a843]/30 rounded-2xl p-8 shadow-2xl">
                <p className="eyebrow mb-6">By the Numbers</p>

                <div className="space-y-6">
                  <StatRow number="32" label="Years serving Fort Wayne" />
                  <div className="h-px bg-[#1a1612]/10" />
                  <StatRow number="27" label="Premium brands curated" />
                  <div className="h-px bg-[#1a1612]/10" />
                  <StatRow number="#1" label="Pool tables sold in NE Indiana" />
                </div>

                <div className="mt-8 pt-6 border-t border-[#1a1612]/10 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a843] to-[#c0392b] border-2 border-[#faf8f3]"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-[#6b655e]">Trusted by thousands</p>
                    <p className="text-[11px] text-[#a8a198]">of Fort Wayne families</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-6 lg:left-10 flex items-center gap-4"
        >
          <div className="w-12 h-px bg-gradient-to-r from-[#d4a843] to-transparent" />
          <span className="text-[10px] font-display tracking-[0.3em] text-[#e8e2d5]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3 h-3 text-[#d4a843]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatRow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-playfair text-5xl font-black gold-gradient-text leading-none">
        {number}
      </span>
      <span className="text-xs text-[#6b655e] uppercase tracking-wider leading-snug">
        {label}
      </span>
    </div>
  )
}
