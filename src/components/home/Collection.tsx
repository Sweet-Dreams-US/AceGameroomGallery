import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BRAND_IMAGES } from "@/lib/brand-images"

const CATEGORIES = [
  {
    name: "Billiards",
    slug: "billiards",
    tagline: "Tables, cues, cloth, and lighting.",
    image: BRAND_IMAGES.heroShowroom,
  },
  {
    name: "Games",
    slug: "games",
    tagline: "Pinball, arcade, shuffleboard, and more.",
    image: BRAND_IMAGES.pinballArcade,
  },
  {
    name: "Furniture",
    slug: "furniture",
    tagline: "Bars, stools, and pub tables.",
    image: BRAND_IMAGES.barFurniture,
  },
  {
    name: "Playsets",
    slug: "playsets",
    tagline: "Rainbow Play Systems.",
    image: BRAND_IMAGES.playsetCedar,
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    tagline: "Basketball goals and trampolines.",
    image: BRAND_IMAGES.outdoorRecreation,
  },
  {
    name: "Services",
    slug: "services",
    tagline: "Delivery, install, and repair.",
    image: BRAND_IMAGES.cuesDisplay,
  },
]

/** Six category tiles sized to fit one screen, below the fixed nav. */
export function Collection() {
  return (
    <section className="bg-[#ebe4d6] h-[calc(100svh-5rem)] lg:h-[calc(100svh-6rem)] min-h-[560px] max-h-[1000px] py-6 lg:py-8 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-10 flex-1 min-h-0 flex flex-col">
        <div className="flex items-end justify-between gap-6 mb-4 lg:mb-6">
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] leading-none">
            Browse by <span className="gold-gradient-text italic">category.</span>
          </h2>
          <p className="hidden md:block text-[#6b655e] font-light">
            Find yours, then come see it in person.
          </p>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-3 lg:gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group relative block overflow-hidden min-h-0"
            >
              <Image
                src={category.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612]/85 via-[#1a1612]/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-6 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-playfair text-xl lg:text-4xl font-bold text-white leading-tight">
                    {category.name}
                  </h3>
                  <p className="hidden sm:block text-sm text-[#e9c46a] italic mt-1">{category.tagline}</p>
                </div>
                <span className="hidden sm:flex shrink-0 w-10 h-10 rounded-full border border-white/60 items-center justify-center text-white group-hover:bg-[#d4a843] group-hover:border-[#d4a843] group-hover:text-[#1a1612] transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
