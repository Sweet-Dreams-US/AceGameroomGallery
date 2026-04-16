"use client"

import { Package, MessageSquare, Image, Award } from "lucide-react"
import StatsCard from "@/components/admin/StatsCard"
import { ADMIN_MOCK_INQUIRIES } from "@/lib/mock-data"

export default function AdminDashboardPage() {
  const recentInquiries = ADMIN_MOCK_INQUIRIES.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-playfair">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here is an overview of your site.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Products"
          value={12}
          icon={Package}
          accentColor="border-ace-cyan"
        />
        <StatsCard
          label="Unread Inquiries"
          value={3}
          icon={MessageSquare}
          accentColor="border-ace-red"
        />
        <StatsCard
          label="Active Banners"
          value={4}
          icon={Image}
          accentColor="border-ace-gold"
        />
        <StatsCard
          label="Total Brands"
          value={27}
          icon={Award}
          accentColor="border-felt-green"
        />
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Inquiries
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentInquiries.map((inquiry) => (
            <div key={inquiry.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {inquiry.name}
                    </span>
                    {!inquiry.is_read && (
                      <span className="inline-flex w-2 h-2 rounded-full bg-ace-cyan" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {inquiry.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
                <span className="text-xs text-gray-400 ml-4 flex-shrink-0">
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
