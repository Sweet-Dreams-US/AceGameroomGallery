"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export function ShowroomCta() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-40 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=1100&fit=crop&q=85"
                alt="Inside the Ace Game Room Gallery showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 scarcity-badge">
                10,000+ SQ FT · FORT WAYNE
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="section-number mb-4">/ 006 — VISIT US</p>
            <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-[#f5f1ea] leading-[1.05] mb-6">
              Come <span className="gold-gradient-text italic">rack a few.</span>
            </h2>
            <p className="text-lg text-[#a8a198] font-light leading-relaxed mb-10">
              No pressure. No commission-hungry salespeople. Just a showroom where
              you can lean on a McDermott, feel slate under your hand, and picture
              the room you&apos;ll build.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#d4a843]" />
                </div>
                <div>
                  <p className="text-xs eyebrow mb-1">Location</p>
                  <p className="text-[#f5f1ea]">2525 W Jefferson Blvd</p>
                  <p className="text-sm text-[#a8a198]">Fort Wayne, IN 46802</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#d4a843]" />
                </div>
                <div>
                  <p className="text-xs eyebrow mb-1">Hours</p>
                  <p className="text-[#f5f1ea]">Monday — Saturday</p>
                  <p className="text-sm text-[#a8a198]">10:00 AM — 6:00 PM · Sunday Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#d4a843]" />
                </div>
                <div>
                  <p className="text-xs eyebrow mb-1">Call</p>
                  <a
                    href="tel:+12604323443"
                    className="text-[#f5f1ea] hover:text-[#d4a843] transition-colors"
                  >
                    (260) 432-3443
                  </a>
                  <p className="text-sm text-[#a8a198]">Ask for Bret.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com/?q=2525+W+Jefferson+Blvd,+Fort+Wayne,+IN+46802"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/contact" className="btn-secondary">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
