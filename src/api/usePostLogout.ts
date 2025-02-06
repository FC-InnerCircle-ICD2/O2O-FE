import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostLogout = () => {
    const queryClient = useQueryClient()
    const accessToken = useLocalStorage('accessToken')
    const refreshToken = useLocalStorage('refreshToken')
    return useMutation({
        mutationFn: async () => await api.post(`auth/logout`, {
            accessToken: accessToken.storedValue,
            refreshToken: refreshToken.storedValue,
        }),
        onSuccess: () => {
            accessToken.resetValue()
            refreshToken.resetValue()
            queryClient.setQueryData(['member'], null)
        }
    })
}

export default usePostLogout
