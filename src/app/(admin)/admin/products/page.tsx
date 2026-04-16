"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Star } from "lucide-react"
import DataTable, { type Column } from "@/components/admin/DataTable"
import { ADMIN_MOCK_PRODUCTS } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
  const router = useRouter()

  const columns: Column<Product>[] = [
    {
      key: "images",
      label: "Image",
      sortable: false,
      render: (item) => {
        const primaryImage = item.images?.find((img) => img.is_primary) || item.images?.[0]
        return primaryImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImage.image_url}
            alt={item.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
            N/A
          </div>
        )
      },
    },
    {
      key: "name",
      label: "Name",
      render: (item) => (
        <span className="font-medium text-gray-900">{item.name}</span>
      ),
    },
    {
      key: "category_id",
      label: "Category",
      render: (item) => (
        <span className="text-gray-600">{item.category?.name || "—"}</span>
      ),
    },
    {
      key: "brand_id",
      label: "Brand",
      render: (item) => (
        <span className="text-gray-600">{item.brand?.name || "—"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status === "active" ? "Active" : "Draft"}
        </span>
      ),
    },
    {
      key: "is_featured",
      label: "Featured",
      render: (item) => (
        <Star
          className={`w-4 h-4 ${
            item.is_featured
              ? "text-ace-gold fill-ace-gold"
              : "text-gray-300"
          }`}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">
            Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-ace-cyan text-white text-sm font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Table */}
      <DataTable<Product>
        columns={columns}
        data={ADMIN_MOCK_PRODUCTS}
        searchKey="name"
        searchPlaceholder="Search products..."
        onRowClick={(item) => router.push(`/admin/products/${item.id}/edit`)}
      />
    </div>
  )
}
