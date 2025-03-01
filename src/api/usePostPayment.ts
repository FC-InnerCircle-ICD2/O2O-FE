import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

export interface Payment {
  orderId: string
  paymentKey: string
  amount: number
}

const usePostPayment = () => {
  return useMutation({
    mutationKey: ['payment'],
    mutationFn: async (data: Payment) => {
      return await api.post(`payments/approve`, data)
    },
  })
}

export default usePostPayment
