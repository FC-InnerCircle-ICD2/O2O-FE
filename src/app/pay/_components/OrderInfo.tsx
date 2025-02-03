import MenuItem from '@/app/pay/_components/MenuItem'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { Checkbox } from '@/components/shadcn/checkbox'

const OrderInfo = () => {
  return (
    <div className="mb-5 flex flex-col gap-5">
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
          <div className="place-content-center text-sm font-bold">세종대로 14</div>
          <div className="place-content-center text-xs">(으)로 배달</div>
        </div>
          <Icon name="ChevronRight" size={24} />
      </div>
      <div>
        <div className="ml-7 text-xs text-gray-700">
          서울특별시 세종대로 14 그랜드센트럴(GRAND CENTRAL) 8층
        </div>
      </div>
      <div className="rounded-xl border border-solid border-gray-400">
        <div className="flex flex-row justify-between p-5">
          <div className="text-base font-extrabold">BBQ-남대문점</div>
          <div className="place-content-center text-xs text-gray-700">전체삭제</div>
        </div>
        <Separator className="mb-5" />
        <div className="flex flex-col gap-1">
          <MenuItem />
          <MenuItem />
        </div>
        <Separator className="mb-5 mt-5" />
        <div className="mb-5 flex flex-row items-center justify-center gap-1">
          <Icon name="Plus" size={20} />
          <div className="font-bold">메뉴 추가하기</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-solid border-gray-400 p-5">
        <div className="text-base font-extrabold">가게 요청사항</div>
        {/* <Input placeholder="예) 견과류 빼주세요" /> */}
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              일회용 수저, 포크는 빼주세요
            </label>
          </div>
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
          <div>24,500원</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>배달요금</div>
          <div>0원</div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between px-1">
        <div className="text-lg font-bold">총 결재금액</div>
        <div className="text-lg font-bold">27,500원</div>
      </div>
      <Button>27,500원 배달 결제하기</Button>
    </div>
  )
}

export default OrderInfo
