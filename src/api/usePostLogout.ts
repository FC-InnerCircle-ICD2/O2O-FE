import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

const usePostLogout = () => {
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
            accessToken.setValue(null)
            accessTokenExpiresIn.setValue(null)
            refreshToken.setValue(null)
            refreshTokenExpiresIn.setValue(null)
        }
    })
}

export default usePostLogout
