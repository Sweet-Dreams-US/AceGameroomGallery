"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowUpRight, Users, Trophy, Flame } from "lucide-react"

const EVENTS = [
  {
    title: "Summer Pool League Banquet",
    date: "August 12, 2025",
    time: "6:00 PM",
    location: "469 Sports",
    description:
      "Food provided. Awards ceremony followed by an open bracket tournament. Bring your cue and your best form — banquet play is always louder than league night.",
    tag: "BANQUET",
  },
]

const REASONS = [
  {
    icon: Users,
    title: "The room sounds different on league night.",
    body:
      "Eight tables in play at once, Simonis cloth under the lights, everybody calling their shots. You don't get that on a Tuesday in the basement.",
  },
  {
    icon: Trophy,
    title: "Real rankings. Real stakes.",
    body:
      "Season-long standings, weekly match play, and banquet trophies at the end. We run it like a real league because it is one.",
  },
  {
    icon: Flame,
    title: "You get better. Fast.",
    body:
      "Nothing tightens your stroke like playing the same four or five sharks week after week. Skill level doesn't matter — showing up does.",
  },
]

export default function PoolLeagueClient() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-[#1a1612]/8">
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615722440048-da4fd9202194?w=2400&h=1600&fit=crop&q=85')",
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
            <p className="section-number mb-6">/ 001 — POOL LEAGUE</p>
            <h1 className="hero-headline text-[#1a1612] mb-8">
              Join the
              <br />
              <span className="gold-gradient-text italic">league.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#6b655e] font-light leading-relaxed max-w-2xl">
              Our pool league is the heartbeat of the showroom — a community of
              Fort Wayne players who rack, break, and rib each other every
              week. Handicapped, welcoming, and occasionally competitive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 002 — UPCOMING</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
                What&apos;s next
                <br />
                <span className="gold-gradient-text italic">on the calendar.</span>
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="card-luxe p-8 lg:p-12 group"
              >
                <div className="grid grid-cols-12 gap-6 lg:gap-10">
                  {/* Date block */}
                  <div className="col-span-12 lg:col-span-3">
                    <span className="font-display text-xs tracking-[0.25em] uppercase text-[#b8933a] mb-2 inline-block">
                      {event.tag}
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-playfair text-6xl lg:text-7xl font-black gold-gradient-text leading-none">
                        12
                      </span>
                      <div className="flex flex-col">
                        <span className="font-display text-xl tracking-[0.15em] text-[#1a1612]">
                          AUG
                        </span>
                        <span className="text-xs text-[#6b655e]">2025</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="col-span-12 lg:col-span-9">
                    <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-[#1a1612] mb-6 group-hover:text-[#c0392b] transition-colors duration-500">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-6 pb-6 border-b border-[#1a1612]/8">
                      <InfoChip icon={<Calendar className="w-4 h-4" />} label={event.date} />
                      <InfoChip icon={<Clock className="w-4 h-4" />} label={event.time} />
                      <InfoChip icon={<MapPin className="w-4 h-4" />} label={event.location} />
                    </div>

                    <p className="text-base lg:text-lg text-[#6b655e] font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="py-24 lg:py-32 bg-[#f4efe6] border-y border-[#1a1612]/8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 003 — WHY JOIN</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
                Three reasons
                <br />
                <span className="gold-gradient-text italic">to show up.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1612]/8">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 lg:p-10 min-h-[320px] flex flex-col hover:bg-[#faf8f3] transition-colors duration-500"
                >
                  <div className="w-12 h-12 border border-[#d4a843]/40 flex items-center justify-center text-[#b8933a] mb-8">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-playfair text-xl lg:text-2xl font-bold text-[#1a1612] mb-4 leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[#6b655e] leading-relaxed flex-1">
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
        <div className="absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/40 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-6">Next season starts soon</p>
            <h2 className="font-playfair font-black leading-[0.95] text-[#1a1612] mb-10 text-[clamp(2.5rem,8vw,6rem)]">
              Rack &apos;em up
              <br />
              <span className="gold-gradient-text italic">with us.</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#6b655e] font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Email us your handicap, your night-of-week preference, and whether
              you&apos;re a solo or looking to team up. We&apos;ll fit you into
              the next schedule.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary group">
                Join the League
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

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[#1a1612]">
      <span className="text-[#b8933a]">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}
