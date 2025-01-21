import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import MenuItem from '@/app/pay/_components/MenuItem'

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
        <div className="ml-7 text-xs text-gray-700">서울특별시 세종대로 14 그랜드센트럴(GRAND CENTRAL) 8층</div>
      </div>
      <div className="border-solid border rounded-xl border-gray-400">
        <div className="flex flex-row justify-between p-5">
          <div className="text-base font-extrabold">BBQ-남대문점</div>
          <div className="text-xs text-gray-700 place-content-center">전체삭제</div>
        </div>
        <Separator className="mb-5"/>
        <MenuItem />
      </div>
    </div>
  )
}

export default OrderInfo
