"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const ACE = "http://www.acegameroom.com/store/content/images/thumbs"

const CATEGORIES = [
  {
    name: "Billiards",
    slug: "billiards",
    tagline: "Olhausen. Valley. Plank & Hide.",
    count: "6 collections",
    image: `${ACE}/0003231_billiard-tables_450.png`,
  },
  {
    name: "Games",
    slug: "games",
    tagline: "Pinball, arcade, shuffleboard.",
    count: "10 collections",
    image: `${ACE}/0003115_pinball-machines_450.png`,
  },
  {
    name: "Furniture",
    slug: "furniture",
    tagline: "Bars. Stools. Pub tables.",
    count: "7 collections",
    image: `${ACE}/0003121_bars_450.png`,
  },
  {
    name: "Playsets",
    slug: "playsets",
    tagline: "Rainbow Play Systems. Cedar.",
    count: "2 collections",
    image: `${ACE}/0003196_residential-playsets_450.jpeg`,
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    tagline: "Basketball. Trampolines.",
    count: "3 collections",
    image: `${ACE}/0003129_basketball-goals_450.jpeg`,
  },
  {
    name: "Services",
    slug: "services",
    tagline: "Delivery. Install. Refurb.",
    count: "All tables",
    image: `${ACE}/0003230_billiard-cloth_450.jpeg`,
  },
]

export function Collection() {
  return (
    <section className="bg-[#ebe4d6] py-24 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <p className="section-number mb-4">/ THE COLLECTION</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
              Browse by
              <br />
              <span className="gold-gradient-text italic">category.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-lg text-[#6b655e] font-light leading-relaxed">
              Six categories. Hundreds of products. One showroom.
              Find yours — then come see it in person.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/${cat.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/80 via-[#1a1612]/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#d4a843]/0 group-hover:bg-[#d4a843]/10 transition-colors duration-500" />

                  {/* Category name */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-[#d4a843] mb-4 italic">{cat.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display tracking-[0.25em] text-white/80 uppercase">
                        {cat.count}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:bg-[#d4a843] group-hover:border-[#d4a843] group-hover:text-[#1a1612] transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
