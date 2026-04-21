// Mock product catalog for Ace Game Room Gallery.
// Imagery is sourced directly from acegameroom.com's public product pages.

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

// Admin variants used by the localStorage-backed admin UI
export interface ADMIN_MOCK_TESTIMONIAL_ITEM {
  id: string
  author_name: string
  content: string
  rating: number
  is_active: boolean
  created_at: string
  role?: string
  city?: string
}

// Short alias used by legacy mock helpers
const ACE = "http://www.acegameroom.com/store/content/images/thumbs"

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "cat-billiards",
    name: "Billiards",
    slug: "billiards",
    description:
      "Premium pool tables, cloth, cues, cases, lighting, and accessories. Olhausen, Valley, C.L. Bailey, Plank & Hide, and every major cue brand — curated, installed, guaranteed.",
    imageUrl: `${ACE}/0003231_billiard-tables_450.png`,
    children: [
      { id: "sub-b-tables", name: "Billiard Tables", slug: "billiard-tables", imageUrl: `${ACE}/0003231_billiard-tables_450.png` },
      { id: "sub-b-cloth", name: "Billiard Cloth", slug: "billiard-cloth", imageUrl: `${ACE}/0003230_billiard-cloth_450.jpeg` },
      { id: "sub-b-cues", name: "Cues", slug: "cues", imageUrl: `${ACE}/0003238_cues_450.jpeg` },
      { id: "sub-b-cases", name: "Cases", slug: "cases", imageUrl: `${ACE}/0003235_cases_450.jpeg` },
      { id: "sub-b-light", name: "Lighting", slug: "lighting", imageUrl: `${ACE}/0003223_lighting_450.jpeg` },
      { id: "sub-b-acc", name: "Accessories", slug: "accessories", imageUrl: `${ACE}/0003221_accessories_450.jpeg` },
    ],
  },
  {
    id: "cat-games",
    name: "Games",
    slug: "games",
    description:
      "Pinball machines from Stern and Jersey Jack. Arcade cabinets new and classic. Foosball, air hockey, dome hockey, ping pong, darts, bumper pool, shuffleboard, jukeboxes. If it plays, we probably have it.",
    imageUrl: `${ACE}/0003132_arcade-games_450.jpeg`,
    children: [
      { id: "sub-g-pinball", name: "Pinball", slug: "pinball", imageUrl: `${ACE}/0003115_pinball-machines_450.png` },
      { id: "sub-g-arcade", name: "Arcade Games", slug: "arcade-games", imageUrl: `${ACE}/0003132_arcade-games_450.jpeg` },
      { id: "sub-g-foos", name: "Foosball", slug: "foosball", imageUrl: `${ACE}/0003116_foosball_450.png` },
      { id: "sub-g-dome", name: "Dome Hockey", slug: "dome-hockey", imageUrl: `${ACE}/0003133_dome-hockey_450.jpeg` },
      { id: "sub-g-ping", name: "Ping Pong", slug: "ping-pong", imageUrl: `${ACE}/0003273_ping-pong_450.jpeg` },
      { id: "sub-g-darts", name: "Darts & Dartboards", slug: "darts", imageUrl: `${ACE}/0003130_darts-and-dartboards_450.jpeg` },
      { id: "sub-g-shuffle", name: "Shuffleboard Tables", slug: "shuffleboard", imageUrl: `${ACE}/0006595_cl-bailey_450.jpeg` },
      { id: "sub-g-jukebox", name: "Jukeboxes", slug: "jukebox", imageUrl: `${ACE}/0003132_arcade-games_450.jpeg` },
    ],
  },
  {
    id: "cat-furniture",
    name: "Furniture",
    slug: "furniture",
    description:
      "Hand-rubbed wood bars, solid maple bar stools, pub tables, poker tables, and the kind of game chairs your back wishes it had. Darafeev, American Heritage, Holland Bar Stool Co., and more.",
    imageUrl: `${ACE}/0003121_bars_450.png`,
    children: [
      { id: "sub-f-bars", name: "Bars", slug: "bars", imageUrl: `${ACE}/0003121_bars_450.png` },
      { id: "sub-f-stools", name: "Bar Stools", slug: "bar-stools", imageUrl: `${ACE}/0003122_bar-stools_450.jpeg` },
      { id: "sub-f-pub", name: "Pub Tables", slug: "pub-tables", imageUrl: `${ACE}/0003123_pub-tables_450.png` },
      { id: "sub-f-chairs", name: "Game Chairs", slug: "game-chairs", imageUrl: `${ACE}/0003127_game-chairs_450.jpeg` },
      { id: "sub-f-poker", name: "Poker & Game Tables", slug: "poker-tables", imageUrl: `${ACE}/0003124_poker-and-game-tables_450.jpeg` },
      { id: "sub-f-neons", name: "Neon Signs", slug: "neons", imageUrl: `${ACE}/0003368_neons_450.jpeg` },
    ],
  },
  {
    id: "cat-playsets",
    name: "Playsets",
    slug: "playsets",
    description:
      "Rainbow Play Systems cedar playsets — the swingsets built to outlast childhood. Residential and commercial configurations, free delivery and installation on every model.",
    imageUrl: `${ACE}/0003196_residential-playsets_450.jpeg`,
    children: [
      { id: "sub-p-res", name: "Residential Playsets", slug: "residential-playsets", imageUrl: `${ACE}/0003196_residential-playsets_450.jpeg` },
      { id: "sub-p-com", name: "Commercial Playsets", slug: "commercial-playsets", imageUrl: `${ACE}/0003198_commercial-playsets_450.jpeg` },
      { id: "sub-p-acc", name: "Rainbow Accessories", slug: "rainbow-accessories", imageUrl: `${ACE}/0004158_rainbow-accessories_450.jpeg` },
    ],
  },
  {
    id: "cat-outdoor",
    name: "Outdoor",
    slug: "outdoor",
    description:
      "In-ground basketball goals, Springfree trampolines, and outdoor games that turn a backyard into the best place in the neighborhood.",
    imageUrl: `${ACE}/0003129_basketball-goals_450.jpeg`,
    children: [
      { id: "sub-o-hoop", name: "Basketball Goals", slug: "basketball-goals", imageUrl: `${ACE}/0003129_basketball-goals_450.jpeg` },
      { id: "sub-o-tramp", name: "Trampolines", slug: "trampolines", imageUrl: `${ACE}/0003196_residential-playsets_450.jpeg` },
      { id: "sub-o-games", name: "Outdoor Games", slug: "outdoor-games", imageUrl: `${ACE}/0006528_flexrhoop_415.png` },
    ],
  },
  {
    id: "cat-services",
    name: "Services",
    slug: "services",
    description:
      "Delivery, installation, recovering, and repair. A $5,000 pool table deserves more than a drop-off on your driveway.",
    imageUrl: `${ACE}/0003231_billiard-tables_450.png`,
    children: [],
  },
]

