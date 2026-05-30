'use client';

import { LogOut, User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export const AdminUserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full sm:h-10 sm:w-10 sm:px-2 sm:py-2 sm:flex sm:items-center sm:gap-2 sm:rounded-md sm:w-auto hover:bg-slate-100">
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-slate-600">A</span>
          </div>
          <span className="hidden sm:inline-flex text-sm font-medium text-slate-700">Admin</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs leading-none text-muted-foreground">admin@toko.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
