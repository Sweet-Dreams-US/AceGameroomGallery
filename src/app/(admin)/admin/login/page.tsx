"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock } from "lucide-react"
import { STORAGE_KEYS } from "@/lib/admin-storage"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Demo only — no real auth.
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.AUTH, "true")
    }
    // brief delay for perceived feedback
    setTimeout(() => {
      router.replace("/admin")
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f3] px-6 py-16 relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 30% 30%, #d4a843, transparent), radial-gradient(600px circle at 70% 70%, #c0392b, transparent)",
        }}
      />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-[#1a1612]/8 p-10 lg:p-12 shadow-[0_40px_80px_-20px_rgba(92,61,46,0.15)]">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="font-display text-4xl tracking-[0.35em] text-[#1a1612]">
              ACE
            </div>
            <div className="mt-2 text-[10px] tracking-[0.4em] uppercase text-[#b8933a]">
              Admin Panel
            </div>
            <div className="gold-divider mx-auto mt-5" />
          </div>

          <h1 className="font-playfair text-2xl lg:text-3xl text-[#1a1612] text-center mb-2">
            Welcome back.
          </h1>
          <p className="text-center text-sm text-[#6b655e] mb-8">
            Sign in to manage the showroom.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@acegameroom.com"
                required
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#6b655e] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white border border-[#1a1612]/15 text-[#1a1612] placeholder-[#a8a198] focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              <span>{submitting ? "Signing In" : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-2 justify-center text-xs text-[#a8a198]">
            <Lock className="w-3 h-3" strokeWidth={1.5} />
            <span>Demo admin — any credentials will work.</span>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.3em] uppercase text-[#a8a198]">
          Ace Game Room Gallery &middot; Since 1992
        </p>
      </div>
    </div>
  )
}
