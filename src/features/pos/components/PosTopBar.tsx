'use client'

import { usePathname } from 'next/navigation'
import { Store } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export function PosTopBar() {
  const pathname = usePathname()
  const currentUser = useAuthStore(state => state.currentUser)
  
  const getPageTitle = () => {
    if (pathname === '/pos') return 'POS Kasir'
    if (pathname === '/pos/history') return 'Riwayat Transaksi'
    if (pathname.includes('/pos/receipt')) return 'Struk Digital'
    return 'POS Toko'
  }

  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .trim()
      .split(/\s+/)
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full bg-primary text-primary-foreground h-14 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Store className="h-5 w-5" />
        <span className="font-heading font-semibold text-lg">{getPageTitle()}</span>
      </div>
      <div 
        className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white text-xs font-bold select-none border border-white/10"
        title={currentUser?.name || 'Arief Wira'}
      >
        {currentUser?.name ? getInitials(currentUser.name) : 'AW'}
      </div>
    </header>
  )
}
