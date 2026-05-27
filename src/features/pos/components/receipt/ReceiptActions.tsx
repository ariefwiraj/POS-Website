'use client'

import { Button } from '@/components/ui/button'
import { Printer, Download, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useReceiptPdf } from '../../hooks/useReceiptPdf'

interface ReceiptActionsProps {
  receiptRef: React.RefObject<HTMLDivElement | null>
  invoiceNumber: string
}

export function ReceiptActions({ receiptRef, invoiceNumber }: ReceiptActionsProps) {
  const router = useRouter()
  const { downloadPdf, isGenerating } = useReceiptPdf()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[300px] mx-auto mt-6 print:hidden">
      <Button 
        variant="outline" 
        className="flex-1 bg-white" 
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>
      
      <Button 
        variant="secondary" 
        className="flex-1"
        onClick={() => downloadPdf(receiptRef, `Struk_${invoiceNumber}.pdf`)}
        disabled={isGenerating}
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? 'Proses...' : 'PDF'}
      </Button>

      <Button 
        className="flex-1"
        onClick={handlePrint}
      >
        <Printer className="w-4 h-4 mr-2" />
        Cetak
      </Button>
    </div>
  )
}
