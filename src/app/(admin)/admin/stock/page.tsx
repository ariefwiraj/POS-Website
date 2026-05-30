'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, Package, TrendingDown, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { useProducts, Product } from '@/features/admin/hooks/useProducts';

export default function StockMonitoringPage() {
  const { products, loading } = useProducts();

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Nama Produk',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <span className="font-medium text-slate-900 block">{row.getValue('name')}</span>
              <span className="text-xs text-slate-500">ID: {row.original.id}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: () => <div className="text-right">Sisa Stok</div>,
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        return (
          <div className="flex justify-end">
             <div className="flex items-center gap-2">
               {stock <= 5 && <AlertTriangle className="w-4 h-4 text-amber-500" />}
               <span className={`font-bold text-lg ${stock === 0 ? 'text-red-600' : stock <= 5 ? 'text-amber-600' : 'text-slate-700'}`}>
                 {stock}
               </span>
             </div>
          </div>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        if (stock === 0) return <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-full">Habis</span>;
        if (stock <= 5) return <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Hampir Habis</span>;
        return <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">Aman</span>;
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: () => {
        return (
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3 mr-1" /> Restock
            </Button>
          </div>
        );
      },
    },
  ];

  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div>
      <PageHeader
        title="Monitoring Stok"
        description="Pantau ketersediaan barang dan lakukan restock tepat waktu."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-slate-500">Total Varian Produk</h3>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{products.length}</div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-amber-700">Hampir Habis (&le; 5)</h3>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-600">{lowStockCount}</div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-red-700">Stok Kosong</h3>
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-red-600">{outOfStockCount}</div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center border rounded-lg bg-white shadow-sm">
          <p className="text-slate-500 animate-pulse">Memuat data stok...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products.sort((a, b) => a.stock - b.stock)} // sort low stock first
          searchKey="name"
          searchPlaceholder="Cari nama produk..."
        />
      )}
    </div>
  );
}
