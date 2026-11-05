"use client"

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { withAssetBasePath } from "@/lib/brand-images"

/**
 * Homepage scroll film. Scrolling scrubs through two videos that join
 * seamlessly: a showroom push-in to the felt, then the felt becoming a lawn
 * and a playset. Three text panels fade in and out over the top.
 *
 * Every frame in these videos is a keyframe, so seeking is fast. Re-encode any
 * replacement video the same way (ffmpeg: -g 1 -bf 0 -movflags +faststart).
 * Phones get a smaller center-cropped portrait version of each.
 */

const PHONE_MEDIA = "(orientation: portrait) and (max-width: 900px)"
const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)"

type NetworkInformation = { saveData?: boolean }

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_MEDIA)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

/** Skip the film for people who asked for less motion or less data. */
function prefersStaticHero() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  return window.matchMedia(REDUCED_MOTION_MEDIA).matches || connection?.saveData === true
}

/**
 * Seeks a video to a 0–1 position without queueing seeks faster than the
 * device can decode them, which is what makes scrubbing stutter on phones.
 */
function createScrubber(video: HTMLVideoElement) {
  let position = 0
  let pending = false

  const apply = () => {
    if (!pending || video.seeking || !Number.isFinite(video.duration) || !video.duration) return
    pending = false
    const time = position * video.duration
    if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time
  }

  const onLoadedMetadata = async () => {
    // iOS won't paint seeked frames until the video has played once.
    try {
      video.muted = true
      await video.play()
      video.pause()
    } catch {
      // Low Power Mode can refuse to play. The poster stays visible instead.
    }
    pending = true
    apply()
  }

  video.addEventListener("seeked", apply)
  video.addEventListener("loadedmetadata", onLoadedMetadata)

  return {
    seek(next: number) {
      position = next
      pending = true
      apply()
    },
    stop() {
      video.removeEventListener("seeked", apply)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
    },
  }
}

