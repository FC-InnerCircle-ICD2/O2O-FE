import useGetCarts from '@/api/useGetCarts'
import { Button } from '@/components/button'
import LoginModal from '@/components/shared/LoginModal'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export const OrderButton = ({ minimumOrderAmount }: { minimumOrderAmount: number }) => {
  const { storedValue: accessToken } = useLocalStorage('accessToken')
  const { carts } = useGetCarts()
  const router = useRouter()
  const { showModal } = modalStore()

  const totalPrice = useMemo((): number => {
    if (!carts) return 0

    return carts?.orderMenus.reduce((sum, cur) => cur.totalPrice + sum, 0)
  }, [carts])

  const isUnderMinOrder = useMemo(() => {
    return totalPrice < minimumOrderAmount
  }, [totalPrice, minimumOrderAmount])

  const handleButtonClick = () => {
    if (accessToken) router.push(ROUTE_PATHS.PAY)
    else showModal({ content: <LoginModal />, useAnimation: true })
  }

  return (
    <div className="sticky bottom-0 z-10 rounded-t-lg bg-white px-mobile_safe py-4 shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)]">
      {isUnderMinOrder && (
        <p className="pb-2 text-center text-sm font-bold text-red-600">
          {(minimumOrderAmount - totalPrice).toLocaleString()}원 더 담으면 배달 가능해요
        </p>
      )}
      <Button
        onClick={handleButtonClick}
        className={cn(
          'text-base font-semibold',
          isUnderMinOrder && 'bg-gray-400 hover:bg-gray-400'
        )}
        disabled={isUnderMinOrder}
      >
        {totalPrice.toLocaleString()}원 주문하기
      </Button>
    </div>
  )
}
