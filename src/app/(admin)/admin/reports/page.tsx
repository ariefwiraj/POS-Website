'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { RevenueChart } from '@/features/admin/components/dashboard/RevenueChart';
import { PaymentMethodChart } from '@/features/admin/components/dashboard/PaymentMethodChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRupiah } from '@/utils/currency';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      // Simulate file download trigger
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,Tanggal,Total\n2026-05-26,150000';
      link.download = `laporan_penjualan_${dateRange}.csv`;
      link.click();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan Penjualan"
        description="Analisis performa penjualan, pendapatan, dan tren bisnis Anda."
        action={
          <Button 
            onClick={handleExport} 
            disabled={exporting}
            variant="outline" 
            className="border-slate-300 text-slate-700 bg-white"
          >
            {exporting ? (
              <>Mengekspor...</>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </>
            )}
          </Button>
        }
      />

      <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 inline-flex mb-2">
        <Button variant={dateRange === 'today' ? 'default' : 'ghost'} onClick={() => setDateRange('today')} className={dateRange === 'today' ? 'bg-slate-100 text-slate-900 shadow-none' : 'text-slate-500'}>Hari Ini</Button>
        <Button variant={dateRange === '7days' ? 'default' : 'ghost'} onClick={() => setDateRange('7days')} className={dateRange === '7days' ? 'bg-slate-100 text-slate-900 shadow-none' : 'text-slate-500'}>7 Hari</Button>
        <Button variant={dateRange === '30days' ? 'default' : 'ghost'} onClick={() => setDateRange('30days')} className={dateRange === '30days' ? 'bg-slate-100 text-slate-900 shadow-none' : 'text-slate-500'}>30 Hari</Button>
        <Button variant={dateRange === 'custom' ? 'default' : 'ghost'} onClick={() => setDateRange('custom')} className={dateRange === 'custom' ? 'bg-slate-100 text-slate-900 shadow-none' : 'text-slate-500'}>Kustom</Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-transparent h-10 w-full justify-start gap-4 mb-4 border-b border-slate-200 rounded-none px-0">
          <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-4 font-medium text-slate-500">Ringkasan</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-4 font-medium text-slate-500">Produk Terlaris</TabsTrigger>
          <TabsTrigger value="pos" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-4 font-medium text-slate-500">Kasir (POS)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 m-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#355872] text-white p-6 rounded-xl shadow-sm">
              <h3 className="text-blue-100 text-sm font-semibold mb-2">Total Pendapatan</h3>
              <div className="text-3xl font-bold">{formatRupiah(14200000)}</div>
              <div className="text-xs text-blue-200 mt-2">↑ 12.5% vs periode sebelumnya</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-sm font-semibold mb-2">Total Pesanan E-Commerce</h3>
              <div className="text-3xl font-bold text-slate-900">142</div>
              <div className="text-xs text-green-600 mt-2 font-medium">↑ 8.2% vs periode sebelumnya</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-sm font-semibold mb-2">Rata-rata Nilai Order</h3>
              <div className="text-3xl font-bold text-slate-900">{formatRupiah(100000)}</div>
              <div className="text-xs text-slate-400 mt-2 font-medium">Sama dengan periode sebelumnya</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueChart />
            <PaymentMethodChart />
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="m-0 focus-visible:outline-none">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Produk</th>
                  <th className="px-6 py-4 font-semibold text-center">Terjual</th>
                  <th className="px-6 py-4 font-semibold text-right">Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Beras Premium 5kg', sold: 45, rev: 45 * 65000 },
                  { name: 'Minyak Goreng 2L', sold: 38, rev: 38 * 32000 },
                  { name: 'Gula Pasir 1kg', sold: 32, rev: 32 * 14500 },
                  { name: 'Indomie Goreng', sold: 120, rev: 120 * 3500 },
                  { name: 'Kopi Kapal Api', sold: 25, rev: 25 * 15000 },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-center font-semibold text-blue-600">{item.sold}</td>
                    <td className="px-6 py-4 text-right text-slate-700 font-medium">{formatRupiah(item.rev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="pos" className="m-0 focus-visible:outline-none">
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm text-center p-6">
            <FileText className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="font-bold text-slate-700 text-lg">Laporan POS Belum Tersedia</h3>
            <p className="text-slate-500 max-w-sm mt-2">Data transaksi dari mesin kasir (POS) akan muncul di sini setelah sinkronisasi aktif.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
