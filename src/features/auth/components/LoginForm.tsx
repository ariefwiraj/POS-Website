"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const currentUser = useAuthStore((state) => state.currentUser);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      router.push('/pos');
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login berhasil!');
        router.push('/pos');
      } else {
        toast.error('Email atau password salah!');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent sm:bg-card sm:shadow-sm sm:border-border">
      <CardHeader className="space-y-2 px-0 sm:px-6">
        <CardTitle className="text-2xl font-heading text-center sm:text-left">Selamat Datang Kembali</CardTitle>
        <CardDescription className="text-center sm:text-left">
          Masukkan email dan password untuk mengakses dashboard admin POS.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pos-toko.com" 
                className="pl-10" 
                required 
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="#" 
                className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
                onClick={(e) => { e.preventDefault(); toast.info('Fitur lupa password belum tersedia di mode demo.'); }}
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="pl-10 pr-10" 
                required 
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox id="remember" disabled={isLoading} />
            <Label 
              htmlFor="remember" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Ingat saya
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full font-medium" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk ke Dashboard"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center px-0 sm:px-6">
        <p className="text-sm text-muted-foreground">
          Belum punya akun admin?{" "}
          <Link 
            href="/register" 
            className="font-semibold text-primary hover:text-primary-light transition-colors"
          >
            Daftar sekarang
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
