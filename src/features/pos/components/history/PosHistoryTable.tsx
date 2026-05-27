'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/utils/currency'
import { PosTransaction } from '../../types/pos.types'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PosHistoryTableProps {
  transactions: PosTransaction[]
}

export function PosHistoryTable({ transactions }: PosHistoryTableProps) {
  const getMethodBadge = (method: string) => {
    switch (method.toLowerCase()) {
      case 'cash': return <Badge variant="outline" className="text-primary border-primary">Tunai</Badge>
      case 'qris': return <Badge variant="outline" className="text-info border-info">QRIS</Badge>
      case 'transfer': return <Badge variant="outline" className="text-warning border-warning">Transfer</Badge>
      default: return <Badge variant="outline" className="capitalize">{method}</Badge>
    }
  }

  return (
    <div className="rounded-md border border-border bg-white overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="w-[180px]">Tanggal & Waktu</TableHead>
              <TableHead>No. Invoice</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead className="text-right">Total Transaksi</TableHead>
              <TableHead className="text-center w-[120px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  Tidak ada riwayat transaksi yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-secondary/20">
                  <TableCell className="text-sm">
                    {new Date(tx.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="font-semibold">{tx.invoice_number}</TableCell>
                  <TableCell>{getMethodBadge(tx.payment_method)}</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {formatRupiah(tx.total_price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/pos/receipt/${tx.invoice_number}`} passHref>
                      <Button variant="outline" size="sm" className="h-8 shadow-none">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
