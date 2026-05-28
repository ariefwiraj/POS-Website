'use client'

import { useState, useEffect } from 'react'
import { PosCartItem as CartItemType } from '@/stores/posCartStore'
import { formatRupiah } from '@/utils/currency'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface PosCartItemProps {
  item: CartItemType
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function PosCartItem({ item, onIncrement, onDecrement, onRemove, onUpdateQuantity }: PosCartItemProps) {
  const [inputValue, setInputValue] = useState(item.quantity.toString())

  useEffect(() => {
    setInputValue(item.quantity.toString())
  }, [item.quantity])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(cleanValue)
  }

  const handleBlurOrSubmit = () => {
    const parsed = parseInt(inputValue, 10)
    if (isNaN(parsed) || parsed < 1) {
      onUpdateQuantity(1)
      setInputValue('1')
    } else if (parsed > item.stock) {
      onUpdateQuantity(item.stock)
      setInputValue(item.stock.toString())
    } else {
      onUpdateQuantity(parsed)
      setInputValue(parsed.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

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
        
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 border border-border/50 shadow-sm">
          <button 
            onClick={onDecrement}
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-foreground hover:text-primary transition-colors disabled:opacity-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            disabled={item.quantity <= 1}
            aria-label="Kurangi jumlah"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlurOrSubmit}
            onKeyDown={handleKeyDown}
            className="w-10 h-7 text-center text-sm font-bold bg-white border border-input rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-primary p-0 text-foreground transition-all"
          />
          
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
