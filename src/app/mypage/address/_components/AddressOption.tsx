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

const AddressOption = () => {
  const [word, setWord] = useState('')
  const [popup, setPopup] = useState(false)
  const router = useRouter()
  const { address } = useGetAddress()

  const handleComplete = (data) => {
    setPopup(!popup)
    router.push(`${ROUTE_PATHS.ADDRESS_DETAIL}?addr=${data.roadAddress}`)
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
              <div className="flex flex-row gap-2">
                <Icon name="Home" size={20} />
                <div className="content-center">집</div>
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

export default AddressOption
