import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface OrderPay {
  storeId: string // 가게ID
  roadAddress: string // 주문시점의 도로명주소
  jibunAddress: string // 주문시점의 지번주소
  detailAddress: string // 주문시점의 상세주소
  excludingSpoonAndFork: boolean // 스푼과 포크 제외 여부
  orderType: 'DELIVERY' | 'PACKING' // 주문타입
  paymentType: 'TOSS_PAY' | 'KAKAO_PAY' // 결제타입
  orderMenus: {
    id: string // 주문할 메뉴ID
    quantity: number // 주문할 메뉴 구매수량
    orderMenuOptionGroups: {
      id: string // 주문 메뉴의 옵션그룹ID
      orderMenuOptionIds: string[] // 옵션그룹 내에서 선택한 옵션ID 배열
    }[] // 메뉴의 옵션그룹정보 배열
  }[] // 주문할 메뉴정보 배열
}

export interface OrderPayResponse {
  orderId: string
  orderSummary: string
  totalPrice: number
}
const usePostOrderPay = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['orderPay'],
    mutationFn: async (data: OrderPay) => {
      return await api.post<OrderPayResponse>(`orders`, data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['writable-reviews'] })
    },
  })
}

export default usePostOrderPay
