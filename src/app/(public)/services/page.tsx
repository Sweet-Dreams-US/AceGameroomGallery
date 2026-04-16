import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"
import { ServiceAccordion } from "./ServiceAccordion"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional billiard, pinball, and playset services from Ace Game Room Gallery in Fort Wayne, IN. Pool table setup, recovery, repair, and more.",
}

const services = [
  {
    icon: "Target" as const,
    title: "Billiard Services",
    description:
      "Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers.",
  },
  {
    icon: "Gamepad2" as const,
    title: "Pinball Services",
    description:
      "Professional pinball machine maintenance and repair services.",
  },
  {
    icon: "TreePine" as const,
    title: "Playset Services",
    description:
      "Installation and maintenance for Rainbow Play Systems residential and commercial playsets.",
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 bg-ace-charcoal overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1920&q=80"
          alt="Professional billiard services"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ace-charcoal/80 to-ace-charcoal/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
            Our Services
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl">
            Expert service for your game room equipment
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Services" }]} />
      </div>

      {/* Services Cards */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal>
          <p className="text-center text-ace-slate mb-10 text-lg leading-relaxed">
            From pool table setup and recovery to pinball repair and playset
            installation, our experienced technicians provide professional
            service you can count on.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <ServiceAccordion
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ace-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-ace-charcoal mb-4">
              Need Service? Contact Us
            </h2>
            <p className="text-ace-slate mb-8 max-w-xl mx-auto">
              Get in touch with our team to schedule a service appointment or
              request a quote. We serve the greater Fort Wayne area.
            </p>
            <Link href="/contact" className="btn-ace inline-block">
              Contact Us
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
