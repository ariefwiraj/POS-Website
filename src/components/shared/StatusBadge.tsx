import { cn } from '@/lib/utils';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-700',
};

export const StatusBadge = ({ status, variant = 'default', className }: StatusBadgeProps) => {
  return (
    <span className={cn(
      "px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center justify-center min-w-16",
      variantStyles[variant],
      className
    )}>
      {status}
    </span>
  );
};

export const getStatusVariant = (status: string): StatusVariant => {
  const s = status.toLowerCase();
  if (s === 'aktif' || s === 'aman' || s === 'selesai' || s === 'success') return 'success';
  if (s === 'hampir habis' || s === 'rendah' || s === 'pending') return 'warning';
  if (s === 'habis' || s === 'nonaktif' || s === 'ditolak' || s === 'failed') return 'danger';
  if (s === 'proses' || s === 'dikirim' || s === 'verifikasi') return 'info';
  return 'default';
};