export function HeroStory() {
  const isStatic = useSyncExternalStore(subscribeToMotionPreference, prefersStaticHero, () => false)

  const sectionRef = useRef<HTMLElement>(null)
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const legacyRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStatic) return

    const section = sectionRef.current
    const firstVideo = firstVideoRef.current
    const secondVideo = secondVideoRef.current
    const welcome = welcomeRef.current
    const philosophy = philosophyRef.current
    const legacy = legacyRef.current
    const scrollCue = scrollCueRef.current
    if (!section || !firstVideo || !secondVideo || !welcome || !philosophy || !legacy || !scrollCue) return

    const firstScrub = createScrubber(firstVideo)
    const secondScrub = createScrubber(secondVideo)

    const suffix = window.matchMedia(PHONE_MEDIA).matches ? "-mobile" : ""
    firstVideo.src = withAssetBasePath(`/videos/hero${suffix}.mp4`)
    secondVideo.src = withAssetBasePath(`/videos/hero-playset${suffix}.mp4`)

    let isActive = true
    let cleanUpTimeline: (() => void) | undefined

    void (async () => {
      const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      if (!isActive) return

      gsap.registerPlugin(ScrollTrigger)
      // Showing or hiding a phone's address bar shouldn't restart the layout.
      ScrollTrigger.config({ ignoreMobileResize: true })

      const firstProgress = { value: 0 }
      const secondProgress = { value: 0 }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5 },
      })

      timeline
        .to(firstProgress, { value: 1, duration: 0.5, onUpdate: () => firstScrub.seek(firstProgress.value) }, 0)
        .to(secondProgress, { value: 1, duration: 0.5, onUpdate: () => secondScrub.seek(secondProgress.value) }, 0.5)
        .to(firstVideo, { opacity: 0, duration: 0.02 }, 0.49)
        .fromTo(secondVideo, { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.49)
        .to(scrollCue, { autoAlpha: 0, duration: 0.08 }, 0.01)
        // autoAlpha also takes the hero's links out of reach once it's faded.
        .to(welcome, { autoAlpha: 0, y: -60, duration: 0.12, ease: "power1.in" }, 0.2)
        .fromTo(philosophy, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.12, ease: "power1.out" }, 0.3)
        .to(philosophy, { opacity: 0, y: -60, duration: 0.1, ease: "power1.in" }, 0.55)
        .fromTo(legacy, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.12, ease: "power1.out" }, 0.7)

      cleanUpTimeline = () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })()

    return () => {
      isActive = false
      cleanUpTimeline?.()
      firstScrub.stop()
      secondScrub.stop()
    }
  }, [isStatic])

  return (
    <section
      ref={sectionRef}
      // The negative margin cancels the layout's nav padding, so the film starts at the top of the screen.
      className={`relative -mt-20 lg:-mt-24 bg-[#0a0a0a] ${isStatic ? "h-[100svh]" : "h-[400svh]"}`}
      aria-label="Welcome to Ace Game Room Gallery"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Shows right away, and stays if the videos can't load */}
        <picture>
          <source media={PHONE_MEDIA} srcSet={withAssetBasePath("/videos/hero-poster-mobile.webp")} />
          <img
            src={withAssetBasePath("/videos/hero-poster.webp")}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {!isStatic && (
          <>
            <video
              ref={firstVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <video
              ref={secondVideoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-0"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/25 to-[#0a0a0a]/60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Panel 1: welcome */}
        <div ref={welcomeRef} className="absolute inset-0 flex items-center">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 w-full pt-20 lg:pt-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-5 sm:mb-8">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                    />
                  ))}
                </div>
                <div className="scarcity-badge">ESTABLISHED 1992 · FORT WAYNE, INDIANA</div>
              </div>

              <h1 className="hero-headline text-white mb-5 sm:mb-8 text-[min(10vw,7svh)] sm:text-[clamp(3rem,min(8vw,9.5svh),7rem)]">
                A game room
                <br />
                <span className="whitespace-nowrap">isn&apos;t decoration.</span>
                <br />
                <span
                  className="ace-gradient-text italic"
                  style={{
                    filter:
                      "drop-shadow(0 2px 0 rgba(92, 30, 12, 0.4)) drop-shadow(0 4px 14px rgba(192, 57, 43, 0.25))",
                  }}
                >
                  It&apos;s the heart
                </span>
                <br />
                <span className="text-[#f5f1ea]">of a home.</span>
              </h1>

              {/* Hidden on very short screens so the buttons stay visible */}
              <p className="text-base sm:text-lg lg:text-xl text-[#e8e2d5] font-light max-w-xl leading-relaxed mb-6 sm:mb-10 [@media(max-height:620px)]:hidden">
                Pool tables. Pinball. Playsets. Basketball goals. For 32 years, Fort Wayne&apos;s
                families have come to ACE to build the room where their family gathers.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <Link href="/collection" className="btn-primary group">
                  Shop the Showroom
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/experience"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent text-white font-semibold text-sm tracking-[0.1em] uppercase border border-white/60 hover:bg-white hover:text-[#1a1612] transition-all duration-[400ms]"
                >
                  Visit the Showroom
                </Link>
              </div>
            </div>
          </div>
        </div>

        {!isStatic && (
          <>
            {/* Panel 2: over the felt */}
            <StoryPanel panelRef={philosophyRef} label="/ I — THE PHILOSOPHY" signature="— the ace difference">
              We don&apos;t sell pool tables.
              <br />
              <span className="italic text-[#f1c40f]">We sell the reason</span>
              <br />
              you&apos;ll be home on <span className="whitespace-nowrap">Friday night.</span>
            </StoryPanel>

            {/* Panel 3: over the playset */}
            <StoryPanel panelRef={legacyRef} label="/ II — THE LEGACY" signature="— the ace promise">
              We don&apos;t sell playsets.
              <br />
              <span className="italic text-[#f1c40f]">We sell the yard</span>
              <br />
              your kids grow up in.
            </StoryPanel>

            <div
              ref={scrollCueRef}
              className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 flex items-center gap-4 pointer-events-none lg:[@media(max-height:720px)]:hidden"
              aria-hidden="true"
            >
              <div className="w-12 h-px bg-gradient-to-r from-[#d4a843] to-transparent" />
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#e8e2d5]">SCROLL</span>
              <ArrowDown className="w-3 h-3 text-[#d4a843] motion-safe:animate-bounce" />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function StoryPanel({
  panelRef,
  label,
  signature,
  children,
}: {
  panelRef: React.Ref<HTMLDivElement>
  label: string
  signature: string
  children: ReactNode
}) {
  const diamonds = (
    <div className="hidden sm:flex items-center gap-3 opacity-70" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rotate-45 bg-gradient-to-br from-[#e67e22] to-[#f1c40f] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
        />
      ))}
    </div>
  )

  return (
    // Stacked above the welcome panel, so it must not catch that panel's clicks.
    <div ref={panelRef} className="absolute inset-0 flex items-center opacity-0 pointer-events-none">
      {/* Keeps the text readable over the felt grid and the bright playset */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.3)_50%,transparent_78%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-8 sm:mb-10">
            {diamonds}
            <p className="font-display tracking-[0.18em] text-xs text-[#f1c40f] drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              {label}
            </p>
            {diamonds}
          </div>

          <h2 className="font-editorial text-[2.25rem] md:text-6xl lg:text-7xl text-[#f5efe6] leading-[1.05] mb-8 sm:mb-10 drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]">
            {children}
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f1c40f]/40 to-[#f1c40f]/40 max-w-32" />
            <span className="font-script text-2xl text-[#f1c40f] drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              {signature}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f1c40f]/40 to-[#f1c40f]/40 max-w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
