import { COLORS } from '@/styles/color'
import Icon from '@/components/Icon'
import Input from '@/components/input'
import { SearchIcon } from 'lucide-react'

const OrderSearch = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="left-0 top-8 z-20 w-full bg-white">
        <div className="relative">
          <Input
            inputSize="sm"
            offOutline
            type="search"
            placeholder="주문 내역을 검색하세요"
            icon={<SearchIcon className="size-5 text-gray-500" />}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderSearch
