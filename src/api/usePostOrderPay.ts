import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface OrderPay {
  storeId: string // 가게ID
  roadAddress: string // 주문시점의 도로명주소
  jibunAddress: string // 주문시점의 지번주소
  detailAddress: string // 주문시점의 상세주소
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

const usePostOrderPay = (orderPayData: OrderPay) => {
  const qc = useQueryClient()

  const { data: orderPay, isSuccess } = useQuery({
    queryKey: ['orderPay'],
    queryFn: async () => {
      const authToken = localStorage.getItem('authToken')
      const headers: Record<string, string> = {}

      if (authToken) {
        headers.Authorization = authToken
      }

      return await api.post<OrderPay>(`orders`, orderPayData, {
        headers,
      })
    },
  })

  const resetPostOrderPay = () => {
    qc.removeQueries({ queryKey: ['orderPay'] })
  }

  return { orderPay, isSuccess, resetPostOrderPay }
}

export default usePostOrderPay
