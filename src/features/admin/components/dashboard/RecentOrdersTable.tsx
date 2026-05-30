import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatRupiah } from '@/utils/currency';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const recentOrders = [
  { id: 'INV-260526-001', customer: 'Budi Santoso', total: 162000, status: 'Pending', date: new Date() },
  { id: 'INV-260526-002', customer: 'Sari Ayu', total: 85500, status: 'Verifikasi', date: new Date() },
  { id: 'INV-260525-001', customer: 'Ahmad M', total: 230000, status: 'Proses', date: new Date(Date.now() - 86400000) },
  { id: 'INV-260525-002', customer: 'Dewi', total: 45000, status: 'Dikirim', date: new Date(Date.now() - 86400000) },
  { id: 'INV-260525-003', customer: 'Rina', total: 120000, status: 'Selesai', date: new Date(Date.now() - 86400000) },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-amber-100 text-amber-700';
    case 'Verifikasi': return 'bg-blue-100 text-blue-700';
    case 'Proses': return 'bg-indigo-100 text-indigo-700';
    case 'Dikirim': return 'bg-purple-100 text-purple-700';
    case 'Selesai': return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

export const RecentOrdersTable = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-slate-800">Order Terbaru</CardTitle>
          <CardDescription>5 transaksi e-commerce terakhir</CardDescription>
        </div>
        <Link href="/admin/orders" className="text-sm text-[#7AAACE] font-medium hover:underline">
          Lihat Semua &rarr;
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Invoice</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Tanggal</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{order.id}</td>
                  <td className="px-4 py-3 text-slate-600">{order.customer}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {format(order.date, 'dd MMM yyyy', { locale: id })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-700">
                    {formatRupiah(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
