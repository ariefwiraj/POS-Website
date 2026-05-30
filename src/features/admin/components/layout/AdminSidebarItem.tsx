'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { useAdminUiStore } from '@/stores/adminUiStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const { sidebarExpanded } = useAdminUiStore();

  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
        isActive 
          ? "bg-[#7AAACE]/10 text-[#355872] font-medium" 
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
        !sidebarExpanded && "justify-center px-0"
      )}
    >
      <div className="relative">
        <Icon className={cn("w-5 h-5", isActive ? "text-[#355872]" : "text-slate-500 group-hover:text-slate-700")} />
        {/* Mobile/Collapsed Badge */}
        {badge !== undefined && badge > 0 && !sidebarExpanded && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
        )}
      </div>
      
      {sidebarExpanded && (
        <span className="flex-1 truncate">{label}</span>
      )}

      {/* Expanded Badge */}
      {badge !== undefined && badge > 0 && sidebarExpanded && (
        <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full min-w-5 text-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
      
    </Link>
  );

  if (!sidebarExpanded) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            {label}
            {badge !== undefined && badge > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
