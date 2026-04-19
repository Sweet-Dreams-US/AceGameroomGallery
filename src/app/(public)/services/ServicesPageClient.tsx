"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Target, Gamepad2, TreePine, ChevronDown, ArrowUpRight, X } from "lucide-react"

type Service = {
  id: string
  num: string
  icon: typeof Target
  title: string
  tagline: string
  blurb: string
  includes: string[]
}

const SERVICES: Service[] = [
  {
    id: "billiards",
    num: "01",
    icon: Target,
    title: "Billiard Services",
    tagline: "The 800-pound piece in your room deserves an expert.",
    blurb:
      "A pool table is three slate pieces, a rail system, and a precision cloth — assembled wrong, it's a beautiful disappointment. We tear down, move, re-level, and recover every table like it's going into our own basement.",
    includes: [
      "Full teardown and professional moves (local & long-distance)",
      "New table setup & leveling on slate",
      "Re-felting with Simonis, Championship, and ArtScape cloth",
      "Pocket replacement (leather drop pockets & ball returns)",
      "Rail rubber replacement for dead cushions",
      "Diagnostic visit to identify the right fix before you pay for one",
    ],
  },
  {
    id: "pinball",
    num: "02",
    icon: Gamepad2,
    title: "Pinball Services",
    tagline: "Keep the flipper solenoids firing.",
    blurb:
      "Pinball machines are a thousand moving parts that all need to behave at once. Our team grew up fixing them — when a flipper drags or a display flickers, we find the fault and stock the part.",
    includes: [
      "Routine maintenance and playfield cleaning",
      "Flipper rebuild kits and coil replacement",
      "Display, driver board, and power supply diagnostics",
      "Rubber ring replacement and ball polishing",
      "Leg leveler adjustments and cabinet touch-ups",
      "In-home service calls within 100 miles of Fort Wayne",
    ],
  },
  {
    id: "playsets",
    num: "03",
    icon: TreePine,
    title: "Playset Services",
    tagline: "Built in cedar. Built to outlast childhood.",
    blurb:
      "We're Fort Wayne's authorized dealer for Rainbow Play Systems — residential and commercial. Our crew installs, inspects, and re-anchors the structures that take five years of cannonball landings.",
    includes: [
      "New Rainbow Play Systems installations (residential)",
      "Commercial playset installations for schools & daycares",
      "Annual safety & hardware inspections",
      "Slide, swing, and accessory replacements",
      "Relocations (we take it apart, move it, rebuild it)",
      "Free installation on new system purchases",
    ],
  },
]

const WE_DONT = [
  {
    title: "Repair damaged slate or cabinet wood",
    body:
      "If the slate is cracked or the cabinet is structurally damaged, it needs a cabinet shop — we won't pretend otherwise.",
  },
  {
    title: "Service brands we don't carry",
    body:
      "We stock parts for the brands we sell. If you own something obscure, we'll point you to someone who specializes in it.",
  },
  {
    title: "Bargain installs on no-name tables",
    body:
      "Installing a 5-piece slate table rarely ends well. We'd rather say no than set you up for a year of frustration.",
  },
  {
    title: "Rush jobs without a site visit",
    body:
      "Every space is different. We quote after we see the basement, not from a phone call — it saves everyone the surprise.",
  },
]

export default function ServicesPageClient() {
  const [openId, setOpenId] = useState<string | null>("billiards")

  return (
    <div className="bg-[#0a0a0a]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=2400&h=1600&fit=crop&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <p className="section-number mb-6">/ 001 — SERVICES</p>
            <h1 className="hero-headline text-[#f5f1ea] mb-8">
              We don&apos;t just sell it.
              <br />
              We{" "}
              <span className="gold-gradient-text italic">deliver it,</span>
              {" "}level it,
              <br />
              and keep it playing right.
            </h1>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light leading-relaxed max-w-2xl">
              A table worth buying is worth installing correctly. Our service
              team is the same crew that&apos;s been doing it since 1992 — no
              subcontractors, no franchise labor, no guesswork.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICE ACCORDION ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 002 — WHAT WE DO</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
                Three services,
                <br />
                <span className="gold-gradient-text italic">one standard.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-[#a8a198] leading-relaxed">
                Click each service to see everything included. No packages,
                no upsells — just the work, done right.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-5">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <ServiceCard
                  service={service}
                  isOpen={openId === service.id}
                  onToggle={() => setOpenId(openId === service.id ? null : service.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WE DON'T ================= */}
      <section className="py-24 lg:py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 003 — HONESTY</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
                And what we
                <br />
                <span className="gold-gradient-text italic">don&apos;t do.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-[#a8a198] leading-relaxed">
                Saying &ldquo;no&rdquo; is part of the job. Here&apos;s where we
                send you somewhere better.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {WE_DONT.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-[#080808] p-8 lg:p-10 hover:bg-[#0f0f0f] transition-colors duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 shrink-0 border border-[#c0392b]/40 flex items-center justify-center text-[#c0392b]">
                    <X className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl lg:text-2xl font-bold text-[#f5f1ea] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-[#a8a198] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-6">Ready when you are</p>
            <h2 className="font-playfair font-black leading-[0.95] text-[#f5f1ea] mb-10 text-[clamp(2.5rem,8vw,6rem)]">
              Need service?
              <br />
              <span className="gold-gradient-text italic">Let&apos;s talk.</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Most service calls start with a short conversation and a couple of
              photos. Tell us what&apos;s going on — we&apos;ll tell you honestly
              whether it&apos;s an us-job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary group">
                Schedule Service
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href="tel:+12604323443" className="btn-secondary">
                Call (260) 432-3443
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({
  service,
  isOpen,
  onToggle,
}: {
  service: Service
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = service.icon
  return (
    <div
      className={`card-luxe overflow-hidden transition-all duration-500 ${
        isOpen ? "border-[#d4a843]/40" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-6 lg:gap-8 p-6 lg:p-10 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="section-number hidden md:inline-block shrink-0 w-16 lg:w-20">
          / {service.num}
        </span>

        <div
          className={`shrink-0 w-12 h-12 lg:w-16 lg:h-16 border flex items-center justify-center transition-colors duration-500 ${
            isOpen
              ? "border-[#d4a843] text-[#d4a843]"
              : "border-white/20 text-[#a8a198] group-hover:border-[#d4a843]/60 group-hover:text-[#d4a843]"
          }`}
        >
          <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-playfair text-2xl lg:text-4xl font-bold mb-1 transition-colors duration-500 ${
              isOpen ? "text-[#d4a843]" : "text-[#f5f1ea]"
            }`}
          >
            {service.title}
          </h3>
          <p className="text-sm lg:text-base text-[#a8a198] italic font-playfair hidden sm:block">
            {service.tagline}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0"
        >
          <ChevronDown
            className={`w-6 h-6 transition-colors duration-500 ${
              isOpen ? "text-[#d4a843]" : "text-[#a8a198]"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-10 pb-8 lg:pb-10">
              <div className="pt-6 border-t border-white/5 grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-12 lg:col-span-5">
                  <p className="text-base lg:text-lg text-[#e8e2d5] font-light leading-relaxed">
                    {service.blurb}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p className="eyebrow mb-5">What&apos;s included</p>
                  <ul className="space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[#e8e2d5]">
                        <span className="mt-2 w-1 h-1 rounded-full bg-[#d4a843] shrink-0" />
                        <span className="text-sm lg:text-base leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
