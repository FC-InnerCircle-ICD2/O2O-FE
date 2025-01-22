import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import MenuItem from '@/app/pay/_components/MenuItem'
import Input from '@/components/input'
import { Checkbox } from '@/components/shadcn/checkbox'

const OrderInfo = () => {
  return (
    <div className="flex flex-col gap-5">
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
        <div>
          <Icon name="ChevronRight" size={24} />
        </div>
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
      <div className="flex flex-col gap-3 rounded-xl border border-solid border-gray-400 p-5">
        <div className="text-base font-extrabold">가게 요청사항</div>
        <Input placeholder="예) 견과류 빼주세요" />
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
