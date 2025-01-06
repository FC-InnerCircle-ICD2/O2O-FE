import { COLORS } from '@/styles/color'
import Icon from '@/components/Icon'

const OrderSearch = () => {
  return (
    <div className="relative pt-2">
      <Icon
        className="absolute left-3 top-5"
        variant="search"
        width={14}
        height={14}
        fill={COLORS.gray600}
      />
      <input
        className="w-full rounded-md border-2 border-gray-300 p-2 pl-8"
        type="search"
        placeholder="주문 내역을 검색하세요"
      />
    </div>
  )
}

export default OrderSearch
