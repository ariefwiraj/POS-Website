import { PosTemplate } from '@/features/pos/components/PosTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POS Kasir | Toko Sembako',
}

export default function PosPage() {
  return <PosTemplate />
}
