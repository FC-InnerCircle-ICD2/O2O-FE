import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface OrdersDetail {
  orderId: string
  status: {
    code: string
    desc: string
  }
  orderTime: string
  storeName: string
  tel: string
  roadAddress: string
  jibunAddress: string
  detailAddress: string
  excludingSpoonAndFork: boolean
  requestToRider: string | null
  orderPrice: number
  deliveryPrice: number
  deliveryCompleteTime: string | null
  paymentPrice: number
  paymentId: number
  paymentType: {
    code: string
    desc: string
  }
  type: {
    code: string
    desc: string
  }
  orderMenus: {
    id: number
    menuId: string
    menuName: string
    menuQuantity: number
    menuPrice: number
    totalPrice: number
    orderMenuOptionGroups: {
      id: number
      orderMenuId: number
      orderMenuOptionGroupName: string
      orderMenuOptions: {
        id: number
        orderMenuOptionGroupId: number
        menuOptionName: string
        menuOptionPrice: number
      }[]
    }[]
  }[]
}

const useGetOrdersDetail = (orderId?: string) => {
  const qc = useQueryClient()

  const { data: ordersDetail, isSuccess } = useQuery({
    queryKey: ['ordersDetail'],
    queryFn: async () => {
      return await api.get<OrdersDetail>(`orders/${orderId}`)
    },
  })

  const resetGetOrdersDetail = () => {
    qc.removeQueries({ queryKey: ['orders'] })
  }

  return { ordersDetail, isSuccess, resetGetOrdersDetail }
}

export default useGetOrdersDetail
