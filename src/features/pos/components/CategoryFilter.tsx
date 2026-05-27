'use client'

import { Category } from '../types/pos.types'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex gap-2 relative">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary-light outline-none select-none",
            selectedId === null 
              ? "text-primary-foreground" 
              : "bg-white text-secondary-foreground border border-border hover:bg-secondary hover:text-primary"
          )}
        >
          {selectedId === null && (
            <motion.span
              layoutId="activeCategoryBubble"
              className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">Semua Produk</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary-light outline-none select-none",
              selectedId === cat.id 
                ? "text-primary-foreground" 
                : "bg-white text-secondary-foreground border border-border hover:bg-secondary hover:text-primary"
            )}
          >
            {selectedId === cat.id && (
              <motion.span
                layoutId="activeCategoryBubble"
                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