// --- PRODUCTS ---
// A curated sampling across every category. Images sourced from acegameroom.com.

export const MOCK_PRODUCTS: MockProduct[] = [
  // ============ BILLIARDS ============
  {
    id: "prod-olhausen-augusta",
    name: "Olhausen Augusta Pool Table",
    slug: "olhausen-americana-ii",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Olhausen",
    imageUrl: `${ACE}/0001358_olhausen-augusta-pool-table_415.png`,
    images: [
      { url: `${ACE}/0001358_olhausen-augusta-pool-table_415.png`, alt: "Olhausen Augusta pool table" },
      { url: `${ACE}/0003231_billiard-tables_450.png`, alt: "Pool table collection" },
      { url: `${ACE}/0003230_billiard-cloth_450.jpeg`, alt: "Championship cloth detail" },
    ],
    description:
      "The Augusta is a classic solid-wood Olhausen with traditional arched cabinet design, tapered legs, and router detail. Built in Portland, Tennessee with American hardwood and Olhausen's exclusive Accu-Fast cushions. The table your grandchildren will rack on.",
    specifications: {
      "Sizes": "7 ft, 8 ft, 8½ ft, 9 ft",
      "Wood": "Maple, Oak, Cherry, or Walnut",
      "Finishes": "All Olhausen finishes available",
      "Cushions": "Accu-Fast",
      "Slate": "Premium 1\" slate",
      "Pockets": "Leather, shield style",
      "Warranty": "Lifetime",
      "Made In": "Portland, TN, USA",
    },
  },
  {
    id: "prod-valley-panther",
    name: "Valley Panther Coin-Op Pool Table",
    slug: "valley-panther-coin-op",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Valley",
    imageUrl: `${ACE}/0003231_billiard-tables_450.png`,
    images: [
      { url: `${ACE}/0003231_billiard-tables_450.png`, alt: "Valley Panther coin-op" },
    ],
    description:
      "The industry standard for tavern and league play. Valley's ball-return mechanism, heavy-duty rails, and bulletproof construction have made the Panther the pool league table of choice for 40+ years. Coin-operated or free-play configurations.",
    specifications: {
      "Sizes": "6½ ft, 7 ft, 8 ft",
      "Play": "Coin-op or Free Play",
      "Slate": "1\" Honed Slate",
      "Cabinet": "Heavy-duty laminate",
      "Cloth": "Championship Tour Edition",
      "Warranty": "Commercial-grade",
      "Made In": "Bay City, MI, USA",
    },
  },
  {
    id: "prod-plank-hide",
    name: "Plank & Hide Isaac Pool Table",
    slug: "plank-hide-isaac",
    categorySlug: "billiards",
    subcategorySlug: "billiard-tables",
    brandName: "Plank & Hide",
    imageUrl: `${ACE}/0007007_plank-hide_450.jpeg`,
    images: [
      { url: `${ACE}/0007007_plank-hide_450.jpeg`, alt: "Plank & Hide" },
    ],
    description:
      "Modern industrial design meets tournament-grade play. Plank & Hide's Isaac blends raw steel, solid wood, and leather into a pool table that looks at home in a converted loft, a finished basement, or the bar downtown.",
    specifications: {
      "Size": "8 ft",
      "Frame": "Solid hardwood + steel",
      "Slate": "1\" 3-piece slate",
      "Cushions": "K-66 profile",
      "Pockets": "Leather drop pockets",
      "Finishes": "Raw steel, blackened, weathered",
    },
  },
  {
    id: "prod-simonis-860",
    name: "Simonis 860 Championship Cloth",
    slug: "simonis-860-cloth",
    categorySlug: "billiards",
    subcategorySlug: "billiard-cloth",
    brandName: "Simonis",
    imageUrl: `${ACE}/0003230_billiard-cloth_450.jpeg`,
    images: [
      { url: `${ACE}/0003230_billiard-cloth_450.jpeg`, alt: "Billiard cloth" },
    ],
    description:
      "The cloth every BCA pro tournament plays on. Simonis 860 worsted weave delivers consistent speed, minimal ball burn, and a lifespan that shames cheap felts. Available in 20+ colors.",
    specifications: {
      "Weave": "Worsted",
      "Weight": "21 oz",
      "Width": "66\" or 76\"",
      "Best For": "Tournament play, serious home setups",
      "Colors": "Simonis Green, Tournament Blue, Burgundy, 17 more",
      "Made In": "Belgium",
    },
  },
  {
    id: "prod-mcdermott-g-series",
    name: "McDermott G-Series Cue",
    slug: "mcdermott-g-series",
    categorySlug: "billiards",
    subcategorySlug: "cues",
    brandName: "McDermott",
    imageUrl: `${ACE}/0003238_cues_450.jpeg`,
    images: [
      { url: `${ACE}/0003238_cues_450.jpeg`, alt: "McDermott cues" },
    ],
    description:
      "American-made cues with a lifetime warranty on the shaft. The G-Series features genuine exotic woods, stainless steel joints, and McDermott's industry-leading G-Core shaft technology. A cue you hand down.",
    specifications: {
      "Shaft": "G-Core low-deflection",
      "Joint": "5/16 x 18 steel",
      "Weight": "18-21 oz adjustable",
      "Wrap": "Irish linen or leather",
      "Warranty": "Lifetime on shaft",
      "Made In": "Menomonee Falls, WI, USA",
    },
  },

  // ============ GAMES ============
  {
    id: "prod-multicade-upright",
    name: "Arcade Classics Multicade — Upright",
    slug: "arcade-classics-multicade-upright",
    categorySlug: "games",
    subcategorySlug: "arcade-games",
    brandName: "Arcade Classics",
    imageUrl: `${ACE}/0002829_arcade-classics-multicade-upright_415.jpeg`,
    images: [
      { url: `${ACE}/0002829_arcade-classics-multicade-upright_415.jpeg`, alt: "Multicade upright" },
    ],
    description:
      "412 classic arcade games in one cabinet. Pac-Man, Galaga, Donkey Kong, Defender, Centipede — every game you lost your quarters to, now playing for free in your basement.",
    specifications: {
      "Games": "412 classic titles",
      "Cabinet": "Full-size upright",
      "Display": "19\" LCD",
      "Controls": "Arcade-grade joystick + 6 buttons per player",
      "Players": "2-player",
      "Dimensions": "67\" H × 26\" W × 30\" D",
    },
  },
  {
    id: "prod-multicade-cocktail",
    name: "Arcade Classics Multicade — Cocktail Table",
    slug: "arcade-classics-multicade-cocktail",
    categorySlug: "games",
    subcategorySlug: "arcade-games",
    brandName: "Arcade Classics",
    imageUrl: `${ACE}/0002828_arcade-classics-multicade-cocktail_415.jpeg`,
    images: [
      { url: `${ACE}/0002828_arcade-classics-multicade-cocktail_415.jpeg`, alt: "Cocktail arcade" },
    ],
    description:
      "The classic sit-down cocktail cabinet, fully loaded. Glass top doubles as a coffee table when not in play. Perfect for game rooms, man caves, and anywhere you want a conversation piece that happens to play Ms. Pac-Man.",
    specifications: {
      "Games": "412 classic titles",
      "Cabinet": "Cocktail / coffee table style",
      "Display": "19\" LCD under glass",
      "Seating": "2-4 players around table",
      "Dimensions": "31\" H × 33\" W × 26\" D",
    },
  },
  {
    id: "prod-big-buck-hunter",
    name: "Big Buck Hunter Reloaded",
    slug: "big-buck-hunter",
    categorySlug: "games",
    subcategorySlug: "arcade-games",
    brandName: "Raw Thrills",
    imageUrl: `${ACE}/0006515_big-buck-hunter_415.jpeg`,
    images: [
      { url: `${ACE}/0006515_big-buck-hunter_415.jpeg`, alt: "Big Buck Hunter" },
    ],
    description:
      "The arcade shooter that made the bar. 40+ hunting locations, bonus games, and two lever-action gun rigs. Commercial-grade cabinet, home-friendly volume control.",
    specifications: {
      "Genre": "Shooting / Hunting",
      "Players": "2-player",
      "Display": "42\" HD LCD",
      "Guns": "Pump-action lever guns × 2",
      "Modes": "Tournament, arcade, free play",
      "Dimensions": "82\" H × 49\" W × 42\" D",
    },
  },
  {
    id: "prod-nfl-blitz",
    name: "NFL Blitz Gold Edition",
    slug: "nfl-blitz-gold-edition",
    categorySlug: "games",
    subcategorySlug: "arcade-games",
    brandName: "Raw Thrills",
    imageUrl: `${ACE}/0006516_nfl-blitz-gold-edition_415.jpeg`,
    images: [
      { url: `${ACE}/0006516_nfl-blitz-gold-edition_415.jpeg`, alt: "NFL Blitz arcade" },
    ],
    description:
      "The fastest football game ever made, officially licensed with every NFL team. 2-player cabinet, steel pedestal, arcade trackball controls. Pure 90s mayhem.",
    specifications: {
      "Genre": "Sports / Football",
      "Players": "2-player",
      "Display": "42\" HD LCD",
      "Controls": "Trackball + buttons",
      "Teams": "Full NFL license",
    },
  },
  {
    id: "prod-spider-2000",
    name: "Spider 2000 Dart Board",
    slug: "spider-2000-dart-board",
    categorySlug: "games",
    subcategorySlug: "darts",
    brandName: "Spider",
    imageUrl: `${ACE}/0007005_spider-2000-dart-board_415.jpeg`,
    images: [
      { url: `${ACE}/0007005_spider-2000-dart-board_415.jpeg`, alt: "Spider 2000 dart board" },
    ],
    description:
      "Tournament-grade electronic dartboard with soft-tip scoring for 37 games, 249 variations, and up to 16 players. Bluetooth connectivity for online league play.",
    specifications: {
      "Type": "Electronic, soft-tip",
      "Games": "37 games / 249 variations",
      "Players": "Up to 16",
      "Connectivity": "Bluetooth, online leagues",
      "Segments": "6-sided micro-thin, self-healing",
    },
  },
  {
    id: "prod-cl-bailey-shuffleboard",
    name: "C.L. Bailey 12' Skylar Shuffleboard",
    slug: "cl-bailey-skylar-shuffleboard",
    categorySlug: "games",
    subcategorySlug: "shuffleboard",
    brandName: "C.L. Bailey",
    imageUrl: `${ACE}/0006604_cl-bailey-12-skylar-shuffleboard_415.jpeg`,
    images: [
      { url: `${ACE}/0006604_cl-bailey-12-skylar-shuffleboard_415.jpeg`, alt: "Skylar shuffleboard" },
      { url: `${ACE}/0006597_cl-bailey-12-viking-shuffleboard_415.jpeg`, alt: "Viking shuffleboard" },
    ],
    description:
      "Solid hardwood shuffleboard with a polymer playing surface that never warps. C.L. Bailey builds the Skylar in Ohio with butcher-block birch, hand-rubbed finish, and climate-adjuster rail system.",
    specifications: {
      "Length": "12 feet",
      "Playing Surface": "Polymer-sealed butcher block",
      "Wood": "Solid birch + hardwood veneer",
      "Finish": "Hand-rubbed satin",
      "Climate System": "Stainless adjusters included",
      "Warranty": "Lifetime on playing surface",
      "Made In": "Ohio, USA",
    },
  },
  {
    id: "prod-level-best-shuffleboard",
    name: "C.L. 9' & 12' Level Best Shuffleboard",
    slug: "cl-level-best-shuffleboard",
    categorySlug: "games",
    subcategorySlug: "shuffleboard",
    brandName: "C.L. Bailey",
    imageUrl: `${ACE}/0006617_cl-9-12-level-best-shuffleboards_415.jpeg`,
    images: [
      { url: `${ACE}/0006617_cl-9-12-level-best-shuffleboards_415.jpeg`, alt: "Level Best shuffleboard" },
    ],
    description:
      "The entry into tournament-grade shuffleboard. 9' for tighter rooms, 12' for the real deal. Butcher-block playing surface, solid wood legs, and the same climate-adjuster system C.L. uses on their premium models.",
    specifications: {
      "Lengths": "9 ft or 12 ft",
      "Surface": "Butcher-block polymer",
      "Frame": "Solid hardwood",
      "Climate Adjusters": "Included",
      "Pucks": "8 pucks + wax included",
    },
  },
  {
    id: "prod-turnbridge-shuffleboard",
    name: "C.L. Bailey 12' & 14' Turnbridge Shuffleboard",
    slug: "cl-bailey-turnbridge",
    categorySlug: "games",
    subcategorySlug: "shuffleboard",
    brandName: "C.L. Bailey",
    imageUrl: `${ACE}/0006611_cl-bailey-12-14-turnbridge-shuffleboard_415.jpeg`,
    images: [
      { url: `${ACE}/0006611_cl-bailey-12-14-turnbridge-shuffleboard_415.jpeg`, alt: "Turnbridge shuffleboard" },
    ],
    description:
      "The flagship. Hand-turned legs, raised cabinet panels, and custom inlay work. If you're building a room around the shuffleboard, this is the one.",
    specifications: {
      "Lengths": "12 ft or 14 ft",
      "Leg Style": "Hand-turned solid hardwood",
      "Surface": "Butcher-block polymer",
      "Finish": "Multiple premium options",
      "Climate Adjusters": "Stainless, included",
    },
  },

  // ============ FURNITURE ============
  {
    id: "prod-arabella-bar",
    name: "Arabella Bar",
    slug: "arabella-bar",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "Darafeev",
    imageUrl: `${ACE}/0005693_arabella-bar_415.jpeg`,
    images: [
      { url: `${ACE}/0005693_arabella-bar_415.jpeg`, alt: "Arabella Bar" },
    ],
    description:
      "A Darafeev signature. Hand-rubbed solid hardwood, corbel accents, brass foot rail, and a top that seats four. Built in Illinois for the home bar that looks like it's always been there.",
    specifications: {
      "Length": "72\"",
      "Wood": "Solid maple or cherry",
      "Finish": "Hand-rubbed — 18 options",
      "Top": "Raised laminate surface",
      "Features": "Brass foot rail, stemware rack",
      "Made In": "Illinois, USA",
    },
  },
  {
    id: "prod-blacksmith-bar",
    name: "Blacksmith Bar",
    slug: "blacksmith-bar",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "Darafeev",
    imageUrl: `${ACE}/0005683_blacksmith-bar_415.jpeg`,
    images: [
      { url: `${ACE}/0005683_blacksmith-bar_415.jpeg`, alt: "Blacksmith Bar" },
    ],
    description:
      "Industrial-meets-craftsman. Forged iron accents, reclaimed-look wood finish, and a front panel with exposed rivets. Built to anchor a game room.",
    specifications: {
      "Length": "84\"",
      "Wood": "Solid hardwood with iron accents",
      "Finish": "Weathered / reclaimed styling",
      "Top": "Solid hardwood",
      "Foot Rail": "Black iron",
    },
  },
  {
    id: "prod-bristol-bar",
    name: "Bristol Bar",
    slug: "bristol-bar",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "Darafeev",
    imageUrl: `${ACE}/0005770_bristol-bar_415.jpeg`,
    images: [
      { url: `${ACE}/0005770_bristol-bar_415.jpeg`, alt: "Bristol Bar" },
    ],
    description:
      "Classic transitional design. Paneled front, crown molding top, integrated wine rack and stemware storage. Works in traditional homes and modern great rooms alike.",
    specifications: {
      "Length": "72\"",
      "Features": "Wine rack, stemware, foot rail",
      "Wood": "Solid maple",
      "Finish": "Choice of 15 finishes",
    },
  },
  {
    id: "prod-caliente-bar",
    name: "Caliente Bar",
    slug: "caliente-bar",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "Darafeev",
    imageUrl: `${ACE}/0005711_caliente-bar_415.jpeg`,
    images: [
      { url: `${ACE}/0005711_caliente-bar_415.jpeg`, alt: "Caliente Bar" },
    ],
    description:
      "Southwestern-inspired bar with copper inlay, distressed finish, and a back that doubles as a display shelf. One of Darafeev's bestsellers.",
    specifications: {
      "Length": "84\"",
      "Inlay": "Copper accents",
      "Style": "Southwestern / Rustic",
      "Features": "Display back shelf, foot rail",
    },
  },
  {
    id: "prod-angelina-wine-cabinet",
    name: "Angelina Wine Cabinet",
    slug: "angelina-wine-cabinet",
    categorySlug: "furniture",
    subcategorySlug: "bars",
    brandName: "Darafeev",
    imageUrl: `${ACE}/0005728_angelina-wine-cabinet_415.jpeg`,
    images: [
      { url: `${ACE}/0005728_angelina-wine-cabinet_415.jpeg`, alt: "Angelina Wine Cabinet" },
    ],
    description:
      "Not a bar — a statement. The Angelina stores 36 bottles behind leaded-glass doors, with drop-down serving shelf, stemware storage, and a felted drawer for tools. Finished in your choice of 18 hand-rubbed tones.",
    specifications: {
      "Capacity": "36 bottles",
      "Features": "Drop-down shelf, stemware, tool drawer",
      "Doors": "Leaded glass",
      "Wood": "Solid cherry or maple",
    },
  },

  // ============ PLAYSETS ============
  {
    id: "prod-rainbow-residential",
    name: "Rainbow Play Systems Residential Playset",
    slug: "rainbow-residential-playset",
    categorySlug: "playsets",
    subcategorySlug: "residential-playsets",
    brandName: "Rainbow Play Systems",
    imageUrl: `${ACE}/0003196_residential-playsets_450.jpeg`,
    images: [
      { url: `${ACE}/0003196_residential-playsets_450.jpeg`, alt: "Rainbow residential" },
      { url: `${ACE}/0004223_10-wave-slide_415.jpeg`, alt: "Wave slide" },
      { url: `${ACE}/0005639_10-scoop-slide_415.jpeg`, alt: "Scoop slide" },
    ],
    description:
      "Rainbow's residential swingsets are built from 100% redwood or cedar — no pine, no pressure-treated shortcuts. Every beam, post, and swing is engineered to last through three kids and two neighborhoods. Free delivery + installation across NE Indiana.",
    specifications: {
      "Wood": "100% redwood or cedar",
      "Hardware": "Stainless steel, lag-bolted",
      "Warranty": "Lifetime on wood, 5-yr on hardware",
      "Installation": "Free with purchase",
      "Customization": "100+ accessory options",
      "Made In": "South Dakota, USA",
    },
  },
  {
    id: "prod-rainbow-commercial",
    name: "Rainbow Commercial Playset",
    slug: "rainbow-commercial-playset",
    categorySlug: "playsets",
    subcategorySlug: "commercial-playsets",
    brandName: "Rainbow Play Systems",
    imageUrl: `${ACE}/0003198_commercial-playsets_450.jpeg`,
    images: [
      { url: `${ACE}/0003198_commercial-playsets_450.jpeg`, alt: "Commercial playset" },
    ],
    description:
      "Public-grade playsets for parks, churches, daycares, and neighborhood common areas. Meets ASTM, CPSC, and IPEMA safety standards. Custom layouts, commercial-grade hardware, and engineered shock-absorbing bases.",
    specifications: {
      "Certification": "ASTM, CPSC, IPEMA",
      "Wood": "Commercial-grade cedar",
      "Warranty": "Extended commercial coverage",
      "Custom Design": "Site plans + CAD drawings",
    },
  },
  {
    id: "prod-billy-goat-bridge",
    name: "10' Billy Goat Bridge",
    slug: "billy-goat-bridge",
    categorySlug: "playsets",
    subcategorySlug: "rainbow-accessories",
    brandName: "Rainbow Play Systems",
    imageUrl: `${ACE}/0004293_10-billy-goat-bridge_415.jpeg`,
    images: [
      { url: `${ACE}/0004293_10-billy-goat-bridge_415.jpeg`, alt: "Billy Goat bridge" },
    ],
    description:
      "Connect two playset towers with this rope-and-plank bridge. Hand grips, non-slip treads, and the thrill your kids didn't know they needed.",
    specifications: {
      "Length": "10 feet",
      "Material": "Cedar planks, marine rope",
      "Capacity": "2 kids at once",
      "Weight Limit": "150 lbs",
    },
  },
  {
    id: "prod-wave-slide",
    name: "10' Wave Slide",
    slug: "wave-slide",
    categorySlug: "playsets",
    subcategorySlug: "rainbow-accessories",
    brandName: "Rainbow Play Systems",
    imageUrl: `${ACE}/0004223_10-wave-slide_415.jpeg`,
    images: [
      { url: `${ACE}/0004223_10-wave-slide_415.jpeg`, alt: "Wave slide" },
    ],
    description:
      "UV-stabilized polymer slide with the classic wave profile. Fits 4' to 6' deck heights. Available in 10 colors.",
    specifications: {
      "Length": "10 feet",
      "Deck Height": "4-6 feet",
      "Material": "UV-stabilized polymer",
      "Colors": "10 options",
    },
  },

  // ============ OUTDOOR ============
  {
    id: "prod-goalsetter-allstar",
    name: "Goalsetter All-Star 54\" In-Ground Basketball Goal",
    slug: "goalsetter-allstar-54",
    categorySlug: "outdoor",
    subcategorySlug: "basketball-goals",
    brandName: "Goalsetter",
    imageUrl: `${ACE}/0002962_goalsetter-all-star-54-x-36-in-ground-basketball-goal_415.jpeg`,
    images: [
      { url: `${ACE}/0002962_goalsetter-all-star-54-x-36-in-ground-basketball-goal_415.jpeg`, alt: "Goalsetter All-Star" },
    ],
    description:
      "54\" × 36\" tempered glass backboard on a steel-reinforced in-ground pole. The same American-made goal parks and driveways across the Midwest have trusted for 30 years.",
    specifications: {
      "Backboard": "54\" × 36\" tempered glass",
      "Rim": "Breakaway pro flex",
      "Pole": "Steel, in-ground",
      "Adjustment": "6'6\" to 10' via crank",
      "Warranty": "Lifetime",
      "Made In": "Iowa, USA",
    },
  },
  {
    id: "prod-goalsetter-captain",
    name: "Goalsetter Captain 60\" In-Ground Basketball Goal",
    slug: "goalsetter-captain-60",
    categorySlug: "outdoor",
    subcategorySlug: "basketball-goals",
    brandName: "Goalsetter",
    imageUrl: `${ACE}/0002956_goalsetter-captain-60-x-38-in-ground-basketball-goal_415.jpeg`,
    images: [
      { url: `${ACE}/0002956_goalsetter-captain-60-x-38-in-ground-basketball-goal_415.jpeg`, alt: "Goalsetter Captain" },
    ],
    description:
      "60\" × 38\" tempered glass with an even beefier pole and bracket system. The Captain is regulation-size and strong enough for dunk-heavy driveway sessions.",
    specifications: {
      "Backboard": "60\" × 38\" tempered glass",
      "Rim": "Breakaway HD",
      "Pole": "6\" square steel",
      "Adjustment": "6'6\" to 10'",
      "Warranty": "Lifetime",
    },
  },
  {
    id: "prod-flexrhoop",
    name: "FlexRHoop Wall-Mount Basketball Goal",
    slug: "flexrhoop",
    categorySlug: "outdoor",
    subcategorySlug: "outdoor-games",
    brandName: "FlexR",
    imageUrl: `${ACE}/0006528_flexrhoop_415.png`,
    images: [
      { url: `${ACE}/0006528_flexrhoop_415.png`, alt: "FlexRHoop" },
    ],
    description:
      "Wall-mounted basketball goal with a flex-rim design. Great for pole barns, garages, and anywhere you can't sink a pole.",
    specifications: {
      "Mount": "Wall / Pole barn",
      "Backboard": "Fan-shaped composite",
      "Rim": "Flex breakaway",
      "Adjustment": "Fixed 10'",
    },
  },
]

