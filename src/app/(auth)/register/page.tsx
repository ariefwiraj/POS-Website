import { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Registrasi Admin | POS System',
  description: 'Daftarkan akun admin baru untuk mengelola Point of Sale.',
};

export default function RegisterPage() {
  return (
    <div className="w-full">
      <RegisterForm />
    </div>
  );
}
