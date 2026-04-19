"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const CATEGORIES = [
  {
    name: "Billiards",
    slug: "billiards",
    tagline: "Olhausen. Valley. Plank & Hide.",
    count: "6 collections",
    image: "https://images.unsplash.com/photo-1511017003484-e0bff9aff5e8?w=1200&h=1500&fit=crop&q=85",
  },
  {
    name: "Games",
    slug: "games",
    tagline: "Pinball, arcade, shuffleboard.",
    count: "10 collections",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=1500&fit=crop&q=85",
  },
  {
    name: "Furniture",
    slug: "furniture",
    tagline: "Bars. Stools. Pub tables.",
    count: "7 collections",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=1500&fit=crop&q=85",
  },
  {
    name: "Playsets",
    slug: "playsets",
    tagline: "Rainbow Play Systems. Cedar.",
    count: "2 collections",
    image: "https://images.unsplash.com/photo-1597895139332-1c41e0d17d03?w=1200&h=1500&fit=crop&q=85",
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    tagline: "Basketball. Trampolines.",
    count: "3 collections",
    image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=1200&h=1500&fit=crop&q=85",
  },
  {
    name: "Services",
    slug: "services",
    tagline: "Delivery. Install. Refurb.",
    count: "All tables",
    image: "https://images.unsplash.com/photo-1609767440793-66ff7b7c4d99?w=1200&h=1500&fit=crop&q=85",
  },
]

export function Collection() {
  return (
    <section className="bg-[#080808] py-24 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <p className="section-number mb-4">/ THE COLLECTION</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05]">
              Browse by
              <br />
              <span className="gold-gradient-text italic">category.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-lg text-[#a8a198] font-light leading-relaxed">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#d4a843]/0 group-hover:bg-[#d4a843]/10 transition-colors duration-500" />

                  {/* Category name */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-playfair text-4xl lg:text-5xl font-bold text-[#f5f1ea] mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-[#d4a843] mb-4 italic">{cat.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display tracking-[0.25em] text-[#a8a198] uppercase">
                        {cat.count}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#f5f1ea] group-hover:bg-[#d4a843] group-hover:border-[#d4a843] group-hover:text-[#0a0a0a] transition-all duration-500">
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
