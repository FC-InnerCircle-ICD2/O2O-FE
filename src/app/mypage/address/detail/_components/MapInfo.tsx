'use client'

import Input from '@/components/Input'
import { useCallback, useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import { Button } from '@/components/button'
import { useSearchParams } from 'next/navigation'
import usePostAddress, { Address } from '@/api/usePostAddress'
import { modalStore } from '@/store/modal'
import { toast } from '@/hooks/useToast'

const MapInfo = ({ address, roadAddr, lng, lat, signup }) => {
  const [word, setWord] = useState('')
  const searchParams = useSearchParams()
  const { mutate: addressApi, data: addressResponse, isPending: isAddress } = usePostAddress()
  const [flag, setFlag] = useState(true)
  const { showModal, hideModal, setAddressData } = modalStore()
  const [isClickedHome, setIsClickedHome] = useState(false)
  const [isClickedCompany, setIsClickedCompany] = useState(false)
  const [isClickedEtc, setIsClickedEtc] = useState(false)

  const handleAddress = () => {
    let addressType = ''

    if (isClickedHome) {
      addressType = 'HOME'
    } else if (isClickedCompany) {
      addressType = 'COMPANY'
    } else if (isClickedEtc) {
      addressType = 'OTHERS'
    }

    const addressData: Address = {
      memberAddressType: signup ? 'HOME' : addressType,
      roadAddress: roadAddr,
      jibunAddress: address,
      detailAddress: word,
      alias: '대표주소',
      latitude: lat,
      longitude: lng,
    }

    if (signup) {
      setAddressData(addressData)
      hideModal()
    } else {
      // showModal({
      //   content: <AddressConfirmModal onAddress={addressData} isAddress={isAddress} />,
      //   useAnimation: true,
      //   useDimmedClickClose: true,
      // })

      addressApi(addressData)

      console.log('data', addressResponse)

      toast({
        description: '주소 등록이 완료되었습니다.',
        position: 'center',
      })
    }
  }

  const handleClickHome = () => {
    setIsClickedHome((prevState) => !prevState)
    setIsClickedCompany(false)
    setIsClickedEtc(false)
  }

  const handleClickCompany = () => {
    setIsClickedCompany((prevState) => !prevState)
    setIsClickedHome(false)
    setIsClickedEtc(false)
  }

  const handleClickEtc = () => {
    setIsClickedEtc((prevState) => !prevState)
    setIsClickedHome(false)
    setIsClickedCompany(false)
  }

  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <div className="flex flex-col gap-2">
        <div>{roadAddr}</div>
        <div className="text-xs text-gray-500">[지번] {address}</div>
      </div>
      <Input
        placeholder="상세주소를 입력하세요 (건물명, 동/호수 등)"
        value={word}
        inputSize="sm"
        onChange={(e) => setWord(e.target.value)}
        onReset={() => setWord('')}
        offOutline
      />
      {!signup && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <div
              className={`flex w-1/3 flex-col items-center justify-center rounded-md border border-solid ${isClickedHome ? 'border-2 border-primary' : 'border-gray-500'} py-3`}
              onClick={handleClickHome}
            >
              <Icon name="Home" size={20} />
              <div className="text-sm">집</div>
            </div>
            <div
              className={`flex w-1/3 flex-col items-center justify-center rounded-md border border-solid ${isClickedCompany ? 'border-2 border-primary' : 'border-gray-500'} py-3`}
              onClick={handleClickCompany}
            >
              <Icon name="Briefcase" size={20} />
              <div className="text-sm">회사</div>
            </div>
            <div
              className={`flex w-1/3 flex-col items-center justify-center rounded-md border border-solid ${isClickedEtc ? 'border-2 border-primary' : 'border-gray-500'} py-3`}
              onClick={handleClickEtc}
            >
              <Icon name="MapPin" size={20} />
              <div className="text-sm">기타</div>
            </div>
          </div>
          {isClickedEtc ? (
            <Input
              placeholder="별명을 지어주세요"
              value={word}
              inputSize="sm"
              onChange={(e) => setWord(e.target.value)}
              onReset={() => setWord('')}
              offOutline
            />
          ) : (
            <></>
          )}
        </div>
      )}

      <Button onClick={handleAddress}>요기로 배달</Button>
    </div>
  )
}

const AddressConfirmModal = ({ onAddress, isAddress }) => {
  const { hideModal } = modalStore()

  return (
    <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-7">
      <div className="mb-4 text-center leading-tight">주소를 등록하시겠습니까?</div>
      <div className="flex gap-2">
        <Button variant="primaryFit" onClick={hideModal}>
          아니요
        </Button>
        <Button onClick={onAddress} disabled={isAddress}>
          {isAddress ? <span className="loading loading-spinner loading-xs" /> : <span>등록</span>}
        </Button>
      </div>
    </div>
  )
}

export default MapInfo
