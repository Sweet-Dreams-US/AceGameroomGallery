// Mock data for product pages — will be replaced with Supabase queries

export interface MockCategory {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  children: MockSubcategory[]
}

export interface MockSubcategory {
  id: string
  name: string
  slug: string
  imageUrl: string
}

export interface MockProduct {
  id: string
  name: string
  slug: string
  categorySlug: string
  subcategorySlug?: string
  brandName: string
  imageUrl: string
  images: { url: string; alt: string }[]
  description: string
  specifications: Record<string, string>
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "cat-1",
    name: "Billiards",
    slug: "billiards",
    description:
      "Premium pool tables, cues, cloth, lighting, and accessories from top brands like Olhausen, Valley, and Presidential Billiards.",
    imageUrl:
      "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop",
    children: [
      {
        id: "sub-1-1",
        name: "Billiard Tables",
        slug: "billiard-tables",
        imageUrl:
          "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=400&h=300&fit=crop",
      },
      {
        id: "sub-1-2",
        name: "Cues",
        slug: "cues",
        imageUrl:
          "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=400&h=300&fit=crop",
      },
      {
        id: "sub-1-3",
        name: "Billiard Cloth",
        slug: "billiard-cloth",
        imageUrl:
          "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=400&h=300&fit=crop",
      },
      {
        id: "sub-1-4",
        name: "Lighting",
        slug: "lighting",
        imageUrl:
          "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=400&h=300&fit=crop",
      },
      {
        id: "sub-1-5",
        name: "Accessories",
        slug: "accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "cat-2",
    name: "Games",
    slug: "games",
    description:
      "Pinball machines, arcade games, foosball, air hockey, darts, shuffleboard, and more for the ultimate game room.",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    children: [
      {
        id: "sub-2-1",
        name: "Arcade Games",
        slug: "arcade-games",
        imageUrl:
          "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      },
      {
        id: "sub-2-2",
        name: "Pinball",
        slug: "pinball",
        imageUrl:
          "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      },
      {
        id: "sub-2-3",
        name: "Foosball",
        slug: "foosball",
        imageUrl:
          "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      },
      {
        id: "sub-2-4",
        name: "Air Hockey",
        slug: "air-hockey",
        imageUrl:
          "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      },
      {
        id: "sub-2-5",
        name: "Darts and Dartboards",
        slug: "darts",
        imageUrl:
          "https://images.unsplash.com/photo-1617883861744-13b534e1757a?w=400&h=300&fit=crop",
      },
      {
        id: "sub-2-6",
        name: "Shuffleboard Tables",
        slug: "shuffleboard",
        imageUrl:
          "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "cat-3",
    name: "Furniture",
    slug: "furniture",
    description:
      "Bars, bar stools, pub tables, game chairs, and specialty seating to complete your game room in style.",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    children: [
      {
        id: "sub-3-1",
        name: "Bars",
        slug: "bars",
        imageUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      },
      {
        id: "sub-3-2",
        name: "Bar Stools",
        slug: "bar-stools",
        imageUrl:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
      },
      {
        id: "sub-3-3",
        name: "Pub Tables",
        slug: "pub-tables",
        imageUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      },
      {
        id: "sub-3-4",
        name: "Game Chairs",
        slug: "game-chairs",
        imageUrl:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
      },
      {
        id: "sub-3-5",
        name: "Poker Tables",
        slug: "poker-tables",
        imageUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "cat-4",
    name: "Playsets",
    slug: "playsets",
    description:
      "Rainbow Play Systems for residential and commercial use. Safe, durable, and fun for the whole family.",
    imageUrl:
      "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600&h=400&fit=crop",
    children: [],
  },
  {
    id: "cat-5",
    name: "Outdoor",
    slug: "outdoor",
    description:
      "Basketball goals, trampolines, and outdoor games for year-round backyard fun.",
    imageUrl:
      "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600&h=400&fit=crop",
    children: [],
  },
  {
    id: "cat-6",
    name: "Services",
    slug: "services",
    description:
      "Professional billiard, pinball, and playset services including setup, recovery, and repair.",
    imageUrl:
      "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop",
    children: [],
  },
]

export const MOCK_PRODUCTS: MockProduct[] = [
  // Billiards
  {
    id: "prod-1",
    name: 'Olhausen Americana II 8\' Pool Table',
    slug: "olhausen-americana-ii",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Olhausen",
    imageUrl:
      "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=800&h=600&fit=crop",
        alt: "Olhausen Americana II pool table front view",
      },
      {
        url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=800&h=600&fit=crop&q=80",
        alt: "Olhausen Americana II pool table side view",
      },
      {
        url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=800&h=600&fit=crop&q=70",
        alt: "Olhausen Americana II pool table detail",
      },
    ],
    description:
      "The Olhausen Americana II is a beautifully crafted pool table featuring solid hardwood construction and Olhausen's exclusive Accu-Fast cushion system. This premium 8-foot table delivers professional-grade play in an elegant package that complements any game room.\n\nBuilt with precision in Portland, Oregon, the Americana II features a one-inch Italian slate bed, solid hardwood rails, and genuine leather pockets. Available in multiple finish options to match your decor.",
    specifications: {
      "Table Size": '8 Foot (Playing Surface: 44" x 88")',
      "Slate": '1" Italian Slate (3-piece)',
      "Cushions": "Accu-Fast Cushion System",
      "Frame": "Solid Hardwood",
      "Pockets": "Genuine Leather, Shield",
      "Finish": "Multiple Options Available",
      "Warranty": "Lifetime Warranty",
      "Made In": "Portland, Oregon, USA",
    },
  },
  {
    id: "prod-2",
    name: 'Valley Panther ZD-11T 7\' Coin-Op Pool Table',
    slug: "valley-panther-coin-op",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Valley",
    imageUrl:
      "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop&q=90",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=800&h=600&fit=crop&q=90",
        alt: "Valley Panther coin-op pool table",
      },
    ],
    description:
      "The Valley Panther ZD-11T is the industry-standard coin-operated pool table trusted by bars, clubs, and recreation centers worldwide. Built for heavy commercial use with a durable laminate surface and professional-grade playfield.",
    specifications: {
      "Table Size": '7 Foot (Playing Surface: 39" x 78")',
      "Surface": "Laminate Playfield",
      "Coin Mechanism": "ZD-11T",
      "Frame": "Heavy-Duty Steel",
      "Weight": "Approx. 850 lbs",
      "Use": "Commercial / Coin-Operated",
    },
  },
  // Games
  {
    id: "prod-3",
    name: "Stern Pinball Rush Premium",
    slug: "stern-rush-premium",
    categorySlug: "games",
    subcategorySlug: "pinball",
    brandName: "Stern Pinball",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop",
        alt: "Stern Rush pinball machine",
      },
      {
        url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=80",
        alt: "Stern Rush pinball playfield",
      },
    ],
    description:
      "Experience the thrill of high-speed pinball with Stern's Rush Premium edition. Featuring an immersive playfield design, multiball action, and concert-quality sound, this machine brings the energy of a live rock show to your game room.",
    specifications: {
      "Type": "Premium Edition",
      "Dimensions": '29" W x 56" D x 76" H',
      "Weight": "Approx. 250 lbs",
      "Display": 'LCD Backbox Display',
      "Audio": "3-Channel Sound System",
      "Features": "Multiball, Ramp Combos, Interactive Toys",
    },
  },
  {
    id: "prod-4",
    name: "Golden Tee PGA Tour Home Edition",
    slug: "golden-tee-home",
    categorySlug: "games",
    subcategorySlug: "arcade-games",
    brandName: "Incredible Technologies",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop&q=85",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=85",
        alt: "Golden Tee home arcade cabinet",
      },
    ],
    description:
      "The Golden Tee PGA Tour Home Edition brings the beloved arcade golf experience to your home. Features stunning HD graphics, multiple courses, and online tournament play capability.",
    specifications: {
      "Type": "Home Edition Arcade",
      "Display": '32" HD Monitor',
      "Courses": "50+ Championship Courses",
      "Online": "Wi-Fi Tournament Play",
      "Controls": "Trackball with Custom Housing",
    },
  },
  // Furniture
  {
    id: "prod-5",
    name: "Darafeev Trestle Pub Table",
    slug: "darafeev-trestle-pub-table",
    categorySlug: "furniture",
    subcategorySlug: "pub-tables",
    brandName: "Darafeev",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        alt: "Darafeev Trestle pub table in game room",
      },
    ],
    description:
      "The Darafeev Trestle Pub Table combines timeless craftsmanship with modern game room style. Solid hardwood construction with a rich finish that pairs perfectly with any bar stool collection.",
    specifications: {
      "Material": "Solid Hardwood",
      "Height": "42 inches (Pub Height)",
      "Shape": "Round",
      "Finish": "Multiple Options Available",
      "Seating": "Seats 4",
      "Made In": "USA",
    },
  },
  {
    id: "prod-6",
    name: "Holland Bar Stool Co. Swivel Counter Stool",
    slug: "holland-swivel-counter-stool",
    categorySlug: "furniture",
    subcategorySlug: "bar-stools",
    brandName: "Holland Bar Stool Co.",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
        alt: "Holland Bar Stool swivel counter stool",
      },
    ],
    description:
      "Durable commercial-grade swivel bar stool from Holland Bar Stool Co. Features a 360-degree swivel, comfortable padded seat, and sturdy steel frame. Available with a wide selection of team and custom vinyl options.",
    specifications: {
      "Frame": "Heavy-Duty Steel",
      "Seat": "Padded Vinyl",
      "Swivel": "360-Degree",
      "Height": '25" / 30" Options',
      "Weight Capacity": "400 lbs",
      "Warranty": "5-Year Structural",
    },
  },
  // More Billiards
  {
    id: "prod-7",
    name: "Presidential Billiards Hamilton",
    slug: "presidential-hamilton",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Presidential Billiards",
    imageUrl:
      "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop&q=75",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=800&h=600&fit=crop&q=75",
        alt: "Presidential Hamilton pool table",
      },
    ],
    description:
      "The Presidential Hamilton brings classic elegance to any game room. Features solid hardwood construction, one-inch Italian slate, and premium K-66 cushion rails for tournament-level play.",
    specifications: {
      "Table Size": "8 Foot",
      "Slate": '1" Italian Slate (3-piece)',
      "Cushions": "K-66 Profile Rubber",
      "Frame": "Solid Hardwood",
      "Legs": "Turned Leg Design",
      "Finish": "Chestnut, Espresso, Weathered Oak",
    },
  },
  // More Games
  {
    id: "prod-8",
    name: 'Tornado Classic Foosball Table',
    slug: "tornado-classic-foosball",
    categorySlug: "games",
    subcategorySlug: "foosball",
    brandName: "Tornado",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop&q=75",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=75",
        alt: "Tornado Classic foosball table",
      },
    ],
    description:
      "The Tornado Classic is the tournament standard foosball table trusted by professional players worldwide. Solid cabinet construction, patented counterbalanced men, and super-fast play surface.",
    specifications: {
      "Type": "Tournament Grade",
      "Dimensions": '56" L x 30" W x 36" H',
      "Players": "Counterbalanced, Patented Design",
      "Surface": "Smooth Playfield",
      "Goal": "3-Man Goalie",
      "Frame": "Heavy-Duty Cabinet",
    },
  },
  {
    id: "prod-9",
    name: "Viper Shot King Bristle Dartboard",
    slug: "viper-shot-king-dartboard",
    categorySlug: "games",
    subcategorySlug: "darts",
    brandName: "Viper",
    imageUrl:
      "https://images.unsplash.com/photo-1617883861744-13b534e1757a?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1617883861744-13b534e1757a?w=800&h=600&fit=crop",
        alt: "Viper Shot King bristle dartboard",
      },
    ],
    description:
      "The Viper Shot King is a premium sisal bristle dartboard featuring self-healing fibers and a staple-free bullseye. Regulation size with tournament-quality construction for serious players.",
    specifications: {
      "Type": "Bristle (Sisal Fiber)",
      "Diameter": '18" (Regulation)',
      "Wire": "Ultra-Thin Spider Wire",
      "Bullseye": "Staple-Free Design",
      "Mounting": "Standard Wall Mount Hardware",
      "Includes": "6 Steel-Tip Darts",
    },
  },
  {
    id: "prod-10",
    name: 'Hudson Shuffleboard Grand Hudson 14\'',
    slug: "hudson-grand-shuffleboard",
    categorySlug: "games",
    subcategorySlug: "shuffleboard",
    brandName: "Hudson Shuffleboard",
    imageUrl:
      "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600&h=400&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=800&h=600&fit=crop",
        alt: "Hudson Grand shuffleboard table",
      },
    ],
    description:
      "The Grand Hudson is a stunning 14-foot shuffleboard table that commands attention in any game room. Handcrafted hardwood cabinet with a polymer-coated playing surface for consistent puck speed.",
    specifications: {
      "Length": "14 Feet",
      "Surface": "Polymer-Coated Hardwood",
      "Cabinet": "Solid Hardwood",
      "Climatic Adjusters": "Yes",
      "Finish": "Espresso, Rustic, Natural",
      "Includes": "8 Pucks, Wax, Brush",
    },
  },
  // Furniture
  {
    id: "prod-11",
    name: "RAM Game Room 84\" Home Bar",
    slug: "ram-home-bar",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "RAM Game Room",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=85",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=85",
        alt: "RAM Game Room home bar",
      },
    ],
    description:
      "The RAM Game Room 84-inch Home Bar transforms your space into the ultimate entertainment zone. Features built-in stemware rack, speed rail, and ample storage. Solid hardwood construction with a durable finish.",
    specifications: {
      "Width": "84 inches",
      "Material": "Solid Hardwood",
      "Features": "Stemware Rack, Speed Rail, Shelves",
      "Finish": "Chestnut, Cappuccino",
      "Assembly": "Some Assembly Required",
      "Bar Top": "Padded Arm Rest",
    },
  },
  {
    id: "prod-12",
    name: "Callee Bailey Spectator Chair",
    slug: "callee-bailey-spectator-chair",
    categorySlug: "furniture",
    subcategorySlug: "game-chairs",
    brandName: "Callee",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&q=85",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop&q=85",
        alt: "Callee Bailey spectator game chair",
      },
    ],
    description:
      "The Callee Bailey Spectator Chair is designed specifically for game room viewing. Extra-tall seat height puts you at the perfect vantage point for watching pool or other games. Built with premium materials for lasting comfort.",
    specifications: {
      "Seat Height": "34 inches (Spectator Height)",
      "Frame": "Heavy-Gauge Steel",
      "Upholstery": "Premium Fabric or Vinyl",
      "Swivel": "360-Degree",
      "Casters": "Optional",
      "Made In": "USA",
    },
  },
]

