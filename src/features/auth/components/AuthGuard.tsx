"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  
  // Zustand persist hydrate check
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for Zustand to load state from localStorage
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !currentUser) {
      router.push('/login');
    }
  }, [isHydrated, currentUser, router]);

  if (!isHydrated || !currentUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="font-heading font-bold text-lg animate-pulse">Memuat Sesi...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
