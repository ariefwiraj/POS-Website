export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  category_id: string
  name: string
  slug: string
  description?: string
  price: number
  stock: number
  image_url?: string
}

export interface PosTransaction {
  id: string
  invoice_number: string
  total_price: number
  payment_method: string
  created_at: string
}
