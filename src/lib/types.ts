export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
  created_at: string
  updated_at: string
  children?: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category_id: string
  brand_id: string | null
  specifications: Record<string, string>
  is_featured: boolean
  status: "active" | "draft"
  meta_title: string | null
  meta_description: string | null
  sort_order: number
  created_at: string
  updated_at: string
  // Joined relations
  category?: Category
  brand?: Brand
  images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  product_ids: string[]
  is_read: boolean
  is_archived: boolean
  created_at: string
  // Joined
  products?: Product[]
}

export interface HeroBanner {
  id: string
  title: string | null
  subtitle: string | null
  image_url: string
  cta_text: string | null
  cta_link: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  content: string
  rating: number
  is_active: boolean
  created_at: string
}

export interface FaqEntry {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface LeagueEvent {
  id: string
  league_type: "pool" | "dart"
  title: string
  event_date: string
  event_time: string | null
  description: string | null
  location: string | null
  created_at: string
}

export interface SiteContent {
  id: string
  section_key: string
  title: string | null
  content: string
  updated_at: string
}
