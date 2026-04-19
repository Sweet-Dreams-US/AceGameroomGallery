// Typed localStorage helpers for the admin panel.
// All functions are SSR-safe and no-ops on the server.

const isBrowser = () => typeof window !== "undefined"

export function getItems<T>(key: string, fallback: T[] = []): T[] {
  if (!isBrowser()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as T[]
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function setItems<T>(key: string, items: T[]): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(items))
  } catch {
    // quota or serialization error — swallow in demo
  }
}

export function addItem<T extends { id: string }>(key: string, item: T): void {
  if (!isBrowser()) return
  const items = getItems<T>(key)
  items.push(item)
  setItems(key, items)
}

export function updateItem<T extends { id: string }>(key: string, item: T): void {
  if (!isBrowser()) return
  const items = getItems<T>(key)
  const idx = items.findIndex((i) => i.id === item.id)
  if (idx === -1) {
    items.push(item)
  } else {
    items[idx] = item
  }
  setItems(key, items)
}

export function deleteItem(key: string, id: string): void {
  if (!isBrowser()) return
  const items = getItems<{ id: string }>(key)
  const next = items.filter((i) => i.id !== id)
  setItems(key, next)
}

export function getItemById<T extends { id: string }>(
  key: string,
  id: string,
): T | undefined {
  if (!isBrowser()) return undefined
  const items = getItems<T>(key)
  return items.find((i) => i.id === id)
}

// Seed a storage key with initial data only if nothing is stored yet.
export function seedItems<T>(key: string, initial: T[]): T[] {
  if (!isBrowser()) return initial
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(initial))
      return initial
    }
    const parsed = JSON.parse(raw) as T[]
    return Array.isArray(parsed) ? parsed : initial
  } catch {
    return initial
  }
}

// Key constants used across the admin panel.
export const STORAGE_KEYS = {
  AUTH: "ace-admin-auth",
  PRODUCTS: "ace-products",
  INQUIRIES: "ace-inquiries",
  BANNERS: "ace-banners",
  TESTIMONIALS: "ace-testimonials",
  FAQS: "ace-faqs",
  CONTENT: "ace-content",
} as const
