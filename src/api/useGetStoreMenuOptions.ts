import { api } from '@/lib/api'
import { MenuOption } from '@/models/menu'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useGetStoreMenuOptions = (id: string, menuId: string) => {
  const qc = useQueryClient()

  const { data: storeMenuOptions, isSuccess } = useQuery({
    queryKey: ['storeMenuOptions', id, menuId],
    queryFn: async () => await api.get<MenuOption>(`stores/${id}/menus/${menuId}/options`),
    enabled: true,
  })

  const resetStoreMenuOptions = () => {
    qc.removeQueries({ queryKey: ['storeMenuOptions', id, menuId] })
  }

  return { storeMenuOptions, resetStoreMenuOptions, isSuccess }
}

export default useGetStoreMenuOptions
