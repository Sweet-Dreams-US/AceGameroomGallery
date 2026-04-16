"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { staggerContainer, staggerItem, scaleIn } from "@/lib/animations"
import { useInquiryList } from "@/hooks/useInquiryList"
import ProductSelector from "./ProductSelector"
import PoolBallSpinner from "@/components/animations/PoolBallSpinner"

interface ProductOption {
  id: string
  name: string
  slug: string
  category: string
}

interface ContactFormProps {
  products: ProductOption[]
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type ShakeField = "name" | "email" | "message" | null

export default function ContactForm({ products }: ContactFormProps) {
  const searchParams = useSearchParams()
  const { items: inquiryItems } = useInquiryList()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])

  const [errors, setErrors] = useState<FormErrors>({})
  const [shakeField, setShakeField] = useState<ShakeField>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Pre-populate from URL search params (?product=SLUG)
  useEffect(() => {
    const productSlug = searchParams.get("product")
    if (productSlug) {
      const match = products.find((p) => p.slug === productSlug)
      if (match) {
        setSelectedProductIds((prev) =>
          prev.includes(match.id) ? prev : [...prev, match.id]
        )
      }
    }
  }, [searchParams, products])

  // Pre-populate from inquiry list (sessionStorage)
  useEffect(() => {
    if (inquiryItems.length > 0) {
      setSelectedProductIds((prev) => {
        const merged = new Set([...prev, ...inquiryItems])
        return Array.from(merged)
      })
    }
  }, [inquiryItems])

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {}
    if (!name.trim()) errs.name = "Name is required"
    if (!email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address"
    }
    if (!message.trim()) errs.message = "Message is required"
    return errs
  }, [name, email, message])

  async function triggerShake(field: ShakeField) {
    setShakeField(field)
    // Clear shake after animation completes
    setTimeout(() => setShakeField(null), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    // Shake the first invalid field
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.keys(validationErrors)[0] as ShakeField
      triggerShake(firstError)
      return
    }

    setIsSubmitting(true)
    setSubmitState("idle")
    setErrorMessage("")

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim(),
          product_ids: selectedProductIds,
        }),
      })

      if (res.ok) {
        setSubmitState("success")
        // Reset form
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setSelectedProductIds([])
        setErrors({})
      } else if (res.status === 429) {
        setSubmitState("error")
        setErrorMessage(
          "Too many submissions. Please wait a while before trying again."
        )
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitState("error")
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        )
      }
    } catch {
      setSubmitState("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (submitState === "success") {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center py-16 px-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-playfair font-bold text-ace-charcoal mb-3"
        >
          Thank you!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-ace-slate text-lg mb-8"
        >
          We&apos;ll be in touch soon.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          type="button"
          onClick={() => setSubmitState("idle")}
          className="btn-ace-outline"
        >
          Send Another Message
        </motion.button>
      </motion.div>
    )
  }

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
  }
  const shakeTransition = { duration: 0.4 }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Name field */}
      <motion.div variants={staggerItem}>
        <motion.div
          animate={shakeField === "name" ? shakeAnimation : {}}
          transition={shakeTransition}
        >
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-ace-charcoal mb-1.5"
          >
            Name <span className="text-ace-red">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
            }}
            placeholder="Your full name"
            className={`w-full px-4 py-3 border rounded-lg bg-white text-ace-charcoal placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-ace-red/20 focus:border-ace-red ${
              errors.name ? "border-ace-red" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-sm text-ace-red flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Email field */}
      <motion.div variants={staggerItem}>
        <motion.div
          animate={shakeField === "email" ? shakeAnimation : {}}
          transition={shakeTransition}
        >
          <label
            htmlFor="contact-email"
            className="block text-sm font-semibold text-ace-charcoal mb-1.5"
          >
            Email <span className="text-ace-red">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
            }}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 border rounded-lg bg-white text-ace-charcoal placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-ace-red/20 focus:border-ace-red ${
              errors.email ? "border-ace-red" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-sm text-ace-red flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Phone field */}
      <motion.div variants={staggerItem}>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-semibold text-ace-charcoal mb-1.5"
        >
          Phone <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(260) 555-1234"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-ace-charcoal placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-ace-red/20 focus:border-ace-red"
        />
      </motion.div>

      {/* Message field */}
      <motion.div variants={staggerItem}>
        <motion.div
          animate={shakeField === "message" ? shakeAnimation : {}}
          transition={shakeTransition}
        >
          <label
            htmlFor="contact-message"
            className="block text-sm font-semibold text-ace-charcoal mb-1.5"
          >
            Message <span className="text-ace-red">*</span>
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: undefined }))
            }}
            placeholder="Tell us about your project or questions..."
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg bg-white text-ace-charcoal placeholder:text-gray-400 outline-none transition-all resize-y focus:ring-2 focus:ring-ace-red/20 focus:border-ace-red ${
              errors.message ? "border-ace-red" : "border-gray-300"
            }`}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-sm text-ace-red flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Product interest */}
      <motion.div variants={staggerItem}>
        <label className="block text-sm font-semibold text-ace-charcoal mb-1.5">
          Product Interest{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <ProductSelector
          products={products}
          selectedIds={selectedProductIds}
          onChange={setSelectedProductIds}
        />
      </motion.div>

      {/* Error message */}
      {submitState === "error" && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-ace-red text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMessage}
        </motion.div>
      )}

      {/* Submit button */}
      <motion.div variants={staggerItem}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-ace w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <PoolBallSpinner size={22} />
              <span>Sending...</span>
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </motion.div>
    </motion.form>
  )
}
