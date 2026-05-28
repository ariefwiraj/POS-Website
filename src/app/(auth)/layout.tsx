import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>

        {/* Logo area */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-heading font-bold hover:opacity-80 transition-opacity">
            <Store className="w-8 h-8" />
            <span>POS System</span>
          </Link>
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-heading font-bold mb-4 leading-tight">
            Kelola Bisnis Anda dengan Lebih Cerdas
          </h1>
          <p className="text-primary-lighter text-lg font-sans">
            Platform Point of Sale yang dirancang untuk mempercepat transaksi, memantau stok secara real-time, dan meningkatkan pengalaman pelanggan.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-sm text-primary-lighter">
          © {new Date().getFullYear()} POS System. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8 text-primary font-heading font-bold text-2xl">
            <Store className="w-8 h-8" />
            <span>POS System</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
