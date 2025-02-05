import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { LoginData, LoginResponse } from '@/models/auth';
import { useMutation } from '@tanstack/react-query';

const usePostLogin = () => {
    const accessToken = useLocalStorage('accessToken')
    const accessTokenExpiresIn = useLocalStorage('accessTokenExpiresIn')
    const refreshToken = useLocalStorage('refreshToken')
    const refreshTokenExpiresIn = useLocalStorage('refreshTokenExpiresIn')
    return useMutation({
        mutationFn: async (loginData:LoginData) => await api.post<LoginResponse>(`auth/login`, loginData),
        onSuccess: (data) => {
            accessToken.setValue(data.accessToken?.replace(/['"]+/g, ''))
            accessTokenExpiresIn.setValue(data.accessTokenExpiresIn)
            refreshToken.setValue(data.refreshToken?.replace(/['"]+/g, ''))
            refreshTokenExpiresIn.setValue(data.refreshTokenExpiresIn)
        }
    })
}

export default usePostLogin
