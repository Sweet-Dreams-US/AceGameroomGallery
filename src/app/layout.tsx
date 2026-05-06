import type { Metadata } from "next"
import {
  Playfair_Display,
  Inter,
  Bebas_Neue,
  Anton,
  Caveat,
  DM_Serif_Display,
} from "next/font/google"
import { ConditionalShell } from "@/components/layout/ConditionalShell"
import "./globals.css"

// Editorial serif — body and section headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})

// Workhorse body sans
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

// Condensed display — eyebrows, labels, signage
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

// Industrial heavy condensed — for big editorial moments (Manifesto, sale callouts)
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

// Handwritten script — for "human voice" moments (testimonials, founder note)
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["400", "600", "700"],
})

// High-contrast modern serif — for fashion-magazine moments (Mantra, banner)
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Ace Game Room Gallery — Fort Wayne's Premier Showroom",
    template: "%s | Ace Game Room Gallery",
  },
  description:
    "A pool table isn't furniture. It's the heart of a home. Fort Wayne's most curated game room showroom since 1992. Olhausen, Valley, Rainbow Play Systems, Darafeev, and more — premium brands, guaranteed lowest prices.",
  keywords: [
    "pool tables Fort Wayne",
    "game room",
    "billiards",
    "Olhausen pool tables",
    "arcade games",
    "Fort Wayne",
    "shuffleboard",
    "pinball",
    "Rainbow Play Systems",
    "bar stools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ace Game Room Gallery",
    title: "Ace Game Room Gallery — Fort Wayne's Premier Showroom",
    description:
      "A pool table isn't furniture. It's the heart of a home. Fort Wayne's most curated game room showroom since 1992.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${bebas.variable} ${anton.variable} ${caveat.variable} ${dmSerif.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#faf8f3] text-[#1a1612]">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  )
}
