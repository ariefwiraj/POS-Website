'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { DigitalReceipt } from '@/features/pos/components/receipt/DigitalReceipt'
import { ReceiptActions } from '@/features/pos/components/receipt/ReceiptActions'
import { PosTransaction } from '@/features/pos/types/pos.types'

export default function ReceiptPage() {
  const params = useParams()
  const invoiceId = params.invoiceId as string
  const receiptRef = useRef<HTMLDivElement>(null)

  // Dummy data for display
  const dummyTx: PosTransaction = {
    id: '1',
    invoice_number: invoiceId || 'INV-12345',
    total_price: 150000,
    payment_method: 'cash',
    created_at: new Date().toISOString()
  }

  const dummyItems = [
    { name: 'Beras Raja Lele 5kg', price: 65000, quantity: 2 },
    { name: 'Minyak Goreng 2L', price: 34000, quantity: 1 },
    { name: 'Gula Pasir 1kg', price: 16000, quantity: 1 }
  ]

  // Hitung ulang total untuk konsistensi dummy
  dummyTx.total_price = dummyItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 sm:p-6 bg-secondary/10 print:bg-white print:p-0">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-print, .receipt-print * {
            visibility: visible;
          }
          .receipt-print {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            box-shadow: none;
            border: none;
          }
        }
      `}} />
      
      <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
        <DigitalReceipt 
          ref={receiptRef} 
          transaction={dummyTx} 
          items={dummyItems} 
        />
        <ReceiptActions 
          receiptRef={receiptRef} 
          invoiceNumber={dummyTx.invoice_number} 
        />
      </div>
    </div>
  )
}
