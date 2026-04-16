"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { pageTransition } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Page transition wrapper. Wraps page content in a motion.div
 * that fades and slides in on mount and out on unmount.
 *
 * NOTE: AnimatePresence must be placed in the parent layout file
 * for exit animations to work. This component only defines the
 * motion variants for a single page.
 */
export default function PageTransition({
  children,
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
