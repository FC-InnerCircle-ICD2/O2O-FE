'use client'

import Input from '@/components/Input'
import { useState } from 'react'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import Badge from '@/components/Badge'
import DaumPostcode from 'react-daum-postcode'
import AddressSearchModal from '@/app/mypage/address/_components/AddressSearchModal'
import { useRouter } from 'next/navigation'
import useGetAddress from '@/api/useGetAddress'
import useDeleteAddress from '@/api/useDeleteAddress'
import { modalStore } from '@/store/modal'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/button'

const AddressOption = () => {
  const [word, setWord] = useState('')
  const [popup, setPopup] = useState(false)
  const router = useRouter()
  const { address } = useGetAddress()
  const { showModal, hideModal } = modalStore()
  const { toast } = useToast()
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress()

  const handleComplete = (data) => {
    setPopup(!popup)
    router.push(`${ROUTE_PATHS.ADDRESS_DETAIL}?addr=${data.roadAddress}`)
  }

  const handleDeleteAddress = (id) => {
    deleteAddress(id, {
      onSuccess: () => {
        toast({
          title: '리뷰가 삭제되었습니다.',
          position: 'center',
        })
        hideModal()
      },
      onError: () => {
        toast({
          title: '리뷰 삭제에 실패했습니다.',
          description: '다시 시도해주세요.',
          variant: 'destructive',
          position: 'center',
        })
      },
    })
  }

  const handleClickDeleteButton = (id) => {
    showModal({
      content: <DeleteConfirmModal onDelete={handleDeleteAddress(id)} isDeleting={isDeleting} />,
      useAnimation: true,
      useDimmedClickClose: true,
    })
  }

  // todo: input를 readonly 할 수는 없는지
  return (
    <div className="flex w-full flex-col gap-4 px-mobile_safe pt-5">
      <div className="w-full bg-white">
        <Input
          placeholder="건물명, 도로명 또는 지번으로 검색"
          value={word}
          inputSize="sm"
          onChange={(e) => setWord(e.target.value)}
          onReset={() => setWord('')}
          icon={<Icon name="Search" size={18} />}
          offOutline
          onClick={() => setPopup(true)}
        />
        <AddressSearchModal isOpen={popup} onClose={() => setPopup(false)}>
          <DaumPostcode onComplete={handleComplete} />
        </AddressSearchModal>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <Icon name="LocateFixed" size={20} />
        <Link href={{ pathname: ROUTE_PATHS.ADDRESS_DETAIL, query: { flag: true, type: 'MAIN' } }}>
          <div className="content-center">현재 위치로 주소 찾기</div>
        </Link>
      </div>

      {address?.defaultAddress ? (
        <>
          <Separator ignoreMobileSafe className="h-2" />
          <div className="flex flex-row gap-2">
            <Icon name="MapPin" size={20} />
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="content-center">{address?.defaultAddress.roadAddress}</div>
                <Badge variant="essential">현재</Badge>
              </div>
              <div className="text-xs text-gray-500">
                [지번] {address?.defaultAddress.jibunAddress}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Separator ignoreMobileSafe className="h-2" />
          <Link
            href={{ pathname: ROUTE_PATHS.ADDRESS_DETAIL, query: { flag: true, type: 'DEFAULT' } }}
          >
            <div className="flex flex-row gap-2">
              <Icon name="MapPin" size={20} />
              <div className="content-center">주소 추가</div>
            </div>
          </Link>
        </>
      )}

      {address?.house ? (
        <>
          <Separator ignoreMobileSafe className="h-2" />
          <Link href={ROUTE_PATHS.HOME}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Icon name="Home" size={20} />
                  <div className="content-center">집</div>
                </div>
                <button onClick={handleClickDeleteButton(address?.house.id)}>
                  <Icon className="text-gray-500" name="X" size={14} />
                </button>
              </div>

              <div className="ml-7 text-xs text-gray-500">
                {address.house.roadAddress} {address.house.detailAddress}
              </div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Separator ignoreMobileSafe className="h-2" />
          <Link
            href={{ pathname: ROUTE_PATHS.ADDRESS_DETAIL, query: { flag: true, type: 'HOME' } }}
          >
            <div className="flex flex-row gap-2">
              <Icon name="Home" size={20} />
              <div className="content-center">집 추가</div>
            </div>
          </Link>
        </>
      )}

      {address?.company ? (
        <>
          <Separator ignoreMobileSafe className="h-2" />
          <Link href={ROUTE_PATHS.HOME}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Icon name="Home" size={20} />
                <div className="content-center">집</div>
              </div>
              <div className="ml-7 text-xs text-gray-500">
                {address.company.roadAddress} {address.company.detailAddress}
              </div>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Separator />
          <Link
            href={{ pathname: ROUTE_PATHS.ADDRESS_DETAIL, query: { flag: true, type: 'COMPANY' } }}
          >
            <div className="flex flex-row gap-2">
              <Icon name="Briefcase" size={20} />
              <div className="content-center">회사 추가</div>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}

const DeleteConfirmModal = ({ onDelete, isDeleting }) => {
  const { hideModal } = modalStore()

  return (
    <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-7">
      <div className="mb-4 text-center leading-tight">주소를 삭제하시겠습니까?</div>
      <div className="flex gap-2">
        <Button variant="primaryFit" onClick={hideModal}>
          아니요
        </Button>
        <Button onClick={onDelete} disabled={isDeleting}>
          {isDeleting ? <span className="loading loading-spinner loading-xs" /> : <span>삭제</span>}
        </Button>
      </div>
    </div>
  )
}

export default AddressOption