/**
 * Get a category by its slug
 */
export function getCategoryBySlug(slug: string): MockCategory | undefined {
  return MOCK_CATEGORIES.find((c) => c.slug === slug)
}

/**
 * Get all products for a given category slug
 */
export function getProductsByCategory(categorySlug: string): MockProduct[] {
  return MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

/**
 * Get a single product by its slug
 */
export function getProductBySlug(slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(
  product: MockProduct,
  limit = 6
): MockProduct[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit)
}

// =============================================
// Admin Mock Data
// =============================================

import type {
  Category,
  Brand,
  Product,
  ProductImage,
  Inquiry,
  HeroBanner,
  Testimonial,
  FaqEntry,
  LeagueEvent,
  SiteContent,
} from "./types"

export const ADMIN_MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Billiards", slug: "billiards", description: "Pool tables, cues, cloth, lighting, and accessories", image_url: null, parent_id: null, sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "cat-2", name: "Games", slug: "games", description: "Pinball, arcade, foosball, air hockey, darts, and more", image_url: null, parent_id: null, sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "cat-3", name: "Furniture", slug: "furniture", description: "Bars, bar stools, pub tables, game chairs, and neons", image_url: null, parent_id: null, sort_order: 3, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "cat-4", name: "Playsets", slug: "playsets", description: "Rainbow Play Systems for residential and commercial use", image_url: null, parent_id: null, sort_order: 4, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "cat-5", name: "Outdoor", slug: "outdoor", description: "Basketball goals, trampolines, and outdoor games", image_url: null, parent_id: null, sort_order: 5, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "cat-6", name: "Services", slug: "services", description: "Billiard, pinball, and playset services", image_url: null, parent_id: null, sort_order: 6, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-1-1", name: "Billiard Tables", slug: "billiard-tables", description: null, image_url: null, parent_id: "cat-1", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-1-2", name: "Cues", slug: "cues", description: null, image_url: null, parent_id: "cat-1", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-2-1", name: "Pinball", slug: "pinball", description: null, image_url: null, parent_id: "cat-2", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-2-2", name: "Arcade Games", slug: "arcade-games", description: null, image_url: null, parent_id: "cat-2", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-3-1", name: "Bar Stools", slug: "bar-stools", description: null, image_url: null, parent_id: "cat-3", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
  { id: "sub-3-2", name: "Pub Tables", slug: "pub-tables", description: null, image_url: null, parent_id: "cat-3", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
]

export const ADMIN_MOCK_BRANDS: Brand[] = [
  { id: "brand-1", name: "Olhausen", slug: "olhausen", logo_url: null, website_url: "https://olhausenbilliards.com", created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-2", name: "Valley", slug: "valley", logo_url: null, website_url: "https://www.valley-dynamo.com", created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-3", name: "C.L. Bailey", slug: "cl-bailey", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-4", name: "Plank and Hide", slug: "plank-and-hide", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-5", name: "Presidential Billiards", slug: "presidential-billiards", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-6", name: "Championship", slug: "championship", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-7", name: "Simonis", slug: "simonis", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-8", name: "J. Pechauer", slug: "j-pechauer", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-9", name: "McDermott", slug: "mcdermott", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-10", name: "Lucasi", slug: "lucasi", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-11", name: "Viking", slug: "viking", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-12", name: "Predator", slug: "predator", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-13", name: "Darafeev", slug: "darafeev", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-14", name: "American Heritage", slug: "american-heritage", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-15", name: "Callee", slug: "callee", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-16", name: "Holland Bar Stool Co.", slug: "holland-bar-stool", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-17", name: "RAM Game Room", slug: "ram-game-room", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-18", name: "Rainbow Play Systems", slug: "rainbow-play-systems", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-19", name: "Springfree", slug: "springfree", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-20", name: "Stern Pinball", slug: "stern-pinball", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-21", name: "Tornado", slug: "tornado", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-22", name: "Incredible Technologies", slug: "incredible-technologies", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-23", name: "Viper", slug: "viper", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-24", name: "Hudson Shuffleboard", slug: "hudson-shuffleboard", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-25", name: "Cuetec", slug: "cuetec", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-26", name: "Jacoby", slug: "jacoby", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
  { id: "brand-27", name: "H.J. Scott", slug: "hj-scott", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
]

export const ADMIN_MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1", name: "Olhausen Americana II 8' Pool Table", slug: "olhausen-americana-ii", description: "The Olhausen Americana II is a beautifully crafted pool table featuring solid hardwood construction.", category_id: "sub-1-1", brand_id: "brand-1",
    specifications: { "Table Size": '8 Foot', "Slate": '1" Italian Slate', "Cushions": "Accu-Fast", "Frame": "Solid Hardwood", "Warranty": "Lifetime" },
    is_featured: true, status: "active", meta_title: "Olhausen Americana II Pool Table", meta_description: "Premium 8-foot pool table by Olhausen.", sort_order: 1, created_at: "2024-06-01T00:00:00Z", updated_at: "2024-06-01T00:00:00Z",
    category: { id: "sub-1-1", name: "Billiard Tables", slug: "billiard-tables", description: null, image_url: null, parent_id: "cat-1", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-1", name: "Olhausen", slug: "olhausen", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-1", product_id: "prod-1", image_url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop", alt_text: "Olhausen Americana II", is_primary: true, sort_order: 0, created_at: "2024-06-01T00:00:00Z" }],
  },
  {
    id: "prod-2", name: "Valley Panther ZD-11T Coin-Op Table", slug: "valley-panther-coin-op", description: "The Valley Panther ZD-11T is the industry-standard coin-operated pool table.", category_id: "sub-1-1", brand_id: "brand-2",
    specifications: { "Table Size": "7 Foot", "Surface": "Laminate", "Use": "Commercial" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 2, created_at: "2024-06-02T00:00:00Z", updated_at: "2024-06-02T00:00:00Z",
    category: { id: "sub-1-1", name: "Billiard Tables", slug: "billiard-tables", description: null, image_url: null, parent_id: "cat-1", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-2", name: "Valley", slug: "valley", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-2", product_id: "prod-2", image_url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop&q=90", alt_text: "Valley Panther", is_primary: true, sort_order: 0, created_at: "2024-06-02T00:00:00Z" }],
  },
  {
    id: "prod-3", name: "Stern Pinball Rush Premium", slug: "stern-rush-premium", description: "High-speed pinball with immersive playfield design.", category_id: "sub-2-1", brand_id: "brand-20",
    specifications: { "Type": "Premium Edition", "Display": "LCD Backbox", "Audio": "3-Channel Sound" },
    is_featured: true, status: "active", meta_title: null, meta_description: null, sort_order: 3, created_at: "2024-06-03T00:00:00Z", updated_at: "2024-06-03T00:00:00Z",
    category: { id: "sub-2-1", name: "Pinball", slug: "pinball", description: null, image_url: null, parent_id: "cat-2", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-20", name: "Stern Pinball", slug: "stern-pinball", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-3", product_id: "prod-3", image_url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop", alt_text: "Stern Rush pinball", is_primary: true, sort_order: 0, created_at: "2024-06-03T00:00:00Z" }],
  },
  {
    id: "prod-4", name: "Golden Tee PGA Tour Home Edition", slug: "golden-tee-home", description: "The beloved arcade golf experience for your home.", category_id: "sub-2-2", brand_id: "brand-22",
    specifications: { "Display": '32" HD Monitor', "Courses": "50+", "Online": "Wi-Fi" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 4, created_at: "2024-06-04T00:00:00Z", updated_at: "2024-06-04T00:00:00Z",
    category: { id: "sub-2-2", name: "Arcade Games", slug: "arcade-games", description: null, image_url: null, parent_id: "cat-2", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-22", name: "Incredible Technologies", slug: "incredible-technologies", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-4", product_id: "prod-4", image_url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop&q=85", alt_text: "Golden Tee", is_primary: true, sort_order: 0, created_at: "2024-06-04T00:00:00Z" }],
  },
  {
    id: "prod-5", name: "Darafeev Trestle Pub Table", slug: "darafeev-trestle-pub-table", description: "Classic pub table with solid hardwood construction.", category_id: "sub-3-2", brand_id: "brand-13",
    specifications: { "Material": "Solid Hardwood", "Height": "42 inches", "Shape": "Round" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 5, created_at: "2024-06-05T00:00:00Z", updated_at: "2024-06-05T00:00:00Z",
    category: { id: "sub-3-2", name: "Pub Tables", slug: "pub-tables", description: null, image_url: null, parent_id: "cat-3", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-13", name: "Darafeev", slug: "darafeev", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-5", product_id: "prod-5", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop", alt_text: "Darafeev Trestle", is_primary: true, sort_order: 0, created_at: "2024-06-05T00:00:00Z" }],
  },
  {
    id: "prod-6", name: "Holland Bar Stool Swivel Counter Stool", slug: "holland-swivel-counter-stool", description: "Durable commercial-grade swivel bar stool.", category_id: "sub-3-1", brand_id: "brand-16",
    specifications: { "Frame": "Heavy-Duty Steel", "Swivel": "360-Degree", "Weight Capacity": "400 lbs" },
    is_featured: true, status: "active", meta_title: null, meta_description: null, sort_order: 6, created_at: "2024-06-06T00:00:00Z", updated_at: "2024-06-06T00:00:00Z",
    category: { id: "sub-3-1", name: "Bar Stools", slug: "bar-stools", description: null, image_url: null, parent_id: "cat-3", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-16", name: "Holland Bar Stool Co.", slug: "holland-bar-stool", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-6", product_id: "prod-6", image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop", alt_text: "Holland Swivel Stool", is_primary: true, sort_order: 0, created_at: "2024-06-06T00:00:00Z" }],
  },
  {
    id: "prod-7", name: "Presidential Billiards Hamilton", slug: "presidential-hamilton", description: "Classic elegance with solid hardwood construction.", category_id: "sub-1-1", brand_id: "brand-5",
    specifications: { "Table Size": "8 Foot", "Slate": '1" Italian Slate', "Cushions": "K-66" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 7, created_at: "2024-06-07T00:00:00Z", updated_at: "2024-06-07T00:00:00Z",
    category: { id: "sub-1-1", name: "Billiard Tables", slug: "billiard-tables", description: null, image_url: null, parent_id: "cat-1", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-5", name: "Presidential Billiards", slug: "presidential-billiards", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-7", product_id: "prod-7", image_url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=600&h=400&fit=crop&q=75", alt_text: "Presidential Hamilton", is_primary: true, sort_order: 0, created_at: "2024-06-07T00:00:00Z" }],
  },
  {
    id: "prod-8", name: "Tornado Classic Foosball Table", slug: "tornado-classic-foosball", description: "Tournament standard foosball table.", category_id: "sub-2-2", brand_id: "brand-21",
    specifications: { "Type": "Tournament Grade", "Players": "Counterbalanced" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 8, created_at: "2024-06-08T00:00:00Z", updated_at: "2024-06-08T00:00:00Z",
    category: { id: "sub-2-2", name: "Arcade Games", slug: "arcade-games", description: null, image_url: null, parent_id: "cat-2", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-21", name: "Tornado", slug: "tornado", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-8", product_id: "prod-8", image_url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop&q=75", alt_text: "Tornado Classic", is_primary: true, sort_order: 0, created_at: "2024-06-08T00:00:00Z" }],
  },
  {
    id: "prod-9", name: "Viper Shot King Bristle Dartboard", slug: "viper-shot-king-dartboard", description: "Premium sisal bristle dartboard.", category_id: "sub-2-2", brand_id: "brand-23",
    specifications: { "Type": "Bristle (Sisal)", "Diameter": '18"' },
    is_featured: false, status: "draft", meta_title: null, meta_description: null, sort_order: 9, created_at: "2024-06-09T00:00:00Z", updated_at: "2024-06-09T00:00:00Z",
    category: { id: "sub-2-2", name: "Arcade Games", slug: "arcade-games", description: null, image_url: null, parent_id: "cat-2", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-23", name: "Viper", slug: "viper", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-9", product_id: "prod-9", image_url: "https://images.unsplash.com/photo-1617883861744-13b534e1757a?w=600&h=400&fit=crop", alt_text: "Viper Shot King", is_primary: true, sort_order: 0, created_at: "2024-06-09T00:00:00Z" }],
  },
  {
    id: "prod-10", name: "Hudson Grand Shuffleboard 14'", slug: "hudson-grand-shuffleboard", description: "Stunning 14-foot shuffleboard table.", category_id: "sub-2-2", brand_id: "brand-24",
    specifications: { "Length": "14 Feet", "Surface": "Polymer-Coated" },
    is_featured: true, status: "active", meta_title: null, meta_description: null, sort_order: 10, created_at: "2024-06-10T00:00:00Z", updated_at: "2024-06-10T00:00:00Z",
    category: { id: "sub-2-2", name: "Arcade Games", slug: "arcade-games", description: null, image_url: null, parent_id: "cat-2", sort_order: 2, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-24", name: "Hudson Shuffleboard", slug: "hudson-shuffleboard", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-10", product_id: "prod-10", image_url: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=600&h=400&fit=crop", alt_text: "Hudson Grand", is_primary: true, sort_order: 0, created_at: "2024-06-10T00:00:00Z" }],
  },
  {
    id: "prod-11", name: 'RAM Game Room 84" Home Bar', slug: "ram-home-bar", description: "The ultimate entertainment zone bar.", category_id: "sub-3-1", brand_id: "brand-17",
    specifications: { "Width": "84 inches", "Material": "Solid Hardwood" },
    is_featured: false, status: "active", meta_title: null, meta_description: null, sort_order: 11, created_at: "2024-06-11T00:00:00Z", updated_at: "2024-06-11T00:00:00Z",
    category: { id: "sub-3-1", name: "Bar Stools", slug: "bar-stools", description: null, image_url: null, parent_id: "cat-3", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-17", name: "RAM Game Room", slug: "ram-game-room", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-11", product_id: "prod-11", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=85", alt_text: "RAM Home Bar", is_primary: true, sort_order: 0, created_at: "2024-06-11T00:00:00Z" }],
  },
  {
    id: "prod-12", name: "Callee Bailey Spectator Chair", slug: "callee-bailey-spectator-chair", description: "Extra-tall spectator chair for game room viewing.", category_id: "sub-3-1", brand_id: "brand-15",
    specifications: { "Seat Height": "34 inches", "Frame": "Heavy-Gauge Steel" },
    is_featured: false, status: "draft", meta_title: null, meta_description: null, sort_order: 12, created_at: "2024-06-12T00:00:00Z", updated_at: "2024-06-12T00:00:00Z",
    category: { id: "sub-3-1", name: "Bar Stools", slug: "bar-stools", description: null, image_url: null, parent_id: "cat-3", sort_order: 1, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    brand: { id: "brand-15", name: "Callee", slug: "callee", logo_url: null, website_url: null, created_at: "2024-01-01T00:00:00Z" },
    images: [{ id: "img-12", product_id: "prod-12", image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&q=85", alt_text: "Callee Bailey Chair", is_primary: true, sort_order: 0, created_at: "2024-06-12T00:00:00Z" }],
  },
]

export const ADMIN_MOCK_INQUIRIES: Inquiry[] = [
  { id: "inq-1", name: "John Smith", email: "john@example.com", phone: "2605551234", message: "I'm interested in the Olhausen Americana II pool table. What finishes are available and do you offer delivery to Angola, IN?", product_ids: ["prod-1"], is_read: false, is_archived: false, created_at: "2024-12-10T14:30:00Z" },
  { id: "inq-2", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "2605559876", message: "Looking for a shuffleboard table for our basement. Can you tell me about the Hudson Grand? We'd need delivery and setup.", product_ids: ["prod-10"], is_read: false, is_archived: false, created_at: "2024-12-09T10:15:00Z" },
  { id: "inq-3", name: "Mike Davis", email: "mdavis@company.com", phone: null, message: "We're outfitting a new break room at our office and need a foosball table and a dartboard. Do you offer commercial pricing for businesses?", product_ids: ["prod-8", "prod-9"], is_read: false, is_archived: false, created_at: "2024-12-08T16:45:00Z" },
  { id: "inq-4", name: "Lisa Chen", email: "lisa.chen@gmail.com", phone: "5745558899", message: "I want to buy a pinball machine as a birthday gift for my husband. He loves rock music - is the Stern Rush still available?", product_ids: ["prod-3"], is_read: true, is_archived: false, created_at: "2024-12-05T09:00:00Z" },
  { id: "inq-5", name: "Robert Williams", email: "rwilliams@yahoo.com", phone: "2605553344", message: "Do you carry any pool table lights? I bought a table from you last year and need proper lighting. Also interested in a pub table.", product_ids: ["prod-5"], is_read: true, is_archived: false, created_at: "2024-12-01T11:30:00Z" },
]

export const ADMIN_MOCK_BANNERS: HeroBanner[] = [
  { id: "banner-1", title: "Premium Pool Tables", subtitle: "Fort Wayne's #1 Selection", image_url: "https://images.unsplash.com/photo-1611068661807-8e265276fbf4?w=1200&h=500&fit=crop", cta_text: "Shop Billiards", cta_link: "/billiards", sort_order: 1, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "banner-2", title: "Game Room Furniture", subtitle: "Complete Your Space", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=500&fit=crop", cta_text: "Shop Furniture", cta_link: "/furniture", sort_order: 2, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "banner-3", title: "Pinball & Arcade", subtitle: "Bring the Fun Home", image_url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=500&fit=crop", cta_text: "Shop Games", cta_link: "/games", sort_order: 3, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "banner-4", title: "Holiday Specials", subtitle: "Limited Time Offers", image_url: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?w=1200&h=500&fit=crop", cta_text: "Learn More", cta_link: "/contact", sort_order: 4, is_active: true, created_at: "2024-01-01T00:00:00Z" },
]

export const ADMIN_MOCK_TESTIMONIALS: Testimonial[] = [
  { id: "test-1", author_name: "Mike R.", content: "Best pool table selection in Fort Wayne. The staff really knows their stuff and helped us pick the perfect table for our basement.", rating: 5, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "test-2", author_name: "Sarah T.", content: "We bought a shuffleboard table and bar stools. The quality is outstanding and the delivery was free! Highly recommend.", rating: 5, is_active: true, created_at: "2024-02-01T00:00:00Z" },
  { id: "test-3", author_name: "David L.", content: "Had our pool table recovered and it looks brand new. Great service at a fair price. Will definitely use them again.", rating: 5, is_active: true, created_at: "2024-03-01T00:00:00Z" },
  { id: "test-4", author_name: "Jennifer K.", content: "Bought a pinball machine for our game room. Ace had the best prices and the team was so helpful with setup.", rating: 4, is_active: false, created_at: "2024-04-01T00:00:00Z" },
]

export const ADMIN_MOCK_FAQ: FaqEntry[] = [
  { id: "faq-1", question: "Does Ace Game Room do services on pool tables?", answer: "Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers.", category: null, sort_order: 1, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "faq-2", question: "What brands of pool tables do you carry?", answer: "We proudly carry Olhausen Billiards, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards pool tables.", category: null, sort_order: 2, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "faq-3", question: "Do you offer financing?", answer: "Yes! We offer Wells Fargo financing. Buy today, pay over time with convenient monthly payments.", category: null, sort_order: 3, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "faq-4", question: "Do you deliver and install?", answer: "Yes, we offer free delivery and installation on qualifying purchases.", category: null, sort_order: 4, is_active: true, created_at: "2024-01-01T00:00:00Z" },
  { id: "faq-5", question: "What are your hours?", answer: "We are open Monday through Saturday from 10:00 AM to 6:00 PM. We are closed on Sundays.", category: null, sort_order: 5, is_active: true, created_at: "2024-01-01T00:00:00Z" },
]

export const ADMIN_MOCK_LEAGUES: LeagueEvent[] = [
  { id: "league-1", league_type: "pool", title: "Wednesday Night 8-Ball League", event_date: "2025-01-15", event_time: "19:00", description: "Weekly 8-ball tournament. All skill levels welcome.", location: "Ace Game Room Gallery", created_at: "2024-01-01T00:00:00Z" },
  { id: "league-2", league_type: "pool", title: "Saturday 9-Ball Open", event_date: "2025-01-18", event_time: "14:00", description: "Open 9-ball competition. Cash prizes for top 3.", location: "Ace Game Room Gallery", created_at: "2024-01-01T00:00:00Z" },
  { id: "league-3", league_type: "dart", title: "Thursday Night Dart League", event_date: "2025-01-16", event_time: "18:30", description: "Weekly dart league. Teams of 4.", location: "Ace Game Room Gallery", created_at: "2024-01-01T00:00:00Z" },
  { id: "league-4", league_type: "dart", title: "Monthly Cricket Championship", event_date: "2025-02-01", event_time: "13:00", description: "Monthly cricket dart tournament.", location: "Ace Game Room Gallery", created_at: "2024-01-01T00:00:00Z" },
]

export const ADMIN_MOCK_CONTENT: SiteContent[] = [
  { id: "content-1", section_key: "about_story", title: "Our Story", content: "Ace Game Room Gallery was established in 1992 as a coin-operated amusement supplier serving local businesses with pool tables, pinball machines, video games, and jukeboxes. Two years later, founder Bret Almashie expanded the business model to include retail sales.", updated_at: "2024-01-01T00:00:00Z" },
  { id: "content-2", section_key: "why_shop", title: "Why Shop at ACE?", content: "ACE Game Room sells more pool tables than all of the surrounding competition combined. We're the experts! With over 25 years of experience in the industry.", updated_at: "2024-01-01T00:00:00Z" },
  { id: "content-3", section_key: "services_billiard", title: "Billiard Services", content: "Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables.", updated_at: "2024-01-01T00:00:00Z" },
  { id: "content-4", section_key: "services_pinball", title: "Pinball Services", content: "Professional pinball machine maintenance and repair services.", updated_at: "2024-01-01T00:00:00Z" },
  { id: "content-5", section_key: "services_playset", title: "Playset Services", content: "Installation and maintenance for Rainbow Play Systems residential and commercial playsets.", updated_at: "2024-01-01T00:00:00Z" },
]
