import { create } from 'zustand'

interface OrderDetail {
  menuId: number  
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
  showOrderDetail: (options: OrderDetail) => set({ orderDetail: options }),
  hideOrderDetail: () => set({ orderDetail: undefined }),
}))

