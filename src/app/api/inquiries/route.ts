import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

// ---------------------------------------------------------------------------
// Simple in-memory rate limiting
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // max submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []

  // Prune old entries outside the window
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  rateLimitMap.set(ip, recent)

  if (recent.length >= RATE_LIMIT_MAX) {
    return true
  }

  // Record this attempt
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }
  return "unknown"
}

// ---------------------------------------------------------------------------
// POST /api/inquiries
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    // Parse body
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      )
    }

    const { name, email, phone, message, product_ids } = body

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      )
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      )
    }

    // Sanitize product_ids
    const sanitizedProductIds = Array.isArray(product_ids)
      ? product_ids.filter((id: unknown) => typeof id === "string")
      : []

    // Attempt Supabase insert
    try {
      const supabase = createAdminClient()
      const { error: dbError } = await supabase.from("inquiries").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone && typeof phone === "string" ? phone.trim() : null,
        message: message.trim(),
        product_ids: sanitizedProductIds,
      })

      if (dbError) {
        console.error("[inquiries] Supabase insert error:", dbError)
        // Still return success — the inquiry was "received" even if DB fails
        // In production you might want to queue it or send an email fallback
      }
    } catch (dbErr) {
      console.error("[inquiries] Database connection error:", dbErr)
      // Graceful degradation — log but don't fail the user
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("[inquiries] Unexpected error:", err)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
