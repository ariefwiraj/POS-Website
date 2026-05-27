'use client'

import { usePosCartStore } from '@/stores/posCartStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatRupiah } from '@/utils/currency'
import { Banknote, CreditCard, QrCode } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProcess: () => void
}

export function PaymentModal({ open, onOpenChange, onProcess }: PaymentModalProps) {
  const { paymentMethod, setPaymentMethod, getTotalPrice, cashReceived, setCashReceived, getChange } = usePosCartStore()
  const total = getTotalPrice()
  const change = getChange()
  
  const [cashInput, setCashInput] = useState<string>('')

  // Reset local state when modal opens
  useEffect(() => {
    if (open) {
      setCashInput(cashReceived ? cashReceived.toString() : '')
    }
  }, [open, cashReceived])

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setCashInput(val)
    setCashReceived(val ? parseInt(val, 10) : 0)
  }

  const quickCashOptions = [
    total,
    Math.ceil(total / 10000) * 10000,
    Math.ceil(total / 50000) * 50000,
    Math.ceil(total / 100000) * 100000,
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total)

  const handleQuickCash = (amount: number) => {
    setCashInput(amount.toString())
    setCashReceived(amount)
  }

  const isCash = paymentMethod === 'cash'
  const isSufficient = !isCash || cashReceived >= total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Pilih Pembayaran</DialogTitle>
          <DialogDescription>Selesaikan transaksi ini</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-2">
          <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-xl border border-primary/20">
            <span className="text-sm font-semibold text-muted-foreground mb-1">Total Tagihan</span>
            <span className="text-3xl font-heading font-bold text-primary">{formatRupiah(total)}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
                paymentMethod === 'cash' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary-light hover:bg-secondary/30"
              )}
              onClick={() => setPaymentMethod('cash')}
            >
              <Banknote className="w-6 h-6" />
              <span className="text-sm font-semibold">Tunai</span>
            </button>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
                paymentMethod === 'qris' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary-light hover:bg-secondary/30"
              )}
              onClick={() => setPaymentMethod('qris')}
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm font-semibold">QRIS</span>
            </button>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
                paymentMethod === 'transfer' ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary-light hover:bg-secondary/30"
              )}
              onClick={() => setPaymentMethod('transfer')}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-sm font-semibold">Transfer</span>
            </button>
          </div>

          {isCash && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="cash">Uang Diterima</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground font-semibold">Rp</span>
                  <Input 
                    id="cash" 
                    type="text" 
                    inputMode="numeric"
                    className="pl-10 text-lg font-bold h-12 border-border focus-visible:ring-primary-light"
                    value={cashInput}
                    onChange={handleCashChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {quickCashOptions.map((amount, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    onClick={() => handleQuickCash(amount)}
                    className={cn(
                      "font-semibold h-10 border-border hover:bg-secondary",
                      cashReceived === amount && "border-primary text-primary bg-primary/10 hover:bg-primary/20"
                    )}
                  >
                    {idx === 0 ? 'Uang Pas' : formatRupiah(amount)}
                  </Button>
                ))}
              </div>

              {cashReceived >= total && (
                <div className="flex justify-between items-center p-3 bg-success/15 text-success-foreground rounded-lg font-semibold animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-success">Kembalian</span>
                  <span className="text-xl text-success font-bold">{formatRupiah(change)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-2">
          <Button 
            className="w-full h-12 text-lg font-bold shadow-md"
            disabled={!isSufficient}
            onClick={() => {
              onProcess()
              onOpenChange(false)
            }}
          >
            Proses Pembayaran
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
