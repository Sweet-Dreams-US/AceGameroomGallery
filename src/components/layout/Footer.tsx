import Link from "next/link"
import { Phone, MapPin } from "lucide-react"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-ace-footer text-gray-300">
      {/* Top Section: Logo + Tagline */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/" className="flex flex-col items-start leading-none">
              <span
                className="text-3xl font-bold italic font-playfair bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #c0392b, #e67e22, #f1c40f)",
                }}
              >
                ACE
              </span>
              <span className="text-xs font-bebas tracking-wider text-gray-400 block">
                GAME ROOM GALLERY
              </span>
            </Link>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <p className="text-sm text-gray-400 font-inter">
              Fort Wayne&apos;s #1 Game Room Showroom
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section: Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Billiards */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Billiards
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/billiards/billiard-tables"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Billiard Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/billiards/billiard-cloth"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Billiard Cloth
                </Link>
              </li>
              <li>
                <Link
                  href="/billiards/cues"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cues
                </Link>
              </li>
              <li>
                <Link
                  href="/billiards/cases"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/billiards/lighting"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Lighting
                </Link>
              </li>
              <li>
                <Link
                  href="/billiards/accessories"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Games</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/games/pinball"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Pinball
                </Link>
              </li>
              <li>
                <Link
                  href="/games/arcade-games"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Arcade Games
                </Link>
              </li>
              <li>
                <Link
                  href="/games/foosball"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Foosball
                </Link>
              </li>
              <li>
                <Link
                  href="/games/air-hockey"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Air Hockey
                </Link>
              </li>
              <li>
                <Link
                  href="/games/ping-pong"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Ping Pong
                </Link>
              </li>
              <li>
                <Link
                  href="/games/darts"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Darts
                </Link>
              </li>
              <li>
                <Link
                  href="/games/shuffleboard"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Shuffleboard
                </Link>
              </li>
              <li>
                <Link
                  href="/games/jukebox"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Jukebox
                </Link>
              </li>
            </ul>
          </div>

          {/* Furniture */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Furniture
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/furniture/bars"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Bars
                </Link>
              </li>
              <li>
                <Link
                  href="/furniture/bar-stools"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Bar Stools
                </Link>
              </li>
              <li>
                <Link
                  href="/furniture/pub-tables"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Pub Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/furniture/game-chairs"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Game Chairs
                </Link>
              </li>
              <li>
                <Link
                  href="/furniture/poker-tables"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Poker Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/furniture/neons"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Neons
                </Link>
              </li>
            </ul>
          </div>

          {/* Playsets / Outdoor / Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">More</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/playsets"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Playsets
                </Link>
              </li>
              <li>
                <Link
                  href="/outdoor"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Outdoor
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pool-league"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Pool League
                </Link>
              </li>
              <li>
                <Link
                  href="/dart-league"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Dart League
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <a
                  href="tel:+12604323443"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  (260) 432-3443
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=2525+W+Jefferson+Blvd+Fort+Wayne+IN+46802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Contact Details + Social + Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Contact + Hours */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ace-cyan flex-shrink-0" />
                <span>
                  2525 W Jefferson Blvd, Fort Wayne, IN 46802
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ace-cyan flex-shrink-0" />
                <span>
                  Phone: (260) 432-3443 | Fax: (260) 436-2507
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="text-sm text-gray-400">
              <span className="text-white font-medium">Hours:</span> Mon-Sat
              10AM-6PM | Sun Closed
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-ace-cyan/20 text-gray-400 hover:text-ace-cyan transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-ace-cyan/20 text-gray-400 hover:text-ace-cyan transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-500">
              &copy; 2026 Ace Game Room Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
