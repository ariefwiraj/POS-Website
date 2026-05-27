'use client'

import { Product } from '../types/pos.types'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { formatRupiah } from '@/utils/currency'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
  disabled?: boolean
}

export function ProductCard({ product, onAdd, disabled = false }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0
  const isDisabled = disabled || isOutOfStock

  return (
    <motion.div
      whileHover={!isDisabled ? { y: -4, shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className="h-full"
    >
      <Card 
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        onClick={() => !isDisabled && onAdd(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!isDisabled) onAdd(product)
          }
        }}
        className={cn(
          "group relative overflow-hidden flex flex-col transition-all duration-200 cursor-pointer h-full border-border hover:border-primary-light focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
          isDisabled && "opacity-50 pointer-events-none grayscale-[0.5]"
        )}
      >
      <div className="w-full aspect-square bg-secondary/30 relative flex items-center justify-center p-4">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={product.image_url} 
            alt={product.name}
            className="object-contain w-full h-full mix-blend-multiply"
            loading="lazy"
          />
        ) : (
          <div className="text-4xl">🛒</div>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full font-bold text-sm shadow-sm transform -rotate-12">
              Habis
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 gap-1 border-t border-border">
        <h3 className="font-sans font-semibold text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-primary">
              {formatRupiah(product.price)}
            </span>
            <span className="text-xs text-muted-foreground font-semibold">
              Stok: <span className={cn(
                product.stock <= 5 ? "text-warning" : "text-success"
              )}>{product.stock}</span>
            </span>
          </div>
          
          <button 
            disabled={isDisabled}
            className="bg-primary/10 text-primary p-1.5 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
            aria-label="Add to cart"
            tabIndex={-1} // Handled by Card click
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  </motion.div>
  )
}
