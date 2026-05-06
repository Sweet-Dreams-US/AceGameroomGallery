/**
 * Custom-generated brand imagery for Ace Game Room Gallery.
 * Created with Higgsfield Soul Location + nano_banana_2, optimized to webp/png.
 *
 * Use these in preference to stock photography wherever possible — they're
 * cohesive, on-brand, and have the same warm cinematic light across every page.
 *
 * basePath note:
 *   GitHub Pages serves the site at username.github.io/AceGameroomGallery/,
 *   so every static asset URL needs the /AceGameroomGallery prefix in
 *   production. Next.js's `<Image>` component DOES NOT auto-apply basePath
 *   when `unoptimized: true` is set in next.config (the static export mode
 *   we use), so we bake the basePath into the strings here. This works for
 *   `<Image>`, raw `<img>`, and CSS `background-image: url()` alike.
 */

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/AceGameroomGallery" : ""
const BASE = `${BASE_PATH}/images/brand`

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

/**
 * Pass-through helper kept for backwards compatibility. BRAND_IMAGES values
 * already include the basePath, so this is a no-op. Use it when you want to
 * make the basePath dependency explicit at the call site.
 */
export function withAssetBasePath(path: string): string {
  // If the path already starts with the base path, don't double-prefix.
  if (path.startsWith(BASE_PATH)) return path
  return `${BASE_PATH}${path}`
}
