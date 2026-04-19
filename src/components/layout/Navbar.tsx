"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { MobileMenu } from "./MobileMenu"

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Experience", href: "/experience" },
  { label: "Story", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

const CATEGORIES = [
  { name: "Billiards", slug: "billiards", children: [
    { name: "Billiard Tables", slug: "billiard-tables" },
    { name: "Billiard Cloth", slug: "billiard-cloth" },
    { name: "Cues", slug: "cues" },
    { name: "Cases", slug: "cases" },
    { name: "Lighting", slug: "lighting" },
    { name: "Accessories", slug: "accessories" },
  ]},
  { name: "Games", slug: "games", children: [
    { name: "Pinball", slug: "pinball" },
    { name: "Arcade", slug: "arcade-games" },
    { name: "Foosball", slug: "foosball" },
    { name: "Air Hockey", slug: "air-hockey" },
    { name: "Ping Pong", slug: "ping-pong" },
    { name: "Darts", slug: "darts" },
    { name: "Shuffleboard", slug: "shuffleboard" },
  ]},
  { name: "Furniture", slug: "furniture", children: [
    { name: "Bars", slug: "bars" },
    { name: "Bar Stools", slug: "bar-stools" },
    { name: "Pub Tables", slug: "pub-tables" },
    { name: "Game Chairs", slug: "game-chairs" },
    { name: "Poker Tables", slug: "poker-tables" },
  ]},
  { name: "Playsets", slug: "playsets", children: [] },
  { name: "Outdoor", slug: "outdoor", children: [] },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 z-10">
              <div className="flex flex-col items-start leading-[0.9]">
                <span className="ace-gradient-text text-3xl lg:text-4xl font-black italic font-playfair transition-transform duration-500 group-hover:scale-105">
                  ACE
                </span>
                <span className="text-[9px] lg:text-[10px] font-display tracking-[0.3em] text-[#a8a198] mt-0.5">
                  GAME ROOM GALLERY
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-[13px] font-medium tracking-[0.15em] uppercase text-[#e8e2d5] hover:text-[#d4a843] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right CTA */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+12604323443"
                className="hidden lg:inline-flex items-center gap-2 text-[11px] font-display tracking-[0.2em] text-[#a8a198] hover:text-[#d4a843] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843] animate-pulse" />
                (260) 432-3443
              </a>
              <Link
                href="/contact"
                className="hidden md:inline-flex btn-primary !py-3 !px-6 text-xs"
              >
                Request a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-[#f5f1ea] hover:text-[#d4a843] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        categories={CATEGORIES}
      />
    </>
  )
}
