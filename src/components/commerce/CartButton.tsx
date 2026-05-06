"use client"

import { ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart, useCartDrawer } from "@/hooks/useCart"

export function CartButton({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { itemCount } = useCart()
  const { open } = useCartDrawer()

  const baseColor = variant === "dark" ? "text-[#f5f1ea]" : "text-[#1a1612]"
  const hoverColor = variant === "dark" ? "hover:text-[#d4a843]" : "hover:text-[#c0392b]"

  return (
    <button
      onClick={open}
      className={`relative p-2 ${baseColor} ${hoverColor} transition-colors`}
      aria-label={`Open cart — ${itemCount} item${itemCount === 1 ? "" : "s"}`}
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full ace-gradient-bg text-white text-[10px] font-bold flex items-center justify-center shadow-md"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
