'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

interface ProductSearchProps {
  onSearch: (query: string) => void
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300) // Debounce 300ms
    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <Input
        type="search"
        className="pl-10 h-12 w-full bg-white shadow-sm border-border focus-visible:ring-primary-light"
        placeholder="Cari nama produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
