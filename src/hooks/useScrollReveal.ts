"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

interface UseScrollRevealOptions {
  /** Fraction of element visible before triggering (0-1). Default 0.2 */
  threshold?: number
  /** Fire only once. Default true */
  once?: boolean
}

/**
 * Custom hook wrapping Framer Motion's useInView.
 * Returns a ref to attach to the target element and a boolean indicating
 * whether the element is currently (or has been) in the viewport.
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.2, once = true } = options
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return { ref, isInView }
}
