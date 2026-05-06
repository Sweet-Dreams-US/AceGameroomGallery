/**
 * Addon catalog. Addons attach to products at checkout.
 * Grouped so the product page can render "Choose your felt", "Add cues", etc.
 */

import type { ProductAddon } from "./commerce"

export const MOCK_ADDONS: ProductAddon[] = [
  // ===== CLOTH / FELT =====
  {
    id: "addon-felt-simonis",
    name: "Simonis 860 Cloth Upgrade",
    description: "The cloth every BCA pro tournament plays on. Replaces standard felt.",
    price: 39900,
    group: "cloth",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-felt-championship",
    name: "Championship Tour Edition",
    description: "Tournament-grade Championship cloth. Faster than stock, dialed for action.",
    price: 24900,
    group: "cloth",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-felt-color",
    name: "Premium Color Choice",
    description: "Choose any in-stock cloth color — burgundy, navy, charcoal, classic green.",
    price: 9900,
    group: "cloth",
    appliesTo: ["billiards"],
  },

  // ===== INSTALL / SERVICE =====
  {
    id: "addon-install-pro",
    name: "Professional Install & Level",
    description: "Two technicians, full setup and slate leveling. Required on slate tables.",
    price: 39900,
    group: "install",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-delivery-glove",
    name: "White-Glove Delivery",
    description: "Inside delivery, basement-ready. Free on orders over $1,999 within 30 mi.",
    price: 14900,
    group: "install",
    appliesTo: ["billiards", "games", "furniture", "playsets"],
  },
  {
    id: "addon-install-playset",
    name: "Rainbow Playset Installation",
    description: "Professional crew assembles, levels, and anchors your playset on-site.",
    price: 79900,
    group: "install",
    appliesTo: ["playsets"],
  },
  {
    id: "addon-install-trampoline",
    name: "Trampoline Install",
    description: "Two-person assembly with safety net and pad install.",
    price: 19900,
    group: "install",
    appliesTo: ["outdoor"],
  },

  // ===== CUES / ACCESSORIES =====
  {
    id: "addon-cues-pair",
    name: "Pair of McDermott Cues",
    description: "Two American-made McDermott cues to start your set.",
    price: 29900,
    group: "cue",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-cues-set4",
    name: "Set of 4 Players Cues",
    description: "Four house cues for guests. Pre-tipped, ready to play.",
    price: 19900,
    group: "cue",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-cuerack",
    name: "Wall Cue Rack (Holds 8)",
    description: "Solid hardwood rack that mounts to studs. Matches any decor.",
    price: 12900,
    group: "accessory",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-balls-aramith",
    name: "Aramith Premier Ball Set",
    description: "The professional standard. Replaces standard ball set.",
    price: 17900,
    group: "accessory",
    appliesTo: ["billiards"],
  },
  {
    id: "addon-pingpong-paddles",
    name: "Pro Paddles & Balls Bundle",
    description: "Four ITTF-approved paddles, balls, and net upgrade.",
    price: 8900,
    group: "accessory",
    appliesTo: ["games"],
  },
  {
    id: "addon-darts-set",
    name: "Tournament Darts Set",
    description: "Six steel-tip darts in a leather case.",
    price: 6900,
    group: "accessory",
    appliesTo: ["games"],
  },

  // ===== WARRANTY =====
  {
    id: "addon-warranty-extended",
    name: "Extended Warranty (5 yrs)",
    description: "Adds 5 years of full parts + labor on top of factory warranty.",
    price: 24900,
    group: "warranty",
    appliesTo: ["billiards", "games", "furniture", "playsets", "outdoor"],
  },
  {
    id: "addon-warranty-protect",
    name: "Spill & Damage Protection",
    description: "Coverage for accidental damage and spills for 3 years.",
    price: 14900,
    group: "warranty",
    appliesTo: ["billiards", "furniture"],
  },

  // ===== FURNITURE PAIRINGS =====
  {
    id: "addon-stools-pair",
    name: "Pair of Bar Stools",
    description: "Two matching swivel stools. Choose leather or fabric in checkout notes.",
    price: 39900,
    group: "pairing",
    appliesTo: ["furniture"],
  },
]

/** Get addons that apply to a category, optionally filtered by allowed groups. */
export function getAddonsForProduct(
  categorySlug: string,
  allowedGroups?: string[],
): ProductAddon[] {
  return MOCK_ADDONS.filter((addon) => {
    if (!addon.appliesTo.includes(categorySlug)) return false
    if (allowedGroups && allowedGroups.length > 0) {
      return allowedGroups.includes(addon.group)
    }
    return true
  })
}

/** Group addons for display on the product page. */
export function groupAddons(addons: ProductAddon[]): Record<string, ProductAddon[]> {
  return addons.reduce(
    (acc, addon) => {
      if (!acc[addon.group]) acc[addon.group] = []
      acc[addon.group].push(addon)
      return acc
    },
    {} as Record<string, ProductAddon[]>,
  )
}

export const ADDON_GROUP_LABELS: Record<string, string> = {
  cloth: "Felt & Cloth",
  install: "Delivery & Install",
  cue: "Cues",
  accessory: "Accessories",
  warranty: "Warranty",
  pairing: "Pair It With",
}
