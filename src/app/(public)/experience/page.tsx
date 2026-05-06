import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, MapPin, Clock, Phone } from "lucide-react"
import { BRAND_IMAGES } from "@/lib/brand-images"

export const metadata: Metadata = {
  title: "The Experience — Inside the ACE Showroom",
  description:
    "Walk through the 10,000 sq ft showroom in Fort Wayne. See every brand, lean on every cue, rack on every cloth. Mon–Sat 10–6.",
}

const TOUR_STOPS = [
  {
    num: "01",
    name: "Billiards Hall",
    image: BRAND_IMAGES.poolTableDetail,
    body: "Twenty-plus pool tables on the floor, every one set up and ready to play. Slide your hand across an Olhausen Augusta. Feel the Simonis 860. Pick the cue that suits you. Bret will tell you the difference between a 1-piece and 3-piece slate, and which one matters for your basement floor.",
    highlights: [
      "Olhausen, Valley, C.L. Bailey, Plank & Hide on display",
      "Cue wall: 200+ McDermott, Lucasi, Predator, Viking",
      "Cloth color samples — every Simonis and Championship shade",
    ],
  },
  {
    num: "02",
    name: "The Arcade",
    image: BRAND_IMAGES.pinballArcade,
    body: "Glowing playfields, ringing bells, the satisfying clack of flippers. New Stern and Jersey Jack pinball, classic upright cabinets, multicades, foosball, air hockey. Bring the kids — they'll burn an hour. Bring your spouse — they'll find one they want.",
    highlights: [
      "Pinball: 12+ machines on free-play during weekends",
      "Arcade: Multicades + classic restoration units",
      "Foosball + air hockey + ping pong + dome hockey",
    ],
  },
  {
    num: "03",
    name: "The Pub Room",
    image: BRAND_IMAGES.barFurniture,
    body: "Hand-rubbed walnut bars from Darafeev. American Heritage pub tables. Holland Bar Stool stools that actually swivel right. Custom configurations possible — bring photos of your basement and we'll spec the build.",
    highlights: [
      "Bars: 6+ models on the floor, customizable in maple/oak/walnut",
      "Bar stools: 40+ styles, leather + fabric options",
      "Pub tables, poker tables, neon signs, game chairs",
    ],
  },
  {
    num: "04",
    name: "The Backyard",
    image: BRAND_IMAGES.outdoorRecreation,
    body: "Step out back and the Rainbow Play Systems are set up like a real yard — kids can climb. Springfree trampolines, in-ground basketball goals, outdoor cornhole. We install everything we sell.",
    highlights: [
      "Rainbow playsets: 4 configurations on the lot",
      "Springfree trampolines: small / medium / large / oval",
      "Free install + free delivery within 30 miles",
    ],
  },
  {
    num: "05",
    name: "The Service Bay",
    image: BRAND_IMAGES.cuesDisplay,
    body: "Around back, our shop. We re-felt 8-12 tables a week, repair pinball, restore arcade machines, replace pool table rubbers. If you bought it from us — or you didn't — we can probably keep it playing.",
    highlights: [
      "Re-felt + rail rubber replacement",
      "Pinball repair (Stern, JJP, Bally classics)",
      "Teardown / move / setup for relocations",
    ],
  },
]

const PROMISES = [
  {
    num: "01",
    title: "No commission, no rush",
    body: "Our team is salaried, not commissioned. Take an hour. Take three. Bring the kids. We'll be here.",
  },
  {
    num: "02",
    title: "Honest about the trade-offs",
    body: "Cheaper isn't always wrong. We'll tell you when a $2,500 table is the right answer for your room — and when it isn't.",
  },
  {
    num: "03",
    title: "Free to play",
    body: "Every table is racked. Every cue is sharp. Pinball is on free-play. Try before you buy — actually.",
  },
]

