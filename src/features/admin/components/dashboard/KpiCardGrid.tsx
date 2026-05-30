import { ShoppingBag, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';
import { KpiCard } from './KpiCard';
import { formatRupiah } from '@/utils/currency';

interface KpiData {
  totalTransactions: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockItems: number;
}

export const KpiCardGrid = ({ data, loading }: { data?: KpiData, loading?: boolean }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <KpiCard
        title="Total Transaksi"
        value={data?.totalTransactions || 0}
        trend={{ value: 12, direction: 'up' }}
        icon={ShoppingCart}
        iconColor="bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
        loading={loading}
      />
      <KpiCard
        title="Total Order E-Commerce"
        value={data?.totalOrders || 0}
        trend={{ value: 8, direction: 'up' }}
        icon={ShoppingBag}
        iconColor="bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
        loading={loading}
      />
      <KpiCard
        title="Total Pendapatan"
        value={data ? formatRupiah(data.totalRevenue) : 'Rp 0'}
        trend={{ value: 15, direction: 'up' }}
        icon={DollarSign}
        iconColor="bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
        loading={loading}
      />
      <KpiCard
        title="Produk Hampir Habis"
        value={data?.lowStockItems || 0}
        trend={{ value: 2, direction: 'down' }}
        icon={AlertTriangle}
        iconColor="bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
        loading={loading}
      />
    </div>
  );
};
