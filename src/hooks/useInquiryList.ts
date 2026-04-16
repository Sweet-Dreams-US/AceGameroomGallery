"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "ace-inquiry-list"

function getStoredItems(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistItems(items: string[]) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useInquiryList() {
  const [items, setItems] = useState<string[]>([])

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    setItems(getStoredItems())
  }, [])

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) return prev
      const next = [...prev, productId]
      persistItems(next)
      return next
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((id) => id !== productId)
      persistItems(next)
      return next
    })
  }, [])

  const toggleItem = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
      persistItems(next)
      return next
    })
  }, [])

  const isInList = useCallback(
    (productId: string) => items.includes(productId),
    [items]
  )

  const clearList = useCallback(() => {
    setItems([])
    persistItems([])
  }, [])

  return { items, addItem, removeItem, toggleItem, isInList, clearList }
}
