"use client"

import { useState, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import SpecsEditor from "@/components/admin/SpecsEditor"
import ImageUploader, { type UploadedImage } from "@/components/admin/ImageUploader"
import { ADMIN_MOCK_PRODUCTS, ADMIN_MOCK_CATEGORIES, ADMIN_MOCK_BRANDS } from "@/lib/mock-data"
import { slugify } from "@/lib/utils"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [toast, setToast] = useState("")

  const product = ADMIN_MOCK_PRODUCTS.find((p) => p.id === id)

  const [name, setName] = useState(product?.name || "")
  const [slug, setSlug] = useState(product?.slug || "")
  const [description, setDescription] = useState(product?.description || "")
  const [categoryId, setCategoryId] = useState(product?.category_id || "")
  const [brandId, setBrandId] = useState(product?.brand_id || "")
  const [specifications, setSpecifications] = useState<Record<string, string>>(
    product?.specifications || {}
  )
  const [images, setImages] = useState<UploadedImage[]>(
    product?.images?.map((img) => ({
      id: img.id,
      url: img.image_url,
      isPrimary: img.is_primary,
    })) || []
  )
  const [isFeatured, setIsFeatured] = useState(product?.is_featured || false)
  const [status, setStatus] = useState<"active" | "draft">(product?.status || "draft")
  const [metaTitle, setMetaTitle] = useState(product?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(product?.meta_description || "")

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(slugify(value))
  }

  const handleImageUpload = useCallback((files: File[]) => {
    const newImages: UploadedImage[] = files.map((file, i) => ({
      id: `local-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      isPrimary: images.length === 0 && i === 0,
    }))
    setImages((prev) => [...prev, ...newImages])
  }, [images.length])

  const handleImageDelete = useCallback((imgId: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== imgId)
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true
      }
      return filtered
    })
  }, [])

  const handleSetPrimary = useCallback((imgId: string) => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isPrimary: img.id === imgId }))
    )
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = {
      id, name, slug, description, categoryId, brandId,
      specifications, isFeatured, status, metaTitle, metaDescription,
      imageCount: images.length,
    }
    console.log("Updating product:", updated)
    showToast("Product updated successfully!")
    setTimeout(() => router.push("/admin/products"), 1000)
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Product not found</p>
        <Link href="/admin/products" className="text-ace-cyan hover:underline mt-2 inline-block text-sm">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-up">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">
            Edit Product
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {product.name}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-semibold text-gray-900">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name <span className="text-ace-red">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-ace-red">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y"
                  required
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Specifications</h3>
              <SpecsEditor value={specifications} onChange={setSpecifications} />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Images</h3>
              <ImageUploader
                images={images}
                onUpload={handleImageUpload}
                onDelete={handleImageDelete}
                onSetPrimary={handleSetPrimary}
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-semibold text-gray-900">SEO</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Custom page title for search engines"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan resize-y"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-semibold text-gray-900">Status</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Visibility
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "active" | "draft")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-ace-cyan focus:ring-ace-cyan"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-semibold text-gray-900">Organization</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-ace-red">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                  required
                >
                  <option value="">Select category...</option>
                  {ADMIN_MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.parent_id ? "— " : ""}
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Brand
                </label>
                <select
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
                >
                  <option value="">Select brand...</option>
                  {ADMIN_MOCK_BRANDS.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-ace-cyan text-white font-medium rounded-lg hover:bg-ace-cyan/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Product
              </button>
              <Link
                href="/admin/products"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
