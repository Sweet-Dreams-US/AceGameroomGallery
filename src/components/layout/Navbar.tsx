"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, Clock, MapPin, Settings, Search, Menu } from "lucide-react"
import { MegaMenu } from "./MegaMenu"
import { MobileMenu } from "./MobileMenu"

interface CategoryChild {
  name: string
  slug: string
}

interface Category {
  name: string
  slug: string
  children: CategoryChild[]
}

const categories: Category[] = [
  {
    name: "Billiards",
    slug: "billiards",
    children: [
      { name: "Billiard Tables", slug: "billiard-tables" },
      { name: "Billiard Cloth", slug: "billiard-cloth" },
      { name: "Cues", slug: "cues" },
      { name: "Cases", slug: "cases" },
      { name: "Lighting", slug: "lighting" },
      { name: "Accessories", slug: "accessories" },
    ],
  },
  {
    name: "Games",
    slug: "games",
    children: [
      { name: "Pinball", slug: "pinball" },
      { name: "Arcade Games", slug: "arcade-games" },
      { name: "Foosball", slug: "foosball" },
      { name: "Air Hockey", slug: "air-hockey" },
      { name: "Ping Pong", slug: "ping-pong" },
      { name: "Darts", slug: "darts" },
      { name: "Shuffleboard", slug: "shuffleboard" },
      { name: "Jukebox", slug: "jukebox" },
    ],
  },
  {
    name: "Furniture",
    slug: "furniture",
    children: [
      { name: "Bars", slug: "bars" },
      { name: "Bar Stools", slug: "bar-stools" },
      { name: "Pub Tables", slug: "pub-tables" },
      { name: "Game Chairs", slug: "game-chairs" },
      { name: "Poker Tables", slug: "poker-tables" },
      { name: "Neons", slug: "neons" },
    ],
  },
  { name: "Playsets", slug: "playsets", children: [] },
  { name: "Outdoor", slug: "outdoor", children: [] },
  { name: "Services", slug: "services", children: [] },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleMegaEnter = (slug: string) => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current)
      megaTimeoutRef.current = null
    }
    setActiveMega(slug)
  }

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null)
    }, 150)
  }

  return (
    <>
      <header ref={navRef} className="w-full z-50">
        {/* Top Utility Bar */}
        <div className="bg-[#f5f5f5] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs text-ace-slate">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="tel:+12604323443"
                className="flex items-center gap-1.5 hover:text-ace-red transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">(260) 432-3443</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">Mon-Sat 10AM-6PM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span className="hidden md:inline">Fort Wayne, IN</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 hover:text-ace-red transition-colors"
              >
                <Settings className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className={`bg-white transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 shadow-lg shadow-black/5 z-50"
              : "relative"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 group">
                <div className="flex flex-col items-start leading-none">
                  <span className="ace-gradient-text text-3xl font-bold italic font-playfair transition-transform duration-300 group-hover:scale-105">
                    ACE
                  </span>
                  <span className="text-xs font-bebas tracking-wider text-ace-charcoal block">
                    GAME ROOM GALLERY
                  </span>
                </div>
              </Link>

              {/* Desktop Category Links */}
              <div className="hidden lg:flex items-center gap-1">
                {categories.map((cat) => (
                  <div
                    key={cat.slug}
                    className="relative"
                    onMouseEnter={() =>
                      cat.children.length > 0
                        ? handleMegaEnter(cat.slug)
                        : undefined
                    }
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={`/${cat.slug}`}
                      className="link-underline px-3 py-2 text-sm font-medium text-ace-charcoal hover:text-ace-red transition-colors"
                    >
                      {cat.name}
                    </Link>
                    {cat.children.length > 0 && (
                      <MegaMenu
                        category={cat}
                        isOpen={activeMega === cat.slug}
                      />
                    )}
                  </div>
                ))}
                <Link
                  href="/contact"
                  className="link-underline px-3 py-2 text-sm font-medium text-ace-charcoal hover:text-ace-red transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Right Side: Search + Mobile Toggle */}
              <div className="flex items-center gap-3">
                {/* Search Button */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-ace-charcoal" />
                </button>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-ace-charcoal" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Overlay */}
          <div
            className={`absolute top-full left-0 right-0 bg-white shadow-lg border-t transition-all duration-300 overflow-hidden ${
              searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, categories, brands..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/50 focus:border-ace-cyan transition-all"
                  autoFocus={searchOpen}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Spacer for when nav becomes fixed */}
        {isScrolled && <div className="h-16 lg:h-20" />}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />
    </>
  )
}
