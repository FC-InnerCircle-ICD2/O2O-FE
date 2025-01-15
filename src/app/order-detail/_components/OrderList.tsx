import Chip from '@/components/Chip'
import Separator from '@/components/Separator'

const OrderList = () => {
  return (
    <div className="flex flex-col gap-2.5 px-mobile_safe">
      <div className="flex flex-row items-center justify-between py-2">
        <div className="text-[18px] font-bold">파스타집이야</div>
        <Chip text="주문 취소" />
      </div>
      <div className="flex flex-col gap-5 py-2.5 pb-5">
        <div className="text-sm font-bold">주문정보</div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="text-xs text-gray-500">주문번호</div>
            <div className="text-xs text-gray-500">F251232323-12321323</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs text-gray-500">주문시간</div>
            <div className="text-xs text-gray-500">25.01.02 오후 09:54</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <Separator />
      </div>
    </div>
  )
}

export default OrderList
