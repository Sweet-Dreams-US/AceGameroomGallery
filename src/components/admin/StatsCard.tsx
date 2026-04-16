"use client"

import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  accentColor?: string
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  accentColor = "border-ace-cyan",
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4 border-l-4",
        accentColor
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-500" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 font-inter">{value}</p>
      </div>
    </div>
  )
}
