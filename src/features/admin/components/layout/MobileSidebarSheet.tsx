'use client';

import Link from 'next/link';
import { Store, LayoutDashboard, Package, FolderTree, Warehouse, ShoppingCart, CreditCard, BarChart3, Monitor, LogOut } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { AdminSidebarGroup } from './AdminSidebarGroup';
import { AdminSidebarItem } from './AdminSidebarItem';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'; // Optional if we want to hide title properly

import { usePathname } from 'next/navigation';

export const MobileSidebarSheet = () => {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useAdminUiStore();

  return (
    <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
      <SheetContent side="left" className="p-0 w-72 border-r-0 flex flex-col h-full bg-white">
        <SheetTitle className="sr-only">Navigasi Admin</SheetTitle>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-start border-b border-slate-200 px-4 shrink-0">
          <Link href="/admin" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3">
            <div className="bg-[#355872] p-2 rounded-lg shrink-0">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-[#0F172A] leading-tight truncate">Toko Sembako</span>
              <span className="text-xs text-slate-500 leading-tight">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-2">
          {/* We force sidebarExpanded to true for MobileSidebarItem context, 
              but since we reuse AdminSidebarGroup which reads from store, 
              we might have a slight issue if store says sidebarExpanded is false.
              Wait, the mobile sidebar always shows full width (288px), so we should 
              make sure AdminSidebarItem behaves expanded here.
              We can just conditionally override it or ensure it looks right. 
              Actually, the mobile sidebar always has enough width, so we don't need to collapse it. 
              Let's just use the store. If they collapsed it on desktop, it might affect mobile?
              Normally mobile and desktop state can be separate. But here we just render it. 
              To fix it, we should probably pass an `isMobile` prop to override, or just let it read store. 
              For now, let's just render the links directly. */}
          
          <div className="space-y-6">
            <div>
              <div className="px-4 mb-2">
                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Utama</h4>
              </div>
              <div className="space-y-1 px-2">
                <MobileSidebarItem label="Dashboard" href="/admin" icon={LayoutDashboard} onClick={() => setMobileSidebarOpen(false)} />
              </div>
            </div>

            <div>
              <div className="px-4 mb-2">
                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Kelola Toko</h4>
              </div>
              <div className="space-y-1 px-2">
                <MobileSidebarItem label="Katalog & Stok" href="/admin/products" icon={Package} badge={3} onClick={() => setMobileSidebarOpen(false)} />
                <MobileSidebarItem label="Kategori" href="/admin/categories" icon={FolderTree} onClick={() => setMobileSidebarOpen(false)} />
              </div>
            </div>

            <div>
              <div className="px-4 mb-2">
                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Transaksi</h4>
              </div>
              <div className="space-y-1 px-2">
                <MobileSidebarItem label="Pesanan" href="/admin/orders" icon={ShoppingCart} badge={5} onClick={() => setMobileSidebarOpen(false)} />
                <MobileSidebarItem label="Pembayaran" href="/admin/payments" icon={CreditCard} onClick={() => setMobileSidebarOpen(false)} />
                <MobileSidebarItem label="Laporan" href="/admin/reports" icon={BarChart3} onClick={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
            
            <div>
              <div className="px-4 mb-2">
                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Navigasi</h4>
              </div>
              <div className="space-y-1 px-2">
                <MobileSidebarItem label="Ke POS Kasir" href="/pos" icon={Monitor} onClick={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer / User Profile */}
        <div className="border-t border-slate-200 p-4 shrink-0 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300">
              <span className="font-semibold text-slate-600 text-sm">A</span>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-semibold text-slate-900 truncate">Admin User</span>
              <span className="text-xs text-slate-500 truncate">admin@toko.com</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function MobileSidebarItem({ label, href, icon: Icon, badge, onClick }: { label: string, href: string, icon: any, badge?: number, onClick: () => void }) {
  const pathname = usePathname();
  const isActive = href === '/admin' 
    ? pathname === '/admin' 
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
        isActive 
          ? "bg-[#7AAACE]/10 text-[#355872] font-medium" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-[#355872]" : "text-slate-500 group-hover:text-slate-700")} />
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full min-w-5 text-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
