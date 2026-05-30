'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { usePosUiStore } from '@/stores/posUiStore'
import { useAuthStore } from '@/stores/authStore'
import { LayoutDashboard, ShoppingCart, ReceiptText, LogOut, Store, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PosSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { sidebarCollapsed, toggleSidebar } = usePosUiStore()
  const logout = useAuthStore(state => state.logout)

  const currentUser = useAuthStore(state => state.currentUser)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navItems = [
    { name: 'Kasir', href: '/pos', icon: ShoppingCart },
    { name: 'Riwayat Transaksi', href: '/pos/history', icon: ReceiptText },
  ]

  // Get initials for avatar (e.g. Arief Wira -> AW)
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
    <aside className={cn(
      "hidden lg:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] relative border-r border-sidebar-border h-full shrink-0",
      sidebarCollapsed ? "w-[80px]" : "w-[240px]"
    )}>
{/* Unified Header */}
      <div className="flex h-16 items-center px-4 relative border-b border-sidebar-border shrink-0 overflow-hidden">
        
        {/* Left Logo + Text Area */}
        <button
          onClick={() => sidebarCollapsed && toggleSidebar()}
          disabled={!sidebarCollapsed}
          className={cn(
            "group relative flex items-center text-left outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 rounded-lg pl-[14px] py-2",
            // 👇 PERBAIKAN DI SINI: Lebar diatur sesuai kondisi, tidak dikunci permanen
            sidebarCollapsed 
              ? "w-[48px] hover:bg-sidebar-accent cursor-pointer text-sidebar-primary" // Pas seukuran ikon saat ciut
              : "w-full min-w-[200px] text-sidebar-foreground bg-transparent" // Lebar penuh saat terbuka
          )}
          title={sidebarCollapsed ? "Buka Sidebar" : undefined}
        >
          {/* Store Logo */}
          <Store className={cn(
            "h-6 w-6 text-sidebar-primary shrink-0 relative",
            sidebarCollapsed ? "group-hover:opacity-0" : ""
          )} />
          
          {/* PanelLeftOpen */}
          {sidebarCollapsed && (
            <PanelLeftOpen className="w-5 h-5 absolute left-[14px] top-1/2 -translate-y-1/2 text-sidebar-foreground opacity-0 group-hover:opacity-100" />
          )}

          {/* Text label */}
          <span className={cn(
            "font-heading font-bold text-base whitespace-nowrap block ml-2",
            sidebarCollapsed ? "opacity-0 hidden" : "opacity-100" // Tambahan 'hidden' agar teks benar-benar hilang saat ditutup
          )}>
            POS Toko
          </span>
        </button>

        {/* Right Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] focus-visible:ring-2 focus-visible:ring-sidebar-primary outline-none shrink-0 cursor-pointer",
            sidebarCollapsed ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"
          )}
          title="Tutup Sidebar"
        >
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-2 p-4 overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg py-2.5 px-[14px] transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground overflow-hidden w-full",
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={cn(
                "font-sans font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] whitespace-nowrap block ml-3",
                sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Admin Link Section */}
      <div className="border-t border-sidebar-border p-4 shrink-0 overflow-hidden">
        <Link
          href="/admin"
          className={cn(
            "flex items-center rounded-lg py-2.5 px-[14px] transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] hover:bg-sidebar-accent text-sidebar-foreground overflow-hidden w-full"
          )}
          title={sidebarCollapsed ? "Dashboard Admin" : undefined}
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          <span className={cn(
            "font-sans font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.3,0,0,1)] whitespace-nowrap block ml-3",
            sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            Admin
          </span>
        </Link>
      </div>

      {/* User Info & Logout Section */}
      <div 
        className={cn(
          "border-t border-sidebar-border p-4 flex overflow-hidden shrink-0",
          sidebarCollapsed ? "flex-col items-center gap-4" : "items-center justify-between"
        )}
      >
        <div 
          className="flex items-center gap-3 min-w-0"
          title={sidebarCollapsed ? (currentUser?.name || 'Arief Wira') : undefined}
        >
          {/* Avatar Circle */}
          <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-white text-sm font-semibold shrink-0 select-none shadow-sm">
            {currentUser?.name ? getInitials(currentUser.name) : 'AW'}
          </div>
          
          {/* User Details */}
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-semibold text-sm text-sidebar-foreground truncate leading-normal">
                {currentUser?.name || 'Arief Wira'}
              </span>
              <span className="font-sans text-xs text-sidebar-foreground opacity-70 mt-0.5 leading-none truncate">
                {currentUser?.email || 'admin@pos.com'}
              </span>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={cn(
            "text-sidebar-foreground opacity-70 hover:opacity-100 hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors shrink-0",
            sidebarCollapsed ? "p-2 w-9 h-9 flex items-center justify-center" : "p-2"
          )}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}