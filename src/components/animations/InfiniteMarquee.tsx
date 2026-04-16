"use client"

import { type ReactNode, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface InfiniteMarqueeProps {
  children: ReactNode
  /** Duration of one full cycle in seconds. Default 30 */
  speed?: number
  /** Scroll direction. Default "left" */
  direction?: "left" | "right"
  /** Pause scrolling when the user hovers. Default true */
  pauseOnHover?: boolean
  /** Additional CSS classes for the outer wrapper */
  className?: string
}

/**
 * Auto-scrolling marquee that duplicates its children to create a
 * seamless infinite loop. Uses pure CSS animation for performance.
 */
export default function InfiniteMarquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse"

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      aria-label="Scrolling content"
      role="marquee"
    >
      <div
        className={cn("flex w-max gap-8", animationClass)}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First copy */}
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
