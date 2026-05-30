'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { formatRupiah } from '@/utils/currency';
import { useOrders, Order } from '@/features/admin/hooks/useOrders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Invoice',
      cell: ({ row }) => <span className="font-semibold text-[#355872]">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Waktu Order',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date') as string);
        return (
          <div className="flex flex-col">
            <span className="text-slate-900">{format(date, 'dd MMM yyyy', { locale: localeId })}</span>
            <span className="text-xs text-slate-500">{format(date, 'HH:mm')} WIB</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{row.getValue('customerName')}</span>
          {row.original.customerPhone && (
            <span className="text-xs text-slate-500">{row.original.customerPhone}</span>
          )}
        </div>
      )
    },
    {
      accessorKey: 'total',
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => <div className="text-right font-medium text-slate-700">{formatRupiah(row.getValue('total'))}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return <StatusBadge status={status} variant={getStatusVariant(status)} />;
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#355872] hover:bg-[#7AAACE]/10">
              <Link href={`/admin/orders/${row.original.id}`}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Order Management"
        description="Kelola pesanan dari toko online dan perbarui status pengiriman."
      />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 pt-4 border-b border-slate-200">
            <TabsList className="bg-transparent h-10 w-full justify-start gap-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-2 font-medium">Semua Order</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-2 font-medium">Perlu Diproses</TabsTrigger>
              <TabsTrigger value="dikirim" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-2 font-medium">Sedang Dikirim</TabsTrigger>
              <TabsTrigger value="selesai" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#355872] data-[state=active]:text-[#355872] rounded-none px-2 font-medium">Selesai</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="all" className="m-0 focus-visible:outline-none">
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-slate-500 animate-pulse">Memuat data pesanan...</p>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={orders}
                  searchKey="id"
                  searchPlaceholder="Cari nomor invoice..."
                />
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="m-0 focus-visible:outline-none">
              <DataTable
                columns={columns}
                data={orders.filter(o => ['Pending', 'Verifikasi', 'Proses'].includes(o.status))}
                searchKey="id"
                searchPlaceholder="Cari nomor invoice..."
              />
            </TabsContent>
            
            <TabsContent value="dikirim" className="m-0 focus-visible:outline-none">
              <DataTable
                columns={columns}
                data={orders.filter(o => o.status === 'Dikirim')}
                searchKey="id"
                searchPlaceholder="Cari nomor invoice..."
              />
            </TabsContent>

            <TabsContent value="selesai" className="m-0 focus-visible:outline-none">
              <DataTable
                columns={columns}
                data={orders.filter(o => o.status === 'Selesai')}
                searchKey="id"
                searchPlaceholder="Cari nomor invoice..."
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
