import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import ScrollReveal from "@/components/animations/ScrollReveal"
import { FAQClient } from "./FAQClient"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Ace Game Room Gallery — pool table brands, services, financing, delivery, hours, and more.",
}

const faqItems = [
  {
    question: "Does Ace Game Room do services on pool tables?",
    answer:
      "Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers. We do not have the ability to repair damaged wood on tables.",
  },
  {
    question: "What brands of pool tables do you carry?",
    answer:
      "We proudly carry Olhausen Billiards, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards pool tables. All are premium American-made brands.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes! We offer Wells Fargo financing. Buy today, pay over time with convenient monthly payments to fit your budget.",
  },
  {
    question: "Do you deliver and install?",
    answer:
      "Yes, we offer free delivery and installation on qualifying purchases. Our expert technicians handle the complete setup.",
  },
  {
    question: "What are your hours?",
    answer:
      "We are open Monday through Saturday from 10:00 AM to 6:00 PM. We are closed on Sundays.",
  },
]

export default function FAQPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-ace-charcoal py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-ace-charcoal via-ace-charcoal to-ace-red/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
      </div>

      {/* FAQ Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ScrollReveal>
          <FAQClient items={faqItems} />
        </ScrollReveal>
      </section>
    </div>
  )
}
