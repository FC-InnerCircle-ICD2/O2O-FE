import { Payment } from '@/api/usePostPayment'
import { create } from 'zustand'

interface SuccessPaymentState {
  payments: Payment | null
  setPayments: (payments: Payment | null) => void
}

export const successPaymentStore = create<SuccessPaymentState>((set) => ({
  payments: null,
  setPayments: (payments: Payment | null) => set({ payments }),
}))
