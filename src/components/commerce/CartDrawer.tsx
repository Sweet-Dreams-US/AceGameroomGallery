"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { X, Plus, Minus, ArrowRight, Trash2, ShoppingBag } from "lucide-react"
import { useCart, useCartDrawer } from "@/hooks/useCart"
import { calcSubtotal, formatPrice } from "@/lib/commerce"

export function CartDrawer() {
  const { isOpen, close } = useCartDrawer()
  const { items, updateQuantity, removeItem } = useCart()
  const subtotal = calcSubtotal(items)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-[#1a1612]/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed top-0 bottom-0 right-0 z-[91] w-full sm:w-[440px] bg-[#faf8f3] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1612]/8">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#b8933a]" />
                <h2 className="font-playfair text-xl font-bold text-[#1a1612]">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-[#6b655e]">
                    ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button
                onClick={close}
                className="p-2 -mr-2 text-[#1a1612] hover:text-[#c0392b] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7 text-[#b8933a]" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#1a1612] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[#6b655e] mb-6 max-w-xs">
                  Browse the showroom collection and tap{" "}
                  <span className="text-[#b8933a] font-medium">Add to Cart</span> on
                  anything you&apos;d like to take home.
                </p>
                <button onClick={close} className="btn-primary">
                  Browse the Collection
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-5">
                    {items.map((line) => {
                      const addonsTotal = line.addons.reduce(
                        (s, a) => s + a.price,
                        0,
                      )
                      const lineTotal = (line.unitPrice + addonsTotal) * line.quantity
                      return (
                        <li
                          key={line.lineId}
                          className="flex gap-4 pb-5 border-b border-[#1a1612]/8 last:border-b-0"
                        >
                          <Link
                            href={`/${line.categorySlug}/${line.productSlug}`}
                            onClick={close}
                            className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-white border border-[#1a1612]/8"
                          >
                            <Image
                              src={line.productImage}
                              alt={line.productName}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-display tracking-[0.2em] text-[#b8933a] uppercase mb-1">
                              {line.brandName}
                            </p>
                            <Link
                              href={`/${line.categorySlug}/${line.productSlug}`}
                              onClick={close}
                              className="font-playfair text-base text-[#1a1612] hover:text-[#c0392b] transition-colors block leading-tight"
                            >
                              {line.productName}
                            </Link>

                            {line.addons.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {line.addons.map((a) => (
                                  <li key={a.id} className="text-xs text-[#6b655e] flex justify-between gap-2">
                                    <span className="truncate">+ {a.name}</span>
                                    <span className="text-[#1a1612]/70 flex-shrink-0">{formatPrice(a.price)}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Quantity + remove */}
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <div className="inline-flex items-center border border-[#1a1612]/15 rounded-full">
                                <button
                                  onClick={() =>
                                    updateQuantity(line.lineId, line.quantity - 1)
                                  }
                                  className="p-1.5 hover:text-[#c0392b] transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 text-sm font-medium text-[#1a1612]">
                                  {line.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(line.lineId, line.quantity + 1)
                                  }
                                  className="p-1.5 hover:text-[#b8933a] transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-playfair text-base font-bold text-[#1a1612]">
                                {formatPrice(lineTotal)}
                              </span>
                            </div>

                            <button
                              onClick={() => removeItem(line.lineId)}
                              className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#a8a198] hover:text-[#c0392b] transition-colors"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-[#1a1612]/8 bg-white px-6 py-5">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-sm text-[#6b655e]">Subtotal</span>
                    <span className="font-playfair text-2xl font-bold text-[#1a1612]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a8a198] mb-4 leading-relaxed">
                    Shipping, taxes, and delivery options are calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="btn-primary w-full justify-center group"
                  >
                    Continue to Checkout
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                    onClick={close}
                    className="w-full mt-3 py-3 text-xs tracking-[0.1em] uppercase font-medium text-[#6b655e] hover:text-[#1a1612] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
