import { MenuGroupOption } from '@/models/menu'
import { create } from 'zustand'

export interface OrderMenu {
  menuId: string
  name: string
  imgUrl: string
  optionNames: string
  selectedOptions: Record<string, MenuGroupOption[]>
  price: number
}

interface Order {
  storeId: string
  storeName: string
  price: number
  menu: OrderMenu[]
}

interface OrderList {
  orderList: Order | undefined
  setOrderList: (orderList: Order) => void
  removeOrderList: () => void
}

export const orderListStore = create<OrderList>((set) => ({
  orderList: undefined,
  setOrderList: (orderList) => set({ orderList }),
  removeOrderList: () => set({ orderList: undefined }),
}))
