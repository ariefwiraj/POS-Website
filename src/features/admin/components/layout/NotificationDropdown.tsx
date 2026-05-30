'use client';

import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100 text-slate-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-[300px] overflow-y-auto">
          <DropdownMenuItem className="p-3 cursor-pointer items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">Pesanan Baru Masuk</p>
              <p className="text-xs text-slate-500">INV-260526-001 perlu verifikasi</p>
              <p className="text-[10px] text-slate-400 mt-1">2 menit yang lalu</p>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="p-3 cursor-pointer items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">Peringatan Stok Rendah</p>
              <p className="text-xs text-slate-500">Beras 5kg sisa 3 unit</p>
              <p className="text-[10px] text-slate-400 mt-1">1 jam yang lalu</p>
            </div>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-center text-sm font-medium text-blue-600 justify-center cursor-pointer">
          Lihat Semua Notifikasi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
