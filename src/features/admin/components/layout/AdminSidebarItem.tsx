'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarContext } from './AdminSidebar';

interface AdminSidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const AdminSidebarItem = ({ label, href, icon: Icon, badge }: AdminSidebarItemProps) => {
  const pathname = usePathname();
  const isActive = href === '/admin' 
    ? pathname === '/admin' 
    : pathname === href || pathname.startsWith(`${href}/`);
  const { sidebarExpanded } = useContext(SidebarContext);

  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md transition-all duration-200 group relative",
        // Base Layout
        sidebarExpanded 
          ? "gap-3 px-3 py-2 w-full" 
          : "w-10 h-10 justify-center",
        // Expanded Inactive State
        sidebarExpanded && !isActive && "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
        // Expanded Active State
        sidebarExpanded && isActive && "bg-[#7AAACE]/10 text-[#355872] hover:bg-[#7AAACE]/20 font-semibold shadow-sm",
        // Collapsed Inactive State
        !sidebarExpanded && !isActive && "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
        // Collapsed Active State
        !sidebarExpanded && isActive && "bg-[#355872] text-white hover:bg-[#355872]/90 shadow-md rounded-lg"
      )}
    >
      <div className="relative flex items-center justify-center">
        <Icon className={cn(
          "w-5 h-5 transition-transform duration-200 group-hover:scale-105", 
          isActive 
            ? (sidebarExpanded ? "text-[#355872]" : "text-white") 
            : "text-slate-500 group-hover:text-slate-700"
        )} />
        {/* Mobile/Collapsed Badge */}
        {badge !== undefined && badge > 0 && !sidebarExpanded && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </div>
      
      {sidebarExpanded && (
        <span className="flex-1 truncate text-sm">{label}</span>
      )}

      {/* Expanded Badge */}
      {badge !== undefined && badge > 0 && sidebarExpanded && (
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full min-w-5 text-center transition-all">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );

  if (!sidebarExpanded) {
    return (
      <div className="w-full flex justify-center py-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2 font-medium bg-slate-900 text-white border border-slate-800 shadow-md">
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return content;
};
