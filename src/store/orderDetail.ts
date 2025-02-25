import { create } from 'zustand'

interface OrderDetail {
  storeId: string
  storeName: string
  menuId: string
  imageUrl: string
  originX: number
  originY: number
}

interface OrderDetailState {
  orderDetail: OrderDetail | undefined
  showOrderDetail: (options: OrderDetail) => void
  hideOrderDetail: () => void
}

export const orderDetailStore = create<OrderDetailState>((set) => ({
  orderDetail: undefined,
  showOrderDetail: (options: OrderDetail) => {
    // 현재 히스토리에 orderDetail 타입이 있는지 확인
    const hasOrderDetailInHistory = window.history.state?.type === 'orderDetail'

    if (!hasOrderDetailInHistory) {
      window.history.replaceState({ type: 'page' }, '', window.location.pathname)
      window.history.pushState({ type: 'orderDetail' }, '', window.location.pathname)
    }
    set({ orderDetail: options })
  },
  hideOrderDetail: () => {
    // 현재 히스토리가 orderDetail 타입인 경우에만 뒤로가기
    if (window.history.state?.type === 'orderDetail') {
      window.history.back()
    }
    set({ orderDetail: undefined })
  },
}))

// 브라우저 뒤로가기 이벤트 리스너
if (typeof window !== 'undefined') {
  // 초기 페이지 state 설정
  // window.history.replaceState({ type: 'page' }, '', window.location.pathname)

  const handlePopState = (event: PopStateEvent) => {
    const currentState = orderDetailStore.getState()
    if (currentState.orderDetail && (!event.state || event.state.type === 'page')) {
      currentState.hideOrderDetail()
    }
  }

  window.addEventListener('popstate', handlePopState)
}
