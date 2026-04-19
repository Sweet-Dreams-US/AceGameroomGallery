"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Printer,
  Clock,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Mail,
} from "lucide-react"

const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.544!2d-85.17119!3d40.96850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8815e4e77b0f1b5b%3A0xc5b4e3f3b7a8c5a0!2s2525%20W%20Jefferson%20Blvd%2C%20Fort%20Wayne%2C%20IN%2046802!5e0!3m2!1sen!1sus!4v1700000000000!5m2!1sen!1sus"

const GOOGLE_MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=2525+W+Jefferson+Blvd,+Fort+Wayne,+IN+46802"

const INTEREST_OPTIONS = [
  "Not sure yet",
  "Billiards",
  "Games",
  "Furniture",
  "Playsets",
  "Outdoor",
  "Services",
]

// Matches the admin dashboard's Inquiry shape so saved messages appear in /admin.
type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  product_ids: string[]
  is_read: boolean
  is_archived: boolean
  created_at: string
  // Extra field local to this form — admin ignores unknown fields.
  interest?: string
}

export default function ContactPageClient() {
  const searchParams = useSearchParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("Not sure yet")
  const [message, setMessage] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  // Pre-fill message from ?product=SLUG
  useEffect(() => {
    const slug = searchParams.get("product")
    if (slug) {
      const readable = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
      setMessage(`I'm interested in the ${readable} — please tell me more.`)
    }
  }, [searchParams])

  function validate() {
    const e: typeof errors = {}
    if (!name.trim()) e.name = "Name is required"
    if (!email.trim()) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email"
    if (!message.trim()) e.message = "Message is required"
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) return

    setIsSubmitting(true)

    // Simulate brief async to show the loading state cleanly
    setTimeout(() => {
      const trimmedPhone = phone.trim()
      const bodyWithInterest =
        interest && interest !== "Not sure yet"
          ? `[Interested in: ${interest}]\n\n${message.trim()}`
          : message.trim()

      const inquiry: Inquiry = {
        id: `ace-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim(),
        email: email.trim(),
        phone: trimmedPhone || null,
        message: bodyWithInterest,
        product_ids: [],
        is_read: false,
        is_archived: false,
        created_at: new Date().toISOString(),
        interest,
      }

      try {
        const raw = typeof window !== "undefined" ? window.localStorage.getItem("ace-inquiries") : null
        const existing: Inquiry[] = raw ? JSON.parse(raw) : []
        existing.push(inquiry)
        window.localStorage.setItem("ace-inquiries", JSON.stringify(existing))
      } catch {
        // localStorage may be unavailable (private mode) — fail silently; UX continues
      }

      setIsSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  function resetForm() {
    setName("")
    setEmail("")
    setPhone("")
    setInterest("Not sure yet")
    setMessage("")
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="bg-[#faf8f3]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 lg:py-40 border-b border-[#1a1612]/8">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615722440048-da4fd9202194?w=2400&h=1600&fit=crop&q=85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f3]/70 via-[#faf8f3]/85 to-[#faf8f3]" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <p className="section-number mb-6">/ 001 — CONTACT</p>
            <h1 className="hero-headline text-[#1a1612] mb-8">
              Let&apos;s build<br />
              <span className="gold-gradient-text italic">your room.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#6b655e] font-light leading-relaxed max-w-2xl">
              Every room starts with a conversation. Walk into the showroom, pick up
              the phone, or leave a note below — one business day is all it takes
              for a real answer from a real person.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FORM + INFO ================= */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-16">
            {/* LEFT — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="col-span-12 lg:col-span-7"
            >
              <p className="eyebrow mb-4">Send a note</p>
              <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-[#1a1612] mb-10 leading-tight">
                Tell us about
                <br />
                <span className="gold-gradient-text italic">the room you&apos;re building.</span>
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card-luxe p-10 lg:p-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 14 }}
                      className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#1a6b3c]/10 border border-[#1a6b3c]/30 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-10 h-10 text-[#1a6b3c]" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="font-playfair text-3xl lg:text-4xl font-bold text-[#1a1612] mb-4"
                    >
                      Thanks.
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="text-lg text-[#6b655e] max-w-md mx-auto mb-8 leading-relaxed"
                    >
                      We&apos;ll be in touch within one business day.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      onClick={resetForm}
                      type="button"
                      className="btn-ghost group"
                    >
                      Send another message
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FieldWrap label="Name" required error={errors.name}>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
                          }}
                          placeholder="Your full name"
                          className={inputClass(!!errors.name)}
                        />
                      </FieldWrap>

                      <FieldWrap label="Email" required error={errors.email}>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (errors.email) setErrors((p) => ({ ...p, email: undefined }))
                          }}
                          placeholder="you@email.com"
                          className={inputClass(!!errors.email)}
                        />
                      </FieldWrap>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FieldWrap label="Phone" optional>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(260) 555-1234"
                          className={inputClass(false)}
                        />
                      </FieldWrap>

                      <FieldWrap label="Interested in">
                        <div className="relative">
                          <select
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            className={`${inputClass(false)} appearance-none pr-10 cursor-pointer`}
                          >
                            {INTEREST_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-white text-[#1a1612]">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b655e]">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </FieldWrap>
                    </div>

                    <FieldWrap label="Message" required error={errors.message}>
                      <textarea
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value)
                          if (errors.message) setErrors((p) => ({ ...p, message: undefined }))
                        }}
                        rows={6}
                        placeholder="Tell us about the room, the budget, the timeline — or just say hi."
                        className={`${inputClass(!!errors.message)} resize-y`}
                      />
                    </FieldWrap>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full md:w-auto group disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span>Sending</span>
                        ) : (
                          <>
                            Send Message
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                      <p className="mt-4 text-xs text-[#a8a198] tracking-wide">
                        Prefer to call? <a href="tel:+12604323443" className="text-[#b8933a] hover:underline">(260) 432-3443</a>
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — Info */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="col-span-12 lg:col-span-5 space-y-6"
            >
              {/* Map */}
              <div className="relative overflow-hidden border border-[#1a1612]/8 bg-white">
                <iframe
                  src={GOOGLE_MAPS_EMBED_SRC}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ace Game Room Gallery on the map"
                  className="w-full"
                />
              </div>

              {/* Info card */}
              <div className="card-luxe p-8 lg:p-10">
                <p className="eyebrow mb-6">The Showroom</p>
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-[#1a1612] mb-2">
                  Come see it.
                </h3>
                <p className="gold-gradient-text font-playfair italic text-lg mb-8">
                  Fort Wayne, Indiana.
                </p>

                <div className="space-y-6">
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    title="Address"
                  >
                    <span className="text-[#1a1612]">
                      2525 W Jefferson Blvd
                      <br />
                      Fort Wayne, IN 46802
                    </span>
                  </InfoRow>

                  <div className="h-px bg-[#1a1612]/8" />

                  <InfoRow
                    icon={<Phone className="w-4 h-4" />}
                    title="Phone"
                  >
                    <a
                      href="tel:+12604323443"
                      className="text-[#1a1612] hover:text-[#c0392b] transition-colors"
                    >
                      (260) 432-3443
                    </a>
                  </InfoRow>

                  <div className="h-px bg-[#1a1612]/8" />

                  <InfoRow
                    icon={<Printer className="w-4 h-4" />}
                    title="Fax"
                  >
                    <span className="text-[#1a1612]">(260) 436-2507</span>
                  </InfoRow>

                  <div className="h-px bg-[#1a1612]/8" />

                  <InfoRow
                    icon={<Clock className="w-4 h-4" />}
                    title="Hours"
                  >
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-8">
                        <span className="text-[#6b655e]">Mon &ndash; Sat</span>
                        <span className="text-[#1a1612]">10 AM &ndash; 6 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="text-[#6b655e]">Sunday</span>
                        <span className="text-[#a8a198]">Closed</span>
                      </div>
                    </div>
                  </InfoRow>

                  <div className="h-px bg-[#1a1612]/8" />

                  <InfoRow
                    icon={<Mail className="w-4 h-4" />}
                    title="Email"
                  >
                    <a
                      href="mailto:info@acegameroom.com"
                      className="text-[#1a1612] hover:text-[#c0392b] transition-colors"
                    >
                      info@acegameroom.com
                    </a>
                  </InfoRow>
                </div>

                <div className="mt-10 pt-6 border-t border-[#1a1612]/8">
                  <Link
                    href={GOOGLE_MAPS_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full group"
                  >
                    Get Directions
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}

// ---------- helpers ----------

function inputClass(hasError: boolean) {
  return `w-full px-5 py-4 bg-white border text-[#1a1612] placeholder:text-[#a8a198] focus:outline-none transition-all duration-300 font-light ${
    hasError
      ? "border-[#c0392b] focus:border-[#c0392b]"
      : "border-[#1a1612]/15 focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843]/30"
  }`
}

function FieldWrap({
  label,
  children,
  required,
  optional,
  error,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  optional?: boolean
  error?: string
}) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-2 font-display text-xs tracking-[0.25em] text-[#6b655e] uppercase">
        {label}
        {required && <span className="text-[#b8933a]">*</span>}
        {optional && <span className="text-[#a8a198] normal-case tracking-normal font-sans text-[10px]">optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[#c0392b] tracking-wide"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 w-9 h-9 shrink-0 border border-[#d4a843]/40 flex items-center justify-center text-[#b8933a]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-[10px] tracking-[0.3em] uppercase text-[#a8a198] mb-1">
          {title}
        </p>
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
