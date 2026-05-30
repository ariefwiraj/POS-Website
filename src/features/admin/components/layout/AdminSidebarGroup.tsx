'use client';

import { ReactNode } from 'react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { cn } from '@/lib/utils';

interface AdminSidebarGroupProps {
  label: string;
  children: ReactNode;
}

export const AdminSidebarGroup = ({ label, children }: AdminSidebarGroupProps) => {
  const { sidebarExpanded } = useAdminUiStore();

  return (
    <div className="mb-6 last:mb-0">
      {sidebarExpanded ? (
        <div className="px-4 mb-2">
          <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {label}
          </h4>
        </div>
      ) : (
        <div className="px-4 mb-2 flex justify-center">
          <div className="h-px w-6 bg-slate-200" />
        </div>
      )}
      <div className="space-y-1 px-2">
        {children}
      </div>
    </div>
  );
};
