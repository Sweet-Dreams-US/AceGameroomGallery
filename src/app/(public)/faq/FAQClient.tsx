"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQClientProps {
  items: FAQItem[]
}

export function FAQClient({ items }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredItems = items.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ace-slate/50" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setOpenIndex(null)
          }}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-ace-charcoal placeholder:text-ace-slate/50 focus:outline-none focus:ring-2 focus:ring-ace-red/30 focus:border-ace-red transition-all duration-200"
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={item.question}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-semibold text-ace-charcoal pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-ace-slate" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-ace-slate leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-ace-slate text-lg">
              No matching questions found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
