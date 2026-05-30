'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProductForm } from '@/features/admin/components/products/ProductForm';
import { useProducts } from '@/features/admin/hooks/useProducts';
import { useState } from 'react';

export default function CreateProductPage() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      addProduct(data);
      router.push('/admin/products');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Tambah Produk Baru"
        description="Masukkan informasi produk baru ke dalam katalog."
      />
      
      <ProductForm 
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
