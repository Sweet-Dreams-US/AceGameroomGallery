import type { Metadata } from "next"
import Image from "next/image"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ace Game Room Gallery — serving Fort Wayne since 1992. Premium game room furniture, billiards, and recreation products.",
}

const milestones = [
  {
    year: "1992",
    title: "Founded",
    description: "Started as a coin-operated amusement supplier",
  },
  {
    year: "1994",
    title: "Expanded to Retail",
    description: "Opened showroom for direct consumer sales",
  },
  {
    year: "2000s",
    title: "Became #1",
    description:
      "Grew to sell more pool tables than all surrounding competition",
  },
  {
    year: "Today",
    title: "25+ Years Strong",
    description: "Premium brands, expert service, guaranteed lowest prices",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 bg-ace-charcoal overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611091428036-e0211dc27757?w=1920&q=80"
          alt="Game room showroom"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ace-charcoal/80 to-ace-charcoal/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
            Our Story
          </h1>
          <p className="text-white/70 text-lg md:text-xl">
            Serving Fort Wayne Since 1992
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      {/* Company Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="slideInLeft">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ace-charcoal mb-6">
                Fort Wayne&apos;s Premier Game Room Destination
              </h2>
              <p className="text-ace-slate leading-relaxed mb-4">
                Ace Game Room Gallery was established in 1992 as a coin-operated
                amusement supplier serving local businesses with pool tables,
                pinball machines, video games, and jukeboxes. Two years later,
                founder Bret Almashie expanded the business model to include
                retail sales, recognizing the community&apos;s demand for quality
                recreational products.
              </p>
              <p className="text-ace-slate leading-relaxed">
                What started as a small operation has grown into Fort
                Wayne&apos;s most trusted source for premium game room furniture
                and recreation products. Over three decades of experience means
                we know exactly how to help you create the perfect game room.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slideInRight">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80"
                alt="Billiard room showroom display"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-ace-cream py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ace-charcoal text-center mb-16">
              Our Journey
            </h2>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-ace-red/20" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0
                return (
                  <ScrollReveal
                    key={milestone.year}
                    variant={isLeft ? "slideInLeft" : "slideInRight"}
                    delay={index * 0.1}
                  >
                    <div className="relative flex items-start md:items-center">
                      {/* Dot on the line */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ace-red border-4 border-white shadow-md z-10" />

                      {/* Content card */}
                      <div
                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isLeft
                            ? "md:mr-auto md:pr-8 md:text-right"
                            : "md:ml-auto md:pl-8 md:text-left"
                        }`}
                      >
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <span className="inline-block text-sm font-bebas tracking-wider text-ace-red mb-1">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl font-playfair font-bold text-ace-charcoal mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-ace-slate text-sm leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The ACE Difference Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ace-charcoal mb-8">
              The ACE Difference
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 ace-gradient-bg rounded-full" />
              <blockquote className="pl-8 text-lg md:text-xl text-ace-slate leading-relaxed italic">
                &ldquo;ACE Game Room sells more pool tables than all of the
                surrounding competition combined. We&apos;re the experts! With
                over 25 years of experience in the industry, we realize that
                buying a pool table is an exciting and unique experience. Our
                goal is to help you find a pool table that best matches your
                style and budget.&rdquo;
              </blockquote>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-ace-slate leading-relaxed">
              We proudly offer Olhausen Billiards, shuffleboards, poker tables,
              and an assortment of game room furniture. ACE Game Room Gallery has
              premium brands with exceptional service at guaranteed lowest
              prices. Stop in today and let us help you!
            </p>
          </ScrollReveal>

          {/* Value Props */}
          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="bg-ace-cream rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full ace-gradient-bg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">#1</span>
                </div>
                <h3 className="font-playfair font-bold text-ace-charcoal mb-2">
                  Top Selection
                </h3>
                <p className="text-sm text-ace-slate">
                  More pool tables sold than all surrounding competition combined
                </p>
              </div>
              <div className="bg-ace-cream rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full ace-gradient-bg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">25+</span>
                </div>
                <h3 className="font-playfair font-bold text-ace-charcoal mb-2">
                  Years Experience
                </h3>
                <p className="text-sm text-ace-slate">
                  Decades of expertise in game room products and services
                </p>
              </div>
              <div className="bg-ace-cream rounded-xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full ace-gradient-bg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">$$</span>
                </div>
                <h3 className="font-playfair font-bold text-ace-charcoal mb-2">
                  Lowest Prices
                </h3>
                <p className="text-sm text-ace-slate">
                  Guaranteed lowest prices on all premium brands
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Showroom Image Banner */}
      <section className="relative h-64 md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
          alt="Premium game room setup"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ace-charcoal/60 flex items-center justify-center">
          <ScrollReveal variant="scaleIn">
            <div className="text-center text-white px-4">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                Visit Our Showroom
              </h2>
              <p className="text-white/80 max-w-md mx-auto">
                See our full collection in person at our Fort Wayne location.
                Open Monday&ndash;Saturday, 10 AM&ndash;6 PM.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
