/**
 * Custom-generated brand imagery for Ace Game Room Gallery.
 * Created with Higgsfield Soul Location + nano_banana_2, optimized to webp/png.
 *
 * Use these in preference to stock photography wherever possible — they're
 * cohesive, on-brand, and have the same warm cinematic light across every page.
 *
 * basePath note:
 *   These paths are basePath-relative (start with /images/...) so they work
 *   with `next/image`, which automatically prepends the configured basePath
 *   in production. For raw <img> tags or CSS `background-image: url(...)`,
 *   wrap with `withAssetBasePath()` so the GitHub Pages prefix is applied.
 */

const BASE = "/images/brand"

export const BRAND_IMAGES = {
  // Wide cinematic showroom shot — perfect for hero
  heroShowroom: `${BASE}/hero-showroom.webp`,
  // Macro pool table corner with rack
  poolTableDetail: `${BASE}/pool-table-detail.webp`,
  // Pinball + arcade glow
  pinballArcade: `${BASE}/pinball-arcade.webp`,
  // Bar / furniture lifestyle
  barFurniture: `${BASE}/bar-furniture.webp`,
  // Cedar playset in golden hour
  playsetCedar: `${BASE}/playset-cedar.webp`,
  // 22ft shuffleboard
  shuffleboard: `${BASE}/shuffleboard.webp`,
  // Trampoline + basketball outdoor
  outdoorRecreation: `${BASE}/outdoor-recreation.webp`,
  // McDermott cue display
  cuesDisplay: `${BASE}/cues-display.webp`,
  // Foosball + air hockey neon glow
  gamesFoosball: `${BASE}/games-foosball.webp`,
  // Hand-painted ACE wordmark — for the loading screen reveal + decorative accents
  aceMarkPainted: `${BASE}/ace-mark.png`,
  // Full ACE GAME ROOM GALLERY hand-painted logo on cream
  aceLogoFull: `${BASE}/ace-logo-full.png`,
  // Cinematic pool-table corner banner — moody amber light, gold balls
  poolTableBanner: `${BASE}/pool-table-banner.webp`,
} as const

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/AceGameroomGallery" : ""

/**
 * Apply the GitHub Pages basePath to an asset path.
 * Use for CSS `background-image: url(...)` and raw `<img src>`.
 * NOT needed for `next/image`, which handles basePath automatically.
 */
export function withAssetBasePath(path: string): string {
  return `${BASE_PATH}${path}`
}
