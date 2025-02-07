import Chip from '@/components/Chip'
import Separator from '@/components/Separator'
import { Button } from '@/components/button'
import Link from 'next/link'
import { ROUTE_PATHS } from '@/utils/routes'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'

interface OrderDataList {
  ordersData: {
    orderId: string
    status: {
      code: string
      desc: string
    }
    orderTime: string
    storeName: string
    tel: string
    roadAddress: string
    jibunAddress: string
    detailAddress: string
    excludingSpoonAndFork: boolean
    requestToRider: string | null
    orderPrice: number
    deliveryPrice: number
    deliveryCompleteTime: string | null
    paymentPrice: number
    paymentId: number
    paymentType: {
      code: string
      desc: string
    }
    type: {
      code: string
      desc: string
    }
    orderMenus: {
      id: number
      menuId: string
      menuName: string
      menuQuantity: number
      menuPrice: number
      totalPrice: number
      orderMenuOptionGroups: {
        id: number
        orderMenuId: number
        orderMenuOptionGroupName: string
        orderMenuOptions: {
          id: number
          orderMenuOptionGroupId: number
          menuOptionName: string
          menuOptionPrice: number
        }[]
      }[]
    }[]
  }
}

const OrderList = ({ ordersData }: OrderDataList) => {
  return (
    <div className="flex flex-col gap-2.5 px-mobile_safe">
      <div className="flex flex-row items-center justify-between py-2">
        <div className="text-[18px] font-bold">{ordersData.storeName}</div>
        <Chip text="주문 취소" />
      </div>
      <div className="flex flex-col gap-5 py-2.5 pb-5">
        <div className="text-sm font-bold">주문정보</div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="text-xs text-gray-500">주문번호</div>
            <div className="text-xs text-gray-500">{ordersData.orderId}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs text-gray-500">주문시간</div>
            <div className="text-xs text-gray-500">
              {new Date(ordersData.orderTime).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5 py-2.5">
        <div className="text-sm font-bold">주문내역</div>
        <div className="grid grid-cols-2 gap-3">
          {ordersData.orderMenus.map((menu) => (
            <React.Fragment key={uuidv4()}>
              <div className="text-[14px]" key={uuidv4()}>
                {menu.menuName}
              </div>
              <div
                className="justify-self-end text-[14px]"
                key={uuidv4()}
              >{`${menu.menuPrice.toLocaleString()}원`}</div>
              {menu.orderMenuOptionGroups.map((menuDetail) => (
                <React.Fragment key={uuidv4()}>
                  <div className="max-w-48 text-xs text-gray-500" key={uuidv4()}>
                    {menuDetail.orderMenuOptionGroupName}
                  </div>
                  {menuDetail.orderMenuOptions.map((menuOption) => (
                    <React.Fragment key={uuidv4()}>
                      <div
                        className="justify-self-end text-xs text-gray-500"
                        key={uuidv4()}
                      >{`${menuOption.menuOptionPrice.toLocaleString()}원`}</div>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[14px]">상품금액</div>
          <div className="text-[14px]">{`${ordersData.orderPrice.toLocaleString()}원`}</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-[14px]">배달요금</div>
          <div className="text-[14px]">{`${ordersData.deliveryPrice.toLocaleString()}원`}</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-[14px]">총 결제 금액</div>
          <div className="text-[14px]">{`${ordersData.paymentPrice.toLocaleString()}원`}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">결제방식</div>
          <div className="text-xs text-gray-500">{ordersData.paymentType.desc}</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="text-sm font-bold">주문자 정보</div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">연락처</div>
          <div className="text-xs text-gray-500">{ordersData.tel}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">주소</div>
          <div className="text-xs text-gray-500">{ordersData.roadAddress}</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <Link href={ROUTE_PATHS.ORDERS}>
        <Button>확인</Button>
      </Link>
    </div>
  )
}

export default OrderList
