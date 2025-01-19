import { OrderType } from '@/models/orderType'
import { create } from 'zustand'

interface FoodSearchFilterStore {
  category: string
  keyword?: string
  order: OrderType
  setCategory: (category: string) => void
  setKeyword: (keyword: string | undefined) => void
  setOrder: (order: OrderType) => void
}

export const useFoodSearchFilterStore = create<FoodSearchFilterStore>((set) => ({
  category: '',
  keyword: undefined,
  order: OrderType.RANKING,
  setCategory: (category: string) =>
    set((state) => {
      return { ...state, category, keyword: undefined }
    }),
  setKeyword: (keyword) =>
    set(() => {
      return { keyword, categoryId: 1, order: OrderType.RANKING }
    }),
  setOrder: (order) => set((state) => ({ ...state, order })),
}))
