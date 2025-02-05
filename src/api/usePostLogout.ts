import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostLogout = () => {
    const queryClient = useQueryClient()
    const accessToken = useLocalStorage('accessToken')
    const accessTokenExpiresIn = useLocalStorage('accessTokenExpiresIn')
    const refreshToken = useLocalStorage('refreshToken')
    const refreshTokenExpiresIn = useLocalStorage('refreshTokenExpiresIn')
    return useMutation({
        mutationFn: async () => await api.post(`auth/logout`, {
            accessToken: accessToken.storedValue,
            refreshToken: refreshToken.storedValue,
        }),
        onSuccess: () => {
            accessToken.resetValue()
            accessTokenExpiresIn.resetValue()
            refreshToken.resetValue()
            refreshTokenExpiresIn.resetValue()
            queryClient.setQueryData(['member'], null)
        }
    })
}

export default usePostLogout
