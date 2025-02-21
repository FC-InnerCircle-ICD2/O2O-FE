import { api } from '@/lib/api'
import { SignupData } from '@/models/auth'
import { useMutation } from '@tanstack/react-query'

const usePostSignup = () => {
  return useMutation({
    mutationFn: async (signupData: SignupData) => await api.post(`auth/join`, signupData),
  })
}

export default usePostSignup
