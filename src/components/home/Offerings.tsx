"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BRAND_IMAGES } from "@/lib/brand-images"

/**
 * What Ace offers beyond the products themselves, as a big type index.
 * On desktop, hovering or focusing a title swaps the large photo and caption.
 * On phones, each title carries its own photo and description.
 */

const OFFERINGS = [
  {
    title: "The Showroom",
    body: "Walk the floor, play the games, and talk to people who know them. Open Monday to Saturday.",
    image: BRAND_IMAGES.heroShowroom,
    href: "/experience",
  },
  {
    title: "Delivery & Setup",
    body: "We bring it to your home and set it up where you want it, from pool tables to basketball goals.",
    image: BRAND_IMAGES.poolTableDetail,
    href: "/services",
  },
  {
    title: "Moves & Re-Felting",
    body: "Moving a table, or bringing an old one back to life? We take it apart, move it, and put on new cloth.",
    image: BRAND_IMAGES.headerServices,
    href: "/services",
  },
  {
    title: "Pinball & Game Repair",
    body: "Routine maintenance and repairs that keep your machines playing the way they should.",
    image: BRAND_IMAGES.pinballArcade,
    href: "/services",
  },
  {
    title: "Playset Installation",
    body: "Our crew builds your Rainbow playset in your yard, so you don't lose a weekend to it.",
    image: BRAND_IMAGES.playsetCedar,
    href: "/playsets",
  },
  {
    title: "Pool & Dart Leagues",
    body: "Join a league and keep playing, with schedules, standings, and stats all season.",
    image: BRAND_IMAGES.cuesDisplay,
    href: "/pool-league",
  },
]

export function Offerings() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = OFFERINGS[activeIndex]

  return (
    <section className="crimson-section py-14 lg:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-transparent" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rotate-45 bg-[#f1c40f]" />
            <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]">WHAT WE OFFER</p>
          </div>
          <h2 className="font-editorial text-3xl lg:text-5xl text-[#f5efe6] leading-tight mb-8 lg:mb-10">
            From the showroom floor <span className="italic text-[#f1c40f]">to your home.</span>
          </h2>

          <ol className="border-t border-[#f5efe6]/20">
            {OFFERINGS.map((offering, index) => {
              const isActive = index === activeIndex
              return (
                <li key={offering.title} className="border-b border-[#f5efe6]/20">
                  <Link
                    href={offering.href}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group flex items-center gap-4 lg:gap-6 py-4 lg:py-3"
                  >
                    <span className="hidden lg:block font-display tracking-[0.2em] text-xs text-[#f1c40f] w-6">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-anton uppercase leading-[1.05] text-[1.75rem] lg:text-[clamp(2.25rem,6svh,4rem)] transition-all duration-300 text-[#f5efe6] ${
                          isActive
                            ? "lg:text-[#f1c40f] lg:translate-x-2"
                            : "lg:text-transparent lg:[-webkit-text-stroke:1px_rgba(245,239,230,0.6)]"
                        }`}
                      >
                        {offering.title}
                      </h3>
                      <p className="lg:hidden mt-2 text-sm leading-relaxed text-[#f5efe6]/85">{offering.body}</p>
                    </div>

                    <div className="lg:hidden relative w-20 h-20 shrink-0 overflow-hidden">
                      <Image src={offering.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>

                    <ArrowUpRight
                      className={`hidden lg:block w-7 h-7 text-[#f1c40f] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Large photo and caption, desktop only */}
        <div className="hidden lg:block lg:col-span-5 relative min-h-[480px] overflow-hidden" aria-live="polite">
          {OFFERINGS.map((offering, index) => (
            <Image
              key={offering.title}
              src={offering.image}
              alt=""
              fill
              sizes="40vw"
              className={`object-cover transition-all duration-700 ${
                index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/90 via-[#1a0505]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="font-editorial text-2xl text-[#f5efe6] mb-2">{active.title}</p>
            <p className="text-[#f5efe6]/90 leading-relaxed max-w-md">{active.body}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-transparent" />
    </section>
  )
}
