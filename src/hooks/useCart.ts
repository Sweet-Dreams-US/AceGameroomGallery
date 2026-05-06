"use client"

import { useEffect, useState, useCallback, useSyncExternalStore } from "react"
import type { CartLine } from "@/lib/commerce"

const STORAGE_KEY = "ace-cart"

/**
 * Module-level pub/sub so multiple useCart() consumers stay in sync —
 * cart drawer, navbar badge, checkout page all share state.
 */
const listeners = new Set<() => void>()

function readFromStorage(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeToStorage(items: CartLine[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* quota or serialization */
  }
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

const getSnapshot = () => readFromStorage()
const getServerSnapshot = (): CartLine[] => []

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const addItem = useCallback((line: CartLine) => {
    const current = readFromStorage()
    const existing = current.find((i) => i.lineId === line.lineId)
    let next: CartLine[]
    if (existing) {
      next = current.map((i) =>
        i.lineId === line.lineId
          ? { ...i, quantity: i.quantity + line.quantity }
          : i,
      )
    } else {
      next = [...current, line]
    }
    writeToStorage(next)
  }, [])

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    const current = readFromStorage()
    if (quantity <= 0) {
      writeToStorage(current.filter((i) => i.lineId !== lineId))
      return
    }
    writeToStorage(current.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)))
  }, [])

  const removeItem = useCallback((lineId: string) => {
    const current = readFromStorage()
    writeToStorage(current.filter((i) => i.lineId !== lineId))
  }, [])

  const clear = useCallback(() => writeToStorage([]), [])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return { items, addItem, updateQuantity, removeItem, clear, itemCount }
}

/**
 * Cart drawer open state — separate hook because the drawer can be opened
 * from the navbar, from the "Add to Cart" success flash, or by deep link.
 */
const drawerListeners = new Set<(open: boolean) => void>()
let drawerOpen = false

export function useCartDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const cb = (next: boolean) => setIsOpen(next)
    drawerListeners.add(cb)
    setIsOpen(drawerOpen)
    return () => {
      drawerListeners.delete(cb)
    }
  }, [])

  const open = useCallback(() => {
    drawerOpen = true
    drawerListeners.forEach((l) => l(true))
  }, [])
  const close = useCallback(() => {
    drawerOpen = false
    drawerListeners.forEach((l) => l(false))
  }, [])

  return { isOpen, open, close }
}
