import Image from "next/image"

interface AceLogoProps {
  /** Use the official ACE PNG artwork (default) or render as text */
  variant?: "mark" | "text"
  /** Show "GAME ROOM GALLERY" beneath the mark */
  showTagline?: boolean
  /** Rough scale — controls width for the image and font size for text */
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  /** Tagline color class — defaults to muted */
  taglineClassName?: string
}

const SIZES = {
  sm: { img: 96, text: "text-2xl", tag: "text-[9px]" },
  md: { img: 128, text: "text-3xl lg:text-4xl", tag: "text-[9px] lg:text-[10px]" },
  lg: { img: 192, text: "text-5xl lg:text-6xl", tag: "text-[11px] lg:text-xs" },
  xl: { img: 260, text: "text-6xl lg:text-8xl", tag: "text-xs lg:text-sm" },
}

export function AceLogo({
  variant = "mark",
  showTagline = true,
  size = "md",
  className = "",
  taglineClassName = "text-[#6b655e]",
}: AceLogoProps) {
  const s = SIZES[size]

  if (variant === "mark") {
    return (
      <span className={`inline-flex flex-col items-start leading-[0.85] ${className}`}>
        <Image
          src="https://www.acegameroom.com/data/logo.png"
          alt="Ace Game Room Gallery"
          width={s.img}
          height={Math.round(s.img * 0.39)}
          className="h-auto w-auto select-none"
          style={{ width: s.img, maxWidth: "100%" }}
          priority
          unoptimized
        />
        {showTagline && (
          <span
            className={`font-display tracking-[0.3em] mt-0.5 ${s.tag} ${taglineClassName} sr-only`}
          >
            Game Room Gallery
          </span>
        )}
      </span>
    )
  }

  // Text variant — for contexts where we need crisp SVG-rendered type
  return (
    <span className={`inline-flex flex-col items-start leading-[0.85] ${className}`}>
      <span
        className={`ace-gradient-text-emboss font-black italic font-playfair ${s.text}`}
        style={{ letterSpacing: "-0.02em" }}
      >
        ACE
      </span>
      {showTagline && (
        <span
          className={`font-display tracking-[0.3em] mt-1 ${s.tag} ${taglineClassName}`}
        >
          GAME ROOM GALLERY
        </span>
      )}
    </span>
  )
}
