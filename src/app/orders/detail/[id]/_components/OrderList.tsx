import Chip from '@/components/Chip'
import Separator from '@/components/Separator'
import { Button } from '@/components/button'
import Link from 'next/link'
import { ROUTE_PATHS } from '@/utils/routes'

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
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5 py-2.5">
        <div className="text-sm font-bold">주문내역</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-[14px]">[주문폭주] 투움바 파스타1</div>
          <div className="justify-self-end text-[14px]">12,400원</div>
          <div className="max-w-48 text-xs text-gray-500">
            별 다섯개 이벤트+ 포토리뷰 이벤트 참여: 별5점/포토리뷰[355ml 뚱캔콜라]
          </div>
          <div className="justify-self-end text-xs text-gray-500">500원</div>
          <div className="max-w-48 text-xs text-gray-500">피클 선택</div>
          <div className="justify-self-end text-xs text-gray-500">0원</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-[14px]">상품금액</div>
          <div className="text-[14px]">12,900원</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-[14px]">배달요금</div>
          <div className="text-[14px]">0원</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="text-[14px]">총 결제 금액</div>
          <div className="text-[14px]">12,400원</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">결제방식</div>
          <div className="text-xs text-gray-500">요기서결제/카카오페이</div>
        </div>
      </div>
      <Separator className="mb-3 mt-5" />
      <div className="text-sm font-bold">주문자 정보</div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">연락처</div>
          <div className="text-xs text-gray-500">010-1234-5678</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="max-w-48 text-xs text-gray-500">주소</div>
          <div className="text-xs text-gray-500">서울특별시 구구구 동동동 123-4 123호</div>
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
