"use client"

import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./ProductCard"
import ScrollReveal from "@/components/animations/ScrollReveal"

interface RelatedProductsProps {
  products: {
    id: string
    name: string
    slug: string
    categorySlug: string
    brandName: string
    imageUrl: string
  }[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    loop: false,
  })

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  if (products.length === 0) return null

  return (
    <ScrollReveal variant="fadeUp">
      <section className="py-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-ace-charcoal">
            You May Also Like
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full border border-gray-200 text-ace-slate hover:text-ace-red hover:border-ace-red transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full border border-gray-200 text-ace-slate hover:text-ace-red hover:border-ace-red transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
