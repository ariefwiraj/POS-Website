import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { AdminLayout } from '@/features/admin/components/layout/AdminLayout';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const sidebarExpandedCookie = cookieStore.get('admin-sidebar-expanded');
  
  // Default to true if cookie is not set
  const initialSidebarExpanded = sidebarExpandedCookie 
    ? sidebarExpandedCookie.value === 'true' 
    : true;

  return (
    <AdminLayout initialSidebarExpanded={initialSidebarExpanded}>
      {children}
    </AdminLayout>
  );
}
