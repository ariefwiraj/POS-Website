'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProductForm } from '@/features/admin/components/products/ProductForm';
import { useProducts } from '@/features/admin/hooks/useProducts';
import { useState, useEffect } from 'react';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { products, updateProduct, loading } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      const product = products.find(p => p.id === params.id);
      if (product) {
        setProductData(product);
      } else {
        router.push('/admin/products');
      }
    }
  }, [loading, products, params.id, router]);

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    setTimeout(() => {
      updateProduct(params.id, data);
      router.push('/admin/products');
    }, 500);
  };

  if (loading || !productData) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Edit Produk" />
        <div className="h-64 flex items-center justify-center border rounded-xl bg-white shadow-sm">
          <p className="text-slate-500 animate-pulse">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Edit Produk"
        description="Perbarui informasi dan harga produk."
      />
      
      <ProductForm 
        initialData={productData}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
