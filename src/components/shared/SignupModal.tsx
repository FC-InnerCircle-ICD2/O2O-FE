import useGetAddressToGeolocation from '@/api/useGetAddressToGeolocation'
import useGetGeolocationToAddress from '@/api/useGetGeolocationToAddress'
import { Address } from '@/api/usePostAddress'
import usePostSignup from '@/api/usePostSignup'
import { AddressDetailModal } from '@/app/mypage/address/_components/AddressOption'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { useToast } from '@/hooks/useToast'
import { ApiErrorResponse } from '@/lib/api'
import { formatPhoneNumber, unformatPhoneNumber } from '@/lib/format'
import { SignupData } from '@/models/auth'
import { useGeoLocationStore } from '@/store/geoLocation'
import { modalStore } from '@/store/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    .min(1, '전화번호를 입력해주세요.')
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
  const { showModal, hideModal } = modalStore()
  const { coordinates } = useGeoLocationStore()

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
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  const { mutate: addressToGeolocation } = useGetAddressToGeolocation()
  const { mutate: geolocationToAddress, data: geolocationToAddressData } =
    useGetGeolocationToAddress()

  const { mutate: signup } = usePostSignup()

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

  const handleChangeAddress = (addressData: SignupData['address']) => {
    setValue('address', addressData, {
      shouldValidate: true, // 주소 입력 시 유효성 검사 실행
    })
    hideModal() // 주소 찾기 디테일 모달 닫기
  }

  const handleComplete = (address: { jibunAddress: string; roadAddress: string }) => {
    addressToGeolocation(address.jibunAddress, {
      onSuccess: (data) => {
        const doc = data.documents[0]

        showAddressDetailModal({
          memberAddressType: undefined,
          jibunAddress: address.jibunAddress,
          roadAddress: address.roadAddress,
          detailAddress: '',
          alias: '',
          latitude: Number(doc.y),
          longitude: Number(doc.x),
        })
      },
      onError: (error) => {
        toast({
          title: '주소 검색에 실패했습니다.',
          description: '다시 시도해주세요.',
          variant: 'destructive',
          position: 'center',
        })
      },
    })
  }

  const handleAddressClick = () => {
    showModal({
      content: <AddressModal handleComplete={handleComplete} />,
      useAnimation: true,
    })
    if (!isClickedAddressButton) {
      setIsClickedAddressButton(true)
    }
  }

  const showAddressDetailModal = (address: Address) => {
    showModal({
      content: (
        <AddressDetailModal
          userAddress={undefined}
          addressData={{
            type: undefined,
            address: address.jibunAddress,
            roadAddr: address.roadAddress,
            detail: address.detailAddress,
            coords: { lat: address.latitude, lng: address.longitude },
          }}
          onSaveInSignup={handleChangeAddress}
        />
      ),
      useAnimation: true,
    })
  }

  useEffect(() => {
    if (coordinates) {
      geolocationToAddress({
        longitude: coordinates.longitude.toString(),
        latitude: coordinates.latitude.toString(),
      })
    }
  }, [coordinates])

  useEffect(() => {
    if (geolocationToAddressData) {
      const doc = geolocationToAddressData.documents[0]

      setCurrentAddress({
        memberAddressType: undefined,
        jibunAddress: doc.address.address_name,
        roadAddress: doc.road_address?.address_name || '',
        detailAddress: '',
        alias: '',
        latitude: coordinates?.latitude || 0,
        longitude: coordinates?.longitude || 0,
      })
    }
  }, [geolocationToAddressData])

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col"
      style={{
        height: 'calc(100vh - 94px)',
      }}
    >
      <div className="grow overflow-y-auto pb-10">
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
          <div className="flex flex-col gap-3">
            <Input
              placeholder="건물명, 도로명 또는 지번으로 검색"
              value={
                addressValue?.roadAddress
                  ? `${addressValue?.roadAddress}, ${addressValue?.detailAddress}`
                  : ''
              }
              inputSize="sm"
              onChange={(e) => setValue('address.roadAddress', e.target.value)}
              onReset={() => setValue('address.roadAddress', '')}
              icon={<Icon name="Search" size={18} />}
              offOutline
              onClick={handleAddressClick}
              readOnly
            />
            <div
              className="flex flex-row justify-center gap-2"
              onClick={() => {
                if (currentAddress) {
                  showAddressDetailModal(currentAddress)
                } else {
                  toast({
                    description: '현재 위치를 찾을 수 없습니다.',
                    variant: 'destructive',
                    position: 'center',
                  })
                }
              }}
            >
              <Icon name="LocateFixed" size={20} />
              <div className="content-center">현재 위치로 주소 찾기</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-2">
        <Button className="disabled:bg-slate-400" type="submit" size="m" disabled={!isValid}>
          가입하기
        </Button>
      </div>
    </form>
  )
}

const AddressModal = ({
  handleComplete,
}: {
  handleComplete: (data: { jibunAddress: string; roadAddress: string }) => void
}) => {
  const { hideModal } = modalStore()

  const handleClose = () => {
    hideModal()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[calc(100dvw-40px)] rounded bg-white p-4 shadow-lg">
        <div className="mb-2 flex justify-end">
          <Icon name="X" size={24} onClick={handleClose} className="stroke-2" />
        </div>
        <DaumPostcode
          onComplete={(data) => {
            hideModal()
            handleComplete(data)
          }}
          autoClose={true}
        />
      </div>
    </div>
  )
}
