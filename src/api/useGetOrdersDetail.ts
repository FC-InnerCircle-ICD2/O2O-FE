import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export type OrderStatus = 'NEW' | 'ONGOING' | 'DONE' | 'REFUSE' | 'CANCEL'
export type ORDER_STATUS =
  | { code: 'S1'; desc: '주문대기' }
  | { code: 'S2'; desc: '주문접수' }
  | { code: 'S3'; desc: '주문수락' }
  | { code: 'S4'; desc: '주문거절' }
  | { code: 'S5'; desc: '주문완료' }
  | { code: 'S6'; desc: '주문취소' }
export interface OrdersDetail {
  orderId: string
  status: ORDER_STATUS
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
    queryKey: ['ordersDetail', orderId],
    queryFn: async () => {
      return await api.get<OrdersDetail>(`orders/${orderId}`)
    },
  })

  const resetGetOrdersDetail = () => {
    qc.invalidateQueries({ queryKey: ['ordersDetail', orderId] })
  }

  return { ordersDetail, isSuccess, resetGetOrdersDetail }
}

export default useGetOrdersDetail
