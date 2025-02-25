import usePostSignup from '@/api/usePostSignup'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { useToast } from '@/hooks/useToast'
import { ApiErrorResponse } from '@/lib/api'
import { formatPhoneNumber, unformatPhoneNumber } from '@/lib/format'
import { SignupData } from '@/models/auth'
import { modalStore } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { ROUTE_PATHS } from '@/utils/routes'
import AddressOption from '@/app/mypage/address/_components/AddressOption'
import Address from '@/app/mypage/address/page'

const SignupModal = () => {
  const { hideModal } = modalStore()

  return (
    <div className="size-full bg-white p-mobile_safe">
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
  signname: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .max(50, '이메일은 50자 이내여야 합니다.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
      '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.'
    ),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(10, '닉네임은 10자 이내여야 합니다.')
    .regex(/^[a-zA-Z가-힣0-9]+$/, '닉네임은 영문, 한글, 숫자만 가능합니다.'),
  username: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(10, '이름은 10자 이내여야 합니다.')
    .regex(/^[a-zA-Z가-힣]+$/, '이름은 영문, 한글만 가능합니다.'),
  phone: z
    .string()
    .min(10, '전화번호는 8자 이상이어야 합니다.')
    .max(13, '전화번호는 11자 이내여야 합니다.'),
  address: z.object({
    memberAddressType: z.string().min(1, '주소를 입력해주세요.'),
    roadAddress: z.string().min(1, '주소를 입력해주세요.'),
    jibunAddress: z.string().min(1, '주소를 입력해주세요.'),
    detailAddress: z.string(),
    alias: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
})

const SignupForm = () => {
  const { showModal, hideModal, addressData } = modalStore()

  const { mutate: signup } = usePostSignup()
  const { toast } = useToast()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      signname: '',
      password: '',
      nickname: '',
      username: '',
      phone: '',
      address: {
        memberAddressType: '',
        roadAddress: '',
        jibunAddress: '',
        detailAddress: '',
        alias: '',
        latitude: 0,
        longitude: 0,
      },
    },
    resolver: zodResolver(signupFormSchema),
    mode: 'onBlur',
  })

  const signnameValue = watch('signname')
  const passwordValue = watch('password')
  const nicknameValue = watch('nickname')
  const usernameValue = watch('username')
  const phoneValue = watch('phone')
  const addressValue = watch('address')

  const [focusedField, setFocusedField] = useState<
    'signname' | 'password' | 'nickname' | 'username' | 'phone' | null
  >(null)
  const [isClickedAddressButton, setIsClickedAddressButton] = useState(false)

  const onSubmit = handleSubmit((formData) => {
    const processedFormData = {
      ...formData,
      phone: unformatPhoneNumber(formData.phone),
    }
    signup(processedFormData, {
      onSuccess: () => {
        hideModal()
        toast({
          title: '회원가입에 성공했습니다.',
          description: '로그인을 진행해주세요.',
        })
      },
      onError: (error) => {
        const errorResponse = error as unknown as ApiErrorResponse
        if (errorResponse.status === 400) {
          toast({
            title: '회원가입에 실패했습니다.',
            description: errorResponse.message.includes('이미 가입된') ? (
              <span className="whitespace-pre-line">{'사용할 수 없는 이메일 주소입니다.'}</span>
            ) : (
              errorResponse.message
            ),
            variant: 'destructive',
          })
        } else {
          toast({
            title: '회원가입에 실패했습니다.',
            description: (
              <span className="whitespace-pre-line">{`알수 없는 오류가 발생했습니다.\n 다시 시도하거나 고객센터로 문의해주세요.`}</span>
            ),
            variant: 'destructive',
          })
        }
      },
    })
  })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setValue('phone', formattedNumber, {
      shouldValidate: true, // 값이 변경될 때마다 유효성 검사하는 옵션
      shouldDirty: true, // 사용자가 입력하는 값이라는 것을 알려주는 옵션
    })
  }

  const handleAddressClick = () => {
    showModal({
      content: <AddressModal />,
      useAnimation: true,
    })
    if (!isClickedAddressButton) {
      setIsClickedAddressButton(true)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col"
      style={{
        height: 'calc(100vh - 94px)',
      }}
    >
      <div className="grow overflow-y-auto">
        <div className="mb-3">
          <Input
            value={signnameValue}
            label="이메일 주소"
            placeholder="이메일 주소 입력"
            maxLength={50}
            {...register('signname')}
            offOutline
            isInvalid={!!errors.signname && focusedField !== 'signname'}
            onFocus={() => setFocusedField('signname')}
            onReset={() => {
              setValue('signname', '')
            }}
          />
          {errors.signname && focusedField !== 'signname' && (
            <div className="mt-1.5 text-left text-xs text-red-500">{errors.signname.message}</div>
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
              trigger('signname')
            }}
          />
          {errors.password && focusedField !== 'password' && (
            <div className="mt-1.5 text-left text-xs text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-3">
          <Input
            value={nicknameValue}
            label="닉네임"
            placeholder="영문 혹은 한글만 가능, 10자이내"
            {...register('nickname')}
            maxLength={10}
            offOutline
            isInvalid={!!errors.nickname && focusedField !== 'nickname'}
            onFocus={() => {
              setFocusedField('nickname')
              trigger('signname')
            }}
            onReset={() => {
              setValue('nickname', '')
            }}
          />
          {errors.nickname && focusedField !== 'nickname' && (
            <div className="mt-1.5 text-left text-xs text-red-500">{errors.nickname.message}</div>
          )}
        </div>
        <div className="mb-3">
          <Input
            value={usernameValue}
            label="이름"
            placeholder="이름 입력"
            {...register('username')}
            maxLength={10}
            offOutline
            isInvalid={!!errors.username && focusedField !== 'username'}
            onFocus={() => {
              setFocusedField('username')
              trigger('signname')
            }}
          />
          {errors.username && focusedField !== 'username' && (
            <div className="mt-1.5 text-left text-xs text-red-500">{errors.username.message}</div>
          )}
        </div>
        <div className="mb-3">
          <Input
            value={phoneValue}
            label="전화번호"
            type="tel"
            placeholder="전화번호 입력"
            {...register('phone')}
            onChange={handlePhoneChange}
            maxLength={13}
            offOutline
            isInvalid={!!errors.phone && focusedField !== 'phone'}
            onFocus={() => {
              setFocusedField('phone')
              trigger('signname')
            }}
          />
          {errors.phone && focusedField !== 'phone' && (
            <div className="mt-1.5 text-left text-xs text-red-500">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="address"
            className="mb-1.5 block text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            주소
          </label>
          <Button
            id="address"
            className="w-full"
            variant="grayFit"
            size="m"
            type="button"
            onClick={handleAddressClick}
          >
            주소 찾기
          </Button>

          {addressData?.roadAddress ? (
            <div className="mt-2 text-left text-lg font-semibold">{addressData?.roadAddress}</div>
          ) : (
            isClickedAddressButton && (
              <div className="mt-1.5 text-left text-xs text-red-500">주소를 입력해주세요.</div>
            )
          )}
        </div>
      </div>
      <div className="bg-white py-2">
        <Button
          className="disabled:bg-slate-400"
          type="submit"
          size="m"
          disabled={!isValid && !addressData?.roadAddress}
        >
          가입하기
        </Button>
      </div>
    </form>
  )
}

const AddressModal = () => {
  const { hideModal } = modalStore()

  return (
    <div className="flex size-full flex-col bg-white">
      <div className="relative flex justify-end p-mobile_safe">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          대표주소 등록
        </div>
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
      </div>
      <Address singup={true} />
    </div>
  )
}
