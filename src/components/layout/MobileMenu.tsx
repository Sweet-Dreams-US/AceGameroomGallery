"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronDown, Phone, MapPin, Clock } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

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
  categories?: Category[]
}

const defaultCategories: Category[] = [
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

export function MobileMenu({
  isOpen,
  onClose,
  categories = defaultCategories,
}: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug)
  }

  const handleLinkClick = () => {
    setExpandedCategory(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" onClick={handleLinkClick} className="flex flex-col items-start leading-none">
                <span className="ace-gradient-text text-2xl font-bold italic font-playfair">
                  ACE
                </span>
                <span className="text-[10px] font-bebas tracking-wider text-ace-charcoal block">
                  GAME ROOM GALLERY
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-ace-charcoal" />
              </button>
            </div>

            {/* Category List */}
            <nav className="px-5 py-4">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                }}
                className="space-y-1"
              >
                {categories.map((cat) => (
                  <motion.li
                    key={cat.slug}
                    variants={{
                      hidden: { opacity: 0, x: 30 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.3, ease: "easeOut" },
                      },
                    }}
                  >
                    {cat.children.length > 0 ? (
                      <div>
                        {/* Category with children - accordion toggle */}
                        <div className="flex items-center">
                          <Link
                            href={`/${cat.slug}`}
                            onClick={handleLinkClick}
                            className="flex-1 py-3 text-base font-medium text-ace-charcoal hover:text-ace-red transition-colors"
                          >
                            {cat.name}
                          </Link>
                          <button
                            onClick={() => toggleCategory(cat.slug)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label={`Expand ${cat.name} submenu`}
                          >
                            <motion.div
                              animate={{
                                rotate: expandedCategory === cat.slug ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-ace-slate" />
                            </motion.div>
                          </button>
                        </div>

                        {/* Subcategories */}
                        <AnimatePresence>
                          {expandedCategory === cat.slug && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-4 border-l-2 border-ace-cyan/30 ml-2"
                            >
                              {cat.children.map((child, childIndex) => (
                                <motion.li
                                  key={child.slug}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: childIndex * 0.03,
                                  }}
                                >
                                  <Link
                                    href={`/${cat.slug}/${child.slug}`}
                                    onClick={handleLinkClick}
                                    className="block py-2 text-sm text-ace-slate hover:text-ace-red transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={`/${cat.slug}`}
                        onClick={handleLinkClick}
                        className="block py-3 text-base font-medium text-ace-charcoal hover:text-ace-red transition-colors"
                      >
                        {cat.name}
                      </Link>
                    )}
                  </motion.li>
                ))}

                {/* Contact Link */}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: "easeOut" },
                    },
                  }}
                >
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="block py-3 text-base font-medium text-ace-charcoal hover:text-ace-red transition-colors"
                  >
                    Contact
                  </Link>
                </motion.li>
              </motion.ul>
            </nav>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto px-5 py-6 border-t border-gray-100 space-y-3"
            >
              <a
                href="tel:+12604323443"
                className="flex items-center gap-2 text-sm text-ace-slate hover:text-ace-red transition-colors"
              >
                <Phone className="w-4 h-4" />
                (260) 432-3443
              </a>
              <div className="flex items-center gap-2 text-sm text-ace-slate">
                <Clock className="w-4 h-4" />
                Mon-Sat 10AM-6PM
              </div>
              <div className="flex items-center gap-2 text-sm text-ace-slate">
                <MapPin className="w-4 h-4" />
                Fort Wayne, IN
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
