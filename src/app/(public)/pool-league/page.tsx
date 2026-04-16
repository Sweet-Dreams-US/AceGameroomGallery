import type { Metadata } from "next"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"

export const metadata: Metadata = {
  title: "Pool League",
  description:
    "Pool league events and tournaments at Ace Game Room Gallery in Fort Wayne, IN. Join our billiards community.",
}

const leagueEvents = [
  {
    title: "Summer Pool League Banquet",
    date: "August 12, 2025",
    time: "6:00 PM",
    location: "At 469 Sports",
    description: "Food provided. Tournament after the awards.",
  },
]

export default function PoolLeaguePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-ace-charcoal py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-ace-charcoal via-ace-charcoal to-felt-green/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
            Pool League
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Join our billiards community for league play and events
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Pool League" }]} />
      </div>

      {/* Events */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-ace-charcoal mb-8">
            Upcoming Events
          </h2>
        </ScrollReveal>

        {leagueEvents.length > 0 ? (
          <div className="space-y-6">
            {leagueEvents.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-playfair font-bold text-ace-charcoal mb-4">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-ace-slate">
                        <Calendar className="w-5 h-5 text-ace-red flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-ace-slate">
                        <Clock className="w-5 h-5 text-ace-red flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-3 text-ace-slate">
                          <MapPin className="w-5 h-5 text-ace-red flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-ace-slate leading-relaxed border-t border-gray-100 pt-4">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-16 bg-ace-cream rounded-xl">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-ace-slate">
                Check back soon for upcoming pool league events
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  )
}
