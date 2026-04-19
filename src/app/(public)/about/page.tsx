import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "Our Story — Since 1992",
  description:
    "Ace Game Room Gallery has served Fort Wayne since 1992 — from a coin-operated route to the region's premier game room showroom. 27 premium brands, lifetime warranties, free delivery.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
