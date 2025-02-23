'use client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Favorites } from './useGetFavorites'

const useGetRecentStores = () => {
  const { storedValue: recentStoreIds } = useLocalStorage<string[]>('recentStore', [])

  return useQuery({
    queryKey: ['recentStores', recentStoreIds],
    queryFn: async () => {
      return await api.get<Favorites[]>('favorites/recent', {
        searchParams: { storeIds: recentStoreIds ? recentStoreIds.join(',') : '' },
      })
    },
    enabled: !!recentStoreIds && recentStoreIds.length > 0,
    placeholderData: keepPreviousData,
  })
}

export default useGetRecentStores
