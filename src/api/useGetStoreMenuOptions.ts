import { mockApi } from '@/lib/api';
import { MenuOption } from '@/models/menu';
import { useMockReady } from '@/providers/MockProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';


const useGetStoreMenuOptions = (id: string, menuId: number) => {
    const qc = useQueryClient()
    const isMockReady = useMockReady()

    const { data: storeMenuOptions, isSuccess } = useQuery({
        queryKey: ['storeMenuOptions', id, menuId],
        queryFn: async () => await mockApi.get<MenuOption>(`stores/${id}/menus/${menuId}/options`),
        enabled: true
    })

      const resetStoreMenuOptions = () => {
        qc.removeQueries({ queryKey: ['storeMenuOptions', id, menuId] })
      }

      return { storeMenuOptions, resetStoreMenuOptions, isSuccess }
}

export default useGetStoreMenuOptions




