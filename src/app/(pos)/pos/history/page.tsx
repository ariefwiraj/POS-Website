'use client'

import { useState } from 'react'
import { PosHistoryTable } from '@/features/pos/components/history/PosHistoryTable'
import { PosHistoryFilter } from '@/features/pos/components/history/PosHistoryFilter'
import { PosHistorySummary } from '@/features/pos/components/history/PosHistorySummary'
import { PosTransaction } from '@/features/pos/types/pos.types'

const DUMMY_HISTORY: PosTransaction[] = [
  { id: '1', invoice_number: 'INV-20260527-1001', total_price: 150000, payment_method: 'cash', created_at: '2026-05-27T10:30:00Z' },
  { id: '2', invoice_number: 'INV-20260527-1002', total_price: 45000, payment_method: 'qris', created_at: '2026-05-27T11:15:00Z' },
  { id: '3', invoice_number: 'INV-20260527-1003', total_price: 320000, payment_method: 'transfer', created_at: '2026-05-27T14:20:00Z' },
  { id: '4', invoice_number: 'INV-20260526-1004', total_price: 75000, payment_method: 'cash', created_at: '2026-05-26T09:10:00Z' },
  { id: '5', invoice_number: 'INV-20260526-1005', total_price: 125000, payment_method: 'cash', created_at: '2026-05-26T16:45:00Z' },
]

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [method, setMethod] = useState('')
  const [date, setDate] = useState('')

  const filteredData = DUMMY_HISTORY.filter(tx => {
    const matchSearch = tx.invoice_number.toLowerCase().includes(search.toLowerCase())
    const matchMethod = method ? tx.payment_method === method : true
    const matchDate = date ? tx.created_at.startsWith(date) : true
    return matchSearch && matchMethod && matchDate
  })

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full pb-24 lg:pb-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-heading font-bold text-foreground">Riwayat Transaksi</h1>
        <p className="text-muted-foreground text-sm font-medium">Lihat dan kelola riwayat penjualan toko Anda.</p>
      </div>

      <PosHistorySummary transactions={filteredData} />
      
      <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-border shadow-sm">
        <PosHistoryFilter 
          onSearch={setSearch} 
          onDateChange={setDate} 
          onMethodChange={setMethod} 
        />
        <PosHistoryTable transactions={filteredData} />
      </div>
    </div>
  )
}
