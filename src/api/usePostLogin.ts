import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { LoginData, LoginResponse } from '@/models/auth';
import { useMutation } from '@tanstack/react-query';

const usePostLogin = () => {
    const accessToken = useLocalStorage('accessToken')
    const refreshToken = useLocalStorage('refreshToken')
    return useMutation({
        mutationFn: async (loginData:LoginData) => await api.post<LoginResponse>(`auth/login`, loginData),
        onSuccess: (data) => {
            accessToken.setValue(data.accessToken)
            refreshToken.setValue(data.refreshToken)
        }
    })
}

export default usePostLogin
