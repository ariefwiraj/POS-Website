'use client'

import { usePathname } from 'next/navigation'
import { Store, UserCircle } from 'lucide-react'

export function PosTopBar() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    if (pathname === '/pos') return 'POS Kasir'
    if (pathname === '/pos/history') return 'Riwayat Transaksi'
    if (pathname.includes('/pos/receipt')) return 'Struk Digital'
    return 'POS Toko'
  }

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full bg-primary text-primary-foreground h-14 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Store className="h-5 w-5" />
        <span className="font-heading font-semibold text-lg">{getPageTitle()}</span>
      </div>
      <button className="rounded-full p-1 hover:bg-primary-light transition-colors">
        <UserCircle className="h-6 w-6" />
      </button>
    </header>
  )
}
