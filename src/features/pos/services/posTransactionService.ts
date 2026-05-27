import { createClient } from '@/lib/supabase/client'
import { PosCartItem } from '@/stores/posCartStore'

export interface CheckoutPayload {
  items: PosCartItem[]
  totalPrice: number
  paymentMethod: string
  cashReceived?: number
}

export const posTransactionService = {
  async processTransaction(payload: CheckoutPayload) {
    const supabase = createClient()

    // 1. Generate Invoice Number
    const date = new Date()
    const invoiceNumber = `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`

    // 2. Insert Transaction
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        invoice_number: invoiceNumber,
        total_price: payload.totalPrice,
        payment_method: payload.paymentMethod,
        cash_received: payload.cashReceived || 0,
        status: 'completed'
      })
      .select('id')
      .single()

    if (txError) throw new Error(`Gagal membuat transaksi: ${txError.message}`)

    // 3. Insert Transaction Items
    const transactionItems = payload.items.map(item => ({
      transaction_id: transaction.id,
      product_id: item.productId,
      quantity: item.quantity,
      price_at_transaction: item.price,
      subtotal: item.price * item.quantity
    }))

    const { error: itemsError } = await supabase
      .from('transaction_items')
      .insert(transactionItems)

    if (itemsError) throw new Error(`Gagal menyimpan item: ${itemsError.message}`)

    // 4. Update Stock (Auto-decrement)
    for (const item of payload.items) {
      const { error: stockError } = await supabase.rpc('decrement_stock', {
        p_product_id: item.productId,
        p_quantity: item.quantity
      })
      
      if (stockError) {
        // Fallback to manual update if RPC doesn't exist
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.productId)
          .single()
          
        if (product) {
          await supabase
            .from('products')
            .update({ stock: product.stock - item.quantity })
            .eq('id', item.productId)
        }
      }
    }

    return {
      success: true,
      transactionId: transaction.id,
      invoiceNumber
    }
  }
}
