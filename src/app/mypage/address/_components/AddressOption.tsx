'use client'

import useDeleteAddress from '@/api/useDeleteAddress'
import useGetAddress from '@/api/useGetAddress'
import { AddressType } from '@/api/usePostAddress'
import AddressSearchModal from '@/app/mypage/address/_components/AddressSearchModal'
import Badge from '@/components/Badge'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Separator from '@/components/Separator'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import { useToast } from '@/hooks/useToast'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import AddressDetail from '../detail/_components/AddressDetail'

const AddressOption = () => {
  const [word, setWord] = useState('')
  const [popup, setPopup] = useState(false)

  const { member } = memberStore()
  const { showModal, hideModal } = modalStore()

  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress()
  const { address } = useGetAddress()

  const { toast } = useToast()

  const handleComplete = () => {
    setPopup(!popup)
    hideModal()
    // handleClickDetail(data.roadAddress)
  }

  const handleClickDetail = (type?: AddressType) => {
    showModal({
      content: <AddressDetailModal type={type} />,
      useAnimation: true,
      useDimmedClickClose: true,
    })
  }

  const handleClickDeleteButton = (id: number | undefined) => {
    if (!id) return

    deleteAddress(id, {
      onSuccess: () => {
        toast({
          title: '주소가 삭제되었습니다.',
          position: 'center',
        })
        hideModal()
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
      <div className="flex w-full flex-col gap-4 pt-5">
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
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="max-w-[calc(100dvw-40px-20px-30px-1rem)] truncate text-base font-medium">
                    {address.defaultAddress.roadAddress || address.defaultAddress.jibunAddress}{' '}
                    {address.defaultAddress.detailAddress}
                  </div>
                  <Badge variant="essential">현재</Badge>
                </div>
                <div className="text-xs text-gray-500">
                  [지번] {address?.defaultAddress.jibunAddress}
                </div>
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
                if (address.house && address.defaultAddress?.id === address.house.id) {
                  // router.push(ROUTE_PATHS.Home)
                  console.log('홈으로 이동')
                } else {
                  handleClickDetail(AddressType.HOME)
                }
              }}
            >
              <div className="content-center text-base font-medium">
                {address.house ? '집' : '집 추가'}
              </div>
              {address.house && (
                <div className="text-xs text-gray-500">
                  {address.house?.roadAddress || address.house?.jibunAddress}{' '}
                  {address.house?.detailAddress}
                </div>
              )}
            </div>
            {address.house && address.defaultAddress?.id !== address.house.id && (
              <button
                className="flex size-[18px] items-center justify-center rounded-full bg-gray-100"
                onClick={() => handleClickDeleteButton(address.house?.id)}
              >
                <Icon className="text-gray-500" name="X" size={14} />
              </button>
            )}
          </div>

          <Separator className="my-4 h-px bg-gray-200" />

          <div className="flex items-start gap-2">
            <Icon name="Briefcase" size={20} className="mt-[2px]" />
            <div
              className="flex flex-col gap-1"
              onClick={() => {
                if (address.company && address.defaultAddress?.id === address.company.id) {
                  // router.push(ROUTE_PATHS.Home)
                  console.log('홈으로 이동')
                } else {
                  handleClickDetail(AddressType.COMPANY)
                }
              }}
            >
              <div className="content-center text-base font-medium">
                {address.company ? '회사' : '회사 추가'}
              </div>
              {address.company && (
                <div className="text-xs text-gray-500">
                  {address.company?.roadAddress || address.company?.jibunAddress}{' '}
                  {address.company?.detailAddress}
                </div>
              )}
            </div>
            {address.company && address.defaultAddress?.id !== address.company.id && (
              <button
                className="flex size-[18px] items-center justify-center rounded-full bg-gray-100"
                onClick={() => handleClickDeleteButton(address.company?.id)}
              >
                <Icon className="text-gray-500" name="X" size={14} />
              </button>
            )}
          </div>
        </div>
        <Separator ignoreMobileSafe className="h-2" />
      </div>
    )
}

const AddressDetailModal = ({ type }: { type?: AddressType }) => {
  const { hideModal } = modalStore()

  return (
    <div className="w-full max-w-[min(480px,100dvw)] bg-white">
      <div className="relative flex justify-end p-mobile_safe">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          주소 등록
        </div>
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
      </div>
      <div className="h-[calc(100dvh-64px)] overflow-y-auto">
        <AddressDetail signup={true} data={''} type={type} />
      </div>
    </div>
  )
}

export default AddressOption
