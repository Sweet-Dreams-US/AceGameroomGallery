/**
 * What Ace carries, by category. This describes product types and brands
 * rather than individual items, so it only needs editing when Ace adds or
 * drops a brand or product type — not when stock changes.
 *
 * A category listed here gets the showcase page. Any other category still
 * uses the older product grid in app/(public)/[category]/page.tsx.
 */

import { BRAND_IMAGES } from "./brand-images"

const ACE_THUMBS = "https://www.acegameroom.com/store/content/images/thumbs"

export interface ShowcaseType {
  /** Used as the page anchor, e.g. /billiards#cues */
  slug: string
  name: string
  image: string
  imageAlt: string
  /** One or two sentences. Avoid details that go stale, like prices or stock. */
  blurb: string
  /** Leave empty to hide the "Brands we carry" list. */
  brands: string[]
  /** Adds "and more" after the brand list. */
  moreBrands?: boolean
  /** Short notes shown as a list, e.g. what's included in the type. */
  highlights?: string[]
}

export interface CategoryShowcase {
  /** Name used in the contact form's "interest" dropdown. */
  interest: string
  eyebrow: string
  headline: string
  headlineAccent: string
  intro: string
  heroImage: string
  heroImageAlt: string
  /** CSS object-position, for keeping the subject in frame. Defaults to center. */
  heroImagePosition?: string
  types: ShowcaseType[]
  /** Leave out for categories with no related services. */
  services?: {
    heading: string
    items: string[]
  }
}

