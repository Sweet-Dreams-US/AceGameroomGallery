"use client"

import { type ReactNode, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  /** Additional CSS classes for the outer wrapper */
  className?: string
  /** Maximum tilt angle in degrees. Default 10 */
  maxTilt?: number
  /** Scale factor on hover. Default 1.02 */
  scale?: number
}

/**
 * 3D tilt-on-hover card. Tracks the mouse position relative to the
 * card center and applies rotateX / rotateY transforms via spring
 * physics for a smooth, physical feel. Resets on mouse leave.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
}: TiltCardProps) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scaleValue = useMotionValue(1)

  // Spring smoothing for natural movement
  const springConfig = { stiffness: 300, damping: 20 }
  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scaleValue, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalised position: -1 to 1
      const normalX = (e.clientX - centerX) / (rect.width / 2)
      const normalY = (e.clientY - centerY) / (rect.height / 2)

      // rotateX depends on vertical offset (inverted so top tilts forward)
      rotateX.set(-normalY * maxTilt)
      // rotateY depends on horizontal offset
      rotateY.set(normalX * maxTilt)
      scaleValue.set(scale)
    },
    [maxTilt, scale, rotateX, rotateY, scaleValue]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scaleValue.set(1)
  }, [rotateX, rotateY, scaleValue])

  return (
    <div className={cn("perspective-1000", className)}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
