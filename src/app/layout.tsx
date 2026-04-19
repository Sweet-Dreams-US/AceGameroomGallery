import type { Metadata } from "next"
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google"
import { ConditionalShell } from "@/components/layout/ConditionalShell"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
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
      className={`${playfair.variable} ${inter.variable} ${bebas.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f1ea]">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  )
}
