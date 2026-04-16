"use client"

import { useCallback, useRef } from "react"
import { Upload, Star, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface UploadedImage {
  id: string
  url: string
  isPrimary: boolean
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onUpload: (files: File[]) => void
  onDelete: (id: string) => void
  onSetPrimary: (id: string) => void
  onReorder?: (images: UploadedImage[]) => void
}

export default function ImageUploader({
  images,
  onUpload,
  onDelete,
  onSetPrimary,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      )
      if (files.length > 0) onUpload(files)
    },
    [onUpload]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) onUpload(files)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-ace-cyan hover:bg-ace-cyan/5 transition-colors"
      >
        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 font-medium">
          Drop images here or click to upload
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG, WebP up to 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={cn(
                "relative group rounded-lg overflow-hidden border-2 aspect-square",
                img.isPrimary ? "border-ace-gold" : "border-gray-200"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSetPrimary(img.id)
                  }}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    img.isPrimary
                      ? "bg-ace-gold text-white"
                      : "bg-white/90 text-gray-600 hover:bg-ace-gold hover:text-white"
                  )}
                  title="Set as primary"
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(img.id)
                  }}
                  className="p-2 bg-white/90 text-gray-600 hover:bg-ace-red hover:text-white rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {/* Primary badge */}
              {img.isPrimary && (
                <div className="absolute top-1 left-1 bg-ace-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  PRIMARY
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
