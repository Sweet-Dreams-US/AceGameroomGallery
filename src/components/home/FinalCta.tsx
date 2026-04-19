"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="bg-[#050505] py-32 lg:py-48 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615722440048-da4fd9202194?w=2400&h=1600&fit=crop&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />

      {/* Decorative gold frame lines */}
      <div className="absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />
      <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-6">FAMILY OWNED · FORT WAYNE · EST. 1992</p>

          <h2 className="font-playfair font-black leading-[0.95] text-[#f5f1ea] mb-10 text-[clamp(3rem,10vw,9rem)]">
            Come build<br />
            the room your<br />
            <span className="gold-gradient-text italic">family gathers in.</span>
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
            <Link href="/experience" className="btn-secondary">
              Visit the Showroom
            </Link>
          </div>

          {/* Trust markers */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 pt-12 border-t border-white/5 max-w-3xl mx-auto">
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
