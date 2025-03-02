import { OrdersDetail } from '@/api/useGetOrdersDetail'
import Chip from '@/components/Chip'
import Confirm from '@/components/Confirm'
import Separator from '@/components/Separator'
import { modalStore } from '@/store/modal'
import { v4 as uuidv4 } from 'uuid'

interface OrderListProps {
  ordersData: OrdersDetail
  patchOrderCancel: (orderId: string) => void
}

const OrderList = ({ ordersData, patchOrderCancel }: OrderListProps) => {
  const { showModal } = modalStore()

  const handleOrderCancel = () => {
    showModal({
      content: (
        <Confirm
          title="주문 취소"
          message="주문을 취소하시겠습니까?"
          onConfirmClick={() => {
            patchOrderCancel(ordersData.orderId)
          }}
        />
      ),
    })
  }

  return (
    <div className="flex flex-col px-mobile_safe">
      <div className="flex flex-row items-center justify-between pb-6">
        <div className="text-xl font-bold">{ordersData.storeName}</div>
        {(ordersData.status.code === 'S1' || ordersData.status.code === 'S2') && (
          <Chip text="주문 취소" onClick={handleOrderCancel} />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-lg font-bold">주문정보</div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between gap-8">
            <div className="min-w-[50px] text-sm text-gray-500">주문번호</div>
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
