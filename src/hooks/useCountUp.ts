"use client"

import { useEffect, useRef } from "react"
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion"

interface UseCountUpOptions {
  /** Target number to count up to */
  end: number
  /** Animation duration in seconds. Default 2 */
  duration?: number
}

/**
 * Custom hook that animates a number from 0 to a target value.
 * Triggers when the element scrolls into view.
 * Returns a ref and the current display value as a rounded integer string.
 */
export function useCountUp({ end, duration = 2 }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toString()
  )

  // Read the transformed value into a ref so we can return it synchronously
  const displayRef = useRef("0")

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      displayRef.current = v
      // Also update the DOM element directly for performance
      if (ref.current) {
        ref.current.textContent = ref.current.dataset.prefix
          ? `${ref.current.dataset.prefix}${v}${ref.current.dataset.suffix ?? ""}`
          : v
      }
    })
    return unsubscribe
  }, [rounded])

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, end, {
        duration,
        ease: "easeOut",
      })
      return () => controls.stop()
    }
  }, [isInView, end, duration, motionValue])

  return { ref, displayValue: displayRef.current, motionValue, rounded }
}
