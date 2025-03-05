'use client'

import { ORDER_TYPE } from '@/constants/orderType'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import Icon from '../Icon'

const FoodOrderListInBottomSheet = () => {
  const { order, setOrder } = useFoodSearchFilterStore()
  const { hide } = useBottomSheet()

  const handleOrder = (index: number) => {
    setOrder(index)
    hide()
  }

  return (
    <div className="px-mobile_safe">
      <ul>
        {ORDER_TYPE.map((item, index) => (
          <li
            key={item.name}
            className="py-2 text-lg text-gray-600"
            onClick={() => handleOrder(index)}
          >
            <div className="flex items-center gap-4">
              <span className={`${order === index ? 'font-semibold' : 'font-normal'}`}>
                {item.name}
              </span>
              {order === index && (
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
