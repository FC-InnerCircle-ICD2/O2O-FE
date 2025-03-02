'use client'

import useDeleteCart from '@/api/useDeleteCarts'
import useGetCarts from '@/api/useGetCarts'
import useGetStoreDetail from '@/api/useGetStoreDetail'
import usePatchCarts from '@/api/usePatchCarts'
import usePostOrderPay, { OrderPay, OrderPayResponse, OrderPayType } from '@/api/usePostOrderPay'
import MenuItem from '@/app/pay/_components/MenuItem'
import Alert from '@/components/Alert'
import { Button } from '@/components/button'
import Confirm from '@/components/Confirm'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { Checkbox } from '@/components/shadcn/checkbox'
import { Label } from '@/components/shadcn/label'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { pay200SDK } from '@pay200/sdk'
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import OrderPayBottomSheet from './OrderPayBottomSheet'

const OrderInfo = () => {
  const router = useRouter()

  const { carts, resetCarts } = useGetCarts()
  const { mutate: deleteCarts } = useDeleteCart()
  const { mutate: updateCarts } = usePatchCarts()
  const { storeDetail } = useGetStoreDetail(carts?.storeId || null)
  const { mutate: orderPay, data: orderResponse } = usePostOrderPay()

  const [cartsState, setCartsState] = useState(carts)
  const [isExcludingSpoon, setIsExcludingSpoon] = useState(false)
  const [paymentType, setPaymentType] = useState<OrderPayType | null>(null)
  const [deliveryPrice] = useState(0)

  const { member } = memberStore()
  const { showModal } = modalStore()
  // const { payments, setPayments } = successPaymentStore()

  const { BottomSheet, hide } = useBottomSheet()
  const { toast } = useToast()

  const handleEmptyCart = () => {
    if (!cartsState) return

    showModal({
      content: (
        <Confirm
          title="장바구니 비우기"
          message="담은 메뉴를 모두 삭제할까요?"
          confirmText="비우기"
          onConfirmClick={() => {
            const cartIds = cartsState.orderMenus.map((menu) => menu.cartId)
            deleteCarts(
              { cartIds },
              {
                onSuccess: () => {
                  resetCarts()
                  setCartsState(undefined)
                },
              }
            )
          }}
        />
      ),
    })
  }
  const handleIncreaseQuantity = (cartId: number) => {
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

  const handleOrderPay = async () => {
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

    if (!paymentType) {
      toast({
        description: '결제수단을 선택해주세요.',
        position: 'center',
      })
      return
    }

    const orderData: OrderPay = {
      storeId: cartsState.storeId,
      roadAddress: member.address.roadAddress || '',
      jibunAddress: member.address.jibunAddress || '',
      detailAddress: member.address.detailAddress || '',
      excludingSpoonAndFork: isExcludingSpoon,
      orderType: 'DELIVERY',
      paymentType,
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

  const isUnderMinOrder = useMemo(() => {
    if (!storeDetail) return true
    return totalMenuPrice < storeDetail.minimumOrderAmount
  }, [storeDetail, cartsState])

  const handleSelectPaymentType = (type: OrderPayType) => {
    setPaymentType(type)
    hide()
  }

  const handleSelectOrderPay = () => {
    BottomSheet({
      title: '결제 수단',
      content: (
        <OrderPayBottomSheet
          currentPaymentType={paymentType}
          onSelectPaymentType={handleSelectPaymentType}
        />
      ),
    })
  }

  const handleSelectRiderRequest = () => {
    toast({
      description: '준비중입니다.',
      position: 'center',
    })
  }

  async function requestPayment(orderResponse: OrderPayResponse) {
    if (!process.env.NEXT_PUBLIC_TOSS_PAY_KEY || !process.env.NEXT_PUBLIC_PAY200_KEY) {
      toast({
        description: '결제 수단 설정에 문제가 있습니다.',
        position: 'center',
      })
      return
    }

    // 결제 시작 전 현재 URL을 히스토리에 추가
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.href)
    }

    if (paymentType === OrderPayType.PAY200) {
      // SDK 초기화
      const requestPayment = pay200SDK({
        apiKey: process.env.NEXT_PUBLIC_PAY200_KEY,
      })

      try {
        await requestPayment({
          orderId: orderResponse.orderId,
          amount: orderResponse.totalPrice,
          orderName: '개발의 민족 주문',
          successUrl: `${window.location.origin}/pay/success`,
        })
      } catch (error) {
        console.error('결제 중 오류가 발생했습니다:', error)
      }
    } else if (paymentType === OrderPayType.TOSS) {
      try {
        const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_PAY_KEY)

        const payment = tossPayments.payment({ customerKey: ANONYMOUS })

        await payment.requestPayment({
          method: 'CARD', // 카드 및 간편결제
          amount: {
            currency: 'KRW',
            value: orderResponse.totalPrice,
          },
          orderId: orderResponse.orderId, // 고유 주문번호
          orderName: '개발의 민족 주문',
          successUrl: window.location.origin + '/pay/success', // 결제 요청이 성공하면 리다이렉트되는 URL
          failUrl: window.location.origin + '/pay/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
          // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
          // customerMobilePhone: "01012341234",
          card: {
            useEscrow: false,
            flowMode: 'DEFAULT',
            // flowMode: 'DIRECT',
            // cardCompany: 'TOSSBANK',
            useCardPoint: false,
            useAppCardOnly: false,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

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
      requestPayment(orderResponse)
    }
  }, [orderResponse])

  useEffect(() => {
    if (cartsState && cartsState.orderMenus.length === 0) {
      setCartsState(undefined)
      resetCarts()
    }
  }, [cartsState])

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
    <div id="payment-method" className="relative mt-5">
      <div className="flex flex-col gap-5 px-mobile_safe pb-7">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <Icon name="Bike" size={24} />
            <div className="place-content-center text-sm font-bold">가게배달</div>
            <div className="place-content-center text-xs">49~64분 후 도착</div>
          </div>
          {/* <div>
          <Icon name="ChevronRight" size={24} />
        </div> */}
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between" onClick={handleSelectRiderRequest}>
            <div className="flex flex-row gap-2">
              <Icon name="MapPin" size={24} />
              <div className="max-w-[calc(100dvw-24px-24px-54px-1rem-40px)] place-content-center truncate text-sm font-bold">
                {`${member?.address.roadAddress} ${member?.address.detailAddress}`}
              </div>
              <div className="place-content-center text-xs">(으)로 배달</div>
            </div>
            <Icon name="ChevronRight" size={24} />
          </div>
          <div>
            <div className="ml-7 text-xs text-gray-700">[지번] {member?.address.jibunAddress}</div>
          </div>
        </div>
        <div className="rounded-xl border border-solid border-gray-400">
          <div className="flex flex-row justify-between border-b border-solid border-gray-300 px-5 py-4">
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

          <div className="flex flex-col gap-1 px-5 py-4">
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

          <div className="flex flex-row items-center justify-center gap-1 border-t border-solid border-gray-300 px-5 py-4">
            <Icon name="Plus" size={20} />
            <div
              className="cursor-pointer font-bold"
              onClick={() => router.push(`${ROUTE_PATHS.STORE_DETAIL}/${storeDetail.id}`)}
            >
              메뉴 추가하기
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-solid border-gray-400 px-5 py-4">
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
            <div className="flex flex-row gap-1" onClick={handleSelectRiderRequest}>
              <div className="place-content-center text-sm">요청사항 없음</div>
              <Icon name="ChevronRight" size={24} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-solid border-gray-400 px-5 py-4">
          <div className="flex flex-row justify-between" onClick={handleSelectOrderPay}>
            <div className="place-content-center text-base font-extrabold">결제수단</div>
            <div className="flex flex-row items-center gap-1">
              <div className="place-content-center text-sm font-semibold text-primary">
                {!paymentType ? (
                  '결제수단을 선택해주세요'
                ) : (
                  <span className="text-base font-semibold">
                    {paymentType === OrderPayType.TOSS ? '토스페이' : 'PAY200'}
                  </span>
                )}
              </div>
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
      </div>

      {/* 배달비 무료 조건 추가 */}
      <div className="sticky bottom-0 left-0 h-28 w-full max-w-[480px] rounded-t-2xl bg-white px-mobile_safe shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)]">
        <p
          className={cn(
            'py-3 text-center text-sm font-semibold text-blue-600',
            isUnderMinOrder && 'text-red-600'
          )}
        >
          {isUnderMinOrder
            ? `${(storeDetail.minimumOrderAmount - totalMenuPrice).toLocaleString()}원 더 담으면 배달 가능해요`
            : '배달비 무료!'}
        </p>
        <Button
          size={'s'}
          onClick={handleOrderPay}
          className={cn('text-base font-bold', isUnderMinOrder && 'bg-gray-400 hover:bg-gray-400')}
          disabled={isUnderMinOrder}
        >
          {(totalMenuPrice + deliveryPrice).toLocaleString()}원 배달 결제하기
        </Button>
      </div>
    </div>
  )
}

export default OrderInfo
