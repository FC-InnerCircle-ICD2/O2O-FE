import Icon from '@/components/Icon'
import { COLORS } from '@/styles/color'

const OrderSearch = () => {
  return (
    <div className="mb-6 flex w-full flex-col gap-3">
      <div className="fixed left-0 top-8 z-20 w-full bg-white p-2">
        <div className="relative pt-2">
          <Icon className="absolute left-3 top-5" name="Search" size={14} color={COLORS.gray600} />
          <input
            className="w-full rounded-md border-2 border-gray-300 p-2 pl-8"
            type="search"
            placeholder="주문 내역을 검색하세요"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderSearch
