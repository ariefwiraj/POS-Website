import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export interface Category {
  id: string;
  name: string;
  productCount?: number; // Computed property
}

const STORAGE_KEY = 'pos_categories';

const initialCategories: Category[] = [
  { id: 'cat_1', name: 'Beras' },
  { id: 'cat_2', name: 'Minyak Goreng' },
  { id: 'cat_3', name: 'Gula' },
  { id: 'cat_4', name: 'Mie Instan' },
  { id: 'cat_5', name: 'Bumbu Dapur' },
];

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      const stored = getLocalStorage<Category[]>(STORAGE_KEY, initialCategories);
      setCategories(stored);
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setLocalStorage(STORAGE_KEY, initialCategories);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const addCategory = (name: string) => {
    const newCat = { id: `cat_${Date.now()}`, name };
    const updated = [...categories, newCat];
    setCategories(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const updateCategory = (id: string, name: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, name } : c);
    setCategories(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    setLocalStorage(STORAGE_KEY, updated);
  };

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory
  };
};
