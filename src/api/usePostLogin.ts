import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { LoginData, LoginResponse } from '@/models/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostLogin = () => {
    const queryClient = useQueryClient()
    const accessToken = useLocalStorage('accessToken')
    const accessTokenExpiresIn = useLocalStorage('accessTokenExpiresIn')
    const refreshToken = useLocalStorage('refreshToken')
    const refreshTokenExpiresIn = useLocalStorage('refreshTokenExpiresIn')
    return useMutation({
        mutationFn: async (loginData:LoginData) => await api.post<LoginResponse>(`auth/login`, loginData),
        onSuccess: (data) => {
            accessToken.setValue(data.accessToken)
            accessTokenExpiresIn.setValue(data.accessTokenExpiresIn)
            refreshToken.setValue(data.refreshToken)
            refreshTokenExpiresIn.setValue(data.refreshTokenExpiresIn)
            queryClient.invalidateQueries({ queryKey: ['member'] })
        }
    })
}

export default usePostLogin
