/**
 * Commerce overlay — adds pricing, stock, and fulfillment data on top of
 * MOCK_PRODUCTS without polluting the catalog file. The slug is the key.
 *
 * Why a separate file: the existing catalog is large and mostly content
 * (descriptions, specs, images). Pricing changes more often and lives better
 * as its own table. In production this becomes the products table in the
 * database; here it's a typed object literal.
 */

import type { ProductCommerce } from "./commerce"
import { MOCK_PRODUCTS, type MockProduct } from "./mock-data"

export const PRODUCT_COMMERCE: Record<string, ProductCommerce> = {
  // ===== POOL TABLES — premium, install-required =====
  "olhausen-augusta": {
    price: 569900,
    comparePrice: 619900,
    stock: 3,
    sku: "OLH-AUG-8FT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 850,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "accessory", "warranty"],
  },
  "olhausen-americana-ii": {
    price: 489900,
    stock: 2,
    sku: "OLH-AMER2-8FT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 800,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "accessory", "warranty"],
  },
  "olhausen-belmont": {
    price: 439900,
    stock: 4,
    sku: "OLH-BELM-8FT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 780,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "accessory", "warranty"],
  },
  "valley-panther-coin-op": {
    price: 329900,
    stock: 1,
    sku: "VAL-PNTR-COIN",
    fulfillment: ["delivery"],
    weightLbs: 720,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "warranty"],
  },
  "cl-bailey-eastpoint": {
    price: 299900,
    stock: 2,
    sku: "CLB-EPT-8FT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 750,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "warranty"],
  },
  "plank-hide-isaac": {
    price: 459900,
    stock: 2,
    sku: "PH-ISC-8FT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 780,
    requiresInstall: true,
    addonGroups: ["cloth", "install", "cue", "accessory", "warranty"],
  },

  // ===== CUES — direct-to-cart =====
  "mcdermott-g308": {
    price: 39900,
    stock: 12,
    sku: "MD-G308",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 2,
    addonGroups: ["accessory"],
  },
  "lucasi-hybrid-l-h70": {
    price: 24900,
    stock: 8,
    sku: "LU-LH70",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 2,
    addonGroups: ["accessory"],
  },
  "viking-valhalla-200": {
    price: 9900,
    stock: 20,
    sku: "VK-VH200",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 2,
    addonGroups: ["accessory"],
  },
  "predator-revo-shaft": {
    price: 67500,
    stock: 4,
    sku: "PRED-REVO-12.9",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 1,
  },

  // ===== CLOTH =====
  "simonis-860-tournament": {
    price: 21900,
    stock: 15,
    sku: "SIM-860-T",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 4,
  },
  "championship-tour-edition": {
    price: 17900,
    stock: 18,
    sku: "CHMP-TE",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 4,
  },

  // ===== GAMES =====
  "stern-rush-premium": {
    price: 949900,
    stock: 1,
    sku: "ST-RUSH-PREM",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 250,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "jersey-jack-godzilla": {
    price: 1099900,
    stock: 1,
    sku: "JJP-GOD-LE",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 280,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "stern-spider-man": {
    price: 749900,
    stock: 2,
    sku: "ST-SPDR",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 240,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "shuffleboard-22ft-mcclure": {
    price: 599900,
    stock: 1,
    sku: "MCCL-22",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 600,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "shuffleboard-9ft-classic": {
    price: 219900,
    stock: 3,
    sku: "MCCL-9",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 280,
    addonGroups: ["install", "warranty"],
  },
  "foosball-tornado-tournament": {
    price: 169900,
    stock: 4,
    sku: "TRNDO-T3000",
    fulfillment: ["delivery", "pickup", "shipping"],
    weightLbs: 350,
    addonGroups: ["accessory", "warranty"],
  },
  "air-hockey-dynamo": {
    price: 199900,
    stock: 2,
    sku: "DYNAMO-AH-8",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 320,
    addonGroups: ["accessory", "warranty"],
  },
  "ping-pong-stiga-advantage": {
    price: 64900,
    stock: 6,
    sku: "STIGA-ADV",
    fulfillment: ["delivery", "pickup", "shipping"],
    weightLbs: 165,
    addonGroups: ["accessory", "warranty"],
  },

  // ===== DARTS =====
  "dartboard-cabinet-winmau": {
    price: 27900,
    stock: 8,
    sku: "WIN-CAB-BLK",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 25,
    addonGroups: ["accessory"],
  },
  "darts-soft-tip-bullshooter": {
    price: 4900,
    stock: 30,
    sku: "BS-ST-SET",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 1,
    addonGroups: ["accessory"],
  },

  // ===== FURNITURE =====
  "darafeev-bar-encore": {
    price: 489900,
    stock: 2,
    sku: "DARA-ENC-BAR",
    fulfillment: ["delivery"],
    weightLbs: 450,
    addonGroups: ["pairing", "warranty"],
  },
  "darafeev-bar-stool-classic": {
    price: 89900,
    stock: 12,
    sku: "DARA-CLST",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 35,
    addonGroups: ["warranty"],
  },
  "presidential-poker-table": {
    price: 449900,
    stock: 2,
    sku: "PRES-PKR-OCT",
    fulfillment: ["delivery", "pickup"],
    weightLbs: 220,
    addonGroups: ["warranty"],
  },
  "neon-budweiser-vintage": {
    price: 32900,
    stock: 5,
    sku: "NEON-BUDV",
    fulfillment: ["pickup", "delivery", "shipping"],
    weightLbs: 18,
  },

  // ===== PLAYSETS =====
  "rainbow-castle-pkg-iv": {
    price: 749900,
    stock: 2,
    sku: "RB-CAST-IV",
    fulfillment: ["delivery"],
    weightLbs: 1500,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "rainbow-summit-pkg-ii": {
    price: 549900,
    stock: 3,
    sku: "RB-SUMT-II",
    fulfillment: ["delivery"],
    weightLbs: 1100,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },
  "rainbow-commercial-extreme": {
    price: 1899900,
    stock: 1,
    sku: "RB-COMM-EXT",
    fulfillment: ["delivery"],
    weightLbs: 3500,
    requiresInstall: true,
    addonGroups: ["install", "warranty"],
  },

  // ===== OUTDOOR =====
  "springfree-trampoline-large": {
    price: 184900,
    stock: 4,
    sku: "SF-TRMP-LG",
    fulfillment: ["delivery", "shipping"],
    weightLbs: 280,
    addonGroups: ["install", "warranty"],
  },
  "lifetime-basketball-goal": {
    price: 64900,
    stock: 6,
    sku: "LF-BBALL-GLS",
    fulfillment: ["delivery", "pickup", "shipping"],
    weightLbs: 180,
    addonGroups: ["install", "warranty"],
  },
}

/**
 * Merge a MockProduct with its commerce overlay. Returns the product
 * unchanged if no overlay exists (it falls back to the "Request a Quote" flow).
 */
export function withCommerce(product: MockProduct): MockProduct {
  const overlay = PRODUCT_COMMERCE[product.slug]
  if (!overlay) return product
  return { ...product, ...overlay }
}

/** Get every product, with commerce data merged. */
export function getAllProducts(): MockProduct[] {
  return MOCK_PRODUCTS.map(withCommerce)
}

/** Find a single product by slug, with commerce data merged. */
export function getProductWithCommerce(slug: string): MockProduct | undefined {
  const p = MOCK_PRODUCTS.find((p) => p.slug === slug)
  return p ? withCommerce(p) : undefined
}

/** Featured products that have a price (eligible for online checkout). */
export function getShoppableProducts(): MockProduct[] {
  return getAllProducts().filter((p) => p.price !== undefined)
}
