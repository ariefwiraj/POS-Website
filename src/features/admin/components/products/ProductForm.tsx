import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useCategories } from '@/features/admin/hooks/useCategories';

const productSchema = z.object({
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter" }),
  categoryId: z.string().min(1, { message: "Kategori harus dipilih" }),
  price: z.coerce.number().min(0, { message: "Harga tidak boleh negatif" }),
  stock: z.coerce.number().min(0, { message: "Stok tidak boleh negatif" }),
  status: z.enum(['Aktif', 'Nonaktif']),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: ProductFormValues) => void;
  isLoading?: boolean;
}

export const ProductForm = ({ initialData, onSubmit, isLoading }: ProductFormProps) => {
  const { categories } = useCategories();
  const router = useRouter();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      categoryId: '',
      price: 0,
      stock: 0,
      status: 'Aktif',
      description: '',
    }
  });

  const handleSubmit = (data: ProductFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8 max-w-4xl">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Informasi Produk</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Produk <span className="text-red-500">*</span></label>
              <Input 
                {...form.register('name')} 
                placeholder="Misal: Beras Premium 5kg" 
                className={form.formState.errors.name ? 'border-red-500' : ''}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Kategori <span className="text-red-500">*</span></label>
              <Select 
                value={form.watch('categoryId')} 
                onValueChange={(val) => form.setValue('categoryId', val, { shouldValidate: true })}
              >
                <SelectTrigger className={form.formState.errors.categoryId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.categoryId && (
                <p className="text-sm text-red-500">{form.formState.errors.categoryId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Harga (Rp) <span className="text-red-500">*</span></label>
              <Input 
                type="number" 
                {...form.register('price')} 
                className={form.formState.errors.price ? 'border-red-500' : ''}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Stok Awal <span className="text-red-500">*</span></label>
              <Input 
                type="number" 
                {...form.register('stock')} 
                className={form.formState.errors.stock ? 'border-red-500' : ''}
              />
              {form.formState.errors.stock && (
                <p className="text-sm text-red-500">{form.formState.errors.stock.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Status <span className="text-red-500">*</span></label>
              <Select 
                value={form.watch('status')} 
                onValueChange={(val: any) => form.setValue('status', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Deskripsi Produk</label>
              <Textarea 
                {...form.register('description')} 
                placeholder="Tuliskan deskripsi produk yang lengkap..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Gambar Produk</h2>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Klik untuk upload atau drag & drop</p>
            <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
          <p className="text-xs text-slate-500 italic">* Upload gambar belum diaktifkan untuk MVP versi localstorage.</p>
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-[#355872] hover:bg-[#355872]/90 min-w-32">
            {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
          </Button>
        </div>
        
      </form>
    </div>
  );
};
