import { api } from '@/lib/api'
import { MenuCategory } from '@/models/menu'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useGetStoreMenuCategory = (id: number) => {
  const qc = useQueryClient()

  const { data: storeMenuCategory, isSuccess } = useQuery({
    queryKey: ['storeMenuCategory', id],
    queryFn: async () => await api.get<MenuCategory[]>(`stores/${id}/menus`),
  })

  const resetStoreMenuCategory = () => {
    qc.removeQueries({ queryKey: ['storeMenuCategory', id] })
  }

  return { storeMenuCategory, resetStoreMenuCategory, isSuccess }
}

export default useGetStoreMenuCategory
