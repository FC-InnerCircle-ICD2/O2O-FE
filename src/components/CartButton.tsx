import useGetCarts from '@/api/useGetCarts'
import { cn } from '@/lib/utils'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import Icon from './Icon'

interface CartButtonProps {
  hasBottomNavigation?: boolean
  className?: string
}

const CartButton = ({ className = '', hasBottomNavigation = true }: CartButtonProps) => {
  const { carts, resetCarts } = useGetCarts()
  const cartItems = useMemo(() => carts?.orderMenus.map(menu => menu.quantity).reduce((acc, cur) => cur + acc, 0) || 0, [carts])

  // 배지 위치
  const getBadgePosition = (count: number) => {
    if (count < 10) return { top: '-top-4', right: '-right-4' }
    if (count < 100) return { top: '-top-5', right: '-right-5' }
    return { top: '-top-6', right: '-right-6' }
  }

  // 100 이상이면 "99+"로 변환
  const formatCartCount = (count: number) => (count >= 100 ? '99+' : count)

  const { top, right } = getBadgePosition(cartItems)
  const formattedCartItems = formatCartCount(cartItems)
  useEffect(() => {
    return () => {
      resetCarts()
    }
  }, [])

  if (cartItems === 0) return <></>

  return (
    <Link href={ROUTE_PATHS.PAY}>
      <div
        className={cn(
          'hover:bg-primary-dark border-primary-300 fixed bottom-[3rem] right-5 z-50 cursor-pointer rounded-full border border-solid border-primary-foreground bg-primary p-[12px] transition-colors',
          'shadow-[0_4px_6px_rgba(var(--color-primary-rgb),0.5)]', // primary 색상의 그림자 추가
          hasBottomNavigation && 'bottom-[6.5rem]',
          className
        )}
      >
        <div className="relative">
          <Icon name="ShoppingCart" size={20} color="white" />
          <div
            className={cn(
              'absolute flex aspect-square min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full border-2 border-solid border-primary bg-white p-1 text-xs font-bold text-primary',
              top,
              right
            )}
          >
            {formattedCartItems}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CartButton
