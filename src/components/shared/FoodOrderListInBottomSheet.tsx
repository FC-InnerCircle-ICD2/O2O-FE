'use client'

import useBottomSheet from '@/hooks/useBottomSheet'
import { OrderType } from '@/models/orderType'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import Icon from '../Icon'

const FoodOrderListInBottomSheet = () => {
  const { order, setOrder } = useFoodSearchFilterStore()
  const { hide } = useBottomSheet()

  const handleOrder = (order: OrderType) => {
    setOrder(order)
    hide()
  }

  return (
    <div className="px-mobile_safe pb-10">
      <ul>
        {Object.values(OrderType).map((item) => (
          <li key={item} className="py-2 text-lg text-gray-600" onClick={() => handleOrder(item)}>
            <div className="flex items-center gap-4">
              <span className={`${order === item ? 'font-semibold' : 'font-normal'}`}>{item}</span>
              {order === item && (
                <Icon name="Check" size={18} strokeWidth={3} color={COLORS.gray600} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FoodOrderListInBottomSheet
