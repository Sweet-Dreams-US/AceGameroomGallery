import { Hero } from "@/components/home/Hero"
import { Mantra } from "@/components/home/Mantra"
import { Pillars } from "@/components/home/Pillars"
import { InsideAce } from "@/components/home/InsideAce"
import { Collection } from "@/components/home/Collection"
import { Testimonials } from "@/components/home/Testimonials"
import { BrandPartners } from "@/components/home/BrandPartners"
import { ShowroomCta } from "@/components/home/ShowroomCta"
import { FinalCta } from "@/components/home/FinalCta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mantra />
      <Pillars />
      <InsideAce />
      <Collection />
      <Testimonials />
      <BrandPartners />
      <ShowroomCta />
      <FinalCta />
    </>
  )
}
