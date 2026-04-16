"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Plus } from "lucide-react"
import { useInquiryList } from "@/hooks/useInquiryList"

interface InquiryButtonProps {
  productId: string
  productName: string
}

export default function InquiryButton({
  productId,
}: InquiryButtonProps) {
  const { toggleItem, isInList } = useInquiryList()
  const added = isInList(productId)

  return (
    <motion.button
      onClick={() => toggleItem(productId)}
      className={`
        relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
        transition-colors duration-300 overflow-hidden w-full sm:w-auto
        ${
          added
            ? "bg-felt-green/10 text-felt-green border-2 border-felt-green"
            : "bg-ace-charcoal text-white border-2 border-ace-charcoal hover:bg-ace-charcoal/90"
        }
      `}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Added to Inquiry
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Inquiry List
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
