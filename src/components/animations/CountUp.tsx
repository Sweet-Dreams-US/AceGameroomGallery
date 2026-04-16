"use client"

import { motion } from "framer-motion"
import { useCountUp } from "@/hooks/useCountUp"
import { cn } from "@/lib/utils"

interface CountUpProps {
  /** Target number to count to */
  end: number
  /** Animation duration in seconds. Default 2 */
  duration?: number
  /** Text displayed before the number, e.g. "$" */
  prefix?: string
  /** Text displayed after the number, e.g. "+" */
  suffix?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Animated counter that counts from 0 to the target value when scrolled
 * into view. Prefix and suffix are rendered around the animated number.
 */
export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const { ref } = useCountUp({ end, duration })

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      data-prefix={prefix}
      data-suffix={suffix}
      aria-label={`${prefix}${end}${suffix}`}
    >
      {prefix}0{suffix}
    </motion.span>
  )
}
