"use client"

import { Suspense } from "react"
import ContactForm from "@/components/forms/ContactForm"

interface ProductOption {
  id: string
  name: string
  slug: string
  category: string
}

interface ContactFormWrapperProps {
  products: ProductOption[]
}

/**
 * Client-side wrapper that provides a Suspense boundary for ContactForm,
 * which internally uses useSearchParams() and therefore needs Suspense.
 */
export default function ContactFormWrapper({
  products,
}: ContactFormWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-12 bg-gray-100 rounded-lg" />
            </div>
          ))}
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
      }
    >
      <ContactForm products={products} />
    </Suspense>
  )
}
