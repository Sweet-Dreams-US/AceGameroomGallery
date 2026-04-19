"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Chapter = {
  num: string
  eyebrow: string
  year: string
  title: string
  body: string[]
  image: string
  imageAlt: string
}

const CHAPTERS: Chapter[] = [
  {
    num: "001",
    eyebrow: "The Founding",
    year: "1992",
    title: "A route. A truck. A handshake.",
    body: [
      "Ace Game Room Gallery opened in 1992 as a coin-operated amusement supplier — pool tables, jukeboxes, pinball machines, and arcade cabinets placed in taverns, clubs, and restaurants across northeast Indiana.",
      "There was no showroom. No catalog. Just Bret Almashie, a box truck, and the understanding that the machine in the corner of a bar needs to work on a Saturday night — every Saturday night.",
    ],
    image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=1400&fit=crop&q=85",
    imageAlt: "Vintage arcade machines in a warmly lit room",
  },
  {
    num: "002",
    eyebrow: "The Pivot",
    year: "1994",
    title: "The first showroom opens.",
    body: [
      "By 1994 the question had shifted. Locals who saw a Valley table in their favorite bar wanted one in their basement. Friends were asking where to buy. The answer wasn't out there — so we built it.",
      "The retail showroom opened with pool tables, bar stools, shuffleboards, and dartboards sold directly to homeowners. Same buying eye. Same delivery trucks. New customer.",
    ],
    image:
      "https://images.unsplash.com/photo-1604289574803-6cbe05627019?w=1200&h=1400&fit=crop&q=85",
    imageAlt: "Luxury pool table centered in a warm showroom",
  },
  {
    num: "003",
    eyebrow: "The Growth",
    year: "2000s",
    title: "#1 in northeast Indiana.",
    body: [
      "Through the 2000s, ACE became the largest pool-table retailer in northeast Indiana — not by cutting prices, but by refusing to sell what we wouldn't install in our own homes.",
      "Olhausen. Valley. Simonis. Rainbow Play Systems. Darafeev. Springfree. The brands changed, grew, and multiplied, but the filter stayed the same: craftsmanship first, margin second.",
    ],
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=1400&fit=crop&q=85",
    imageAlt: "Professional leveling a slate pool table",
  },
  {
    num: "004",
    eyebrow: "The Standard",
    year: "Today",
    title: "32 years. 27 brands. One promise.",
    body: [
      "Today the showroom spans 10,000 square feet — the only dedicated game room gallery of its kind in the region. 27 premium brands. Lifetime warranties on every slate table. Free delivery and installation in a 100-mile radius.",
      "We still answer the phone on the first ring. We still deliver on Saturdays. And the truck, give or take a few generations, is still the same.",
    ],
    image:
      "https://images.unsplash.com/photo-1636116398581-2c85c73e4f12?w=1200&h=1400&fit=crop&q=85",
    imageAlt: "A curated game room at golden hour",
  },
]

export default function AboutPageClient() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-white/5">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1611091428036-e0211dc27757?w=2400&h=1600&fit=crop&q=85')",
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
            <p className="section-number mb-6">/ 001 — OUR STORY</p>
            <h1 className="hero-headline text-[#f5f1ea] mb-8">
              Since{" "}
              <span className="gold-gradient-text italic">1992.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light leading-relaxed max-w-2xl">
              Four chapters, one philosophy, and a showroom Fort Wayne built
              with us — one pool table, one playset, one family at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CHAPTERS ================= */}
      <section className="py-24 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="space-y-32 lg:space-y-48">
            {CHAPTERS.map((chapter, idx) => (
              <motion.div
                key={chapter.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className={`grid grid-cols-12 gap-6 lg:gap-16 items-center ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                      <span className="font-playfair italic text-7xl lg:text-9xl font-black text-[#d4a843]/60">
                        {chapter.num.slice(-2)}
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8">
                      <span className="font-display text-2xl lg:text-4xl tracking-[0.2em] text-[#f5f1ea]/90">
                        {chapter.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="col-span-12 lg:col-span-6">
                  <p className="section-number mb-4">/ {chapter.num} {chapter.eyebrow.toUpperCase()}</p>
                  <h3 className="font-playfair text-3xl lg:text-5xl font-bold text-[#f5f1ea] mb-8 leading-tight">
                    {chapter.title}
                  </h3>
                  <div className="space-y-5">
                    {chapter.body.map((paragraph, i) => (
                      <p key={i} className="text-base lg:text-lg text-[#a8a198] font-light leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE ACE DIFFERENCE — quote section ================= */}
      <section className="relative py-32 lg:py-48 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div className="absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="eyebrow mb-8">The Ace Difference</p>

            <span className="block gold-gradient-text font-playfair text-[10rem] leading-none opacity-30 mb-[-3rem]">
              &ldquo;
            </span>

            <blockquote className="font-playfair italic text-3xl md:text-5xl lg:text-6xl text-[#f5f1ea] leading-[1.15] max-w-5xl mx-auto mb-12">
              Sell only quality products at a fair price, and back them up with
              excellent customer service.{" "}
              <span className="gold-gradient-text">That&apos;s it.</span>{" "}
              For 32 years. That&apos;s the whole plan.
            </blockquote>

            <div className="gold-divider mx-auto mb-6" />
            <p className="font-display text-xs tracking-[0.3em] text-[#a8a198] uppercase">
              Bret Almashie &middot; Owner
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= NUMBERS STRIP ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="section-number mb-4">/ 005 — BY THE NUMBERS</p>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
                Thirty-two years
                <br />
                <span className="gold-gradient-text italic">add up.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            <StatCell number="32" label="Years in business" />
            <StatCell number="27" label="Premium brands" />
            <StatCell number="#1" label="Pool tables in NE Indiana" />
            <StatCell number="10K" label="Sq ft showroom" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=2400&h=1600&fit=crop&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-6">Visit Us</p>
            <h2 className="font-playfair font-black leading-[0.95] text-[#f5f1ea] mb-10 text-[clamp(2.5rem,8vw,6rem)]">
              Come see it
              <br />
              <span className="gold-gradient-text italic">for yourself.</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#a8a198] font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Thirty minutes in the showroom tells you more than a hundred
              photos. Walk in — bring the kids, bring the measurements, bring the
              questions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary group">
                Plan Your Visit
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/collection" className="btn-secondary">
                Browse the Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function StatCell({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-[#080808] p-10 lg:p-12 text-center hover:bg-[#0f0f0f] transition-colors duration-500">
      <span className="block font-playfair text-6xl lg:text-7xl font-black gold-gradient-text leading-none mb-4">
        {number}
      </span>
      <span className="text-xs font-display tracking-[0.25em] text-[#a8a198] uppercase">
        {label}
      </span>
    </div>
  )
}
