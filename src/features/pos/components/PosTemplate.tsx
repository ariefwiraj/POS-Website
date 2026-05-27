'use client'

import { useState } from 'react'
import { Product, Category } from '../types/pos.types'
import { ProductSearch } from './ProductSearch'
import { CategoryFilter } from './CategoryFilter'
import { ProductGrid } from './ProductGrid'
import { PosCart } from './PosCart'
import dynamic from 'next/dynamic'
const PaymentModal = dynamic(() => import('./PaymentModal').then(mod => mod.PaymentModal), { ssr: false })
const TransactionSuccessModal = dynamic(() => import('./TransactionSuccessModal').then(mod => mod.TransactionSuccessModal), { ssr: false })
import { usePosCartStore } from '@/stores/posCartStore'
import { usePosUiStore } from '@/stores/posUiStore'
import { usePosTransaction } from '../hooks/usePosTransaction'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Dummy Data for UI Development
const DUMMY_CATEGORIES: Category[] = [
  { id: '1', name: 'Sembako' },
  { id: '2', name: 'Minuman' },
  { id: '3', name: 'Snack' },
  { id: '4', name: 'Rokok' }
]

const DUMMY_PRODUCTS: Product[] = [
  { id: 'p1', category_id: '1', name: 'Beras Raja Lele 5kg', slug: 'beras-raja-lele-5kg', price: 65000, stock: 10, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
  { id: 'p2', category_id: '1', name: 'Minyak Goreng Bimoli 2L', slug: 'minyak-bimoli-2l', price: 34000, stock: 15 },
  { id: 'p3', category_id: '1', name: 'Gula Pasir Gulaku 1kg', slug: 'gula-pasir-gulaku-1kg', price: 16000, stock: 20 },
  { id: 'p4', category_id: '2', name: 'Teh Pucuk Harum 350ml', slug: 'teh-pucuk-350ml', price: 3500, stock: 50 },
  { id: 'p5', category_id: '2', name: 'Aqua Botol 600ml', slug: 'aqua-600ml', price: 3000, stock: 100 },
  { id: 'p6', category_id: '3', name: 'Indomie Goreng', slug: 'indomie-goreng', price: 3000, stock: 200 },
  { id: 'p7', category_id: '3', name: 'Taro Snack Seaweed', slug: 'taro-seaweed', price: 5000, stock: 30 },
  { id: 'p8', category_id: '1', name: 'Telur Ayam 1kg', slug: 'telur-ayam-1kg', price: 28000, stock: 0 },
]

export function PosTemplate() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  
  const { addItem, getTotalItems } = usePosCartStore()
  const { mobileCartOpen, setMobileCartOpen } = usePosUiStore()
  
  const { processCheckout, isProcessing, successData, resetTransaction } = usePosTransaction()

  // Logic filter produk
  const filteredProducts = DUMMY_PRODUCTS.filter(p => {
    const matchCat = selectedCategory ? p.category_id === selectedCategory : true
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex h-full w-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-background min-w-0">
        <div className="p-4 border-b border-border bg-white space-y-3 z-10 shrink-0 shadow-sm">
          <ProductSearch onSearch={setSearchQuery} />
          <CategoryFilter 
            categories={DUMMY_CATEGORIES} 
            selectedId={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ProductGrid 
            products={filteredProducts} 
            onAddProduct={addItem} 
          />
        </div>
      </div>

      {/* Desktop Cart Sidebar */}
      <div className="hidden lg:block w-[350px] xl:w-[400px] border-l border-border h-full bg-white z-20 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
        <PosCart onCheckout={() => setPaymentModalOpen(true)} />
      </div>

      {/* Mobile Cart Sheet */}
      <Sheet open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0 border-t-0 sm:max-w-none flex flex-col rounded-t-2xl overflow-hidden">
          <SheetTitle className="sr-only">Keranjang Kasir</SheetTitle>
          <div className="flex-1 h-full overflow-hidden">
            <PosCart 
              className="h-full" 
              onCheckout={() => {
                setMobileCartOpen(false)
                setTimeout(() => setPaymentModalOpen(true), 300)
              }} 
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Cart FAB */}
      {!mobileCartOpen && getTotalItems() > 0 && (
        <div className="lg:hidden fixed bottom-20 right-4 z-40">
          <Button 
            size="lg"
            className="rounded-full shadow-xl shadow-primary/30 h-14 px-6 flex items-center gap-2 animate-in slide-in-from-bottom-10"
            onClick={() => setMobileCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold">{getTotalItems()} Item</span>
          </Button>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal 
        open={paymentModalOpen} 
        onOpenChange={setPaymentModalOpen}
        onProcess={processCheckout}
      />

      {/* Transaction Success Modal */}
      <TransactionSuccessModal 
        open={!!successData} 
        invoiceNumber={successData?.invoiceNumber}
        changeAmount={successData?.change}
        onClose={resetTransaction}
      />
    </div>
  )
}
