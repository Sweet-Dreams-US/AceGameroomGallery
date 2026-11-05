import { HeroStory } from "@/components/home/HeroStory"
import { Mantra } from "@/components/home/Mantra"
import { Offerings } from "@/components/home/Offerings"
import { Collection } from "@/components/home/Collection"
import { Testimonials } from "@/components/home/Testimonials"
import { BrandPartners } from "@/components/home/BrandPartners"
import { ShowroomCta } from "@/components/home/ShowroomCta"
import { FinalCta } from "@/components/home/FinalCta"

/**
 * Homepage section sequence, with each block carrying its own mood:
 *
 *   HeroStory     — scroll film: showroom → felt → playset, three text panels
 *   Mantra        — slim felt-green word rail tied to scroll
 *   Offerings     — CRIMSON. Big type index of what Ace offers, with a large photo
 *   Collection    — cream, six category tiles that fit one screen
 *   Testimonials  — black, scrolling band of Google review summaries
 *   BrandPartners — black ribbon, marquee
 *   ShowroomCta   — warm paper, visit info
 *   FinalCta      — dark, hand-painted ACE watermark
 */
export default function HomePage() {
  return (
    <>
      <HeroStory />
      <Mantra />
      <Offerings />
      <Collection />
      <Testimonials />
      <BrandPartners />
      <ShowroomCta />
      <FinalCta />
    </>
  )
}
