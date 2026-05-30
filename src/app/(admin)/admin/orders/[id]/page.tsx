'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { CheckCircle2, ChevronLeft, Package, Clock, Truck, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { formatRupiah } from '@/utils/currency';
import { useOrders } from '@/features/admin/hooks/useOrders';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from 'react';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getOrder, updateOrderStatus, loading } = useOrders();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      const data = getOrder(params.id);
      if (data) {
        setOrder(data);
      } else {
        router.push('/admin/orders');
      }
    }
  }, [loading, params.id, getOrder, router]);

  if (loading || !order) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-slate-500 animate-pulse">Memuat detail pesanan...</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    updateOrderStatus(order.id, newStatus as any);
    setOrder({ ...order, status: newStatus });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push('/admin/orders')} className="text-slate-500 hover:text-slate-900 -ml-3">
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar
        </Button>
      </div>
      
      <PageHeader
        title={`Order ${order.id}`}
        description={`Dibuat pada ${format(new Date(order.date), 'dd MMMM yyyy HH:mm', { locale: localeId })} WIB`}
        action={
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Ubah Status:</span>
            <Select value={order.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Verifikasi">Verifikasi Pembayaran</SelectItem>
                <SelectItem value="Proses">Diproses</SelectItem>
                <SelectItem value="Dikirim">Dikirim</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items & Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                Daftar Produk
              </h3>
              <StatusBadge status={order.status} variant={getStatusVariant(order.status)} />
            </div>
            <div className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Produk</th>
                    <th className="px-6 py-3 text-center font-semibold">Jumlah</th>
                    <th className="px-6 py-3 text-right font-semibold">Harga</th>
                    <th className="px-6 py-3 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-slate-600">{formatRupiah(item.price)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-800">{formatRupiah(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-bold text-slate-700">Subtotal</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatRupiah(order.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-slate-500" />
              Timeline Pengiriman
            </h3>
            <div className="space-y-4 ml-2 border-l-2 border-slate-100 pl-4 relative">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                <p className="text-sm font-semibold text-slate-800">Pesanan Dibuat</p>
                <p className="text-xs text-slate-500">{format(new Date(order.date), 'dd MMM yyyy HH:mm')}</p>
              </div>
              
              {['Verifikasi', 'Proses', 'Dikirim', 'Selesai'].includes(order.status) && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                  <p className="text-sm font-semibold text-slate-800">Pembayaran Diterima</p>
                  <p className="text-xs text-slate-500">Status pesanan diperbarui</p>
                </div>
              )}
              
              {['Dikirim', 'Selesai'].includes(order.status) && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-white" />
                  <p className="text-sm font-semibold text-slate-800">Pesanan Dikirim</p>
                  <p className="text-xs text-slate-500">Dalam perjalanan menuju alamat tujuan</p>
                </div>
              )}
              
              {order.status === 'Selesai' && (
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                  <p className="text-sm font-semibold text-slate-800">Pesanan Selesai</p>
                  <p className="text-xs text-slate-500">Diterima oleh customer</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Info & Payment */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b">Detail Pelanggan</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 mb-0.5">Nama</p>
                <p className="font-medium text-slate-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-0.5">Nomor HP</p>
                <p className="font-medium text-slate-900">{order.customerPhone || '-'}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-0.5">Alamat Pengiriman</p>
                <p className="font-medium text-slate-900 leading-relaxed">
                  {order.address || 'Pickup di Toko / POS'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b">Informasi Pembayaran</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 mb-0.5">Metode Pembayaran</p>
                <p className="font-medium text-slate-900">{order.paymentMethod}</p>
              </div>
              {order.paymentProofUrl && (
                <div>
                  <p className="text-slate-500 mb-1.5">Bukti Transfer</p>
                  <div className="border rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#355872]">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">bukti_tf.jpg</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Lihat</Button>
                  </div>
                  {order.status === 'Verifikasi' && (
                    <Button className="w-full mt-3 bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange('Proses')}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Terima Pembayaran
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
