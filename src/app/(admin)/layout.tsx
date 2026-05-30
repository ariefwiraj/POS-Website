import { ReactNode } from 'react';
import { AdminLayout } from '@/features/admin/components/layout/AdminLayout';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
