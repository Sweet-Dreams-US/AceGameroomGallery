"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="dark-section py-32 lg:py-48 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615722440048-da4fd9202194?w=2400&h=1600&fit=crop&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0d0d0d] to-[#121212]" />

      {/* Decorative gold frame lines */}
      <div className="absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/40 to-transparent" />
      <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/40 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Diamond rail ornament */}
          <div className="flex items-center justify-center gap-3 mb-8 opacity-70">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              />
            ))}
          </div>

          <p className="eyebrow mb-6">FAMILY OWNED · FORT WAYNE · EST. 1992</p>

          <h2 className="font-playfair font-black leading-[0.95] text-[#f5f1ea] mb-10 text-[clamp(3rem,10vw,9rem)]">
            Come build<br />
            the room your<br />
            <span
              className="ace-gradient-text italic"
              style={{
                filter:
                  "drop-shadow(0 3px 0 rgba(92, 30, 12, 0.55)) drop-shadow(0 8px 24px rgba(192, 57, 43, 0.3))",
              }}
            >
              family gathers in.
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-[#a8a198] font-light max-w-2xl mx-auto leading-relaxed mb-12">
            A pool table is a 30-year decision. So is a swingset. So is the bar
            your kids will grow up watching you pour drinks behind.
            <span className="text-[#f5f1ea]"> Make them once. Make them right.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="btn-primary group">
              Request a Quote
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-[#f5f1ea] font-semibold text-sm tracking-[0.1em] uppercase border border-[#f5f1ea]/60 hover:bg-[#f5f1ea] hover:text-[#121212] transition-all duration-[400ms]"
            >
              Visit the Showroom
            </Link>
          </div>

          {/* Trust markers */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 pt-12 border-t border-white/10 max-w-3xl mx-auto">
            <TrustMark label="Free delivery & install" />
            <TrustMark label="Wells Fargo financing" />
            <TrustMark label="Lifetime warranties" />
            <TrustMark label="Price match guarantee" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TrustMark({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs lg:text-sm text-[#a8a198]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]" />
      {label}
    </div>
  )
}
