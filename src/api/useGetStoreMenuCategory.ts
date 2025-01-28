import { mockApi } from '@/lib/api';
import { MenuCategory } from '@/models/menu';
import { useMockReady } from '@/providers/MockProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useGetStoreMenuCategory = (id: number) => {
    const qc = useQueryClient()
  const isReady = useMockReady()

    const { data: storeMenuCategory, isSuccess } = useQuery({
        queryKey: ['storeMenuCategory', id],
        queryFn: async () => await mockApi.get<MenuCategory[]>(`api/stores/${id}/menus`),
        enabled: isReady
      })

      const resetStoreMenuCategory = () => {
        qc.removeQueries({ queryKey: ['storeMenuCategory', id] })
      }

      return { storeMenuCategory, resetStoreMenuCategory, isSuccess }
}

export default useGetStoreMenuCategory




