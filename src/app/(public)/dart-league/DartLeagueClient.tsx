"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Target, ArrowUpRight, Users, Award, Zap, Calendar } from "lucide-react"

const REASONS = [
  {
    icon: Users,
    title: "Good people. Good throws.",
    body:
      "Every player who shows up wants the same thing — a fair match, a cold drink, and a room that isn't a tavern. That's what we build.",
  },
  {
    icon: Award,
    title: "Skill-matched play.",
    body:
      "New throwers and veterans both have a home here. Divisions are matched by handicap, so nobody gets buried in their first week.",
  },
  {
    icon: Zap,
    title: "Regular league night.",
    body:
      "A standing weekly time, steel-tip and soft-tip boards, scoring handled, drinks on hand. Turn up, throw, settle in.",
  },
]

export default function DartLeagueClient() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=2400&h=1600&fit=crop&q=85')",
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
            <p className="section-number mb-6">/ 001 — DART LEAGUE</p>
            <h1 className="hero-headline text-[#f5f1ea] mb-8">
              Throw with
              <br />
              <span className="gold-gradient-text italic">us.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light leading-relaxed max-w-2xl">
              Steel-tip, soft-tip, singles, doubles, cricket, 501. Our dart
              league is where Fort Wayne&apos;s throwers meet weekly to test a
              stroke and talk trash with good manners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= NEXT SEASON (EMPTY STATE) ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 002 — SCHEDULE</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
                The next season
                <br />
                <span className="gold-gradient-text italic">is close.</span>
              </h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="card-luxe p-10 lg:p-16"
          >
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                <div className="relative w-28 h-28 lg:w-36 lg:h-36">
                  <div className="absolute inset-0 rounded-full border-2 border-[#d4a843]/30" />
                  <div className="absolute inset-3 rounded-full border border-[#d4a843]/20" />
                  <div className="absolute inset-6 rounded-full border border-[#d4a843]/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Target className="w-8 h-8 lg:w-10 lg:h-10 text-[#d4a843]" />
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-9">
                <p className="eyebrow mb-4">Status</p>
                <h3 className="font-playfair text-3xl lg:text-5xl font-bold text-[#f5f1ea] mb-6 leading-tight">
                  Next season <span className="gold-gradient-text italic">announced soon.</span>
                </h3>
                <p className="text-base lg:text-lg text-[#a8a198] font-light leading-relaxed mb-8 max-w-xl">
                  We&apos;re finalizing board assignments, night-of-week, and
                  handicap divisions. Drop your info below and we&apos;ll email
                  you first — before the public calendar goes out.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/contact" className="btn-primary group">
                    Get on the List
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <a href="tel:+12604323443" className="btn-secondary">
                    Call (260) 432-3443
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="py-24 lg:py-32 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 003 — WHY JOIN</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
                Three reasons
                <br />
                <span className="gold-gradient-text italic">to sign up.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#080808] p-8 lg:p-10 min-h-[320px] flex flex-col hover:bg-[#0f0f0f] transition-colors duration-500"
                >
                  <div className="w-12 h-12 border border-[#d4a843]/30 flex items-center justify-center text-[#d4a843] mb-8">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-playfair text-xl lg:text-2xl font-bold text-[#f5f1ea] mb-4 leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[#a8a198] leading-relaxed flex-1">
                    {reason.body}
                  </p>
                </motion.div>
              )
            })}
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
            <p className="eyebrow mb-6">First throw is free</p>
            <h2 className="font-playfair font-black leading-[0.95] text-[#f5f1ea] mb-10 text-[clamp(2.5rem,8vw,6rem)]">
              Chalk your tips,
              <br />
              <span className="gold-gradient-text italic">we&apos;ll see you soon.</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light max-w-2xl mx-auto leading-relaxed mb-12">
              New to league play? Tell us in the form &mdash; we&apos;ll match
              you with a welcoming team and help with board standards and
              scoring your first night.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary group">
                Join the League
                <Calendar className="w-4 h-4" />
              </Link>
              <Link href="/pool-league" className="btn-secondary">
                See the Pool League
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
