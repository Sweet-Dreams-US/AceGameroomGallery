"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: ReactNode
  /** URL of the background image */
  backgroundImage: string
  /** Parallax speed multiplier (0 = fixed, 1 = normal scroll). Default 0.5 */
  speed?: number
  /** Additional CSS classes for the outer wrapper */
  className?: string
  /** Semi-transparent overlay colour, e.g. "rgba(0,0,0,0.3)" */
  overlayColor?: string
}

/**
 * Parallax scroll wrapper. The background image moves at a fraction
 * of the normal scroll speed, creating a depth effect. Content sits
 * on top of the image and scrolls normally.
 */
export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.5,
  className,
  overlayColor,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Map scroll progress to a vertical translate range
  // A speed of 0.5 means the bg moves at half the rate of scroll
  const yRange = 100 * speed // total pixels of travel
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange])

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -top-[10%] -bottom-[10%] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          y,
        }}
        aria-hidden="true"
      />

      {/* Optional colour overlay */}
      {overlayColor && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
