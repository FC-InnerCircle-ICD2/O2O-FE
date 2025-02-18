import useGetCarts from '@/api/useGetCarts'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import { useMemo } from 'react'

export const OrderButton = ({ minimumOrderAmount }: { minimumOrderAmount: number }) => {
  const { carts } = useGetCarts()

  const totalPrice = useMemo((): number => {
    if (!carts) return 0

    return carts?.orderMenus.reduce((sum, cur) => cur.totalPrice + sum, 0)
  }, [carts])


  const isUnderMinOrder = useMemo(() => {
    return totalPrice < minimumOrderAmount
  }, [totalPrice, minimumOrderAmount])

  return (
    <div className="sticky bottom-0 z-10 rounded-t-lg bg-white px-mobile_safe py-4 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)]">
      {isUnderMinOrder && (
        <p className="pb-2 text-center text-sm font-bold text-red-600">
          {(minimumOrderAmount - totalPrice).toLocaleString()}원 더 담으면 배달 가능해요
        </p>
      )}
      <Link href={ROUTE_PATHS.PAY}>
        <Button
          className={cn(
            'text-base font-semibold',
            isUnderMinOrder && 'bg-gray-400 hover:bg-gray-400'  
          )}
          disabled={isUnderMinOrder}
        >
          {totalPrice.toLocaleString()}원 주문하기
        </Button>
      </Link>
    </div>
  )
}
