import type { Metadata } from "next"
import { Suspense } from "react"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ace Game Room Gallery in Fort Wayne, IN. Visit the showroom at 2525 W Jefferson Blvd, call (260) 432-3443, or send a message — one business day for a real answer.",
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <ContactPageClient />
    </Suspense>
  )
}
