import { KpiCardGrid } from '@/features/admin/components/dashboard/KpiCardGrid';
import { RevenueChart } from '@/features/admin/components/dashboard/RevenueChart';
import { PaymentMethodChart } from '@/features/admin/components/dashboard/PaymentMethodChart';
import { RecentOrdersTable } from '@/features/admin/components/dashboard/RecentOrdersTable';
import { LowStockAlert } from '@/features/admin/components/dashboard/LowStockAlert';

export default function AdminDashboardPage() {
  // Hardcoded mock data for MVP design
  const mockKpiData = {
    totalTransactions: 24,
    totalOrders: 12,
    totalRevenue: 2450000,
    lowStockItems: 5,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Ringkasan operasional toko Anda hari ini.</p>
      </div>

      {/* KPI Cards */}
      <KpiCardGrid data={mockKpiData} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <PaymentMethodChart />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersTable />
        <LowStockAlert />
      </div>
    </div>
  );
}
