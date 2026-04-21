import Link from "next/link"
import { Phone, MapPin, Clock } from "lucide-react"
import { AceLogo } from "@/components/brand/AceLogo"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const FOOTER_COLS = [
  {
    title: "Collection",
    links: [
      { label: "Billiards", href: "/billiards" },
      { label: "Games", href: "/games" },
      { label: "Furniture", href: "/furniture" },
      { label: "Playsets", href: "/playsets" },
      { label: "Outdoor", href: "/outdoor" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Our Showroom", href: "/experience" },
      { label: "Services", href: "/services" },
      { label: "Our Story", href: "/about" },
      { label: "FAQs", href: "/faq" },
      { label: "Pool League", href: "/pool-league" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Request a Quote", href: "/contact" },
      { label: "Dart League", href: "/dart-league" },
      { label: "Financing", href: "/contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#ebe4d6] border-t border-[#1a1612]/8">
      {/* MANTRA MARQUEE */}
      <div className="border-y border-[#1a1612]/8 py-8 lg:py-12 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6">
              <span className="font-playfair italic text-4xl lg:text-6xl text-[#1a1612]">
                Rack.
              </span>
              <span className="font-playfair italic text-4xl lg:text-6xl gold-gradient-text">
                Break.
              </span>
              <span className="font-playfair italic text-4xl lg:text-6xl text-[#1a1612]">
                Gather.
              </span>
              <span className="font-playfair italic text-4xl lg:text-6xl gold-gradient-text">
                Live.
              </span>
              <span className="w-2 h-2 rounded-full bg-[#d4a843]" />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6" aria-label="Ace Game Room Gallery">
              <AceLogo variant="mark" size="lg" showTagline={false} />
            </Link>
            <p className="text-[#6b655e] text-sm leading-relaxed max-w-sm mb-8">
              Fort Wayne&apos;s most curated game room showroom. Over 25 years creating the places families gather, friends compete, and memories are made.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1a1612]/15 flex items-center justify-center text-[#6b655e] hover:border-[#d4a843] hover:text-[#b8933a] transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/acegameroomgallery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#1a1612]/15 flex items-center justify-center text-[#6b655e] hover:border-[#d4a843] hover:text-[#b8933a] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-[11px] tracking-[0.25em] text-[#b8933a] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#3d3834] hover:text-[#c0392b] transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CONTACT BAND */}
        <div className="mt-16 pt-10 border-t border-[#1a1612]/8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="eyebrow mb-3">Visit</p>
            <a
              href="https://maps.google.com/?q=2525+W+Jefferson+Blvd,+Fort+Wayne,+IN+46802"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 text-[#1a1612] hover:text-[#c0392b] transition-colors"
            >
              <MapPin className="w-5 h-5 mt-0.5 text-[#d4a843] flex-shrink-0" />
              <div>
                <div className="font-medium">2525 W Jefferson Blvd</div>
                <div className="text-sm text-[#6b655e]">Fort Wayne, IN 46802</div>
              </div>
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3">Call</p>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-0.5 text-[#d4a843] flex-shrink-0" />
              <div>
                <a href="tel:+12604323443" className="block font-medium text-[#1a1612] hover:text-[#c0392b] transition-colors">
                  (260) 432-3443
                </a>
                <div className="text-sm text-[#6b655e]">Fax: (260) 436-2507</div>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-3">Hours</p>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 text-[#d4a843] flex-shrink-0" />
              <div>
                <div className="font-medium text-[#1a1612]">Monday — Saturday</div>
                <div className="text-sm text-[#6b655e]">10:00 AM — 6:00 PM</div>
                <div className="text-xs text-[#a8a198] mt-1">Sunday — Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#1a1612]/8 py-6">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6b655e]">
            © {new Date().getFullYear()} Ace Game Room Gallery. Family owned since 1992.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#6b655e]">
            <Link href="/admin" className="hover:text-[#c0392b] transition-colors">Admin</Link>
            <Link href="/faq" className="hover:text-[#c0392b] transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-[#c0392b] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
