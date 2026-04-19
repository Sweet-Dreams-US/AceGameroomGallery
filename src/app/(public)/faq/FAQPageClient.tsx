"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Search, ArrowUpRight } from "lucide-react"

type FAQ = {
  category: string
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    category: "Services",
    question: "Does Ace Game Room do services on pool tables?",
    answer:
      "Yes. We handle teardown, moving, setup, re-felting (cloth replacement), pocket replacement, and rail rubber replacement. The one thing we don't do: repair damaged slate or cabinet wood — that's a cabinet-shop job, and we won't pretend otherwise.",
  },
  {
    category: "Products",
    question: "What brands of pool tables do you carry?",
    answer:
      "Our core billiards brands are Olhausen, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards. All are American-made premium lines with slate playfields and lifetime warranties on the frame.",
  },
  {
    category: "Financing",
    question: "Do you offer financing?",
    answer:
      "Yes — through Wells Fargo. Monthly payment plans are available on most purchases. Walk into the showroom or ask when you call and we'll walk you through the options that fit the budget.",
  },
  {
    category: "Delivery",
    question: "Do you deliver and install?",
    answer:
      "Yes. Free delivery and professional installation on qualifying purchases within our local radius. Our installers are the same crew that's been doing it for decades — no third-party contractors.",
  },
  {
    category: "Delivery",
    question: "Do you do service calls outside Fort Wayne?",
    answer:
      "Regularly. We deliver and service pool tables, pinball machines, and playsets across northeast Indiana, northwest Ohio, and southern Michigan. Anything over 100 miles — call us and we'll work out the logistics.",
  },
  {
    category: "Visit",
    question: "What are your hours?",
    answer:
      "Monday through Saturday, 10 AM to 6 PM. Closed Sundays. If you need to visit outside those hours for a serious project, call ahead and we'll make it work.",
  },
  {
    category: "Visit",
    question: "Where are you located?",
    answer:
      "2525 W Jefferson Blvd, Fort Wayne, IN 46802. Roughly 10 minutes from downtown, with parking directly in front of the showroom.",
  },
  {
    category: "Installation",
    question: "How long does a pool table installation take?",
    answer:
      "A standard new-table install runs 2–3 hours on-site. That covers unboxing, frame assembly, slate setting and leveling, cushion rails, pocket installation, and cloth stretching. We don't leave until every pocket drops and every ball rolls true.",
  },
  {
    category: "Installation",
    question: "What size pool table fits my room?",
    answer:
      "The rule of thumb: five feet of clearance on all sides of the table for full cue strokes. A 7-foot table needs a room at least 13' × 16'; an 8-foot needs 14' × 17'; a 9-foot tournament table needs 15' × 19'. Measure your space, then contact us — we'll confirm the right size.",
  },
  {
    category: "Buying",
    question: "Do you buy used pool tables?",
    answer:
      "We occasionally accept trade-ins toward the purchase of a new table. We don't buy outright as a general rule. Contact us with photos, the brand, and the dimensions — we'll tell you honestly whether it makes sense.",
  },
  {
    category: "Products",
    question: "Do you carry cloth other than Simonis?",
    answer:
      "Yes. Simonis 860 is the tournament standard, but we also carry Championship Invitational, Tour Edition, and ArtScape custom cloth. Every cloth has a different weight, nap, and speed — stop in and we'll let you feel them.",
  },
  {
    category: "Warranty",
    question: "What warranty comes with an Olhausen table?",
    answer:
      "Olhausen offers a lifetime warranty on the frame, rails, and cushions of every slate table they make. The cloth is covered for one year. Any warranty work within our service radius, we handle directly.",
  },
]

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))]

export default function FAQPageClient() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.filter((f) => {
      const matchesCategory = category === "All" || f.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  return (
    <div className="bg-[#faf8f3]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-[#1a1612]/8">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604289574803-6cbe05627019?w=2400&h=1600&fit=crop&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f3]/70 via-[#faf8f3]/85 to-[#faf8f3]" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <p className="section-number mb-6">/ 001 — FAQ</p>
            <h1 className="hero-headline text-[#1a1612] mb-8">
              Questions.
              <br />
              <span className="gold-gradient-text italic">Answered.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#6b655e] font-light leading-relaxed max-w-2xl">
              Shortcuts to the things Fort Wayne families ask most. If you
              don&apos;t see your question, the phone&apos;s always faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ BODY ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 space-y-5"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b655e]" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setOpenIdx(null)
                }}
                placeholder="Search questions..."
                className="w-full pl-14 pr-5 py-5 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder:text-[#a8a198] focus:outline-none focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843]/30 transition-all duration-300 font-light"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat)
                    setOpenIdx(null)
                  }}
                  className={`px-4 py-2 font-display text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                    category === cat
                      ? "border-[#d4a843] text-[#b8933a] bg-[#d4a843]/10"
                      : "border-[#1a1612]/12 text-[#6b655e] hover:border-[#1a1612]/30 hover:text-[#1a1612]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-px bg-[#1a1612]/8">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-16 text-center"
                >
                  <Search className="w-10 h-10 text-[#a8a198] mx-auto mb-5" />
                  <p className="font-playfair italic text-2xl text-[#1a1612] mb-2">
                    Nothing matched.
                  </p>
                  <p className="text-[#6b655e] text-sm mb-8">
                    Try a different keyword — or just call us.
                  </p>
                  <a href="tel:+12604323443" className="btn-ghost">
                    (260) 432-3443
                  </a>
                </motion.div>
              ) : (
                filtered.map((faq, i) => (
                  <motion.div
                    key={faq.question}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="bg-white"
                  >
                    <button
                      onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      className="w-full flex items-center justify-between gap-6 p-6 lg:p-8 text-left cursor-pointer group"
                      aria-expanded={openIdx === i}
                    >
                      <div className="flex items-start gap-6 min-w-0">
                        <span className="hidden md:inline-block section-number shrink-0 pt-1">
                          / {String(i + 1).padStart(3, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="eyebrow mb-2 text-[10px]">{faq.category}</p>
                          <h3
                            className={`font-playfair text-xl lg:text-2xl font-bold transition-colors duration-500 ${
                              openIdx === i ? "text-[#b8933a]" : "text-[#1a1612] group-hover:text-[#c0392b]"
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openIdx === i ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="shrink-0"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-colors duration-500 ${
                            openIdx === i ? "text-[#b8933a]" : "text-[#6b655e]"
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-8 pb-8 md:pl-[calc(1.5rem+4rem+1.5rem)] lg:pl-[calc(2rem+4rem+1.5rem)]">
                            <p className="text-base lg:text-lg text-[#3d3834] font-light leading-relaxed max-w-3xl">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-32 lg:py-48 bg-[#f4efe6] border-t border-[#1a1612]/8 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-6">Still have questions?</p>
            <h2 className="font-playfair font-black leading-[0.95] text-[#1a1612] mb-10 text-[clamp(2.5rem,8vw,6rem)]">
              The phone is
              <br />
              <span className="gold-gradient-text italic">always faster.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+12604323443" className="btn-primary group">
                Call (260) 432-3443
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/contact" className="btn-secondary">
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
