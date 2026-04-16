import type { Metadata } from "next"
import { Calendar } from "lucide-react"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"

export const metadata: Metadata = {
  title: "Dart League",
  description:
    "Dart league events and tournaments at Ace Game Room Gallery in Fort Wayne, IN. Join our darts community.",
}

export default function DartLeaguePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-ace-charcoal py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-ace-charcoal via-ace-charcoal to-ace-orange/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
            Dart League
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Join our darts community for league play and events
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Dart League" }]} />
      </div>

      {/* Events */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-ace-charcoal mb-8">
            Upcoming Events
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center py-16 bg-ace-cream rounded-xl">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-ace-slate">
              Check back soon for upcoming dart league events
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
