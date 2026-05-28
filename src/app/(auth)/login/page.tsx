import { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login Admin | POS System',
  description: 'Masuk ke dashboard admin Point of Sale untuk mengelola bisnis Anda.',
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  );
}
