"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronRight, Phone, MapPin, Clock } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface NavLink {
  label: string
  href: string
}

interface CategoryChild {
  name: string
  slug: string
}

interface Category {
  name: string
  slug: string
  children: CategoryChild[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLink[]
  categories: Category[]
}

export function MobileMenu({ isOpen, onClose, navLinks, categories }: MobileMenuProps) {
  const [activeTab, setActiveTab] = useState<"main" | "shop">("main")

  const handleClose = () => {
    setActiveTab("main")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] lg:hidden overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
            <Link href="/" onClick={handleClose} className="flex flex-col items-start leading-[0.9]">
              <span className="ace-gradient-text text-3xl font-black italic font-playfair">ACE</span>
              <span className="text-[10px] font-display tracking-[0.3em] text-[#a8a198] mt-0.5">
                GAME ROOM GALLERY
              </span>
            </Link>
            <button
              onClick={handleClose}
              className="p-2 text-[#f5f1ea] hover:text-[#d4a843] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab("main")}
              className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase font-display transition-colors ${
                activeTab === "main" ? "text-[#d4a843] border-b-2 border-[#d4a843]" : "text-[#a8a198]"
              }`}
            >
              Main
            </button>
            <button
              onClick={() => setActiveTab("shop")}
              className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase font-display transition-colors ${
                activeTab === "shop" ? "text-[#d4a843] border-b-2 border-[#d4a843]" : "text-[#a8a198]"
              }`}
            >
              Shop
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            <AnimatePresence mode="wait">
              {activeTab === "main" && (
                <motion.ul
                  key="main"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="group flex items-baseline gap-4 py-4 border-b border-white/5"
                      >
                        <span className="text-[10px] font-display tracking-[0.25em] text-[#6b655e]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-playfair text-3xl text-[#f5f1ea] group-hover:text-[#d4a843] transition-colors">
                          {link.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#6b655e] group-hover:text-[#d4a843] transition-colors" />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {activeTab === "shop" && (
                <motion.ul
                  key="shop"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {categories.map((cat, i) => (
                    <motion.li
                      key={cat.slug}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={`/${cat.slug}`}
                        onClick={handleClose}
                        className="block font-playfair text-2xl text-[#f5f1ea] hover:text-[#d4a843] transition-colors mb-2"
                      >
                        {cat.name}
                      </Link>
                      {cat.children.length > 0 && (
                        <ul className="pl-4 border-l border-white/10 space-y-2">
                          {cat.children.map((child) => (
                            <li key={child.slug}>
                              <Link
                                href={`/${cat.slug}/${child.slug}`}
                                onClick={handleClose}
                                className="block py-1 text-sm text-[#a8a198] hover:text-[#d4a843] transition-colors"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-8 border-t border-white/5 space-y-4">
            <a
              href="tel:+12604323443"
              className="flex items-center gap-3 text-[#e8e2d5] hover:text-[#d4a843] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#d4a843]" />
              <span className="text-sm tracking-wide">(260) 432-3443</span>
            </a>
            <div className="flex items-center gap-3 text-[#a8a198]">
              <Clock className="w-4 h-4 text-[#d4a843]" />
              <span className="text-sm">Mon-Sat · 10AM - 6PM</span>
            </div>
            <div className="flex items-center gap-3 text-[#a8a198]">
              <MapPin className="w-4 h-4 text-[#d4a843]" />
              <span className="text-sm">2525 W Jefferson Blvd, Fort Wayne</span>
            </div>

            <Link
              href="/contact"
              onClick={handleClose}
              className="btn-primary w-full justify-center mt-6"
            >
              Request a Quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
