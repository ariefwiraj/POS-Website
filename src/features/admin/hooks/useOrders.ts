import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  date: string;
  status: 'Pending' | 'Verifikasi' | 'Proses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  paymentProofUrl?: string;
}

const STORAGE_KEY = 'pos_orders';

const initialOrders: Order[] = [
  { 
    id: 'INV-260526-001', 
    customerName: 'Budi Santoso', 
    customerPhone: '081234567890',
    date: new Date().toISOString(), 
    status: 'Pending', 
    items: [
      { productId: '1', name: 'Beras Premium 5kg', quantity: 2, price: 65000 },
      { productId: '2', name: 'Minyak Goreng 2L', quantity: 1, price: 32000 }
    ],
    total: 162000,
    paymentMethod: 'Transfer BCA'
  },
  { 
    id: 'INV-260526-002', 
    customerName: 'Sari Ayu', 
    customerPhone: '089876543210',
    address: 'Jl. Merdeka No. 45, Jakarta',
    date: new Date(Date.now() - 3600000).toISOString(), 
    status: 'Verifikasi', 
    items: [
      { productId: '3', name: 'Gula Pasir 1kg', quantity: 3, price: 14500 },
      { productId: '5', name: 'Kecap Manis 500ml', quantity: 1, price: 12000 }
    ],
    total: 55500,
    paymentMethod: 'QRIS',
    paymentProofUrl: '/placeholder.jpg' // mock
  },
  { 
    id: 'INV-260525-001', 
    customerName: 'Ahmad M', 
    date: new Date(Date.now() - 86400000).toISOString(), 
    status: 'Proses', 
    items: [
      { productId: '1', name: 'Beras Premium 5kg', quantity: 1, price: 65000 },
    ],
    total: 65000,
    paymentMethod: 'Transfer Mandiri'
  },
];

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = getLocalStorage<Order[]>(STORAGE_KEY, initialOrders);
      setOrders(stored);
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setLocalStorage(STORAGE_KEY, initialOrders);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const getOrder = (id: string) => {
    return orders.find(o => o.id === id);
  };

  return {
    orders,
    loading,
    updateOrderStatus,
    getOrder
  };
};
