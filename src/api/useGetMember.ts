import { api } from '@/lib/api';
import { Member } from '@/models/auth';
import { useQuery } from '@tanstack/react-query';


const useGetMember = () => {
    const accessToken = localStorage.getItem('accessToken')

    return useQuery({
        queryKey: ['member'],
        queryFn: async () => await api.get<Member>(`members`, {
        }),
        enabled: !!accessToken,
        initialData: null
    })
}

export default useGetMember



