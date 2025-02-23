'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePostFavorites = () => {
  const queryClient = useQueryClient()
  const { storedValue: recentStoreIds, setValue } = useLocalStorage<string[]>('recentStore', [])

  const { mutate: postFavorites } = useMutation({
    mutationFn: async (storeId: string) => {
      await api.post(`favorites/${storeId}`, {})

      if (recentStoreIds) {
        setValue(recentStoreIds.filter((id) => id !== storeId))
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  const { mutate: deleteFavorites } = useMutation({
    mutationFn: async (storeId: string) => {
      await api.delete(`favorites/${storeId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  return { postFavorites, deleteFavorites }
}

export default usePostFavorites
