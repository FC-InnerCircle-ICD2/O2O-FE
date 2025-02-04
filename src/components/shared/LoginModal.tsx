import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Separator from '@/components/Separator'
import SignupModal from '@/components/shared/SignupModal'
import { modalStore } from '@/store/modal'
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
        <div className="mb-6 font-bmjua text-4xl font-bold">개발의 민족</div>
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
      email: '',
      password: '',
    },
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const isButtonDisabled = !emailValue || !passwordValue

  const onSubmit = handleSubmit((formData) => {
    // TODO: 로그인 로직 추가
    console.log('Form submitted:', formData)
    // TODO: 로그인 실패 시 에러 토스트 띄우기
    // 로그인 성공 시 모달 닫기
    hideModal()
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <Input placeholder="이메일 주소 입력" {...register('email')} offOutline />
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
        로그인
      </Button>
    </form>
  )
}
