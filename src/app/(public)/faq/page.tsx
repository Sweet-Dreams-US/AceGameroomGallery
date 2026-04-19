import type { Metadata } from "next"
import FAQPageClient from "./FAQPageClient"

export const metadata: Metadata = {
  title: "FAQ — Questions. Answered.",
  description:
    "Answers to the questions Fort Wayne families ask most — pool table brands, financing, service, delivery, hours, and more.",
}

export default function FAQPage() {
  return <FAQPageClient />
}
