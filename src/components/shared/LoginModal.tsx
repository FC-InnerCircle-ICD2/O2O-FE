import usePostLogin from '@/api/usePostLogin'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Separator from '@/components/Separator'
import SignupModal from '@/components/shared/SignupModal'
import { useToast } from '@/hooks/useToast'
import { ApiErrorResponse } from '@/lib/api'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const LoginModal = () => {
  const { hideModal, showModal } = modalStore()

  const handleOpenSignupModal = () => {
    showModal({ content: <SignupModal />, useAnimation: true })
  }

  return (
    <div className="size-full bg-white p-mobile_safe">
      <div className="my-6 flex justify-end">
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
      </div>
      <div className="text-center">
        <div className="mb-6 font-bmjua text-5xl font-bold">개발의 민족</div>
        <div className="mb-8 text-gray-500">로그인하고 다양한 혜택을 받아보세요!</div>
      </div>
      <LoginForm />
      <div className="flex justify-center gap-2">
        <button className="text-xs text-gray-500" onClick={handleOpenSignupModal}>
          회원가입
        </button>
        <Separator orientation="vertical" className="h-4" />
        <button className="text-xs text-gray-500">이메일 찾기</button>
        <Separator orientation="vertical" className="h-4" />
        <button className="text-xs text-gray-500">비밀번호 찾기</button>
      </div>
    </div>
  )
}

export default LoginModal

const LoginForm = () => {
  const { hideModal } = modalStore()
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      signname: '',
      password: '',
    },
  })

  const signnameValue = watch('signname')
  const passwordValue = watch('password')
  const isButtonDisabled = !signnameValue || !passwordValue
  const { mutate: login, isPending } = usePostLogin()
  const { toast } = useToast()
  const { member } = memberStore()

  const onSubmit = handleSubmit((formData) => {
    login(formData, {
      onError: async (error) => {
        const apiError = error as unknown as ApiErrorResponse
        toast({
          title: '로그인 실패',
          description: apiError.message || '알 수 없는 이유로 로그인에 실패했습니다.',
          variant: 'destructive',
          position: 'center',
        })
      },
    })
  })

  useEffect(() => {
    if (member) {
      hideModal()
    }
  }, [member])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <Input placeholder="이메일 주소 입력" {...register('signname')} offOutline />
        </div>
        <div className="mb-8">
          <Input type="password" placeholder="비밀번호 입력" {...register('password')} offOutline />
        </div>
        <Button
          className="mb-2 disabled:bg-slate-400"
          type="submit"
          size="m"
          disabled={isButtonDisabled}
        >
          {isPending ? (
            <Icon className="animate-spin text-white" name="Loader" size={24} />
          ) : (
            '로그인'
          )}
        </Button>
      </form>
    </>
  )
}
