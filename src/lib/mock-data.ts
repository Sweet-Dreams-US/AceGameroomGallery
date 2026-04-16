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
