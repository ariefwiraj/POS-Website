'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
  products: 'Katalog & Stok',
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
  const paths = pathname.split('/').filter(p => p !== '' && p !== 'admin');
  
  if (pathname === '/admin' || paths.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const href = `/admin/${paths.slice(0, index + 1).join('/')}`;
          
          // Try to get a friendly name, or use the raw path if it's an ID
          const friendlyName = routeNameMap[path] || (path.length > 15 ? 'Detail' : path);
          const isLinkable = !!routeNameMap[path];

          return (
            <React.Fragment key={path}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-slate-800 capitalize">
                    {friendlyName}
                  </BreadcrumbPage>
                ) : isLinkable ? (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">{friendlyName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize text-slate-400 font-normal">
                    {friendlyName}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
