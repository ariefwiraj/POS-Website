'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Package, Plus, Pencil, Trash2, Box } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { formatRupiah } from '@/utils/currency';
import { useProducts, Product } from '@/features/admin/hooks/useProducts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductsPage() {
  const { products, deleteProduct, updateProduct, loading } = useProducts();
  const router = useRouter();
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Stock adjustment state
  const [adjustStockProduct, setAdjustStockProduct] = useState<Product | null>(null);
  const [stockAdjustment, setStockAdjustment] = useState<string>('');

  // Filter state
  const [stockFilter, setStockFilter] = useState<'semua' | 'menipis' | 'habis'>('semua');

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const handleAdjustStock = () => {
    if (adjustStockProduct) {
      const adjustment = parseInt(stockAdjustment) || 0;
      const newStock = Math.max(0, adjustStockProduct.stock + adjustment);
      updateProduct(adjustStockProduct.id, { stock: newStock });
      setAdjustStockProduct(null);
      setStockAdjustment('');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (stockFilter === 'menipis') return product.stock > 0 && product.stock <= 5;
      if (stockFilter === 'habis') return product.stock === 0;
      return true; // 'semua'
    });
  }, [products, stockFilter]);

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
             <span className={`font-semibold px-2.5 py-0.5 rounded-full ${
               stock === 0 ? 'bg-red-100 text-red-700' : 
               stock <= 5 ? 'bg-yellow-100 text-yellow-700' : 
               'bg-green-100 text-green-700'
             }`}>
               {stock.toLocaleString('id-ID')} {stock === 0 ? '(Habis)' : stock <= 5 ? '(Menipis)' : ''}
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
        const product = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => { setAdjustStockProduct(product); setStockAdjustment(''); }} className="h-8 w-8 text-slate-500 hover:text-green-600 hover:bg-green-50" title="Sesuaikan Stok">
              <Box className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/products/${product.id}/edit`)} className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50" title="Edit Produk">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteId(product.id)} className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50" title="Hapus Produk">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Katalog & Stok"
        description="Kelola daftar produk, harga, dan ketersediaan stok dalam satu tempat."
        action={
          <Link href="/admin/products/create">
            <Button className="bg-[#355872] hover:bg-[#294559] text-white shadow-sm flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all h-auto active:scale-[0.98]">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span>Tambah Produk</span>
            </Button>
          </Link>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Varian Produk</p>
            <h3 className="text-2xl font-bold text-slate-900">{products.length}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Stok Menipis</p>
            <h3 className="text-2xl font-bold text-slate-900">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Stok Habis</p>
            <h3 className="text-2xl font-bold text-slate-900">{products.filter(p => p.stock === 0).length}</h3>
          </div>
        </div>
      </div>

      {/* Stock Filter Controls */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          onClick={() => setStockFilter('semua')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${stockFilter === 'semua' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Semua Produk
        </button>
        <button
          onClick={() => setStockFilter('menipis')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${stockFilter === 'menipis' ? 'bg-white text-yellow-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Stok Menipis
        </button>
        <button
          onClick={() => setStockFilter('habis')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${stockFilter === 'habis' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Stok Habis
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center border rounded-lg bg-white shadow-sm">
          <p className="text-slate-500 animate-pulse">Memuat data...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          searchKey="name"
          searchPlaceholder="Cari nama produk..."
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Produk"
        description="Apakah Anda yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan."
        confirmText="Hapus"
        variant="destructive"
        onConfirm={handleDelete}
      />

      {/* Adjust Stock Dialog */}
      <Dialog open={!!adjustStockProduct} onOpenChange={(open) => { if (!open) { setAdjustStockProduct(null); setStockAdjustment(''); } }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sesuaikan Stok</DialogTitle>
            <DialogDescription>
              Ubah jumlah stok untuk <strong>{adjustStockProduct?.name}</strong>. Anda dapat menambahkan (mis. 10) atau mengurangi (mis. -5) stok.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Stok Saat Ini</Label>
              <div className="col-span-3 font-semibold text-slate-900">
                {adjustStockProduct?.stock?.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adjustment" className="text-right">Penyesuaian</Label>
              <Input
                id="adjustment"
                type="text"
                inputMode="numeric"
                value={stockAdjustment === '' || stockAdjustment === '-' ? stockAdjustment : parseInt(stockAdjustment, 10).toLocaleString('id-ID')}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || val === '-') {
                    setStockAdjustment(val);
                    return;
                  }
                  let raw = val.replace(/[^\d-]/g, '');
                  const isNegative = raw.startsWith('-');
                  raw = raw.replace(/-/g, '');
                  if (isNegative) raw = '-' + raw;
                  if (raw && raw !== '-') {
                    raw = parseInt(raw, 10).toString();
                  }
                  setStockAdjustment(raw);
                }}
                className="col-span-3"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Stok Akhir</Label>
              <div className="col-span-3 font-semibold text-[#355872]">
                {adjustStockProduct ? Math.max(0, adjustStockProduct.stock + (parseInt(stockAdjustment) || 0)).toLocaleString('id-ID') : 0}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAdjustStockProduct(null); setStockAdjustment(''); }}>Batal</Button>
            <Button onClick={handleAdjustStock} className="bg-[#355872] hover:bg-[#355872]/90">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
