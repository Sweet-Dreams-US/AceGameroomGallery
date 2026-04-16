"use client"

import { cn } from "@/lib/utils"

interface PoolBallSpinnerProps {
  /** Diameter in pixels. Default 40 */
  size?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Loading spinner styled as a spinning 8-ball.
 * Renders an inline SVG with a black circle, white inner circle,
 * and the number "8". The `animate-pool-spin` class rotates it.
 */
export default function PoolBallSpinner({
  size = 40,
  className,
}: PoolBallSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        className="animate-pool-spin"
        aria-hidden="true"
      >
        {/* Outer ball - black */}
        <circle cx="20" cy="20" r="19" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        {/* Glossy highlight */}
        <ellipse cx="14" cy="13" rx="6" ry="5" fill="white" opacity="0.15" />
        {/* White inner circle */}
        <circle cx="20" cy="20" r="10" fill="white" />
        {/* Number 8 */}
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          fill="#1a1a1a"
        >
          8
        </text>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
