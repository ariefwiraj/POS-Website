import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PosCartItem {
  productId: string
  name: string
  price: number
  quantity: number
  stock: number
  imageUrl?: string
}

type PaymentMethod = 'cash' | 'transfer' | 'qris'

interface PosCartStore {
  items: PosCartItem[]
  paymentMethod: PaymentMethod
  cashReceived: number

  addItem: (product: any) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setCashReceived: (amount: number) => void
  clearCart: () => void

  getTotalItems: () => number
  getTotalPrice: () => number
  getChange: () => number
}

export const usePosCartStore = create<PosCartStore>()(
  persist(
    (set, get) => ({
  items: [],
  paymentMethod: 'cash',
  cashReceived: 0,

  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.productId === product.id)
    if (existing) {
      return {
        items: state.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }
    }
    return {
      items: [...state.items, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        imageUrl: product.image_url
      }]
    }
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.productId !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
        : item
    )
  })),

  incrementQuantity: (productId) => set((state) => ({
    items: state.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
        : item
    )
  })),

  decrementQuantity: (productId) => set((state) => ({
    items: state.items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    )
  })),

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  
  setCashReceived: (amount) => set({ cashReceived: amount }),
  
  clearCart: () => set({ items: [], cashReceived: 0, paymentMethod: 'cash' }),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
  
  getChange: () => Math.max(0, get().cashReceived - get().getTotalPrice()),
    }),
    {
      name: 'pos-cart-storage',
    }
  )
)
