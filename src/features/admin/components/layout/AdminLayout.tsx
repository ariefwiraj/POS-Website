import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { MobileSidebarSheet } from './MobileSidebarSheet';

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#F7F8F0] text-slate-900 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <AdminSidebar />
      
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
