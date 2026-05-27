'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Printer, ArrowRight } from 'lucide-react'
import { formatRupiah } from '@/utils/currency'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface TransactionSuccessModalProps {
  open: boolean
  invoiceNumber?: string
  changeAmount?: number
  onClose: () => void
}

export function TransactionSuccessModal({ open, invoiceNumber, changeAmount = 0, onClose }: TransactionSuccessModalProps) {
  const router = useRouter()

  const handlePrint = () => {
    if (invoiceNumber) {
      router.push(`/pos/receipt/${invoiceNumber}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-sm bg-white text-center hide-close-button">
        <DialogHeader className="flex flex-col items-center pt-4">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 stroke-success fill-none" viewBox="0 0 52 52" strokeWidth="5">
              <motion.circle 
                cx="26" 
                cy="26" 
                r="22" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={open ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.path 
                d="M16 27 l8 8 l14 -16" 
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={open ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
              />
            </svg>
          </div>
          <DialogTitle className="text-2xl text-foreground font-heading font-bold">Pembayaran Sukses!</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Invoice: <span className="font-semibold text-foreground">{invoiceNumber}</span>
          </DialogDescription>
        </DialogHeader>
        
        {changeAmount > 0 && (
          <div className="py-4 my-2 border-y border-border">
            <span className="text-sm font-semibold text-muted-foreground block mb-1">Kembalian</span>
            <span className="text-3xl font-heading font-bold text-success">
              {formatRupiah(changeAmount)}
            </span>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-col mt-4">
          <Button 
            className="w-full h-12 text-base shadow-sm group font-semibold" 
            variant="outline"
            onClick={handlePrint}
          >
            <Printer className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
            Lihat & Cetak Struk
          </Button>
          <Button 
            className="w-full h-12 text-base font-bold shadow-md"
            onClick={onClose}
          >
            Transaksi Baru
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
