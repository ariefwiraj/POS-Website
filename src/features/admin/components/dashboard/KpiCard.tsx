import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon: LucideIcon;
  iconColor: string;
  loading?: boolean;
}

export const KpiCard = ({ title, value, trend, icon: Icon, iconColor, loading }: KpiCardProps) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#7AAACE] transition-all duration-200 flex flex-col gap-3 group">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
        <div className={cn("p-2 rounded-lg transition-colors", iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-[#355872] transition-colors">
        {value}
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 mt-1">
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            trend.direction === 'up' ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
          )}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="text-xs text-slate-500">vs hari kemarin</span>
        </div>
      )}
    </div>
  );
};
