import type { Metadata } from "next"
import { CheckoutClient } from "./CheckoutClient"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — pickup, local delivery, or shipping nationwide.",
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
