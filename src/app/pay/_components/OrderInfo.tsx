'use client'

import useDeleteCart from '@/api/useDeleteCarts'
import useGetCarts from '@/api/useGetCarts'
import useGetStoreDetail from '@/api/useGetStoreDetail'
import usePatchCarts from '@/api/usePatchCarts'
import usePostOrderPay, { OrderPay } from '@/api/usePostOrderPay'
import usePostPayment from '@/api/usePostPayment'
import MenuItem from '@/app/pay/_components/MenuItem'
import Alert from '@/components/Alert'
import { Button } from '@/components/button'
import Confirm from '@/components/Confirm'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { Checkbox } from '@/components/shadcn/checkbox'
import { Label } from '@/components/shadcn/label'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const OrderInfo = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { carts, resetCarts } = useGetCarts()
  const [cartsState, setCartsState] = useState(carts)
  const { mutate: deleteCarts } = useDeleteCart()
  const { mutate: updateCarts } = usePatchCarts()

  const { storeDetail } = useGetStoreDetail(Number(carts?.storeId) || null)
  const { member } = memberStore()
  const { showModal, hideModal, modals } = modalStore()

  const [isExcludingSpoon, setIsExcludingSpoon] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const { mutate: orderPay, isSuccess, data: orderResponse } = usePostOrderPay()
  const { mutate: payment, isSuccess: paymentSuccess } = usePostPayment()

  const handleEmptyCart = () => {
    if (!cartsState) return
    const cartIds = cartsState.orderMenus.map((menu) => menu.cartId)
    deleteCarts(
      { cartIds },
      {
        onSuccess: () => setCartsState(undefined),
      }
    )
  }
  const handleIncreaseQuantity = (cartId: number) => {
    // TODO: 테스트용 -> 배포 시 아래걸로 바꾸기
    // const updateCartsState = (newQuantity: number) => {
    //   setCartsState((prev) => {
    //     if (!prev) return
    //     return {
    //       storeId: prev.storeId,
    //       orderMenus: prev.orderMenus.map(menu => {
    //         if (menu.menuId !== menuId) return menu

    //         const unitPrice = menu.totalPrice / menu.quantity
    //         console.log(unitPrice, menu.quantity)
    //         return {
    //           ...menu,
    //           quantity: menu.quantity + 1,
    //           totalPrice: Math.round(unitPrice * (menu.quantity + 1))
    //         }
    //       })
    //     }
    //   })
    // }

    const updateCartsState = (newQuantity: number) => {
      setCartsState((prev) => {
        if (!prev) return
        return {
          storeId: prev.storeId,
          orderMenus: prev.orderMenus.map((menu) => {
            if (menu.cartId !== cartId) return menu

            const unitPrice = menu.totalPrice / menu.quantity
            return {
              ...menu,
              quantity: newQuantity,
              totalPrice: Math.round(unitPrice * newQuantity),
            }
          }),
        }
      })
    }

    if (!storeDetail) return
    const targetMenu = cartsState?.orderMenus.find((menu) => menu.cartId === cartId)
    if (!targetMenu) return
    updateCarts(
      {
        cartId: targetMenu.cartId,
        quantity: targetMenu.quantity + 1,
      },
      {
        onSuccess: (data) => updateCartsState(data.quantity),
      }
    )
  }

  const handleDecreaseQuantity = (cartId: number) => {
    // TODO: 테스트용 -> 배포 시 아래걸로 바꾸기
    // const updateCartsState = (newQuantity: number) => {
    //   setCartsState((prev) => {
    //     if (!prev) return
    //     return {
    //       storeId: prev.storeId,
    //       orderMenus: prev.orderMenus.map(menu => {
    //         if (menu.menuId !== menuId) return menu

    //         const unitPrice = menu.totalPrice / menu.quantity
    //         console.log(unitPrice, menu.quantity)
    //         return {
    //           ...menu,
    //           quantity: menu.quantity - 1,
    //           totalPrice: Math.round(unitPrice * (menu.quantity - 1))
    //         }
    //       })
    //     }
    //   })
    // }
    const updateCartsState = (newQuantity: number) => {
      setCartsState((prev) => {
        if (!prev) return
        return {
          storeId: prev.storeId,
          orderMenus: prev.orderMenus.map((menu) => {
            if (menu.cartId !== cartId) return menu

            const unitPrice = menu.totalPrice / menu.quantity
            return {
              ...menu,
              quantity: newQuantity,
              totalPrice: Math.round(unitPrice * newQuantity),
            }
          }),
        }
      })
    }

    if (!storeDetail) return
    const targetMenu = cartsState?.orderMenus.find((menu) => menu.cartId === cartId)
    if (!targetMenu) return
    updateCarts(
      {
        cartId: targetMenu.cartId,
        quantity: targetMenu.quantity - 1,
      },
      {
        onSuccess: (data) => updateCartsState(data.quantity),
      }
    )
  }
  const handleRemoveItem = (cartId: number) => {
    const updateCartsState = () => {
      setCartsState((prev) => {
        if (!prev) return
        return {
          storeId: prev.storeId,
          orderMenus: prev.orderMenus.filter((item) => item.cartId !== cartId),
        }
      })
    }
    deleteCarts({ cartIds: [cartId] }, { onSuccess: updateCartsState })
  }

  const handleOrderPay = () => {
    if (!cartsState || !member) {
      showModal({
        content: (
          <Alert
            title="주문 오류"
            message="주문에 필요한 정보가 없습니다."
            onClick={() => router.back()}
          />
        ),
      })
      return
    }

    const orderData: OrderPay = {
      storeId: cartsState.storeId,
      roadAddress: member.roadAddress || '',
      jibunAddress: member.jibunAddress || '',
      detailAddress: member.detailAddress || '',
      excludingSpoonAndFork: isExcludingSpoon,
      orderType: 'DELIVERY',
      paymentType: 'TOSS_PAY',
      orderMenus: cartsState.orderMenus.map((item) => {
        return {
          id: item.menuId,
          quantity: item.quantity,
          orderMenuOptionGroups: item.orderMenuOptionGroups.map((group) => ({
            id: group.id,
            orderMenuOptionIds: group.orderMenuOptionIds.map((option) => option.id),
          })),
        }
      }),
    }

    orderPay(orderData)
  }

  const totalMenuPrice = useMemo(() => {
    if (!cartsState) return 0
    return Object.values(cartsState.orderMenus).reduce((acc, menu) => {
      return acc + menu.totalPrice
    }, 0)
  }, [cartsState])

  useEffect(() => {
    return () => {
      resetCarts()
    }
  }, [])
  useEffect(() => {
    setCartsState(carts)
  }, [carts])

  useEffect(() => {
    if (orderResponse) {
      payment({
        orderId: orderResponse.orderId,
        paymentKey: '',
        amount: orderResponse.totalPrice,
      })
    }
  }, [orderResponse])

  useEffect(() => {
    if (paymentSuccess) {
      queryClient.invalidateQueries({ queryKey: ['orders'] })

      showModal({
        content: (
          <Confirm
            title="주문 완료"
            message="주문이 완료되었습니다.<br />주문 내역을 확인하러갈까요?"
            confirmText="확인하러 가기"
            onConfirmClick={() => {
              handleEmptyCart()
              router.push(`${ROUTE_PATHS.ORDERS_DETAIL}/${orderResponse?.orderId}`)
            }}
            cancelText="홈으로"
            onCancelClick={() => {
              handleEmptyCart()
              router.push(ROUTE_PATHS.HOME)
            }}
          />
        ),
      })
    }
  }, [paymentSuccess])

  useEffect(() => {
    if (cartsState && cartsState.orderMenus.length === 0) {
      setCartsState(undefined)
      resetCarts()
    }
  }, [cartsState])

  const isUnderMinOrder = useMemo(() => {
    if (!storeDetail) return true
    return totalMenuPrice < storeDetail.minimumOrderAmount
  }, [storeDetail, cartsState])

  if (!cartsState || !storeDetail) {
    return (
      <div className="mt-[30vh] text-center">
        <div className="mb-8 text-gray-500">장바구니가 비어있어요</div>
        <Button
          className="w-auto px-10"
          variant={'grayFit'}
          onClick={() => router.push(ROUTE_PATHS.HOME_LIST)}
        >
          가게 구경하기
        </Button>
      </div>
    )
  }

  return (
    <div className="my-5 flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Icon name="Bike" size={24} />
          <div className="place-content-center text-sm font-bold">가게배달</div>
          <div className="place-content-center text-xs">49~64분 후 도착</div>
        </div>
        <div>
          <Icon name="ChevronRight" size={24} />
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Icon name="MapPin" size={24} />
          <div className="place-content-center text-sm font-bold">{member?.roadAddress}</div>
          <div className="place-content-center text-xs">(으)로 배달</div>
        </div>
        <Icon name="ChevronRight" size={24} />
      </div>
      <div>
        <div className="ml-7 text-xs text-gray-700">{member?.jibunAddress}</div>
      </div>
      <div className="rounded-xl border border-solid border-gray-400">
        <div className="flex flex-row justify-between border-b border-solid border-gray-300 p-3">
          <div
            className="cursor-pointer text-base font-extrabold"
            onClick={() => router.push(`${ROUTE_PATHS.STORE_DETAIL}/${storeDetail.id}`)}
          >
            {storeDetail.name}
          </div>
          <div
            className="cursor-pointer place-content-center text-xs text-gray-700"
            onClick={handleEmptyCart}
          >
            전체삭제
          </div>
        </div>

        <div className="flex flex-col gap-1 py-4">
          {cartsState.orderMenus.map((menu, index) => (
            <MenuItem
              key={`${menu.menuId}-${index}`}
              menu={menu}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-1 border-t border-solid border-gray-300 p-3">
          <Icon name="Plus" size={20} />
          <div
            className="cursor-pointer font-bold"
            onClick={() => router.push(`${ROUTE_PATHS.STORE_DETAIL}/${storeDetail.id}`)}
          >
            메뉴 추가하기
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-solid border-gray-400 p-5">
        <div className="text-base font-extrabold">가게 요청사항</div>
        {/* <Input placeholder="예) 견과류 빼주세요" /> */}
        <div className="items-top flex items-center space-x-2">
          <Checkbox
            id="terms1"
            className="size-5 border-solid border-gray-300 outline-none data-[state=checked]:border-primary data-[state=checked]:bg-white"
            checked={isExcludingSpoon}
            onCheckedChange={(checked: boolean) => setIsExcludingSpoon(checked)}
          />
          <Label
            htmlFor="terms1"
            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            일회용 수저, 포크는 빼주세요
          </Label>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <div className="place-content-center text-base font-extrabold">라이더 요청사항</div>
          <div className="flex flex-row gap-1">
            <div className="place-content-center text-sm">요청사항 없음</div>
            <Icon name="ChevronRight" size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-solid border-gray-400 p-5">
        <div className="flex flex-row justify-between">
          <div className="place-content-center text-base font-extrabold">결제수단</div>
          <div className="flex flex-row gap-1">
            <div className="place-content-center text-sm text-primary">결제수단을 선택해주세요</div>
            <Icon name="ChevronRight" size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-1">
        <div className="flex flex-row justify-between">
          <div>상품금액</div>
          <div>{totalMenuPrice.toLocaleString()}원</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>배달요금</div>
          <div>{deliveryPrice.toLocaleString()}원</div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between px-1">
        <div className="text-lg font-bold">총 결제금액</div>
        <div className="text-lg font-bold">
          {(totalMenuPrice + deliveryPrice).toLocaleString()}원
        </div>
      </div>
      {isUnderMinOrder && (
        <p className="pb-2 text-center text-sm font-bold text-red-600">
          {(storeDetail.minimumOrderAmount - totalMenuPrice).toLocaleString()}원 더 담으면 배달
          가능해요
        </p>
      )}
      <Button
        onClick={handleOrderPay}
        className={cn(
          'text-base font-semibold',
          isUnderMinOrder && 'bg-gray-400 hover:bg-gray-400'
        )}
        disabled={isUnderMinOrder}
      >
        {(totalMenuPrice + deliveryPrice).toLocaleString()}원 배달 결제하기
      </Button>
    </div>
  )
}

export default OrderInfo
