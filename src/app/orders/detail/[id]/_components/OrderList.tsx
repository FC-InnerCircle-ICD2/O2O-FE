import Chip from '@/components/Chip'
import Separator from '@/components/Separator'
import { v4 as uuidv4 } from 'uuid'

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
    <div className="flex flex-col px-mobile_safe">
      <div className="flex flex-row items-center justify-between pb-6">
        <div className="text-xl font-bold">{ordersData.storeName}</div>
        <Chip text="주문 취소" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-lg font-bold">주문정보</div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between gap-8">
            <div className="min-w-detail_header text-sm text-gray-500">주문번호</div>
            <div className="truncate text-sm text-gray-500">{ordersData.orderId}</div>
          </div>
          <div className="flex flex-row justify-between gap-8">
            <div className="text-sm text-gray-500">주문시간</div>
            <div className="text-sm text-gray-500">
              {new Date(ordersData.orderTime).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col gap-5">
        <div className="text-lg font-bold">주문내역</div>
        {ordersData.orderMenus.map((menu) => (
          <div key={uuidv4()}>
            <p className="text-base font-semibold">{`${menu.menuName} ${menu.menuQuantity}개`}</p>
            <ul className="list-disc space-y-0.5 pl-4 pt-1 text-gray-500 [&>li]:pl-0 [&>li]:-indent-1">
              <li className="text-sm">{`기본 : ${(menu.menuPrice * menu.menuQuantity).toLocaleString()}원`}</li>
              {menu.orderMenuOptionGroups.map((menuGroup) =>
                menuGroup.orderMenuOptions.map((menuOption) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="text-sm"
                    >{`${menuGroup.orderMenuOptionGroupName} : ${menuOption.menuOptionName} (${(menuOption.menuOptionPrice * menu.menuQuantity).toLocaleString()}원)`}</li>
                  )
                })
              )}
            </ul>
          </div>
        ))}

        {/* <div className="grid grid-cols-2 gap-3">
          {ordersData.orderMenus.map((menu) => (
            <React.Fragment key={uuidv4()}>
              <div className="text-[14px]" key={uuidv4()}>
                {`${menu.menuName} ${menu.menuQuantity}개`}
              </div>
              <div
                className="justify-self-end text-[14px]"
                key={uuidv4()}
              >{`${(menu.menuPrice * menu.menuQuantity).toLocaleString()}원`}</div>
              {menu.orderMenuOptionGroups.map((menuDetail) => (
                <React.Fragment key={uuidv4()}>
                  <div className="max-w-48 text-xs text-gray-500" key={uuidv4()}>
                    {menuDetail.orderMenuOptionGroupName}
                  </div>
                  <div>
                  {menuDetail.orderMenuOptions.map((menuOption) => (
                    <React.Fragment key={uuidv4()}>
                      <div
                        className="justify-self-end text-xs text-gray-500"
                        key={uuidv4()}
                      >{`${menuOption.menuOptionPrice.toLocaleString()}원`}</div>
                    </React.Fragment>
                  ))}
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div> */}
      </div>

      <Separator className="my-5" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-base">상품금액</div>
          <div className="text-base">{`${ordersData.orderPrice.toLocaleString()}원`}</div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-base">배달요금</div>
          <div className="text-base">{`${ordersData.deliveryPrice.toLocaleString()}원`}</div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-base">총 결제 금액</div>
          <div className="text-base">{`${ordersData.paymentPrice.toLocaleString()}원`}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-gray-500">결제방식</div>
          <div className="text-sm text-gray-500">{ordersData.paymentType.desc}</div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="pb-5 text-lg font-bold">주문자 정보</div>
      <div className="flex flex-col gap-3 pb-16">
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-sm text-gray-500">연락처</div>
          <div className="text-sm text-gray-500">{ordersData.tel}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-gray-500">주소</div>
          <div className="text-sm text-gray-500">{ordersData.roadAddress}</div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
