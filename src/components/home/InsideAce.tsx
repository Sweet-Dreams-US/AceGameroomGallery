"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ACE = "http://www.acegameroom.com/store/content/images/thumbs"

const FEATURES = [
  {
    num: "01",
    title: "Olhausen Tables",
    desc: "American hardwood. Lifetime warranty. The Cadillac of pool tables, built in Tennessee since 1972.",
    image: `${ACE}/0001358_olhausen-augusta-pool-table_415.png`,
    href: "/billiards",
  },
  {
    num: "02",
    title: "Pinball Machines",
    desc: "New Stern and Jersey Jack releases. Curated classics. The machines that made your childhood.",
    image: `${ACE}/0003115_pinball-machines_450.png`,
    href: "/games",
  },
  {
    num: "03",
    title: "Arcade Cabinets",
    desc: "Multicade uprights, cocktail tables, Big Buck Hunter, NFL Blitz. 400+ titles, bar-grade cabinets.",
    image: `${ACE}/0002829_arcade-classics-multicade-upright_415.jpeg`,
    href: "/games",
  },
  {
    num: "04",
    title: "Shuffleboard",
    desc: "C.L. Bailey butcher-block tops. 9-foot to 22-foot. Polymer surfaces that never warp.",
    image: `${ACE}/0006604_cl-bailey-12-skylar-shuffleboard_415.jpeg`,
    href: "/games",
  },
  {
    num: "05",
    title: "Darafeev Bars",
    desc: "Hand-rubbed solid wood bars and pub tables. Family-owned Illinois craftsmanship since 1946.",
    image: `${ACE}/0005693_arabella-bar_415.jpeg`,
    href: "/furniture",
  },
  {
    num: "06",
    title: "Foosball & Hockey",
    desc: "Tournament-grade foosball, dome hockey, air hockey. The games that own every basement party.",
    image: `${ACE}/0003116_foosball_450.png`,
    href: "/games",
  },
  {
    num: "07",
    title: "Rainbow Playsets",
    desc: "Cedar swingsets built to last through three kids. Residential & commercial. Free installation.",
    image: `${ACE}/0003196_residential-playsets_450.jpeg`,
    href: "/playsets",
  },
  {
    num: "08",
    title: "Basketball Goals",
    desc: "Goalsetter in-ground systems with tempered glass backboards. Regulation-size driveways.",
    image: `${ACE}/0002962_goalsetter-all-star-54-x-36-in-ground-basketball-goal_415.jpeg`,
    href: "/outdoor",
  },
]

export function InsideAce() {
  return (
    <section className="bg-[#faf8f3] py-24 lg:py-40 relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div className="mb-16 lg:mb-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
              <p className="section-number">/ 003 — INSIDE ACE</p>
            </div>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#1a1612] leading-[1.05]">
              More than
              <br />
              <span
                className="ace-gradient-text italic"
                style={{ filter: "drop-shadow(0 2px 0 rgba(92, 30, 12, 0.25))" }}
              >
                pool tables.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-[#6b655e] leading-relaxed">
              10,000 square feet of the most specific, best-in-class recreational
              goods you&apos;ll find anywhere in Indiana. Eight categories. One
              showroom. Walk through it in under an hour.
            </p>
          </div>
        </div>

        {/* Feature grid — with real product imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1612]/8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                href={feature.href}
                className="group relative block bg-white hover:bg-[#faf8f3] transition-colors duration-500 h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#faf8f3]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-display tracking-[0.25em] text-[#faf8f3] bg-[#1a1612]/70 backdrop-blur-sm px-2 py-1">
                      / {feature.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <h3 className="font-playfair text-xl lg:text-2xl font-bold text-[#1a1612] mb-3 group-hover:text-[#b8933a] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#6b655e] leading-relaxed flex-1">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/billiards" className="btn-primary">
            Browse the Full Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
