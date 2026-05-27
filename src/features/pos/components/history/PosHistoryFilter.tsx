'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface PosHistoryFilterProps {
  onSearch: (query: string) => void
  onDateChange: (date: string) => void
  onMethodChange: (method: string) => void
}

export function PosHistoryFilter({ onSearch, onDateChange, onMethodChange }: PosHistoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Cari No. Invoice..." 
          className="pl-9 h-10 bg-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Input 
          type="date" 
          className="h-10 bg-white w-full sm:w-40"
          onChange={(e) => onDateChange(e.target.value)}
        />
        <Select onValueChange={(v: any) => onMethodChange(v === 'all' ? '' : v)}>
          <SelectTrigger className="h-10 w-full sm:w-40 bg-white">
            <SelectValue placeholder="Semua Metode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Metode</SelectItem>
            <SelectItem value="cash">Tunai</SelectItem>
            <SelectItem value="qris">QRIS</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
