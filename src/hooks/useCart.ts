"use client"

import { useEffect, useState, useCallback, useSyncExternalStore } from "react"
import type { CartLine } from "@/lib/commerce"

const STORAGE_KEY = "ace-cart"

/**
 * Module-level pub/sub so multiple useCart() consumers stay in sync —
 * cart drawer, navbar badge, checkout page all share state.
 *
 * IMPORTANT: getSnapshot must return a STABLE reference until the underlying
 * data actually changes. React's useSyncExternalStore calls getSnapshot on
 * every render to detect changes; if we return a fresh array each call,
 * React sees "infinite changes" and bails out with error #185.
 *
 * We cache by serialized JSON: only re-parse when the JSON string differs.
 */
const listeners = new Set<() => void>()
const EMPTY_ITEMS: CartLine[] = []
let cachedJson: string | null = null
let cachedItems: CartLine[] = EMPTY_ITEMS

function readFromStorage(): CartLine[] {
  if (typeof window === "undefined") return EMPTY_ITEMS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      if (cachedJson !== "") {
        cachedJson = ""
        cachedItems = EMPTY_ITEMS
      }
      return cachedItems
    }
    if (raw === cachedJson) return cachedItems
    const parsed = JSON.parse(raw)
    cachedJson = raw
    cachedItems = Array.isArray(parsed) ? (parsed as CartLine[]) : EMPTY_ITEMS
    return cachedItems
  } catch {
    return EMPTY_ITEMS
  }
}

function writeToStorage(items: CartLine[]) {
  if (typeof window === "undefined") return
  try {
    const json = JSON.stringify(items)
    window.localStorage.setItem(STORAGE_KEY, json)
    cachedJson = json
    cachedItems = items
  } catch {
    /* quota or serialization */
  }
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

const getSnapshot = () => readFromStorage()
const getServerSnapshot = (): CartLine[] => EMPTY_ITEMS

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
    writeToStorage(
      current.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
    )
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
 * Cart drawer open state. Module-level boolean + listener set keeps every
 * consumer in sync (navbar button, drawer, success toast).
 */
const drawerListeners = new Set<(open: boolean) => void>()
let drawerOpen = false

export function useCartDrawer() {
  const [isOpen, setIsOpen] = useState(drawerOpen)

  useEffect(() => {
    const cb = (next: boolean) => setIsOpen(next)
    drawerListeners.add(cb)
    // Sync to current module value in case it changed before mount
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
