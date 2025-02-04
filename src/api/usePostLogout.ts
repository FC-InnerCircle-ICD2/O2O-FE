import { useLocalStorage } from '@/hooks/useLocalStorage';
import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

const usePostLogout = () => {
    const accessToken = useLocalStorage('accessToken')
    const refreshToken = useLocalStorage('refreshToken')
    return useMutation({
        mutationFn: async () => await api.post(`auth/logout`, {
            accessToken: accessToken.storedValue,
            refreshToken: refreshToken.storedValue,
        }),
        onSuccess: () => {
            accessToken.setValue(null)
            refreshToken.setValue(null)
        }
    })
}

export default usePostLogout
