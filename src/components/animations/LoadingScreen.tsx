"use client"

/**
 * Minimal, professional intro animation.
 * A single cue stick glides in, strikes a solitary cue ball,
 * the ball rolls across the viewport and transforms into the ACE logo.
 * No table, no rails, no chrome — just craft.
 */

import { useEffect, useState, useCallback } from "react"

const DURATION_MS = 2800

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"idle" | "playing" | "fading" | "done">("idle")

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("ace-loaded")
      if (seen) {
        setPhase("done")
        return
      }
    } catch {
      setPhase("done")
      return
    }
    setPhase("playing")
  }, [])

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("ace-loaded", "true")
    } catch {
      /* noop */
    }
    setPhase("fading")
    window.setTimeout(() => setPhase("done"), 500)
  }, [])

  useEffect(() => {
    if (phase !== "playing") return
    const t = window.setTimeout(finish, DURATION_MS)
    return () => window.clearTimeout(t)
  }, [phase, finish])

  if (phase === "idle" || phase === "done") return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-[#faf8f5] transition-opacity duration-500 ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle grain / paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* A single thin line — the implied cushion */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />

      {/* The action happens on the centerline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] h-[120px]">
        {/* Cue stick — slides in, taps ball, retreats */}
        <svg
          className="absolute top-1/2 -translate-y-1/2 animate-cue-strike"
          style={{ left: "calc(50% - 320px)" }}
          width="280"
          height="14"
          viewBox="0 0 280 14"
          fill="none"
        >
          <defs>
            <linearGradient id="cueWood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2c2c2c" />
              <stop offset="10%" stopColor="#3d3430" />
              <stop offset="25%" stopColor="#5c3d2e" />
              <stop offset="70%" stopColor="#b8906c" />
              <stop offset="95%" stopColor="#e8d4b8" />
              <stop offset="100%" stopColor="#f5efe6" />
            </linearGradient>
          </defs>
          {/* Tapered cue: butt end thicker, tip thinner */}
          <path
            d="M 0 5 L 10 3 L 265 5.5 L 275 6 L 275 8 L 265 8.5 L 10 11 L 0 9 Z"
            fill="url(#cueWood)"
          />
          {/* White ferrule before leather tip */}
          <rect x="270" y="5" width="4" height="4" fill="#f5f1ea" />
          {/* Leather tip */}
          <rect x="274" y="5.5" width="4" height="3" fill="#0a3f24" rx="0.5" />
        </svg>

        {/* Cue ball — sits, gets struck, rolls right */}
        <div
          className="absolute top-1/2 -translate-y-1/2 animate-ball-roll"
          style={{ left: "calc(50% - 22px)" }}
        >
          <div className="relative w-11 h-11">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,_#ffffff_0%,_#f8f4ec_40%,_#e4dcc8_75%,_#c8bfa8_100%)] shadow-[0_8px_16px_rgba(92,61,46,0.18),inset_-4px_-4px_8px_rgba(92,61,46,0.08),inset_3px_3px_6px_rgba(255,255,255,0.6)]" />
            {/* Tiny highlight */}
            <div className="absolute top-[18%] left-[22%] w-2.5 h-2.5 rounded-full bg-white/80 blur-[2px]" />
          </div>
        </div>

        {/* ACE logo reveal — the real brand artwork fades in at the end */}
        <div className="absolute inset-0 flex items-center justify-center animate-logo-reveal">
          <img
            src="https://www.acegameroom.com/data/logo.png"
            alt="Ace Game Room Gallery"
            className="h-auto w-auto max-w-[70vw] md:max-w-[420px]"
            style={{
              filter:
                "drop-shadow(0 2px 0 rgba(92, 30, 12, 0.2)) drop-shadow(0 8px 24px rgba(192, 57, 43, 0.15))",
            }}
          />
        </div>
      </div>

      {/* Thin progress line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#d4a843]/10">
        <div className="h-full bg-[#d4a843] animate-progress-bar origin-left" />
      </div>

      {/* Skip button */}
      <button
        onClick={finish}
        className="absolute bottom-6 right-6 font-display tracking-[0.25em] text-xs text-[#8a8580] hover:text-[#5c5c5c] transition-colors"
        aria-label="Skip intro"
      >
        SKIP &rarr;
      </button>

      <style jsx>{`
        /* Cue stick: slides in from left, taps, retreats */
        :global(.animate-cue-strike) {
          animation: cueStrike 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform: translate(-120%, -50%);
          opacity: 0;
        }

        @keyframes cueStrike {
          0% {
            transform: translate(-120%, -50%);
            opacity: 0;
          }
          15% {
            transform: translate(-40%, -50%);
            opacity: 1;
          }
          35% {
            /* Wind-up, pulled back slightly */
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          45% {
            /* Strike — pushes into where the ball is */
            transform: translate(-30%, -50%);
            opacity: 1;
          }
          70% {
            /* Retreat */
            transform: translate(-70%, -50%);
            opacity: 0.4;
          }
          100% {
            transform: translate(-120%, -50%);
            opacity: 0;
          }
        }

        /* Ball: sits still, then rolls right after impact */
        :global(.animate-ball-roll) {
          animation: ballRoll 2.8s cubic-bezier(0.33, 0, 0.15, 1) forwards;
          opacity: 0;
        }

        @keyframes ballRoll {
          0%, 10% {
            transform: translate(0, -50%);
            opacity: 0;
          }
          15% {
            transform: translate(0, -50%);
            opacity: 1;
          }
          45% {
            /* Impact point */
            transform: translate(0, -50%);
          }
          75% {
            /* Rolls to center-right */
            transform: translate(120px, -50%);
            opacity: 1;
          }
          85% {
            transform: translate(140px, -50%);
            opacity: 0.3;
          }
          100% {
            transform: translate(160px, -50%);
            opacity: 0;
          }
        }

        /* Logo: fades in as ball fades out */
        :global(.animate-logo-reveal) {
          animation: logoReveal 2.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes logoReveal {
          0%, 70% {
            opacity: 0;
            transform: scale(0.94);
            filter: blur(4px);
          }
          85% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        /* Progress bar: fills across the duration */
        :global(.animate-progress-bar) {
          animation: progressBar 2.8s linear forwards;
          transform: scaleX(0);
        }

        @keyframes progressBar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  )
}
