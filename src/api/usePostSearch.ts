import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

const usePostSearch = () => {
  return useMutation({
    mutationFn: async (keyword: string) =>
      await api.post<{ keyword: string }>(`stores/search`, { keyword }),
    onSuccess: (data) => {
      // console.log(data)
    },
  })
}

export default usePostSearch
