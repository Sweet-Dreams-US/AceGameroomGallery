import { formatPrice } from "@/lib/commerce"

interface PriceTagProps {
  price?: number
  comparePrice?: number
  /** Visual size of the price */
  size?: "sm" | "md" | "lg" | "xl"
  /** Style preset */
  variant?: "default" | "muted"
  /** Replacement text when no price (e.g. "Request a Quote") */
  fallback?: string
  className?: string
}

const SIZE_MAP = {
  sm: { price: "text-lg", compare: "text-xs" },
  md: { price: "text-2xl", compare: "text-sm" },
  lg: { price: "text-3xl", compare: "text-base" },
  xl: { price: "text-4xl lg:text-5xl", compare: "text-lg" },
} as const

/**
 * Display a product price. Falls back to a "Request a Quote" treatment when
 * no price is set — used for high-end items where the full sale happens at
 * the showroom.
 */
export function PriceTag({
  price,
  comparePrice,
  size = "md",
  variant = "default",
  fallback = "Request a Quote",
  className = "",
}: PriceTagProps) {
  const sizes = SIZE_MAP[size]

  if (price === undefined) {
    return (
      <span
        className={`${sizes.price} font-playfair italic font-medium text-[#6b655e] ${className}`}
      >
        {fallback}
      </span>
    )
  }

  const onSale =
    comparePrice !== undefined && comparePrice > price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0

  const colorClass = variant === "muted" ? "text-[#3d3834]" : "text-[#1a1612]"

  return (
    <span className={`inline-flex items-baseline gap-3 ${className}`}>
      <span className={`${sizes.price} font-playfair font-black tracking-tight ${colorClass}`}>
        {formatPrice(price)}
      </span>
      {comparePrice !== undefined && comparePrice > price && (
        <>
          <span
            className={`${sizes.compare} text-[#a8a198] line-through font-medium`}
          >
            {formatPrice(comparePrice)}
          </span>
          {onSale >= 5 && (
            <span className="text-[10px] font-display tracking-[0.2em] text-[#c0392b] uppercase px-2 py-0.5 bg-[#c0392b]/10 rounded">
              Save {onSale}%
            </span>
          )}
        </>
      )}
    </span>
  )
}
