import { Hero } from "@/components/home/Hero"
import { Mantra } from "@/components/home/Mantra"
import { Manifesto } from "@/components/home/Manifesto"
import { Pillars } from "@/components/home/Pillars"
import { InsideAce } from "@/components/home/InsideAce"
import { Collection } from "@/components/home/Collection"
import { Testimonials } from "@/components/home/Testimonials"
import { BrandPartners } from "@/components/home/BrandPartners"
import { ShowroomCta } from "@/components/home/ShowroomCta"
import { FinalCta } from "@/components/home/FinalCta"

/**
 * Homepage section sequence — designed as alternating moods, not one
 * long beige scroll. Each block carries its own theme so the page reads
 * like a magazine spread:
 *
 *   Hero        — cinematic dark cinematic photo with overlay
 *   Mantra      — felt-green, editorial italic, gold-script accent
 *   Pillars     — cream paper, three big pillars
 *   Manifesto   — CRIMSON. Bold magazine numbered list, industrial type
 *   InsideAce   — warm paper, eight-feature grid
 *   Collection  — deeper cream, big category cards
 *   Testimonials— PURE BLACK with art-book italic quote
 *   BrandPartners — black ribbon, marquee
 *   ShowroomCta — warm paper, visit info
 *   FinalCta    — dark, hand-painted ACE watermark
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Mantra />
      <Pillars />
      <Manifesto />
      <InsideAce />
      <Collection />
      <Testimonials />
      <BrandPartners />
      <ShowroomCta />
      <FinalCta />
    </>
  )
}
