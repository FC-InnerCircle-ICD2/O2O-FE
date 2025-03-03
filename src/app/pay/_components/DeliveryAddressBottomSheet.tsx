'use client'

import { Address, AddressResponseData } from '@/api/useGetAddress'
import Badge from '@/components/Badge'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import useBottomSheet from '@/hooks/useBottomSheet'
import { cn } from '@/lib/utils'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'

interface DeliveryAddressBottomSheetProps {
  address: AddressResponseData
  currentAddress: Pick<
    Address,
    'roadAddress' | 'jibunAddress' | 'detailAddress' | 'latitude' | 'longitude'
  >
  onSelectAddress: (
    address: Pick<
      Address,
      'roadAddress' | 'jibunAddress' | 'detailAddress' | 'latitude' | 'longitude'
    >
  ) => void
}

const DeliveryAddressBottomSheet = ({
  address,
  currentAddress,
  onSelectAddress,
}: DeliveryAddressBottomSheetProps) => {
  const router = useRouter()
  const { hide } = useBottomSheet()

  const handleClickAddress = (
    address: Pick<
      Address,
      'roadAddress' | 'jibunAddress' | 'detailAddress' | 'latitude' | 'longitude'
    >
  ) => {
    onSelectAddress(address)
    hide()
  }

  return (
    <div className="max-h-[50dvh] overflow-y-auto">
      <div className="flex flex-col gap-4">
        {address.defaultAddress && (
          <>
            <div className="flex flex-row gap-2 px-mobile_safe">
              <Icon name="MapPin" size={20} className="mt-[2px]" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="max-w-[calc(100dvw-40px-20px-34px-1rem)] truncate text-base font-medium">
                    {currentAddress.roadAddress || currentAddress.jibunAddress}
                    {', '}
                    {currentAddress.detailAddress}
                  </div>
                  <Badge variant="essential">현재</Badge>
                </div>
                {address.defaultAddress.roadAddress && (
                  <div className="text-xs text-gray-500">
                    [지번] {currentAddress.jibunAddress}
                    {', '}
                    {currentAddress.detailAddress}
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
                  router.push(ROUTE_PATHS.ADDRESS)
                  return
                }

                handleClickAddress({
                  roadAddress: address.house?.roadAddress,
                  jibunAddress: address.house?.jibunAddress,
                  detailAddress: address.house?.detailAddress,
                  latitude: address.house?.latitude,
                  longitude: address.house?.longitude,
                })
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
          </div>

          <Separator className="my-4 h-px bg-gray-200" />

          <div className="flex items-start justify-between gap-2">
            <Icon name="Briefcase" size={20} className="mt-[2px]" />
            <div
              className="flex flex-1 flex-col gap-1"
              onClick={() => {
                if (!address.company) {
                  router.push(ROUTE_PATHS.ADDRESS)
                  return
                }

                handleClickAddress({
                  roadAddress: address.company?.roadAddress,
                  jibunAddress: address.company?.jibunAddress,
                  detailAddress: address.company?.detailAddress,
                  latitude: address.company?.latitude,
                  longitude: address.company?.longitude,
                })
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
                handleClickAddress({
                  roadAddress: other.roadAddress,
                  jibunAddress: other.jibunAddress,
                  detailAddress: other.detailAddress,
                  latitude: other.latitude,
                  longitude: other.longitude,
                })
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
            </div>
          </div>
        ))}
        {(address.others?.length || 0) > 0 && <Separator ignoreMobileSafe className="h-2" />}
      </div>
      <div className="px-mobile_safe pt-4">
        <Button
          variant="primaryFit"
          className="w-full"
          onClick={() => {
            hide()
            router.push(ROUTE_PATHS.ADDRESS)
          }}
        >
          주소 추가
        </Button>
      </div>
    </div>
  )
}

export default DeliveryAddressBottomSheet
