'use client'

import { PosTransaction } from '../../types/pos.types'
import { formatRupiah } from '@/utils/currency'
import { forwardRef } from 'react'

interface DigitalReceiptProps {
  transaction: PosTransaction
  items: any[]
}

export const DigitalReceipt = forwardRef<HTMLDivElement, DigitalReceiptProps>(
  ({ transaction, items }, ref) => {
    return (
      <div 
        ref={ref}
        id="print-receipt" // 👇 Tambahkan ID ini untuk penanda saat print
        className="bg-white text-black p-2 w-[260px] mx-auto font-mono text-xs leading-tight receipt-print"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="text-center mb-4">
          <h2 className="font-bold text-lg mb-1">POS TOKO SEMBAKO</h2>
          <p className="text-xs">Jl. Contoh Alamat No. 123</p>
          <p className="text-xs">Telp: 08123456789</p>
        </div>
        
        <div className="border-b border-dashed border-gray-400 pb-2 mb-2 text-xs">
          <div className="flex justify-between">
            <span>Tgl: {new Date(transaction.created_at).toLocaleDateString('id-ID')}</span>
            <span>Jam: {new Date(transaction.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>No : {transaction.invoice_number}</span>
            <span className="uppercase">{transaction.payment_method}</span>
          </div>
        </div>

        <div className="border-b border-dashed border-gray-400 pb-2 mb-2 space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col text-xs">
              <span className="truncate pr-2">{item.name}</span>
              <div className="flex justify-between">
                <span>{item.quantity} x {item.price.toLocaleString('id-ID')}</span>
                <span>{(item.quantity * item.price).toLocaleString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-b border-dashed border-gray-400 pb-2 mb-4 text-xs space-y-1">
          <div className="flex justify-between font-bold">
            <span>TOTAL</span>
            <span>{formatRupiah(transaction.total_price)}</span>
          </div>
          <div className="flex justify-between">
            <span>DIBAYAR</span>
            <span>{formatRupiah(transaction.total_price)}</span>
          </div>
          <div className="flex justify-between">
            <span>KEMBALI</span>
            <span>Rp 0</span>
          </div>
        </div>

        <div className="text-center text-xs">
          <p>Terima Kasih</p>
          <p className="mt-1">Barang yg sudah dibeli</p>
          <p>tidak dapat ditukar/retur</p>
        </div>
      </div>
    )
  }
)

DigitalReceipt.displayName = 'DigitalReceipt'