"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"
import { BRAND_IMAGES } from "@/lib/brand-images"

const PILLARS = [
  {
    num: "01",
    title: "The Collection",
    tagline: "Every brand. Hand-selected.",
    body: "Olhausen slate. Darafeev hand-rubbed furniture. Rainbow Play Systems built to outlast childhood. If we carry it, we stake our name on it.",
    bullets: [
      "27 curated brands",
      "American-made first",
      "Lifetime warranties on premium tables",
    ],
    image: BRAND_IMAGES.poolTableDetail,
    href: "/collection",
  },
  {
    num: "02",
    title: "The Service",
    tagline: "Delivered. Installed. Guaranteed.",
    body: "A pool table is 800 pounds of slate. We handle delivery, leveling, cloth installation, and setup — free on qualifying orders, always.",
    bullets: [
      "Free white-glove delivery",
      "Pro install on slate items",
      "Re-felting + teardown service",
    ],
    image: BRAND_IMAGES.cuesDisplay,
    href: "/services",
  },
  {
    num: "03",
    title: "The Experience",
    tagline: "A showroom, not a store.",
    body: "Walk in and see it. Feel the weight of a McDermott. Rack on a championship cloth. The decision deserves more than a photo online.",
    bullets: [
      "10,000+ sq ft showroom",
      "Salaried staff, no commission",
      "Pool & dart league HQ",
    ],
    image: BRAND_IMAGES.gamesFoosball,
    href: "/experience",
  },
]

/**
 * Pillars — compact 3-column grid version.
 * Each pillar is a single tall card: image (aspect 4:3), title, tagline,
 * body, bullets. Cards line up side-by-side at lg+, stack at smaller widths.
 * Saves ~3 viewports of vertical space vs. the old alternating-row layout.
 */
export function Pillars() {
  return (
    <section className="bg-[#f4efe6] py-20 lg:py-28 relative">
      {/* Warm cue-stripe accent — evokes the gradient on the logo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c0392b] via-[#e67e22] to-transparent opacity-60" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
              <p className="section-number">/ 002 — WHY ACE</p>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1612] leading-[1.05]">
              Three things that{" "}
              <span className="gold-gradient-text italic">set us apart.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-base text-[#6b655e] font-light leading-relaxed">
              Fort Wayne has stores that sell pool tables. It has exactly one
              showroom that treats them like the centerpiece of a home. That&apos;s
              not marketing — that&apos;s what you&apos;ll feel walking in.
            </p>
          </div>
        </div>

        {/* 3-column compact pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white border border-[#1a1612]/8 hover:border-[#d4a843]/40 transition-colors duration-500 group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/50 via-transparent to-transparent" />
                {/* Floating number — smaller now */}
                <span className="absolute top-4 left-4 font-playfair italic text-5xl lg:text-6xl font-black text-[#d4a843]/80 leading-none">
                  {pillar.num}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7 flex flex-col flex-1">
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-[#1a1612] mb-1.5 leading-tight">
                  {pillar.title}
                </h3>
                <p className="gold-gradient-text font-playfair italic text-base lg:text-lg mb-4">
                  {pillar.tagline}
                </p>
                <p className="text-sm text-[#6b655e] leading-relaxed mb-5">
                  {pillar.body}
                </p>

                <ul className="space-y-2 mb-6">
                  {pillar.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[13px] text-[#1a1612]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#b8933a] mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pillar.href}
                  className="btn-ghost group/link mt-auto self-start"
                >
                  Learn more
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
