'use client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Favorites } from './useGetFavorites'

const useGetRecentStores = () => {
    const { storedValue: recentStoreIds } = useLocalStorage<string[]>('recentStore', [])

    return useQuery({
        queryKey: ['recentStores', recentStoreIds],
        queryFn: async () =>
            await api.get<Favorites[]>('favorites/recent', {
                searchParams: { storeIds: recentStoreIds ? recentStoreIds.join(',') : '' },
            }),
        enabled: !!recentStoreIds,
        placeholderData: keepPreviousData,
    })
}

export default useGetRecentStores
