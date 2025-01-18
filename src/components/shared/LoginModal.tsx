import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/input'
import useModal from '@/hooks/useModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginModal = () => {
  const { hide } = useModal()

  return (
    <div className="h-screen w-screen bg-white p-mobile_safe">
      <div className="my-6 flex justify-end">
        <Icon name="X" size={24} onClick={hide} className="stroke-2" />
      </div>
      <div className="text-center">
        <div className="mb-6 font-bmjua text-4xl font-bold">개발의 민족</div>
        <div className="mb-8 text-gray-500">로그인하고 다양한 혜택을 받아보세요!</div>
      </div>
      <LoginForm />
      <div className="flex justify-center">
        <button className="text-xs text-gray-500">회원가입</button>
      </div>
    </div>
  )
}

export default LoginModal

const loginFormSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
      '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
    ),
})

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = handleSubmit((formData) => {
    // 폼 데이터 제출 로직
    console.log('Form submitted:', formData)
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <Input placeholder="이메일 주소 입력" {...register('email')} isInvalid={!!errors.email} />
        {errors.email && (
          <div className="mt-1.5 text-left text-xs text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-8">
        <Input
          type="password"
          placeholder="비밀번호 입력"
          {...register('password')}
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <div className="mt-1.5 text-left text-xs text-red-500">{errors.password.message}</div>
        )}
      </div>
      <Button className="mb-2" type="submit">
        로그인
      </Button>
    </form>
  )
}
