'use client'

import { OrderPayType } from '@/api/usePostOrderPay'
import PayLogo from '@/assets/images/Pay200_logo.png'
import Toss from '@/assets/images/Toss_Logo.png'
import Separator from '@/components/Separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
interface OrderPayBottomSheetProps {
  currentPaymentType: OrderPayType | null
  onSelectPaymentType: (type: OrderPayType) => void
}

const OrderPayBottomSheet = ({
  currentPaymentType,
  onSelectPaymentType,
}: OrderPayBottomSheetProps) => {
  const [paymentType, setPaymentType] = useState<OrderPayType>(
    currentPaymentType || OrderPayType.PAY200
  )
  const handleSelectPaymentType = (type: OrderPayType) => {
    setPaymentType(type)
    onSelectPaymentType(type)
  }
  return (
    <div className="px-mobile_safe pb-16">
      <div className="flex flex-col gap-3">
        <PayButton
          type={OrderPayType.PAY200}
          paymentType={paymentType}
          onSelectPaymentType={handleSelectPaymentType}
        />
        <PayButton
          type={OrderPayType.TOSS}
          paymentType={paymentType}
          onSelectPaymentType={handleSelectPaymentType}
        />
      </div>

      <Separator className="my-8 h-px w-full" />

      <div className="flex flex-col gap-3 rounded-lg bg-gray-100 p-4">
        <div className="flex flex-col">
          <p className="pb-2 text-sm font-semibold">결제 안내</p>
          <p className="pb-1 text-xs text-gray-500">
            • 실제로 결제가 이루어지지 않는 테스트 페이지입니다.
          </p>
          <p className="text-xs text-gray-500">• Pay200로 결제 시 할인 혜택을 받을 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}

export default OrderPayBottomSheet

const PayButton = ({
  type,
  paymentType,
  onSelectPaymentType,
}: {
  type: OrderPayType
  paymentType: OrderPayType
  onSelectPaymentType: (type: OrderPayType) => void
}) => {
  return (
    <div className="w-full">
      <button
        className={cn(
          'flex h-14 w-full items-center justify-center gap-1 rounded-lg border border-solid border-gray-200 px-4 text-base font-semibold',
          paymentType === type && 'border-gray-950'
        )}
        onClick={() => onSelectPaymentType(type)}
      >
        <div className="relative flex h-full items-center">
          <Image
            src={type === OrderPayType.TOSS ? Toss : PayLogo}
            alt="toss_logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        {type === OrderPayType.TOSS ? '토스페이' : 'PAY200'}
      </button>
    </div>
  )
}
