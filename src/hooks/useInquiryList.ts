"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "ace-inquiry-list"

function getStoredItems(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Ignore parse errors
  }
  return []
}

export function useInquiryList() {
  const [items, setItems] = useState<string[]>(() => getStoredItems())

  // Sync to sessionStorage whenever items change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage errors
    }
  }, [items])

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item !== id))
  }, [])

  const toggleItem = useCallback((id: string) => {
    setItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }
      return [...prev, id]
    })
  }, [])

  const isInList = useCallback(
    (id: string): boolean => {
      return items.includes(id)
    },
    [items]
  )

  const clearList = useCallback(() => {
    setItems([])
  }, [])

  return { items, addItem, removeItem, toggleItem, isInList, clearList }
}
