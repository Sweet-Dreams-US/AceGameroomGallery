"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { runPoolBreak } from "./pool-physics"

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null)
  const [fadeOut, setFadeOut] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  // Check sessionStorage on mount (client-only)
  useEffect(() => {
    try {
      const alreadyLoaded = sessionStorage.getItem("ace-loaded")
      if (alreadyLoaded) {
        setIsVisible(false)
        return
      }
    } catch {
      // sessionStorage unavailable — skip animation
      setIsVisible(false)
      return
    }
    setIsVisible(true)
  }, [])

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem("ace-loaded", "true")
    } catch {
      // Ignore storage errors
    }

    // Clean up physics engine
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    // Fade out overlay, then hide
    setFadeOut(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 350)
  }, [])

  // Initialize the pool break animation once visible
  useEffect(() => {
    if (isVisible !== true) return
    const canvas = canvasRef.current
    if (!canvas) {
      handleComplete()
      return
    }

    try {
      const { cleanup } = runPoolBreak(canvas, handleComplete)
      cleanupRef.current = cleanup
    } catch {
      // If physics fails for any reason, skip
      handleComplete()
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [isVisible, handleComplete])

  // Handle window resize
  useEffect(() => {
    if (isVisible !== true) return

    function handleResize() {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isVisible])

  // Don't render anything if already loaded or still checking
  if (isVisible === null || isVisible === false) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#1a6b3c",
        transition: "opacity 300ms ease-out",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
        }}
      />
      <button
        onClick={handleComplete}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          background: "transparent",
          border: "none",
          color: "rgba(255,255,255,0.5)",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
          padding: "8px 16px",
          borderRadius: 6,
          transition: "color 200ms",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.9)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.5)"
        }}
        aria-label="Skip intro animation"
      >
        Skip Intro &rarr;
      </button>
    </div>
  )
}
