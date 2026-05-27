'use client'

import { formatRupiah } from '@/utils/currency'
import { PosTransaction } from '../../types/pos.types'
import { Card, CardContent } from '@/components/ui/card'
import { Banknote, Receipt, ArrowUpRight } from 'lucide-react'

interface PosHistorySummaryProps {
  transactions: PosTransaction[]
}

export function PosHistorySummary({ transactions }: PosHistorySummaryProps) {
  const totalOmzet = transactions.reduce((acc, curr) => acc + curr.total_price, 0)
  const totalTransaksi = transactions.length
  const rataRata = totalTransaksi > 0 ? totalOmzet / totalTransaksi : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="shadow-sm border-border">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Total Omzet</p>
            <h3 className="text-2xl font-heading font-bold text-foreground mt-1">{formatRupiah(totalOmzet)}</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <Banknote className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-border">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Total Transaksi</p>
            <h3 className="text-2xl font-heading font-bold text-foreground mt-1">{totalTransaksi}</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <Receipt className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="hidden lg:block shadow-sm bg-gradient-to-br from-primary to-primary-light text-primary-foreground border-none">
        <CardContent className="p-5 flex flex-col justify-center h-full">
          <p className="text-sm font-semibold opacity-90">Rata-rata Transaksi</p>
          <div className="flex items-center mt-1">
            <h3 className="text-2xl font-heading font-bold">
              {formatRupiah(rataRata)}
            </h3>
            <ArrowUpRight className="w-5 h-5 ml-2 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
