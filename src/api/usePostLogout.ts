import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import memberStore from '@/store/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePostLogout = () => {
  const queryClient = useQueryClient()
  const accessToken = useLocalStorage('accessToken')
  const refreshToken = useLocalStorage('refreshToken')
  const { resetMember } = memberStore()

  return useMutation({
    mutationFn: async () =>
      await api.post(`auth/logout`, {
        accessToken: accessToken.storedValue,
        refreshToken: refreshToken.storedValue,
      }),
    onSuccess: () => {
      accessToken.resetValue()
      refreshToken.resetValue()
      resetMember()
      queryClient.removeQueries({ queryKey: ['member'] })
      queryClient.removeQueries({ queryKey: ['favorites'] })
      queryClient.removeQueries({ queryKey: ['carts'] })
      queryClient.removeQueries({ queryKey: ['address'] })
    },
    retry: 0,
  })
}

export default usePostLogout
