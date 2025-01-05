import { OrderType } from '@/models/orderType'
import { create } from 'zustand'

interface FoodSearchFilterStore {
  categoryId: number
  keyword?: string
  order: OrderType
  setCategoryId: (category: number) => void
  setKeyword: (keyword: string | undefined) => void
  setOrder: (order: OrderType) => void
}

export const useFoodSearchFilterStore = create<FoodSearchFilterStore>((set) => ({
  categoryId: 1,
  keyword: undefined,
  order: OrderType.RANKING,
  setCategoryId: (categoryId: number) =>
    set((state) => {
      return { ...state, categoryId, keyword: undefined }
    }),
  setKeyword: (keyword) =>
    set(() => {
      return { keyword, categoryId: 1, order: OrderType.RANKING }
    }),
  setOrder: (order) => set((state) => ({ ...state, order })),
}))
