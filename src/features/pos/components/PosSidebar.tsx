'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePosUiStore } from '@/stores/posUiStore'
import { LayoutDashboard, ShoppingCart, ReceiptText, ChevronLeft, ChevronRight, LogOut, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PosSidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = usePosUiStore()

  const navItems = [
    { name: 'Kasir', href: '/pos', icon: ShoppingCart },
    { name: 'Riwayat Transaksi', href: '/pos/history', icon: ReceiptText },
  ]

  return (
    <aside className={cn(
      "hidden lg:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 relative border-r border-sidebar-border h-full",
      sidebarCollapsed ? "w-[80px]" : "w-[240px]"
    )}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border p-4">
        <Store className="h-8 w-8 text-sidebar-primary" />
        {!sidebarCollapsed && <span className="ml-3 font-heading font-bold text-lg">POS Toko</span>}
      </div>
      
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-sidebar-primary text-sidebar-primary-foreground rounded-full p-1 shadow-md hover:bg-sidebar-accent"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
                sidebarCollapsed ? "justify-center" : "justify-start"
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className={cn("h-5 w-5", sidebarCollapsed ? "mr-0" : "mr-3")} />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Link
          href="/admin"
          className={cn(
            "flex items-center rounded-lg px-3 py-2.5 transition-colors hover:bg-sidebar-accent text-sidebar-foreground",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}
          title={sidebarCollapsed ? "Dashboard Admin" : undefined}
        >
          <LayoutDashboard className={cn("h-5 w-5", sidebarCollapsed ? "mr-0" : "mr-3")} />
          {!sidebarCollapsed && <span>Admin</span>}
        </Link>
        <button
          className={cn(
            "w-full flex items-center rounded-lg px-3 py-2.5 transition-colors hover:bg-destructive hover:text-destructive-foreground text-sidebar-foreground",
            sidebarCollapsed ? "justify-center" : "justify-start"
          )}
          title={sidebarCollapsed ? "Logout" : undefined}
        >
          <LogOut className={cn("h-5 w-5", sidebarCollapsed ? "mr-0" : "mr-3")} />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
