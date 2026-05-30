'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from 'react';

const routeNameMap: Record<string, string> = {
  admin: 'Dashboard',
  products: 'Produk',
  categories: 'Kategori',
  stock: 'Stok',
  orders: 'Pesanan',
  payments: 'Pembayaran',
  reports: 'Laporan',
  create: 'Tambah Baru',
  edit: 'Edit',
};

export const AdminBreadcrumb = () => {
  const pathname = usePathname();
  
  if (pathname === '/admin') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-slate-800 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const paths = pathname.split('/').filter(p => p !== '' && p !== 'admin');
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const href = `/admin/${paths.slice(0, index + 1).join('/')}`;
          
          // Try to get a friendly name, or use the raw path if it's an ID
          const friendlyName = routeNameMap[path] || (path.length > 15 ? 'Detail' : path);

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-slate-800 capitalize">
                    {friendlyName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">{friendlyName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
