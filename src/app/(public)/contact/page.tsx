import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"
import ContactFormWrapper from "./ContactFormWrapper"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ace Game Room Gallery in Fort Wayne, IN. Request a quote, ask about our products, or visit our showroom. Open Mon-Sat 10AM-6PM.",
}

// ---------------------------------------------------------------------------
// Mock products for the ProductSelector
// When Supabase is connected, replace with a server-side query.
// ---------------------------------------------------------------------------
const MOCK_PRODUCTS = [
  { id: "p1", name: 'Olhausen Americana 8\' Pool Table', slug: "olhausen-americana", category: "Billiards" },
  { id: "p2", name: "Olhausen Hampton Pool Table", slug: "olhausen-hampton", category: "Billiards" },
  { id: "p3", name: "Simonis 860 Cloth", slug: "simonis-860-cloth", category: "Billiards" },
  { id: "p4", name: "Championship Invitational Cloth", slug: "championship-invitational", category: "Billiards" },
  { id: "p5", name: 'Valley Panther 7\' Coin-Op Table', slug: "valley-panther", category: "Billiards" },
  { id: "p6", name: "Stern Pinball Machine", slug: "stern-pinball", category: "Games" },
  { id: "p7", name: "Tornado Foosball Table", slug: "tornado-foosball", category: "Games" },
  { id: "p8", name: "Gold Standard Air Hockey Table", slug: "gold-standard-air-hockey", category: "Games" },
  { id: "p9", name: "Hudson Shuffleboard Table", slug: "hudson-shuffleboard", category: "Games" },
  { id: "p10", name: "Darafeev Bar Stool Collection", slug: "darafeev-bar-stools", category: "Furniture" },
  { id: "p11", name: "RAM Game Room Home Bar", slug: "ram-home-bar", category: "Furniture" },
  { id: "p12", name: "Holland Bar Stool NCAA Series", slug: "holland-ncaa-bar-stool", category: "Furniture" },
  { id: "p13", name: "Rainbow Castle Play System", slug: "rainbow-castle", category: "Playsets" },
  { id: "p14", name: "Springfree Trampoline 11ft", slug: "springfree-trampoline", category: "Outdoor" },
  { id: "p15", name: "Goalrilla Basketball Goal", slug: "goalrilla-basketball", category: "Outdoor" },
]

// ---------------------------------------------------------------------------
// Contact info constants
// ---------------------------------------------------------------------------
const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5!2d-85.17119!3d40.96850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8815e4e77b0f1b5b%3A0xc5b4e3f3b7a8c5a0!2s2525%20W%20Jefferson%20Blvd%2C%20Fort%20Wayne%2C%20IN%2046802!5e0!3m2!1sen!1sus!4v1700000000000!5m2!1sen!1sus"

const GOOGLE_MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=2525+W+Jefferson+Blvd,+Fort+Wayne,+IN+46802"

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />
      </div>

      {/* Page header */}
      <ScrollReveal variant="fadeUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-ace-charcoal">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-ace-slate max-w-2xl">
            Have questions about our products or services? We&apos;d love to
            hear from you. Fill out the form below or visit our showroom.
          </p>
        </div>
      </ScrollReveal>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left column — Form (60%) */}
          <div className="lg:col-span-3">
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-playfair font-bold text-ace-charcoal mb-6">
                  Send Us a Message
                </h2>
                <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50 rounded-lg" />}>
                  <ContactFormWrapper products={MOCK_PRODUCTS} />
                </Suspense>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Map + info (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Google Maps embed */}
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <iframe
                  src={GOOGLE_MAPS_EMBED_SRC}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ace Game Room Gallery location on Google Maps"
                  className="w-full"
                />
              </div>
            </ScrollReveal>

            {/* Contact info card */}
            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="bg-ace-cream rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-playfair font-bold text-ace-charcoal mb-5">
                  Visit Our Showroom
                </h3>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-ace-red/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-ace-red" />
                    </div>
                    <div>
                      <p className="font-semibold text-ace-charcoal text-sm">
                        Address
                      </p>
                      <p className="text-ace-slate text-sm leading-relaxed">
                        2525 W Jefferson Blvd
                        <br />
                        Fort Wayne, IN 46802
                      </p>
                    </div>
                  </div>

                  {/* Phone & Fax */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-ace-red/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4.5 h-4.5 text-ace-red" />
                    </div>
                    <div>
                      <p className="font-semibold text-ace-charcoal text-sm">
                        Phone & Fax
                      </p>
                      <p className="text-ace-slate text-sm">
                        Phone:{" "}
                        <a
                          href="tel:+12604323443"
                          className="text-ace-red hover:underline"
                        >
                          (260) 432-3443
                        </a>
                      </p>
                      <p className="text-ace-slate text-sm">
                        Fax: (260) 436-2507
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-ace-red/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4.5 h-4.5 text-ace-red" />
                    </div>
                    <div>
                      <p className="font-semibold text-ace-charcoal text-sm">
                        Hours
                      </p>
                      <div className="text-ace-slate text-sm space-y-0.5">
                        <p>
                          <span className="inline-block w-24">Mon - Sat</span>
                          <span className="font-medium text-ace-charcoal">
                            10:00 AM - 6:00 PM
                          </span>
                        </p>
                        <p>
                          <span className="inline-block w-24">Sunday</span>
                          <span className="font-medium text-ace-charcoal">
                            Closed
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Directions button */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <Link
                    href={GOOGLE_MAPS_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ace inline-flex items-center gap-2 text-sm w-full justify-center"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  )
}
