import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export interface PaymentMethod {
  id: string;
  type: 'Bank Transfer' | 'E-Wallet' | 'QRIS' | 'Cash';
  provider: string;
  accountNumber?: string;
  accountName?: string;
  status: 'Aktif' | 'Nonaktif';
}

const STORAGE_KEY = 'pos_payments';

const initialPayments: PaymentMethod[] = [
  { id: '1', type: 'Bank Transfer', provider: 'BCA', accountNumber: '1234567890', accountName: 'Toko Sembako Maju', status: 'Aktif' },
  { id: '2', type: 'Bank Transfer', provider: 'Mandiri', accountNumber: '0987654321', accountName: 'Toko Sembako Maju', status: 'Aktif' },
  { id: '3', type: 'QRIS', provider: 'Gopay / OVO / Dana', status: 'Aktif' },
  { id: '4', type: 'Cash', provider: 'Bayar di Tempat (COD)', status: 'Aktif' },
];

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = getLocalStorage<PaymentMethod[]>(STORAGE_KEY, initialPayments);
      setPayments(stored);
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setLocalStorage(STORAGE_KEY, initialPayments);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const addPayment = (payment: Omit<PaymentMethod, 'id'>) => {
    const updated = [...payments, { ...payment, id: Date.now().toString() }];
    setPayments(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const updatePayment = (id: string, updates: Partial<PaymentMethod>) => {
    const updated = payments.map(p => p.id === id ? { ...p, ...updates } : p);
    setPayments(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const deletePayment = (id: string) => {
    const updated = payments.filter(p => p.id !== id);
    setPayments(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  return {
    payments,
    loading,
    addPayment,
    updatePayment,
    deletePayment
  };
};
