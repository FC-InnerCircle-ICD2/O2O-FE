'use client'

import usePostAddress, { AddressType } from '@/api/usePostAddress'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { Button } from '@/components/button'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AddressData } from './AddressDetail'

const MapInfo = ({
  addressData,
  onAddressChange,
}: {
  addressData: AddressData
  onAddressChange: (data: AddressData) => void
}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { hideModal } = modalStore()

  const [addressDetail, setAddressDetail] = useState('')
  const [alias, setAlias] = useState('')
  const [flag, setFlag] = useState(true)

  const { mutate: registerAddress, isPending } = usePostAddress()

  // const { showModal, hideModal, setAddressData } = modalStore()
  // const [isClickedHome, setIsClickedHome] = useState(false)
  // const [isClickedCompany, setIsClickedCompany] = useState(false)
  // const [isClickedEtc, setIsClickedEtc] = useState(false)

  const handleAddress = () => {
    if (!addressDetail) {
      toast({
        description: '상세주소를 입력해주세요.',
        position: 'center',
      })
      return
    }

    if (addressData.type === AddressType.OTHERS && !alias) {
      toast({
        description: '별명을 입력해주세요.',
        position: 'center',
      })
      return
    }

    registerAddress(
      {
        memberAddressType: addressData.type,
        roadAddress: addressData.roadAddr || addressData.address,
        jibunAddress: addressData.address,
        detailAddress: addressDetail,
        alias: addressData.type === AddressType.OTHERS ? alias : undefined,
        latitude: addressData.coords.lat,
        longitude: addressData.coords.lng,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['address'] })
          hideModal()
        },
        onError: () => {
          toast({
            description: '주소 등록에 실패했습니다.',
            position: 'center',
          })
        },
      }
    )

    // let addressType = ''
    // if (isClickedHome) {
    //   addressType = 'HOME'
    // } else if (isClickedCompany) {
    //   addressType = 'COMPANY'
    // } else if (isClickedEtc) {
    //   addressType = 'OTHERS'
    // }
    // const addressData: Address = {
    //   memberAddressType: signup ? 'HOME' : addressType,
    //   roadAddress: roadAddr,
    //   jibunAddress: address,
    //   detailAddress: word,
    //   alias: '대표주소',
    //   latitude: lat,
    //   longitude: lng,
    // }
    // if (signup) {
    //   setAddressData(addressData)
    //   hideModal()
    // } else {
    //   // showModal({
    //   //   content: <AddressConfirmModal onAddress={addressData} isAddress={isAddress} />,
    //   //   useAnimation: true,
    //   //   useDimmedClickClose: true,
    //   // })
    //   addressApi(addressData)
    //   // console.log('data', addressResponse)
    //   toast({
    //     description: '주소 등록이 완료되었습니다.',
    //     position: 'center',
    //   })
    // }
  }

  useEffect(() => {
    setAlias('')
  }, [addressData])

  return (
    <div className="flex flex-col gap-4 px-mobile_safe pb-10">
      <div className="flex flex-col">
        {addressData.roadAddr ? (
          <>
            <div className="text-base font-medium">{addressData.roadAddr}</div>
            <div className="text-sm text-gray-500">[지번] {addressData.address}</div>{' '}
          </>
        ) : (
          <div className="text-base font-semibold">{addressData.address}</div>
        )}
      </div>
      <Input
        placeholder="상세주소를 입력하세요 (건물명, 동/호수 등)"
        value={addressDetail}
        inputSize="sm"
        onChange={(e) => setAddressDetail(e.target.value)}
        onReset={() => setAddressDetail('')}
        offOutline
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2">
          <div
            className={cn(
              'box-border flex flex-1 flex-col items-center justify-center rounded-md border border-solid border-gray-900 py-3',
              addressData.type === AddressType.HOME &&
                'border-transparent outline outline-2 outline-primary'
            )}
            onClick={() => onAddressChange({ ...addressData, type: AddressType.HOME })}
          >
            <Icon name="Home" size={20} />
            <div className="text-sm">집</div>
          </div>
          <div
            className={cn(
              'box-border flex flex-1 flex-col items-center justify-center rounded-md border border-solid border-gray-900 py-3',
              addressData.type === AddressType.COMPANY &&
                'border-transparent outline outline-2 outline-primary'
            )}
            onClick={() => onAddressChange({ ...addressData, type: AddressType.COMPANY })}
          >
            <Icon name="Briefcase" size={20} />
            <div className="text-sm">회사</div>
          </div>
          <div
            className={cn(
              'box-border flex flex-1 flex-col items-center justify-center rounded-md border border-solid border-gray-900 py-3',
              addressData.type === AddressType.OTHERS &&
                'border-transparent outline outline-2 outline-primary'
            )}
            onClick={() => onAddressChange({ ...addressData, type: AddressType.OTHERS })}
          >
            <Icon name="MapPin" size={20} />
            <div className="text-sm">기타</div>
          </div>
        </div>
        {addressData.type === AddressType.OTHERS && (
          <Input
            placeholder="별명을 지어주세요"
            value={alias}
            inputSize="sm"
            onChange={(e) => setAlias(e.target.value)}
            onReset={() => setAlias('')}
            offOutline
          />
        )}
      </div>

      <Button disabled={isPending} onClick={handleAddress}>
        {isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <span>등록하기</span>
        )}
      </Button>
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
