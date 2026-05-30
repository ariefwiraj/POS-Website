'use client';

import { Menu } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';

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
      </div>
    </header>
  );
};
