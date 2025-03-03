'use client'

import { AddressResponseData } from '@/api/useGetAddress'
import useGetMember from '@/api/useGetMember'
import usePostAddress, { Address, AddressType } from '@/api/usePostAddress'
import usePutAddress from '@/api/usePutAddress'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { Button } from '@/components/button'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { SignupData } from '@/models/auth'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AddressData } from './AddressDetail'

const MapInfo = ({
  addressData,
  onAddressChange,
  userAddress,
  onSaveInSignup,
}: {
  addressData: AddressData
  onAddressChange: (data: AddressData) => void
  userAddress?: AddressResponseData
  onSaveInSignup?: (addressData: SignupData['address']) => void
}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { hideModal } = modalStore()
  const { setMember } = memberStore()

  const [addressDetail, setAddressDetail] = useState('')
  const [alias, setAlias] = useState('')
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false)
  const { mutate: registerAddress, isPending } = usePostAddress()
  const { mutate: updateAddress, isPending: isUpdatePending } = usePutAddress()
  const { refetch: refetchMember } = useGetMember()

  const handleAddress = () => {
    if (!addressData.roadAddr) {
      toast({
        description: '배달이 불가능한 주소입니다.',
        position: 'center',
      })
      return
    }

    if (!addressDetail) {
      toast({
        description: '상세주소를 입력해주세요.',
        position: 'center',
      })
      return
    }

    if (addressData.type === AddressType.OTHERS) {
      if (!alias) {
        toast({
          description: '별명을 입력해주세요.',
          position: 'center',
        })
        return
      }

      if (userAddress && userAddress.others && userAddress.others.length >= 5) {
        toast({
          description: '최대 5개의 주소만 등록할 수 있습니다.',
          position: 'center',
        })
        return
      }
    }

    if (onSaveInSignup) {
      onSaveInSignup({
        memberAddressType: addressData.type as AddressType,
        roadAddress: addressData.roadAddr || addressData.address,
        jibunAddress: addressData.address,
        detailAddress: addressDetail,
        alias: addressData.type === AddressType.OTHERS ? alias : '',
        latitude: addressData.coords.lat,
        longitude: addressData.coords.lng,
      })
      return
    }

    const _address: Address = {
      memberAddressType: addressData.type,
      roadAddress: addressData.roadAddr || addressData.address,
      jibunAddress: addressData.address,
      detailAddress: addressDetail,
      alias: addressData.type === AddressType.OTHERS ? alias : undefined,
      latitude: addressData.coords.lat,
      longitude: addressData.coords.lng,
    }

    const _options = {
      onSuccess: () => {
        refetchMember().then((res) => {
          if (res.data) {
            setMember(res.data)
          }
        })
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

    if (
      userAddress &&
      ((addressData.type === AddressType.HOME && userAddress.house) ||
        (addressData.type === AddressType.COMPANY && userAddress.company))
    ) {
      updateAddress(
        {
          id:
            addressData.type === AddressType.HOME ? userAddress.house!.id : userAddress.company!.id,
          ..._address,
        },
        _options
      )
    } else {
      registerAddress(_address, _options)
    }
  }

  useEffect(() => {
    setAlias('')
  }, [addressData.type])

  useEffect(() => {
    setIsAddressValid(
      Boolean(addressData.roadAddr && addressData.address && addressDetail && addressData.type)
    )
  }, [addressData, addressDetail])

  return (
    <div className="flex flex-col gap-4 px-mobile_safe pb-10">
      <div className="flex flex-col">
        <div className="text-base font-medium">
          {addressData.roadAddr || '배달이 불가능한 주소입니다.'}
        </div>
        <div
          className={cn(addressData.roadAddr ? 'text-sm text-gray-500' : 'text-sm text-red-500')}
        >
          {addressData.roadAddr ? `[지번] ${addressData.address}` : '위치를 이동해주세요!'}
        </div>
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

      <Button
        className={cn(isAddressValid ? 'bg-primary' : 'bg-gray-500 hover:bg-gray-500')}
        disabled={isPending || isUpdatePending}
        onClick={handleAddress}
      >
        {isPending || isUpdatePending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <span>등록하기</span>
        )}
      </Button>
    </div>
  )
}

// const AddressConfirmModal = ({ onAddress, isAddress }) => {
//   const { hideModal } = modalStore()

//   return (
//     <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-7">
//       <div className="mb-4 text-center leading-tight">주소를 등록하시겠습니까?</div>
//       <div className="flex gap-2">
//         <Button variant="primaryFit" onClick={hideModal}>
//           아니요
//         </Button>
//         <Button onClick={onAddress} disabled={isAddress}>
//           {isAddress ? <span className="loading loading-spinner loading-xs" /> : <span>등록</span>}
//         </Button>
//       </div>
//     </div>
//   )
// }

export default MapInfo
