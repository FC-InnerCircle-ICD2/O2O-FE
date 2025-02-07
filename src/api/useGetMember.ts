import { api } from '@/lib/api';
import { Member } from '@/models/auth';
import { useQuery } from '@tanstack/react-query';


const useGetMember = () => {
    return useQuery({
        queryKey: ['member'],
        queryFn: async () => await api.get<Member>(`members`, {
        }),
        enabled: false,
        initialData: null
    })
}

export default useGetMember



