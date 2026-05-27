'use client'

import { Product } from '../types/pos.types'
import { ProductCard } from './ProductCard'
import { motion } from 'framer-motion'

interface ProductGridProps {
  products: Product[]
  onAddProduct: (product: Product) => void
  isLoading?: boolean
}

export function ProductGrid({ products, onAddProduct, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card animate-pulse aspect-[3/4]">
            <div className="h-1/2 bg-muted rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="text-6xl mb-4 opacity-20">🔍</div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Produk tidak ditemukan</h3>
        <p className="text-sm text-muted-foreground">Coba gunakan kata kunci atau filter kategori lain.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="min-w-0 h-full"
        >
          <ProductCard
            product={product}
            onAdd={onAddProduct}
          />
        </motion.div>
      ))}
    </div>
  )
}
