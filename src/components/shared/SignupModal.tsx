import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { modalStore } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignupModal = () => {
  const { hideModal } = modalStore()
  return (
    <div className="h-screen w-screen bg-white p-mobile_safe">
      <div className="relative my-6 flex justify-end">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          회원가입
        </div>
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
      </div>
      <SignupForm />
    </div>
  )
}

export default SignupModal

const signupFormSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
      '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
    ),
  nickname: z.string().min(1, '닉네임을 입력해주세요.').max(10, '닉네임은 10자 이내여야 합니다.'),
})

const SignupForm = () => {
  const { hideModal } = modalStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
    resolver: zodResolver(signupFormSchema),
    mode: 'onBlur',
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const nicknameValue = watch('nickname')
  const isButtonDisabled = !emailValue || !passwordValue || !nicknameValue

  const [focusedField, setFocusedField] = useState<'email' | 'password' | 'nickname' | null>(null)

  const onSubmit = handleSubmit((formData) => {
    // TODO: 회원가입 로직 추가
    console.log('Form submitted:', formData)
    // TODO: 회원가입 실패 시 에러 토스트 띄우기
    // 회원가입 성공 시 모달 닫기
    hideModal()
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <Input
          value={emailValue}
          label="이메일 주소"
          placeholder="이메일 주소 입력"
          {...register('email')}
          offOutline
          isInvalid={!!errors.email && focusedField !== 'email'}
          onFocus={() => setFocusedField('email')}
          onReset={() => {
            setValue('email', '')
          }}
        />
        {errors.email && focusedField !== 'email' && (
          <div className="mt-1.5 text-left text-xs text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-3">
        <Input
          value={passwordValue}
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자를 모두 포함한, 8자리 이상"
          {...register('password')}
          offOutline
          isInvalid={!!errors.password && focusedField !== 'password'}
          onFocus={() => {
            setFocusedField('password')
            trigger('email')
          }}
        />
        {errors.password && focusedField !== 'password' && (
          <div className="mt-1.5 text-left text-xs text-red-500">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-8">
        <Input
          value={nicknameValue}
          label="닉네임"
          placeholder="영문 혹은 한글만 가능, 10자이내"
          {...register('nickname')}
          offOutline
          isInvalid={!!errors.nickname && focusedField !== 'nickname'}
          onFocus={() => {
            setFocusedField('nickname')
            trigger('email')
          }}
          onReset={() => {
            setValue('nickname', '')
          }}
        />
        {errors.nickname && focusedField !== 'nickname' && (
          <div className="mt-1.5 text-left text-xs text-red-500">{errors.nickname.message}</div>
        )}
      </div>
      <Button
        className="mb-2 disabled:bg-slate-400"
        type="submit"
        size="m"
        disabled={isButtonDisabled}
      >
        가입하기
      </Button>
    </form>
  )
}
