'use client';

import { useState } from 'react';
import { CreditCard, Plus, Pencil, Trash2, Building2, QrCode, Wallet, Banknote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { usePayments, PaymentMethod } from '@/features/admin/hooks/usePayments';

const getPaymentIcon = (type: string) => {
  switch (type) {
    case 'Bank Transfer': return <Building2 className="w-5 h-5 text-blue-500" />;
    case 'QRIS': return <QrCode className="w-5 h-5 text-indigo-500" />;
    case 'E-Wallet': return <Wallet className="w-5 h-5 text-teal-500" />;
    case 'Cash': return <Banknote className="w-5 h-5 text-green-500" />;
    default: return <CreditCard className="w-5 h-5 text-slate-500" />;
  }
};

export default function PaymentsPage() {
  const { payments, deletePayment, updatePayment, loading } = usePayments();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deletePayment(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Metode Pembayaran"
        description="Kelola rekening bank dan e-wallet untuk menerima pembayaran dari pelanggan."
        action={
          <Button className="bg-[#355872] hover:bg-[#355872]/90">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Metode
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
          ))
        ) : (
          payments.map((payment) => (
            <div key={payment.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-[#7AAACE] transition-colors flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getPaymentIcon(payment.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{payment.provider}</h3>
                    <p className="text-xs text-slate-500 font-medium">{payment.type}</p>
                  </div>
                </div>
                <StatusBadge status={payment.status} variant={getStatusVariant(payment.status)} />
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex justify-between items-center">
                {payment.accountNumber ? (
                  <div>
                    <p className="font-mono text-slate-900 font-semibold tracking-wider">{payment.accountNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{payment.accountName}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 font-medium italic">Otomatis / Tidak butuh nomor rekening</p>
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-600 hover:text-blue-600">
                  <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDeleteId(payment.id)} 
                  className="h-8 text-xs text-slate-600 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Metode Pembayaran"
        description="Apakah Anda yakin ingin menghapus metode pembayaran ini? Pelanggan tidak akan bisa memilih opsi ini lagi saat checkout."
        confirmText="Hapus"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
