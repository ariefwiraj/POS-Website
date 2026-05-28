import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PosCartItem } from './posCartStore';

export interface Transaction {
  id: string;
  date: string;
  items: PosCartItem[];
  totalPrice: number;
  paymentMethod: string;
  cashReceived: number;
  change: number;
  cashierName: string;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'date'>) => void;
  clearHistory: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (transactionData) => {
        const newTransaction: Transaction = {
          ...transactionData,
          date: new Date().toISOString(),
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      clearHistory: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: 'pos-transaction-history', 
    }
  )
);
