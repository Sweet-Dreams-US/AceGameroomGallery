import type { Metadata } from "next"
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import LoadingScreen from "@/components/animations/LoadingScreen"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Ace Game Room Gallery | Fort Wayne, IN",
    template: "%s | Ace Game Room Gallery",
  },
  description:
    "Fort Wayne's #1 source for pool tables, game room furniture, arcade games, and outdoor recreation. Over 25 years of experience. Premium brands, guaranteed lowest prices.",
  keywords: [
    "pool tables", "game room", "billiards", "arcade games", "Fort Wayne",
    "Olhausen", "bar stools", "shuffleboard", "pinball",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ace Game Room Gallery",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${bebas.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LoadingScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
