"use client"

import { motion } from "framer-motion"

/**
 * The Manifesto — crimson editorial section.
 * A magazine-style numbered list of the standards ACE holds itself to.
 * Heavy industrial display type (Anton) for the numbers, warm cream copy.
 */

const STANDARDS = [
  {
    num: "01",
    title: "American-made first",
    body: "Olhausen in Tennessee. Darafeev in Illinois. Goalsetter in South Dakota. We carry foreign brands when they earn it — never to chase the lowest price.",
  },
  {
    num: "02",
    title: "Slate, not particleboard",
    body: "Every pool table on the floor sits on real slate. If it costs us a sale to refuse the cheap stuff, we lose the sale. Some lines we just don't cross.",
  },
  {
    num: "03",
    title: "Free install on slate items",
    body: "An 800-pound table needs two people, three hours, and a level. That's our problem, not yours. Free on every pool table over $2,499.",
  },
  {
    num: "04",
    title: "Salaried, not commissioned",
    body: "Our team isn't on commission. Take the cheap one if it fits. We'd rather you trust us in five years than overpay today.",
  },
  {
    num: "05",
    title: "We stand behind it forever",
    body: "If you bought a Brunswick from us in 1995 and the rubber's gone, call us. We'll come look at it. That's what 32 years of one address gets you.",
  },
  {
    num: "06",
    title: "Price match. Always.",
    body: "Find the same model cheaper at a real, authorized dealer? We match it. We've done this thousands of times. The answer is yes before you ask.",
  },
]

export function Manifesto() {
  return (
    <section className="crimson-section py-24 lg:py-36 relative overflow-hidden">
      {/* Decorative torn paper edge top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-transparent" />

      {/* Faint pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f5efe6' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header — magazine masthead style */}
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-3 h-3 rotate-45 bg-[#f1c40f]" />
              <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]">
                / 002 — THE MANIFESTO
              </p>
            </div>

            <h2 className="font-anton text-5xl md:text-7xl lg:text-9xl text-[#f5efe6] leading-[0.92] uppercase">
              SIX STANDARDS.
              <br />
              <span className="text-transparent bg-gradient-to-b from-[#f1c40f] to-[#e67e22] bg-clip-text">
                NON-NEGOTIABLE.
              </span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="border-l-2 border-[#f1c40f] pl-6 py-2">
              <p className="font-script text-2xl text-[#f1c40f] mb-2">
                What we promise.
              </p>
              <p className="text-[#f5efe6]/85 leading-relaxed text-sm">
                If you walk out of ACE with something we sold you, every one
                of these is true. Walk out with something else and one of them
                probably isn&apos;t. That&apos;s the whole pitch.
              </p>
            </div>
          </div>
        </div>

        {/* Standards grid — magazine numbered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#f5efe6]/10">
          {STANDARDS.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="bg-gradient-to-br from-[#8b1a1a] to-[#6b1010] p-8 lg:p-10 group hover:from-[#9b2424] hover:to-[#7b1818] transition-colors relative"
            >
              {/* Big background number */}
              <span
                className="absolute top-2 right-4 font-anton text-[8rem] lg:text-[10rem] leading-none text-[#f1c40f]/8 select-none pointer-events-none"
                aria-hidden="true"
              >
                {s.num}
              </span>

              <div className="relative">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-anton text-3xl text-[#f1c40f]">
                    /{s.num}
                  </span>
                  <span className="h-px flex-1 bg-[#f5efe6]/15" />
                </div>
                <h3 className="font-editorial text-2xl lg:text-3xl text-[#f5efe6] mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[#f5efe6]/80 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-16 lg:mt-20 text-center">
          <p className="font-script text-3xl lg:text-4xl text-[#f1c40f] mb-2">
            — Bret Almashie, owner
          </p>
          <p className="font-display tracking-[0.25em] text-xs text-[#f5efe6]/60 uppercase">
            Since 1992
          </p>
        </div>
      </div>

      {/* Bottom torn edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-transparent" />
    </section>
  )
}
