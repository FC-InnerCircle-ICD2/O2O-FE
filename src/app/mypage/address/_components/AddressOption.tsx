'use client'

import useDeleteAddress from '@/api/useDeleteAddress'
import useGetAddress, { AddressResponseData } from '@/api/useGetAddress'
import useGetAddressToGeolocation from '@/api/useGetAddressToGeolocation'
import useGetMember from '@/api/useGetMember'
import { AddressType } from '@/api/usePostAddress'
import usePostDefaultAddress from '@/api/usePostDefaultAddress'
import AddressSearchModal from '@/app/mypage/address/_components/AddressSearchModal'
import Badge from '@/components/Badge'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Separator from '@/components/Separator'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { SignupData } from '@/models/auth'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import AddressDetail, { AddressData } from '../detail/_components/AddressDetail'

const AddressOption = () => {
  const [word, setWord] = useState('')
  const [popup, setPopup] = useState(false)

  const { member, setMember } = memberStore()
  const { showModal, hideModal } = modalStore()

  const { mutate: deleteAddress, isPending: isPendingDeleting } = useDeleteAddress()
  const { mutate: setDefaultAddress, isPending: isPendingSettingDefaultAddress } =
    usePostDefaultAddress()
  const { address } = useGetAddress()
  const { mutate: addressToGeolocation } = useGetAddressToGeolocation()
  const { refetch: refetchMember } = useGetMember()

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const handleComplete = async (data: { address: string }) => {
    addressToGeolocation(data.address, {
      onSuccess: (data) => {
        showModal({
          content: (
            <AddressDetailModal
              userAddress={address}
              addressData={{
                type: undefined,
                address: data.documents[0].jibunAddress,
                roadAddr: data.documents[0].roadAddress,
                detail: '',
                coords: { lat: Number(data.documents[0].y), lng: Number(data.documents[0].x) },
              }}
            />
          ),
          useAnimation: true,
          useDimmedClickClose: true,
        })
      },
      onError: (error) => {
        console.log({ error })
        toast({
          title: '주소 검색에 실패했습니다.',
          description: '다시 시도해주세요.',
          variant: 'destructive',
          position: 'center',
        })

        hideModal()
      },
      onSettled: () => {
        setPopup(false)
      },
    })
  }

  const handleClickDetail = (type?: AddressType) => {
    showModal({
      content: <AddressDetailModal type={type} userAddress={address} />,
      useAnimation: true,
      useDimmedClickClose: true,
    })
  }

  const handleClickSetDefaultAddress = (id: number | undefined) => {
    if (!id || isPendingSettingDefaultAddress) return
    if (id === address?.defaultAddress?.id) {
      return
    }

    setDefaultAddress(id, {
      onSuccess: () => {
        refetchMember().then((res) => {
          if (res.data) {
            setMember(res.data)
          }
        })

        queryClient.invalidateQueries({ queryKey: ['address'] })

        toast({
          title: '기본 주소가 변경되었습니다.',
          position: 'center',
        })
      },
    })
  }

  const handleClickDeleteButton = (id: number | undefined) => {
    if (!id || isPendingDeleting) return

    deleteAddress(id, {
      onSuccess: () => {
        toast({
          title: '주소가 삭제되었습니다.',
          position: 'center',
        })
        queryClient.invalidateQueries({ queryKey: ['address'] })
      },
      onError: () => {
        toast({
          title: '주소 삭제에 실패했습니다.',
          description: '다시 시도해주세요.',
          variant: 'destructive',
          position: 'center',
        })
      },
    })
  }

  if (!member)
    return (
      <div className="px-mobile_safe pt-5">
        <LoginButtonSection />
      </div>
    )

  if (!address) return <></>
  else
    return (
      <div className="flex w-full flex-col gap-4 pb-20 pt-5">
        <div className="w-full bg-white px-mobile_safe">
          <Input
            placeholder="건물명, 도로명 또는 지번으로 검색"
            value={word}
            inputSize="sm"
            onChange={(e) => setWord(e.target.value)}
            onReset={() => setWord('')}
            icon={<Icon name="Search" size={18} />}
            offOutline
            onClick={() => setPopup(true)}
            readOnly
          />
          <AddressSearchModal isOpen={popup} onClose={() => setPopup(false)}>
            <DaumPostcode onComplete={handleComplete} />
          </AddressSearchModal>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <Icon name="LocateFixed" size={20} />
          <div className="content-center" onClick={() => handleClickDetail()}>
            현재 위치로 주소 찾기
          </div>
        </div>

        <Separator ignoreMobileSafe className="h-2" />

        {address.defaultAddress && (
          <>
            <div className="flex flex-row gap-2 px-mobile_safe">
              <Icon name="MapPin" size={20} className="mt-[2px]" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="max-w-[calc(100dvw-40px-20px-34px-1rem)] truncate text-base font-medium">
                    {address.defaultAddress.roadAddress || address.defaultAddress.jibunAddress}
                    {', '}
                    {address.defaultAddress.detailAddress}
                  </div>
                  <Badge variant="essential">현재</Badge>
                </div>
                {address.defaultAddress.roadAddress && (
                  <div className="text-xs text-gray-500">
                    [지번] {address?.defaultAddress.jibunAddress}
                    {', '}
                    {address?.defaultAddress.detailAddress}
                  </div>
                )}
              </div>
            </div>
            <Separator ignoreMobileSafe className="h-2" />
          </>
        )}

        <div className="px-mobile_safe">
          <div className="flex items-start justify-between gap-2">
            <Icon name="Home" size={20} className="mt-[2px]" />
            <div
              className="flex flex-1 flex-col gap-1"
              onClick={() => {
                if (!address.house) {
                  handleClickDetail(AddressType.HOME)
                } else {
                  handleClickSetDefaultAddress(address.house.id)
                }
              }}
            >
              <div className="content-center text-base font-medium">
                {address.house ? '집' : '집 추가'}
              </div>
              {address.house && (
                <div className="text-xs text-gray-500">
                  {address.house?.roadAddress || address.house?.jibunAddress}
                  {', '}
                  {address.house?.detailAddress}
                </div>
              )}
            </div>
            {address.house && address.defaultAddress?.id !== address.house.id && (
              <button
                className="flex size-[16px] items-center justify-center rounded-full bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickDeleteButton(address.house?.id)
                }}
              >
                <Icon className="text-gray-500" name="X" size={12} />
              </button>
            )}
          </div>

          <Separator className="my-4 h-px bg-gray-200" />

          <div className="flex items-start justify-between gap-2">
            <Icon name="Briefcase" size={20} className="mt-[2px]" />
            <div
              className="flex flex-1 flex-col gap-1"
              onClick={() => {
                if (!address.company) {
                  handleClickDetail(AddressType.COMPANY)
                } else {
                  handleClickSetDefaultAddress(address.company.id)
                }
              }}
            >
              <div className="content-center text-base font-medium">
                {address.company ? '회사' : '회사 추가'}
              </div>
              {address.company && (
                <div className="text-xs text-gray-500">
                  {address.company?.roadAddress || address.company?.jibunAddress}
                  {', '}
                  {address.company?.detailAddress}
                </div>
              )}
            </div>
            {address.company && address.defaultAddress?.id !== address.company.id && (
              <button
                className="flex size-[16px] items-center justify-center rounded-full bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickDeleteButton(address.company?.id)
                }}
              >
                <Icon className="text-gray-500" name="X" size={12} />
              </button>
            )}
          </div>
        </div>

        <Separator ignoreMobileSafe className="h-2" />

        {address.others?.map((other, index) => (
          <div key={other.id} className={'px-mobile_safe'}>
            <div
              className={cn(
                'flex flex-row items-start justify-between gap-2',
                index !== (address.others?.length ?? 0) - 1 &&
                  'border-b border-solid border-gray-200 pb-4'
              )}
              onClick={() => {
                handleClickSetDefaultAddress(other.id)
              }}
            >
              <Icon name="MapPin" size={20} className="mt-[2px]" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="text-base font-medium">{other.alias || '별명 보내주세요'}</div>
                <div className="text-xs text-gray-500">
                  {other.roadAddress || other.jibunAddress}
                  {', '}
                  {other.detailAddress}
                </div>
              </div>
              {address.defaultAddress?.id !== other.id && (
                <button
                  className="flex size-[16px] items-center justify-center rounded-full bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDeleteButton(other.id)
                  }}
                >
                  <Icon className="text-gray-500" name="X" size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
        {(address.others?.length || 0) > 0 && <Separator ignoreMobileSafe className="h-2" />}
      </div>
    )
}

export const AddressDetailModal = ({
  type,
  userAddress,
  addressData,
  onSaveInSignup,
}: {
  type?: AddressType
  userAddress?: AddressResponseData
  addressData?: AddressData
  onSaveInSignup?: (addressData: SignupData['address']) => void
}) => {
  const { hideModal } = modalStore()

  const handleClose = () => {
    hideModal()
  }

  return (
    <div className="w-full max-w-[min(480px,100dvw)] bg-white">
      <div className="relative flex justify-end p-mobile_safe">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          주소 등록
        </div>
        <Icon name="X" size={24} onClick={handleClose} className="stroke-2" />
      </div>
      <div className="h-[calc(100dvh-64px)] overflow-y-auto">
        <AddressDetail
          type={type}
          userAddress={userAddress}
          defaultAddressData={addressData}
          onSaveInSignup={onSaveInSignup}
        />
      </div>
    </div>
  )
}

export default AddressOption
