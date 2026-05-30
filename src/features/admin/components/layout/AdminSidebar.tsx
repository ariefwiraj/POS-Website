'use client';

import Link from 'next/link';
import { Store, LayoutDashboard, Package, FolderTree, Warehouse, ShoppingCart, CreditCard, BarChart3, Monitor, LogOut } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { cn } from '@/lib/utils';
import { AdminSidebarGroup } from './AdminSidebarGroup';
import { AdminSidebarItem } from './AdminSidebarItem';

export const AdminSidebar = () => {
  const { sidebarExpanded } = useAdminUiStore();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-200 ease-in-out z-20",
        sidebarExpanded ? "w-[260px]" : "w-[72px]"
      )}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-slate-200 px-4 shrink-0">
        <Link href="/admin" className="flex items-center gap-3 w-full justify-center">
          <div className="bg-[#355872] p-2 rounded-lg shrink-0">
            <Store className="w-5 h-5 text-white" />
          </div>
          {sidebarExpanded && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-[#0F172A] leading-tight truncate">Toko Sembako</span>
              <span className="text-xs text-slate-500 leading-tight">Admin Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <AdminSidebarGroup label="Utama">
          <AdminSidebarItem label="Dashboard" href="/admin" icon={LayoutDashboard} />
        </AdminSidebarGroup>

        <AdminSidebarGroup label="Kelola Toko">
          <AdminSidebarItem label="Katalog & Stok" href="/admin/products" icon={Package} badge={3} />
          <AdminSidebarItem label="Kategori" href="/admin/categories" icon={FolderTree} />
        </AdminSidebarGroup>

        <AdminSidebarGroup label="Transaksi">
          <AdminSidebarItem label="Pesanan" href="/admin/orders" icon={ShoppingCart} badge={5} />
          <AdminSidebarItem label="Pembayaran" href="/admin/payments" icon={CreditCard} />
          <AdminSidebarItem label="Laporan" href="/admin/reports" icon={BarChart3} />
        </AdminSidebarGroup>

        <AdminSidebarGroup label="Navigasi">
          <AdminSidebarItem label="Ke POS Kasir" href="/pos" icon={Monitor} />
        </AdminSidebarGroup>
      </div>

      {/* Footer / User Profile */}
      <div className="border-t border-slate-200 p-4 shrink-0">
        <div className={cn("flex items-center", sidebarExpanded ? "gap-3" : "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
            <span className="font-semibold text-slate-600 text-sm">A</span>
          </div>
          {sidebarExpanded && (
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-semibold text-slate-900 truncate">Admin User</span>
              <span className="text-xs text-slate-500 truncate">admin@toko.com</span>
            </div>
          )}
          {sidebarExpanded && (
            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
