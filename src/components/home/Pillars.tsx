"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const PILLARS = [
  {
    num: "01",
    title: "The Collection",
    tagline: "Every brand. Hand-selected.",
    body: "Olhausen slate tables. Darafeev hand-rubbed furniture. Rainbow Play Systems built to outlast childhood. If we carry it, we stake our name on it.",
    bullets: [
      "27 curated brands",
      "American-made whenever possible",
      "Lifetime warranties on premium tables",
      "Price-match guarantee",
    ],
    image: "http://www.acegameroom.com/store/content/images/thumbs/0001358_olhausen-augusta-pool-table_415.png",
    href: "/collection",
  },
  {
    num: "02",
    title: "The Service",
    tagline: "Delivered. Installed. Guaranteed.",
    body: "A pool table is 800 pounds of slate. You shouldn't install it yourself. We handle delivery, leveling, cloth installation, and setup — free on qualifying orders, always.",
    bullets: [
      "Free white-glove delivery",
      "Professional installation",
      "Re-felting & re-cushioning",
      "Teardown & move services",
    ],
    image: "http://www.acegameroom.com/store/content/images/thumbs/0003230_billiard-cloth_450.jpeg",
    href: "/services",
  },
  {
    num: "03",
    title: "The Experience",
    tagline: "A showroom, not a store.",
    body: "Walk in and see it. Feel the weight of a McDermott cue. Rack on a championship cloth. We built the showroom for the decision — because a $5,000 table deserves more than a photo online.",
    bullets: [
      "Fort Wayne's largest showroom",
      "10,000+ sq ft of product",
      "Expert staff — 25+ years avg tenure",
      "Pool & dart league headquarters",
    ],
    image: "http://www.acegameroom.com/store/content/images/thumbs/0002829_arcade-classics-multicade-upright_415.jpeg",
    href: "/experience",
  },
]

export function Pillars() {
  return (
    <section className="bg-[#f4efe6] py-24 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-20 lg:mb-32 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <p className="section-number mb-4">/ 002 — WHY ACE</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
              Three things that
              <br />
              <span className="gold-gradient-text italic">set us apart.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-lg text-[#6b655e] font-light leading-relaxed">
              Fort Wayne has stores that sell pool tables. It has exactly one
              showroom that treats them like the centerpiece of a home. That&apos;s
              not marketing — that&apos;s what you&apos;ll feel the moment you walk in.
            </p>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="space-y-24 lg:space-y-32">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className={`grid grid-cols-12 gap-6 lg:gap-12 items-center ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="relative aspect-[4/5] overflow-hidden group">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/50 via-transparent to-transparent" />

                  {/* Floating number */}
                  <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                    <span className="font-playfair italic text-7xl lg:text-9xl font-black text-[#d4a843]/60">
                      {pillar.num}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="col-span-12 lg:col-span-5">
                <p className="eyebrow mb-4">Pillar {pillar.num}</p>
                <h3 className="font-playfair text-4xl lg:text-5xl font-bold text-[#1a1612] mb-3">
                  {pillar.title}
                </h3>
                <p className="gold-gradient-text font-playfair italic text-2xl lg:text-3xl mb-8">
                  {pillar.tagline}
                </p>
                <p className="text-lg text-[#6b655e] font-light leading-relaxed mb-8">
                  {pillar.body}
                </p>

                <ul className="space-y-3 mb-10">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-[#1a1612]">
                      <span className="w-1 h-1 rounded-full bg-[#d4a843]" />
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link href={pillar.href} className="btn-ghost group">
                  Learn more
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