export const CATEGORY_SHOWCASES: Record<string, CategoryShowcase> = {
  billiards: {
    interest: "Billiards",
    eyebrow: "Billiards",
    headline: "Everything for",
    headlineAccent: "your pool room.",
    intro:
      "Pool tables, cloth, cues, cases, lighting, and accessories from brands we know and trust. Selection changes, so call or stop by to see what's on the floor.",
    heroImage: BRAND_IMAGES.heroShowroom,
    heroImageAlt: "Pool table in a warmly lit game room",
    types: [
      {
        slug: "billiard-tables",
        name: "Pool Tables",
        image: `${ACE_THUMBS}/0003231_billiard-tables_450.png`,
        imageAlt: "Wood pool table with red cloth",
        blurb:
          "New and pre-owned tables to suit the room you're building. Bring your room measurements and we'll help you find the right size and style.",
        brands: ["Olhausen", "Valley", "C.L. Bailey", "Plank & Hide"],
        highlights: ["New tables", "Pre-owned tables", "Delivery and setup"],
      },
      {
        slug: "billiard-cloth",
        name: "Billiard Cloth",
        image: `${ACE_THUMBS}/0003230_billiard-cloth_450.jpeg`,
        imageAlt: "Billiard cloth",
        blurb:
          "Give a worn table new life or change its color. Pick your cloth here, and our crew can install it for you.",
        brands: ["Proline", "Championship", "Simonis"],
      },
      {
        slug: "cues",
        name: "Cues",
        image: BRAND_IMAGES.cuesDisplay,
        imageAlt: "Pool cues on display",
        blurb:
          "From a first cue to a serious upgrade. Come in, feel the weight and balance, and find the one that suits your game.",
        brands: [
          "J. Pechauer",
          "McDermott",
          "Lucasi",
          "Viking",
          "Players",
          "Cuetec",
          "Jacoby",
          "Joss",
          "Valhalla",
        ],
        moreBrands: true,
      },
      {
        slug: "cases",
        name: "Cases",
        image: `${ACE_THUMBS}/0003235_cases_450.jpeg`,
        imageAlt: "Pool cue cases",
        blurb:
          "Protect your cue at home or on the way to league night. Ask us which size fits your setup.",
        brands: [],
      },
      {
        slug: "lighting",
        name: "Lighting",
        image: `${ACE_THUMBS}/0003223_lighting_450.jpeg`,
        imageAlt: "Billiard table light",
        blurb:
          "The right light keeps the whole table easy to read and sets the mood for the room.",
        brands: ["RAM Game Room", "Z-Lite", "Holland", "H.J. Scott"],
      },
      {
        slug: "accessories",
        name: "Accessories",
        image: `${ACE_THUMBS}/0003221_accessories_450.jpeg`,
        imageAlt: "Billiard accessories",
        blurb:
          "The everyday pieces that keep your table ready to play, all in one place.",
        brands: [],
        highlights: ["Balls", "Chalk", "Cue tips", "Racks", "Gloves"],
      },
    ],
    services: {
      heading: "We take care of the table, too.",
      items: [
        "Teardown and professional moves",
        "New table setup and leveling",
        "Re-felting",
      ],
    },
  },

  games: {
    interest: "Games",
    eyebrow: "Games",
    headline: "Every kind of",
    headlineAccent: "game night.",
    intro:
      "Pinball, arcade games, foosball, air hockey, ping pong, darts, shuffleboard, and more. Selection changes, so call or stop by to see what's on the floor.",
    heroImage: BRAND_IMAGES.pinballArcade,
    heroImageAlt: "Row of lit pinball machines and arcade cabinets in a dark game room",
    types: [
      {
        slug: "pinball",
        name: "Pinball",
        image: `${ACE_THUMBS}/0003115_pinball-machines_450.png`,
        imageAlt: "Pinball machine",
        blurb:
          "New machines and pre-owned favorites. Come in, play a few, and find the one you'll want in your house.",
        brands: [],
        highlights: ["New pinball", "Pre-owned pinball"],
      },
      {
        slug: "arcade-games",
        name: "Arcade Games",
        image: `${ACE_THUMBS}/0003132_arcade-games_450.jpeg`,
        imageAlt: "Arcade game cabinet",
        blurb: "Bring the arcade home, whether you're after something new or a classic from your childhood.",
        brands: [],
        highlights: ["New arcade games", "Pre-owned arcade games"],
      },
      {
        slug: "foosball",
        name: "Foosball",
        image: `${ACE_THUMBS}/0003116_foosball_450.png`,
        imageAlt: "Foosball table",
        blurb: "A fast, easy game that everyone in the house can play. Ask us which table fits your room.",
        brands: [],
      },
      {
        slug: "air-hockey",
        name: "Air & Dome Hockey",
        image: `${ACE_THUMBS}/0000070_pro-style-8_415.jpeg`,
        imageAlt: "Air hockey table",
        blurb: "Full-size air hockey tables and enclosed dome hockey for quick, competitive games.",
        brands: ["Dynamo"],
        highlights: ["Air hockey", "Dome hockey"],
      },
      {
        slug: "ping-pong",
        name: "Ping Pong",
        image: `${ACE_THUMBS}/0003273_ping-pong_450.jpeg`,
        imageAlt: "Ping pong table",
        blurb: "Tables and the gear to go with them, for the basement, the garage, or wherever you've got room.",
        brands: [],
        highlights: ["Tables", "Accessories"],
      },
      {
        slug: "darts",
        name: "Darts & Dartboards",
        image: `${ACE_THUMBS}/0003130_darts-and-dartboards_450.jpeg`,
        imageAlt: "Dartboard and darts",
        blurb: "Everything for a dart setup at home, from your first board to a league-night upgrade.",
        brands: [],
        highlights: ["Soft tip darts", "Steel tip darts", "Accessories", "Dartboard cabinets"],
      },
      {
        slug: "bumper-pool",
        name: "Bumper Pool",
        image: `${ACE_THUMBS}/0000099_bumper-pool-table-slate_415.jpeg`,
        imageAlt: "Bumper pool table",
        blurb: "All the fun of pool in a smaller footprint, which makes it a great fit for tighter rooms.",
        brands: [],
      },
      {
        slug: "shuffleboard",
        name: "Shuffleboard Tables",
        image: `${ACE_THUMBS}/0006604_cl-bailey-12-skylar-shuffleboard_415.jpeg`,
        imageAlt: "Shuffleboard table",
        blurb: "A centerpiece for a long room. Bring your measurements and we'll help you pick the right length.",
        brands: ["Olhausen", "C.L. Bailey"],
      },
      {
        slug: "jukebox",
        name: "Jukeboxes",
        image: BRAND_IMAGES.productJukebox,
        imageAlt: "Jukebox",
        blurb: "The finishing touch for a game room or home bar. Ask us what's available.",
        brands: [],
      },
    ],
    services: {
      heading: "We keep the games running.",
      items: [
        "Routine pinball maintenance and cleaning",
        "Flipper and coil repair",
        "Display and board diagnostics",
      ],
    },
  },

  furniture: {
    interest: "Furniture",
    eyebrow: "Furniture",
    headline: "Finish the room",
    headlineAccent: "around the game.",
    intro:
      "Bars, bar stools, pub tables, game chairs, poker tables, and neon signs. Selection changes, so call or stop by to see what's on the floor.",
    heroImage: BRAND_IMAGES.barFurniture,
    heroImageAlt: "Curved wood bar with leather bar stools under brass pendant lights",
    types: [
      {
        slug: "bars",
        name: "Bars",
        image: `${ACE_THUMBS}/0003121_bars_450.png`,
        imageAlt: "Home bar",
        blurb: "The piece that turns a game room into a place people stay. We'll help you find one that fits your space.",
        brands: ["Darafeev", "American Heritage"],
      },
      {
        slug: "bar-stools",
        name: "Bar Stools",
        image: `${ACE_THUMBS}/0003122_bar-stools_450.jpeg`,
        imageAlt: "Bar stool",
        blurb: "Come in and sit on a few. Comfort is easier to judge in person than in a photo.",
        brands: ["Callee Furniture", "Darafeev", "Holland Bar Stool Co.", "American Heritage"],
      },
      {
        slug: "pub-tables",
        name: "Pub Tables",
        image: `${ACE_THUMBS}/0003123_pub-tables_450.png`,
        imageAlt: "Pub table",
        blurb: "Somewhere to set a drink and watch the game. A good fit around a pool table or in a smaller room.",
        brands: ["Darafeev", "American Heritage", "Presidential Billiards"],
      },
      {
        slug: "game-chairs",
        name: "Game Chairs & Seating",
        image: `${ACE_THUMBS}/0003127_game-chairs_450.jpeg`,
        imageAlt: "Game chair",
        blurb: "Comfortable seating for long card games and for watching from the side of the table.",
        brands: ["Darafeev", "Presidential Billiards", "American Heritage"],
        highlights: ["Game chairs", "Specialty seating"],
      },
      {
        slug: "poker-tables",
        name: "Poker & Game Tables",
        image: `${ACE_THUMBS}/0003124_poker-and-game-tables_450.jpeg`,
        imageAlt: "Poker table",
        blurb: "A dedicated spot for card night and board games, with room for everyone to pull up a chair.",
        brands: [],
      },
      {
        slug: "neons",
        name: "Neon Signs",
        image: `${ACE_THUMBS}/0003368_neons_450.jpeg`,
        imageAlt: "Neon sign",
        blurb: "Add some color and glow to the wall. Ask us what's in stock.",
        brands: [],
      },
    ],
  },

  playsets: {
    interest: "Playsets",
    eyebrow: "Playsets",
    headline: "Room to climb,",
    headlineAccent: "swing, and play.",
    intro:
      "Rainbow Play Systems for backyards and commercial spaces, plus the accessories to go with them. Stop by or call and we'll help you plan your space.",
    heroImage: BRAND_IMAGES.playsetCedar,
    heroImageAlt: "Wood playsets on a green lawn at golden hour",
    types: [
      {
        slug: "residential-playsets",
        name: "Residential Playsets",
        image: `${ACE_THUMBS}/0003196_residential-playsets_450.jpeg`,
        imageAlt: "Backyard playset",
        blurb: "Playsets for the backyard, in a range of sizes. Tell us about your yard and your kids, and we'll help you choose.",
        brands: ["Rainbow Play Systems"],
      },
      {
        slug: "commercial-playsets",
        name: "Commercial Playsets",
        image: `${ACE_THUMBS}/0003198_commercial-playsets_450.jpeg`,
        imageAlt: "Commercial playset",
        blurb: "Play structures for schools, daycares, and other shared spaces. Ask us about your project.",
        brands: ["Rainbow Play Systems"],
      },
      {
        slug: "rainbow-accessories",
        name: "Rainbow Accessories",
        image: `${ACE_THUMBS}/0004158_rainbow-accessories_450.jpeg`,
        imageAlt: "Playset accessories",
        blurb: "Add to the set you have or replace a worn part. Ask us what works with your model.",
        brands: ["Rainbow Play Systems"],
      },
    ],
    services: {
      heading: "We handle the build, too.",
      items: [
        "Residential and commercial installation",
        "Safety and hardware inspections",
        "Relocations",
      ],
    },
  },

  outdoor: {
    interest: "Outdoor",
    eyebrow: "Outdoor",
    headline: "Make the backyard",
    headlineAccent: "the place to be.",
    intro:
      "Basketball goals, trampolines, and outdoor games for the whole family. Selection changes, so call or stop by to see what we have.",
    heroImage: BRAND_IMAGES.outdoorRecreation,
    heroImageAlt: "Trampoline and basketball goal on a backyard lawn",
    heroImagePosition: "50% 85%",
    types: [
      {
        slug: "basketball-goals",
        name: "Basketball Goals",
        image: `${ACE_THUMBS}/0003129_basketball-goals_450.jpeg`,
        imageAlt: "Basketball goal",
        blurb: "Goals for the driveway or backyard. Ask us which one suits your space and how you play.",
        brands: [],
      },
      {
        slug: "trampolines",
        name: "Trampolines",
        image: `${ACE_THUMBS}/0005665_trampolines_450.jpeg`,
        imageAlt: "Springfree trampoline",
        blurb: "Backyard trampolines in a range of shapes and sizes. Tell us about your yard and we'll help you choose.",
        brands: ["Springfree"],
      },
      {
        slug: "outdoor-games",
        name: "Outdoor Games",
        image: `${ACE_THUMBS}/0006528_flexrhoop_415.png`,
        imageAlt: "Outdoor game",
        blurb: "More ways to keep everyone outside. Ask us what's new this season.",
        brands: [],
      },
    ],
  },
}
