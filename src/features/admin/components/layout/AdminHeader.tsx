'use client';

import { Menu, Search } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { AdminBreadcrumb } from './AdminBreadcrumb';
import { NotificationDropdown } from './NotificationDropdown';
import { AdminUserMenu } from './AdminUserMenu';

export const AdminHeader = () => {
  const { toggleSidebar, setMobileSidebarOpen } = useAdminUiStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden md:block p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <AdminBreadcrumb />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden md:flex relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#7AAACE] focus:border-transparent w-48 lg:w-64 transition-all"
          />
        </div>
        
        <NotificationDropdown />
        
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
        
        <AdminUserMenu />
      </div>
    </header>
  );
};
