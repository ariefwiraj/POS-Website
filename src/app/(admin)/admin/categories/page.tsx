'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FolderTree, Plus, Pencil, Trash2, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useCategories, Category } from '@/features/admin/hooks/useCategories';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useCategories();
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const handleDelete = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) {
      updateCategory(id, editName);
    }
    setEditingId(null);
  };

  const handleCreate = () => {
    if (newName.trim()) {
      addCategory(newName);
      setNewName('');
      setCreateOpen(false);
    }
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Nama Kategori',
      cell: ({ row }) => {
        const id = row.original.id;
        const isEditing = editingId === id;
        
        if (isEditing) {
          return (
            <div className="flex items-center gap-2 max-w-xs">
              <Input 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                className="h-8"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit(id);
                  if (e.key === 'Escape') setEditingId(null);
                }}
              />
            </div>
          );
        }
        
        return (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center shrink-0">
              <FolderTree className="w-4 h-4 text-slate-400" />
            </div>
            <span className="font-medium text-slate-900">{row.getValue('name')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'productCount',
      header: 'Jumlah Produk',
      cell: () => {
        // Mock data
        const count = Math.floor(Math.random() * 20);
        return <span className="text-slate-600">{count} produk</span>;
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        const name = row.original.name;
        const isEditing = editingId === id;
        
        if (isEditing) {
          return (
            <div className="flex justify-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => saveEdit(id)} className="h-8 w-8 text-green-600 hover:bg-green-50">
                <Check className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setEditingId(null)} className="h-8 w-8 text-slate-500 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        }
        
        return (
          <div className="flex justify-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => startEdit(id, name)} className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50">
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
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Kategori Management"
        description="Kelola kategori untuk mengorganisir produk toko Anda."
        action={
          <Button onClick={() => setCreateOpen(true)} className="bg-[#355872] hover:bg-[#355872]/90">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kategori
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
          data={categories}
          searchKey="name"
          searchPlaceholder="Cari kategori..."
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Hapus Kategori"
        description="Apakah Anda yakin ingin menghapus kategori ini? Pastikan tidak ada produk yang menggunakan kategori ini."
        confirmText="Hapus"
        variant="destructive"
        onConfirm={handleDelete}
      />

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
            <DialogDescription>
              Masukkan nama kategori baru untuk produk Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-slate-700 mb-1 block">Nama Kategori</label>
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="Misal: Minuman Dingin"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreate();
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Batal</Button>
            <Button onClick={handleCreate} className="bg-[#355872] hover:bg-[#355872]/90">Simpan Kategori</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