export default function ExperiencePage() {
  return (
    <div className="bg-[#faf8f3] min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={BRAND_IMAGES.heroShowroom}
          alt="Inside the ACE Game Room Gallery showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/30" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          <div className="flex items-center gap-3 text-sm mb-6">
            <Link
              href="/"
              className="text-white/70 hover:text-[#d4a843] transition-colors"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Experience</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
            <p className="eyebrow !text-[#d4a843]">/ THE EXPERIENCE</p>
          </div>
          <h1 className="hero-headline text-white mb-6">
            10,000 square feet
            <br />
            <span className="ace-gradient-text italic">to walk through.</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/85 font-light max-w-2xl leading-relaxed">
            A pool table is a $5,000 decision. It deserves more than a photo
            online. Here&apos;s what waiting for you when you visit.
          </p>
        </div>
      </section>

      {/* Quick info band */}
      <section className="bg-white border-y border-[#1a1612]/8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1612]/8">
          <InfoBand
            icon={MapPin}
            label="Location"
            value="2525 W Jefferson Blvd"
            sub="Fort Wayne, IN 46802"
          />
          <InfoBand
            icon={Clock}
            label="Hours"
            value="Mon–Sat · 10AM–6PM"
            sub="Sunday Closed"
          />
          <InfoBand
            icon={Phone}
            label="Call ahead"
            value="(260) 432-3443"
            sub="Ask for Bret"
            href="tel:+12604323443"
          />
        </div>
      </section>

      {/* Tour stops */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
              <p className="section-number">/ THE TOUR</p>
              <span className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f]" />
            </div>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] max-w-2xl mx-auto leading-[1.1]">
              Five rooms, no high pressure,{" "}
              <span className="gold-gradient-text italic">all the time you need.</span>
            </h2>
          </div>

          <div className="space-y-20 lg:space-y-32">
            {TOUR_STOPS.map((stop, idx) => (
              <div
                key={stop.num}
                className={`grid grid-cols-12 gap-6 lg:gap-12 items-center ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="col-span-12 lg:col-span-6">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={stop.image}
                      alt={stop.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 lg:top-10 lg:left-10">
                      <span className="font-playfair italic text-7xl lg:text-9xl font-black text-[#d4a843]/70">
                        {stop.num}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-5">
                  <p className="eyebrow mb-3">Stop {stop.num}</p>
                  <h3 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] mb-6">
                    {stop.name}
                  </h3>
                  <p className="text-lg text-[#6b655e] font-light leading-relaxed mb-6">
                    {stop.body}
                  </p>
                  <ul className="space-y-2.5">
                    {stop.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-[#1a1612]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#d4a843] mt-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-[#f4efe6] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12 lg:mb-16">
            <p className="section-number mb-3">/ HOW WE DO IT</p>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612]">
              What to expect when you{" "}
              <span className="gold-gradient-text italic">walk in.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROMISES.map((p) => (
              <div
                key={p.num}
                className="bg-white border border-[#1a1612]/8 p-8 hover:border-[#d4a843]/40 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-playfair italic text-3xl font-black gold-gradient-text">
                    /{p.num}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#1a1612] mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[#6b655e] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-section py-24 lg:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url('${BRAND_IMAGES.poolTableBanner}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/95 via-[#0d0d0d]/85 to-[#121212]/95" />

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow mb-5">FAMILY OWNED · EST. 1992</p>
          <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05] mb-8">
            Stop in any{" "}
            <span className="ace-gradient-text italic">Tuesday afternoon.</span>
          </h2>
          <p className="text-lg text-[#a8a198] max-w-xl mx-auto mb-10 leading-relaxed">
            Tuesdays are quiet. Saturdays are busy. Either way, we&apos;ll
            walk you through whatever&apos;s on your mind. No appointment
            needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?q=2525+W+Jefferson+Blvd,+Fort+Wayne,+IN+46802"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Get Directions
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white border border-white/40 hover:bg-white hover:text-[#1a1612] transition-all duration-300 text-sm font-semibold tracking-[0.1em] uppercase"
            >
              Request a Quote First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoBand({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub: string
  href?: string
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/30 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#b8933a]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-display tracking-[0.25em] uppercase text-[#6b655e] mb-1">
          {label}
        </p>
        <p className="text-base text-[#1a1612] font-medium leading-tight">
          {value}
        </p>
        <p className="text-sm text-[#6b655e] mt-0.5">{sub}</p>
      </div>
    </div>
  )
  return (
    <div className="bg-white px-6 py-7 lg:px-10">
      {href ? (
        <a href={href} className="block hover:text-[#b8933a] transition-colors">
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}