// ---------------------------------------------------------------
// Admin seed data — mirrors the structure used by admin-storage.ts
// ---------------------------------------------------------------

export const ADMIN_MOCK_PRODUCTS = MOCK_PRODUCTS.map((p, idx) => {
  const cat = MOCK_CATEGORIES.find((c) => c.slug === p.categorySlug)
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category_id: cat?.id ?? "",
    brand_id: null as string | null,
    // Convenience fields used by the admin UI on top of the canonical schema
    category_slug: p.categorySlug,
    category_name: cat?.name ?? "",
    brand_name: p.brandName,
    image_url: p.imageUrl,
    status: "active" as const,
    is_featured: idx < 6,
    specifications: p.specifications,
    meta_title: null as string | null,
    meta_description: null as string | null,
    sort_order: idx,
    created_at: new Date(Date.now() - idx * 86_400_000).toISOString(),
    updated_at: new Date(Date.now() - idx * 3_600_000).toISOString(),
  }
})

export const ADMIN_MOCK_INQUIRIES = [
  {
    id: "inq-1",
    name: "Mike Reynolds",
    email: "mike.r@example.com",
    phone: "(260) 555-0142",
    message:
      "Looking for an 8-foot Olhausen for my new basement. Can you quote delivery to 46835?",
    product_ids: ["prod-olhausen-augusta"],
    product_interest: "Olhausen Augusta",
    is_read: false,
    is_archived: false,
    created_at: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  },
  {
    id: "inq-2",
    name: "Sarah Thompson",
    email: "sarah.t@example.com",
    phone: "(260) 555-0199",
    message:
      "Hi! Interested in the Arabella bar + 6 stools. Do you do bundle pricing?",
    product_ids: ["prod-arabella-bar"],
    product_interest: "Arabella Bar",
    is_read: false,
    is_archived: false,
    created_at: new Date(Date.now() - 14 * 3_600_000).toISOString(),
  },
  {
    id: "inq-3",
    name: "Dave Lehman",
    email: "dave@example.com",
    phone: "(260) 555-0167",
    message:
      "Have a 25-year-old Brunswick that needs recovering. Can you come take a look?",
    product_ids: [],
    product_interest: "Services",
    is_read: true,
    is_archived: false,
    created_at: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
]

export const ADMIN_MOCK_BANNERS = [
  {
    id: "ban-1",
    title: "Free Delivery & Install",
    subtitle: "On qualifying Springfree trampolines",
    image_url: `${ACE}/0003196_residential-playsets_450.jpeg`,
    cta_text: "Shop Trampolines",
    cta_link: "/outdoor",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ban-2",
    title: "New Stern Pinball In Stock",
    subtitle: "Rush, Led Zeppelin, Foo Fighters",
    image_url: `${ACE}/0003115_pinball-machines_450.png`,
    cta_text: "Browse Pinball",
    cta_link: "/games",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ban-3",
    title: "Rainbow Play Systems",
    subtitle: "Built to outlast childhood",
    image_url: `${ACE}/0003196_residential-playsets_450.jpeg`,
    cta_text: "Shop Playsets",
    cta_link: "/playsets",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export const ADMIN_MOCK_TESTIMONIALS: ADMIN_MOCK_TESTIMONIAL_ITEM[] = [
  {
    id: "tes-1",
    author_name: "Mike R.",
    content:
      "I spent six months shopping online before I walked into ACE. Bret took an hour with me, showed me the difference between slate grades, and I left knowing exactly what I wanted.",
    rating: 5,
    is_active: true,
    role: "Bought a 9ft Olhausen Augusta",
    city: "Fort Wayne, IN",
    created_at: new Date().toISOString(),
  },
  {
    id: "tes-2",
    author_name: "Sarah T.",
    content:
      "We bought a shuffleboard, a bar, six stools, and a neon — all in one afternoon. Free delivery, free install. These guys are who Fort Wayne should be buying from.",
    rating: 5,
    is_active: true,
    role: "Full game room build",
    city: "Fort Wayne, IN",
    created_at: new Date().toISOString(),
  },
  {
    id: "tes-3",
    author_name: "David L.",
    content:
      "I had a 25-year-old Brunswick that needed everything. I thought I'd spend $3,000. I spent $800. Table looks better than when I bought it.",
    rating: 5,
    is_active: true,
    role: "Re-felt & refurb",
    city: "Huntington, IN",
    created_at: new Date().toISOString(),
  },
]

export const ADMIN_MOCK_FAQS = [
  {
    id: "faq-1",
    question: "Does Ace Game Room do services on pool tables?",
    answer:
      "Yes — teardown, moving, setup, and recovering. We also replace broken pockets and rail rubbers. We do not repair damaged wood.",
    category: "Services",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "faq-2",
    question: "What brands of pool tables do you carry?",
    answer:
      "Olhausen, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards. All American-made premium brands.",
    category: "Billiards",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "faq-3",
    question: "Do you offer financing?",
    answer:
      "Yes! We offer Wells Fargo financing. Buy today, pay over time with convenient monthly payments.",
    category: "Purchasing",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "faq-4",
    question: "Do you deliver and install?",
    answer:
      "Yes — free delivery and installation on qualifying purchases across NE Indiana.",
    category: "Services",
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "faq-5",
    question: "What are your hours?",
    answer:
      "Monday through Saturday, 10:00 AM – 6:00 PM. Closed Sundays.",
    category: "General",
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export const ADMIN_MOCK_CONTENT = {
  hero_title: "A pool table isn't furniture. It's the heart of a home.",
  hero_subtitle:
    "For 32 years, Fort Wayne's families have come to ACE not to buy a game — but to build the room where their family gathers.",
  about_story:
    "Ace Game Room Gallery was established in 1992 as a coin-operated amusement supplier serving local businesses. Two years later, founder Bret Almashie expanded to retail sales, recognizing the community's demand for quality recreational products.",
  why_shop:
    "ACE Game Room sells more pool tables than all of the surrounding competition combined. With over 25 years of experience, we help you find the table that matches your style and budget.",
  services_billiard:
    "Teardowns, moving, setup, recovering, and pocket/rubber replacement. We do not repair damaged wood.",
  services_pinball:
    "Professional pinball machine maintenance and repair.",
  services_playset:
    "Installation and maintenance for Rainbow Play Systems residential and commercial playsets.",
}

// ---------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------

// Legacy aliases — keep old admin page imports working
export const ADMIN_MOCK_FAQ = ADMIN_MOCK_FAQS
export const ADMIN_MOCK_CATEGORIES = MOCK_CATEGORIES.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  description: c.description,
  image_url: c.imageUrl,
  parent_id: null as string | null,
  sort_order: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}))
export const ADMIN_MOCK_BRANDS = [
  "Olhausen", "Valley", "C.L. Bailey", "Plank & Hide", "Championship",
  "Simonis", "McDermott", "Lucasi", "Viking", "Predator", "Players",
  "Cuetec", "Jacoby", "Joss", "Valhalla", "Darafeev", "American Heritage",
  "Callee", "Holland Bar Stool", "H.J. Scott", "RAM Game Room", "Z-Lite",
  "Rainbow Play Systems", "Springfree", "Presidential Billiards", "Goalsetter",
  "Arcade Classics",
].map((name, i) => ({
  id: `brand-${i + 1}`,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  logo_url: null as string | null,
  website_url: null as string | null,
  created_at: new Date().toISOString(),
}))

export function getCategoryBySlug(slug: string): MockCategory | undefined {
  return MOCK_CATEGORIES.find((c) => c.slug === slug)
}

export function getProductsByCategory(categorySlug: string): MockProduct[] {
  return MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(
  categorySlug: string,
  excludeSlug?: string,
  limit = 3,
): MockProduct[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.slug !== excludeSlug,
  ).slice(0, limit)
}
