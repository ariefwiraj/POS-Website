'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { MobileSidebarSheet } from './MobileSidebarSheet';
import { useAdminUiStore } from '@/stores/adminUiStore';

export const AdminLayout = ({ 
  children,
  initialSidebarExpanded
}: { 
  children: ReactNode,
  initialSidebarExpanded: boolean
}) => {
  // Synchronously set initial state in Zustand store during the render phase (runs on both Server and Client)
  const initialized = useRef(false);
  if (!initialized.current) {
    useAdminUiStore.setState({ sidebarExpanded: initialSidebarExpanded });
    initialized.current = true;
  }

  const { setSidebarExpanded } = useAdminUiStore();

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-expanded');
    if (saved !== null) {
      setSidebarExpanded(saved === 'true');
    }
  }, [setSidebarExpanded]);

  return (
    <div className="flex h-screen bg-[#F7F8F0] text-slate-900 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <AdminSidebar initialSidebarExpanded={initialSidebarExpanded} />
      
      {/* Mobile Sidebar */}
      <MobileSidebarSheet />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
