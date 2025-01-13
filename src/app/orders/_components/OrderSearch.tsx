import Input from '@/components/input'
import Icon from '@/components/Icon'
import { COLORS } from '@/styles/color'

const OrderSearch = () => {
  return (
    <div className="mb-6 flex w-full flex-col gap-7">
      <div className="w-full bg-white">
        <Input
          type="search"
          placeholder="주문 내역을 검색하세요"
          icon={<Icon name="Search" size={20} color={COLORS.gray400} />}
        />
      </div>
    </div>
  )
}

export default OrderSearch
