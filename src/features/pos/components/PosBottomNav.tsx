'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, ReceiptText, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PosBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Kasir', href: '/pos', icon: ShoppingCart },
    { name: 'Riwayat', href: '/pos/history', icon: ReceiptText },
    { name: 'Admin', href: '/admin', icon: LayoutDashboard },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-6 py-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary-light"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px] font-semibold">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
