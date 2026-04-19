import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional billiard, pinball, and playset services from Ace Game Room Gallery — Fort Wayne's trusted experts. Teardown, moving, setup, recovering, repair, and installation.",
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
