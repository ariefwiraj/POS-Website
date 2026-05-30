import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  status: 'Aktif' | 'Nonaktif';
  description?: string;
  imageUrl?: string;
}

const STORAGE_KEY = 'pos_products';

const initialProducts: Product[] = [
  { id: '1', name: 'Beras Premium 5kg', categoryId: 'cat_1', price: 65000, stock: 42, status: 'Aktif' },
  { id: '2', name: 'Minyak Goreng 2L', categoryId: 'cat_2', price: 32000, stock: 28, status: 'Aktif' },
  { id: '3', name: 'Gula Pasir 1kg', categoryId: 'cat_3', price: 14500, stock: 5, status: 'Aktif' },
  { id: '4', name: 'Indomie Goreng', categoryId: 'cat_4', price: 3500, stock: 120, status: 'Aktif' },
  { id: '5', name: 'Kecap Manis 500ml', categoryId: 'cat_5', price: 12000, stock: 1, status: 'Aktif' },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      const stored = getLocalStorage<Product[]>(STORAGE_KEY, initialProducts);
      setProducts(stored);
      // If nothing was in storage, save initial to localstorage
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setLocalStorage(STORAGE_KEY, initialProducts);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    const updated = [...products, newProduct];
    setProducts(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    setProducts(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
