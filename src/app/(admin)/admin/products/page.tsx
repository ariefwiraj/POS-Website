'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Package, Plus, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { formatRupiah } from '@/utils/currency';
import { useProducts, Product } from '@/features/admin/hooks/useProducts';

export default function ProductsPage() {
  const { products, deleteProduct, loading } = useProducts();
  const router = useRouter();
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

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
            <span className="font-medium text-slate-900">{row.getValue('name')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'categoryId',
      header: 'Kategori',
      cell: ({ row }) => {
        // In real app, we'd map this to category name using useCategories
        const catId = row.getValue('categoryId') as string;
        const nameMap: Record<string, string> = { cat_1: 'Beras', cat_2: 'Minyak Goreng', cat_3: 'Gula', cat_4: 'Mie Instan', cat_5: 'Bumbu Dapur' };
        return nameMap[catId] || catId;
      }
    },
    {
      accessorKey: 'price',
      header: () => <div className="text-right">Harga</div>,
      cell: ({ row }) => <div className="text-right font-medium text-slate-700">{formatRupiah(row.getValue('price'))}</div>,
    },
    {
      accessorKey: 'stock',
      header: () => <div className="text-right">Stok</div>,
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        return (
          <div className="flex justify-end">
             <span className={`font-semibold ${stock <= 5 ? 'text-red-600' : 'text-slate-700'}`}>
               {stock}
             </span>
          </div>
        );
      },
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
        const id = row.original.id;
        return (
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/products/${id}/edit`)} className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteId(id)} className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Produk Management"
        description="Kelola daftar produk, harga, dan ketersediaan stok."
        action={
          <Button asChild className="bg-[#355872] hover:bg-[#355872]/90">
            <Link href="/admin/products/create">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Link>
          </Button>
        }
      />

      {loading ? (
        <div className="h-64 flex items-center justify-center border rounded-lg bg-white shadow-sm">
          <p className="text-slate-500 animate-pulse">Memuat data...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          searchKey="name"
          searchPlaceholder="Cari nama produk..."
        />
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Produk"
        description="Apakah Anda yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Hapus"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
