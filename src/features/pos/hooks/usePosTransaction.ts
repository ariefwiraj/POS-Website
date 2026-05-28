'use client'

import { useState } from 'react'
import { posTransactionService } from '../services/posTransactionService'
import { usePosCartStore } from '@/stores/posCartStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'sonner'

export function usePosTransaction() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [successData, setSuccessData] = useState<{ invoiceNumber: string, change: number } | null>(null)
  
  const { items, getTotalPrice, paymentMethod, cashReceived, getChange, clearCart } = usePosCartStore()
  const { addTransaction } = useTransactionStore()
  const { currentUser } = useAuthStore()

  const processCheckout = async () => {
    if (items.length === 0) {
      toast.error('Keranjang kosong', { description: 'Tambahkan produk terlebih dahulu' })
      return
    }

    // Validate Stock Before Submit
    const outOfStockItems = items.filter(item => item.quantity > item.stock)
    if (outOfStockItems.length > 0) {
      toast.error('Stok tidak mencukupi', { 
        description: `Produk ${outOfStockItems.map(i => i.name).join(', ')} melebihi stok yang tersedia.` 
      })
      return
    }

    setIsProcessing(true)
    
    // Cek apakah Supabase sudah dikonfigurasi
    const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url'
    
    try {
      let invoice = ''
      const changeAmount = getChange()
      
      if (hasSupabase) {
        const result = await posTransactionService.processTransaction({
          items,
          totalPrice: getTotalPrice(),
          paymentMethod,
          cashReceived
        })
        invoice = result.invoiceNumber
      } else {
        // Fallback dummy success jika backend belum connect (UI Development Mode)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const date = new Date()
        invoice = `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-MOCK`
        
        // Save to local storage mock backend
        addTransaction({
          id: invoice,
          items,
          totalPrice: getTotalPrice(),
          paymentMethod,
          cashReceived,
          change: changeAmount,
          cashierName: currentUser?.name || 'Kasir (Demo)',
        })
      }

      setSuccessData({ invoiceNumber: invoice, change: changeAmount })
      clearCart()
      toast.success('Transaksi Berhasil', { description: `No. Invoice: ${invoice}` })
      
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error('Gagal memproses transaksi', { description: error.message || 'Terjadi kesalahan sistem' })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetTransaction = () => {
    setSuccessData(null)
  }

  return {
    processCheckout,
    isProcessing,
    successData,
    resetTransaction
  }
}
