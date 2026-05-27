'use client'

import { usePosCartStore } from '@/stores/posCartStore'
import { usePosUiStore } from '@/stores/posUiStore'
import { PosCartItem } from './PosCartItem'
import { formatRupiah } from '@/utils/currency'
import { Button } from '@/components/ui/button'
import { ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'

interface PosCartProps {
  className?: string
  onCheckout?: () => void
}

export function PosCart({ className, onCheckout }: PosCartProps) {
  const { 
    items, 
    incrementQuantity, 
    decrementQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems
  } = usePosCartStore()
  
  const { setMobileCartOpen } = usePosUiStore()

  const total = getTotalPrice()
  const totalItemsCount = getTotalItems()
  const isEmpty = items.length === 0

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border shrink-0 bg-white">
        <div className="flex items-center gap-2 text-foreground font-heading font-semibold text-lg">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Keranjang ({totalItemsCount})
        </div>
        
        {/* Mobile close button */}
        <button 
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition-colors"
          onClick={() => setMobileCartOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-secondary/20">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3 opacity-60">
            <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">Keranjang masih kosong</p>
          </div>
        ) : (
          <div className="flex flex-col pb-2">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <PosCartItem
                  key={item.productId}
                  item={item}
                  onIncrement={() => incrementQuantity(item.productId)}
                  onDecrement={() => decrementQuantity(item.productId)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-white shrink-0 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-10">
        <div className="flex justify-between items-center text-foreground font-semibold">
          <span>Total Bayar</span>
          <span className="text-xl font-heading font-bold text-primary">
            {formatRupiah(total)}
          </span>
        </div>
        
        <Button 
          className="w-full h-12 text-base font-bold shadow-md active:scale-[0.98] transition-transform"
          disabled={isEmpty}
          onClick={onCheckout}
        >
          Lanjut Pembayaran
        </Button>
      </div>
    </div>
  )
}
