'use client'

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
import { modalStore } from '@/store/modal'
import { orderListStore } from '@/store/orderList'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const OrderInfo = () => {
  const router = useRouter()

  const { orderList, removeOrderList } = orderListStore()
  const { member } = memberStore()
  const { showModal, hideModal, modals } = modalStore()

  const isFirstRender = useRef(true)

  const [isExcludingSpoon, setIsExcludingSpoon] = useState(false)
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [menuPriceAndCount, setMenuPriceAndCount] = useState<
    Record<string, { count: number; price: number }>
  >({})

  // const orderData: OrderPay = {
  //   storeId: '26466355',
  //   roadAddress: '서울특별시 강남구 테헤란로 123',
  //   jibunAddress: '서울특별시 강남구 역삼동 123-45',
  //   detailAddress: '101호',
  //   excludingSpoonAndFork: isExcludingSpoon,
  //   orderType: 'DELIVERY',
  //   paymentType: 'TOSS_PAY',
  //   orderMenus: [
  //     {
  //       id: '9e15c3da-cae8-4c25-8b4e-ae21a926f072',
  //       quantity: 2,
  //       orderMenuOptionGroups: [
  //         {
  //           id: '62f5ab82-6f9f-4344-964c-9a09a568df62',
  //           orderMenuOptionIds: ['c5d18e3d-e643-49d6-b089-3dbb5a148800'],
  //         },
  //       ],
  //     },
  //   ],
  // }

  const { mutate: orderPay, isSuccess, data: orderResponse } = usePostOrderPay()
  const { mutate: payment, isSuccess: paymentSuccess } = usePostPayment()

  const handleOrderPay = () => {
    if (!orderList || !member) {
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
      storeId: orderList.storeId,
      roadAddress: member.roadAddress || '',
      jibunAddress: member.jibunAddress || '',
      detailAddress: member.detailAddress || '',
      excludingSpoonAndFork: isExcludingSpoon,
      orderType: 'DELIVERY',
      paymentType: 'TOSS_PAY',
      orderMenus: orderList.menu.map((item) => {
        return {
          id: item.menuId,
          quantity: menuPriceAndCount[item.menuId].count,
          orderMenuOptionGroups: Object.keys(item.selectedOptions).map((group) => ({
            id: group,
            orderMenuOptionIds: item.selectedOptions[group].map((option) => option.id),
          })),
        }
      }),
    }

    orderPay(orderData)
  }

  const handlePriceAndCount = (id: string, count: number) => {
    setMenuPriceAndCount((prev) => {
      const currentPriceAndCount = prev[id] || { count: 0, price: 0 }
      return {
        ...prev,
        [id]: { count: count, price: currentPriceAndCount.price },
      }
    })
  }

  const getPrice = () => {
    return Object.values(menuPriceAndCount).reduce((acc, menu) => {
      return acc + menu.price * menu.count
    }, 0)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      if (!orderList && modals.length === 0) {
        showModal({
          content: (
            <Alert
              title="주문 오류"
              message="주문 목록을 추가해주세요."
              onClick={() => router.back()}
            />
          ),
        })

        return
      }

      setMenuPriceAndCount(
        orderList?.menu.reduce(
          (acc, menu) => {
            acc[menu.menuId] = {
              count: 1,
              price: menu.price,
            }
            return acc
          },
          {} as Record<string, { count: number; price: number }>
        ) || {}
      )
    }
  }, [])

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
      showModal({
        content: (
          <Confirm
            title="주문 완료"
            message="주문이 완료되었습니다.<br />주문 내역을 확인하러갈까요?"
            confirmText="확인하러 가기"
            onConfirmClick={() => {
              removeOrderList()
              router.push(`${ROUTE_PATHS.ORDERS_DETAIL}/${orderResponse?.orderId}`)
            }}
            cancelText="홈으로"
            onCancelClick={() => router.push(ROUTE_PATHS.HOME)}
          />
        ),
      })
    }
  }, [paymentSuccess])

  if (!orderList) {
    return null
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
          <div className="text-base font-extrabold">{orderList.storeName}</div>
          <div className="place-content-center text-xs text-gray-700">전체삭제</div>
        </div>

        <div className="flex flex-col gap-1 py-4">
          {orderList.menu.map((item) => (
            <MenuItem key={item.menuId} menu={item} handlePriceAndCount={handlePriceAndCount} />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-1 border-t border-solid border-gray-300 p-3">
          <Icon name="Plus" size={20} />
          <div className="font-bold">메뉴 추가하기</div>
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
          <div className="place-content-center text-base font-extrabold">결재수단</div>
          <div className="flex flex-row gap-1">
            <div className="place-content-center text-sm text-primary">결재수단을 선택해주세요</div>
            <Icon name="ChevronRight" size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-1">
        <div className="flex flex-row justify-between">
          <div>상품금액</div>
          <div>{getPrice().toLocaleString()}원</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>배달요금</div>
          <div>{deliveryPrice.toLocaleString()}원</div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between px-1">
        <div className="text-lg font-bold">총 결재금액</div>
        <div className="text-lg font-bold">{(getPrice() + deliveryPrice).toLocaleString()}원</div>
      </div>
      <Button onClick={handleOrderPay}>
        {(getPrice() + deliveryPrice).toLocaleString()}원 배달 결제하기
      </Button>
    </div>
  )
}

export default OrderInfo
