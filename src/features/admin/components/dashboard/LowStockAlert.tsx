'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const lowStockItems = [
  { id: '1', name: 'Gula 1kg', category: 'Sembako', stock: 2, status: 'Habis' },
  { id: '2', name: 'Kecap Bango 500ml', category: 'Bumbu', stock: 1, status: 'Habis' },
  { id: '3', name: 'Beras Premium 5kg', category: 'Beras', stock: 3, status: 'Rendah' },
  { id: '4', name: 'Tepung Terigu 1kg', category: 'Sembako', stock: 4, status: 'Rendah' },
  { id: '5', name: 'Minyak Goreng 2L', category: 'Minyak', stock: 5, status: 'Rendah' },
];

export const LowStockAlert = () => {
  return (
    <Card className="col-span-1 shadow-sm border-amber-200 bg-amber-50/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Peringatan Stok
          </CardTitle>
          <CardDescription>Produk dengan stok &le; 5 unit</CardDescription>
        </div>
        <Link href="/admin/stock" className="text-sm text-[#7AAACE] font-medium hover:underline">
          Kelola &rarr;
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="px-2 py-3 font-semibold">Produk</th>
                <th className="px-2 py-3 font-semibold text-right">Stok</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-2 py-3">
                    <div className="font-medium text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.category}</div>
                  </td>
                  <td className="px-2 py-3 text-right">
                    <div className="flex justify-end">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full min-w-8 text-center ${
                        item.stock <= 2 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.stock}
                      </span>
                    </div>
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
