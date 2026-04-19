"use client"

const BRANDS = [
  "OLHAUSEN",
  "VALLEY",
  "McDERMOTT",
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
]

export function BrandPartners() {
  return (
    <section className="bg-[#f4efe6] py-20 lg:py-28 border-y border-[#1a1612]/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 mb-12">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="section-number mb-3">/ 005 — THE BRANDS</p>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] leading-tight">
              The names we
              <br />
              <span className="gold-gradient-text italic">stake our name on.</span>
            </h2>
          </div>
          <p className="text-[#6b655e] max-w-sm">
            27 brands. All hand-selected. Most American-made. No exceptions.
          </p>
        </div>
      </div>

      {/* Brand marquee — two rows, opposite directions */}
      <div className="space-y-8">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={`${brand}-${i}`} className="flex items-center gap-16 px-8">
              <span className="font-display text-3xl lg:text-4xl tracking-[0.15em] text-[#1a1612]/40 hover:text-[#b8933a] transition-colors duration-500 cursor-default">
                {brand}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]/60" />
            </div>
          ))}
        </div>

        {/* Row 2 — different brands, reverse direction */}
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: "reverse", animationDuration: "50s" }}>
          {[...BRANDS.slice().reverse(), ...BRANDS.slice().reverse()].map((brand, i) => (
            <div key={`r2-${brand}-${i}`} className="flex items-center gap-16 px-8">
              <span className="font-display text-3xl lg:text-4xl tracking-[0.15em] text-[#1a1612]/25 hover:text-[#b8933a] transition-colors duration-500 cursor-default">
                {brand}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
