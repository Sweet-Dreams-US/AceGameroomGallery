"use client"

import Image from "next/image"
import { BRAND_IMAGES } from "@/lib/brand-images"

const BRANDS = [
  "OLHAUSEN",
  "VALLEY",
  "MCDERMOTT",
  "RAINBOW PLAY",
  "DARAFEEV",
  "CHAMPIONSHIP",
  "SIMONIS",
  "LUCASI",
  "VIKING",
  "PREDATOR",
  "SPRINGFREE",
  "C.L. BAILEY",
  "PLANK & HIDE",
  "J. PECHAUER",
  "HOLLAND BAR STOOL",
  "RAM GAME ROOM",
  "STERN",
  "JERSEY JACK",
  "TORNADO",
  "STIGA",
  "WINMAU",
  "GOALSETTER",
  "ARACHNID",
  "PRESIDENTIAL",
  "ROCK-OLA",
  "AMERICAN HERITAGE",
  "CALLEE",
]

/**
 * Brand ribbon — dramatic dark band with marquee.
 * Replaces the cream-toned version. Black background, gold dividers,
 * the names tickering past as if on the bottom of a vintage broadcast.
 */
export function BrandPartners() {
  return (
    <section className="bg-[#0a0a0a] py-20 lg:py-28 border-y border-[#f1c40f]/10 overflow-hidden relative">
      {/* Background — faint dark wood logo as decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none">
        <Image
          src={BRAND_IMAGES.aceMarkDark}
          alt=""
          width={400}
          height={400}
          className="w-[300px] lg:w-[400px] h-auto"
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 mb-12 lg:mb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rotate-45 bg-[#f1c40f]" />
              <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]">
                / 005 — THE BRANDS
              </p>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl text-[#f5efe6] leading-[0.95] uppercase">
              27 NAMES.
              <br />
              <span className="text-transparent bg-gradient-to-b from-[#f1c40f] to-[#c0392b] bg-clip-text">
                ZERO COMPROMISES.
              </span>
            </h2>
          </div>
          <div className="border-l-2 border-[#f1c40f] pl-5 max-w-sm">
            <p className="text-[#f5efe6]/80 text-sm leading-relaxed">
              Every brand earned its slot. Most American-made. Most
              family-owned. None on this list because of a kickback —
              they&apos;re here because they&apos;re the best at what they do.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee row 1 — large bold */}
      <div className="relative z-10 mb-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={`r1-${brand}-${i}`} className="flex items-center gap-12 px-7">
              <span className="font-anton text-4xl lg:text-5xl tracking-[0.05em] text-[#f5efe6] hover:text-[#f1c40f] transition-colors duration-500 cursor-default">
                {brand}
              </span>
              <span className="w-2 h-2 rotate-45 bg-[#f1c40f]/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Thin gold separator */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-transparent my-3" />

      {/* Marquee row 2 — slimmer, reverse direction */}
      <div className="relative z-10">
        <div
          className="flex whitespace-nowrap animate-marquee"
          style={{
            animationDirection: "reverse",
            animationDuration: "55s",
          }}
        >
          {[...BRANDS.slice().reverse(), ...BRANDS.slice().reverse()].map(
            (brand, i) => (
              <div
                key={`r2-${brand}-${i}`}
                className="flex items-center gap-10 px-6"
              >
                <span className="font-display text-2xl lg:text-3xl tracking-[0.2em] text-[#f5efe6]/40 hover:text-[#f1c40f] transition-colors duration-500 cursor-default">
                  {brand}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#f1c40f]/30" />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
