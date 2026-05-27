'use client'

import { PosCartItem as CartItemType } from '@/stores/posCartStore'
import { formatRupiah } from '@/utils/currency'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface PosCartItemProps {
  item: CartItemType
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

export function PosCartItem({ item, onIncrement, onDecrement, onRemove }: PosCartItemProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      }}
      className="flex flex-col gap-2 p-3 bg-white border-b border-border last:border-b-0 transition-colors hover:bg-secondary/20"
    >
      <div className="flex justify-between items-start gap-2">
        <h4 className="text-sm font-semibold text-foreground line-clamp-2 flex-1 leading-snug">
          {item.name}
        </h4>
        <button 
          onClick={onRemove}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-1">
        <motion.div 
          key={item.quantity} // Trigger animation when quantity changes
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="text-sm font-bold text-primary"
        >
          {formatRupiah(item.price * item.quantity)}
        </motion.div>
        
        <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 border border-border/50 shadow-sm">
          <button 
            onClick={onDecrement}
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-foreground hover:text-primary transition-colors disabled:opacity-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            disabled={item.quantity <= 1}
            aria-label="Kurangi jumlah"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span className="text-sm font-semibold w-5 text-center select-none">
            {item.quantity}
          </span>
          
          <button 
            onClick={onIncrement}
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-foreground hover:text-primary transition-colors disabled:opacity-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            disabled={item.quantity >= item.stock}
            aria-label="Tambah jumlah"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
