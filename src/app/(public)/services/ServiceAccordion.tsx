"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Target, Gamepad2, TreePine } from "lucide-react"

const iconMap = {
  Target,
  Gamepad2,
  TreePine,
} as const

interface ServiceAccordionProps {
  icon: keyof typeof iconMap
  title: string
  description: string
}

export function ServiceAccordion({
  icon,
  title,
  description,
}: ServiceAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = iconMap[icon]

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg ace-gradient-bg flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-playfair font-bold text-ace-charcoal">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-ace-slate" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
              <div className="border-t border-gray-100 pt-4">
                <p className="text-ace-slate leading-relaxed">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
