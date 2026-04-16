"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
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

interface MegaMenuProps {
  category: Category
  isOpen: boolean
}

export function MegaMenu({ category, isOpen }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
        >
          <div className="bg-white rounded-b-xl shadow-xl shadow-black/10 border border-gray-100 border-t-2 border-t-ace-cyan overflow-hidden min-w-[320px]">
            <div className="p-5">
              {/* Header */}
              <div className="mb-3 pb-3 border-b border-gray-100">
                <Link
                  href={`/${category.slug}`}
                  className="text-sm font-semibold text-ace-charcoal hover:text-ace-red transition-colors flex items-center gap-1"
                >
                  All {category.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Subcategory Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                {category.children.map((child, index) => (
                  <motion.div
                    key={child.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.03,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={`/${category.slug}/${child.slug}`}
                      className="group flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-ace-slate group-hover:text-ace-charcoal transition-colors">
                        {child.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-ace-cyan group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
