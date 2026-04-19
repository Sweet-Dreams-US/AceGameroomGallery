"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import LoadingScreen from "@/components/animations/LoadingScreen"

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin") ?? false

  if (isAdmin) {
    // Admin panel handles its own layout and chrome.
    return <>{children}</>
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex-1 pt-20 lg:pt-24">{children}</main>
      <Footer />
    </>
  )
}
