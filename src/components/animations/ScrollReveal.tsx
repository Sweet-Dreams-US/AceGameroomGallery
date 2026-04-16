"use client"

import { type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/lib/animations"
import { cn } from "@/lib/utils"

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
}

type VariantKey = "fadeUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn"

interface ScrollRevealProps {
  children: ReactNode
  /** Animation preset to use */
  variant?: VariantKey
  /** Additional delay in seconds before the animation starts */
  delay?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Wrapper component that animates its children into view when they
 * enter the viewport. Choose from several built-in animation presets.
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay,
  className,
}: ScrollRevealProps) {
  const selectedVariant = variantMap[variant]

  // If a delay is provided, create a modified variant with the delay
  const variants: Variants = delay
    ? {
        hidden: selectedVariant.hidden,
        visible: {
          ...(typeof selectedVariant.visible === "object"
            ? selectedVariant.visible
            : {}),
          transition: {
            ...((typeof selectedVariant.visible === "object" &&
              selectedVariant.visible &&
              "transition" in selectedVariant.visible &&
              typeof selectedVariant.visible.transition === "object"
              ? selectedVariant.visible.transition
              : {}) as Record<string, unknown>),
            delay,
          },
        },
      }
    : selectedVariant

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
