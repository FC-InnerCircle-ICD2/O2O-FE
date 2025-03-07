'use client'

import { ORDER_TYPE } from '@/constants/orderType'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import Chip from '../Chip'
import Icon from '../Icon'
import FoodOrderListInBottomSheet from './FoodOrderListInBottomSheet'

const FoodOrderFilter = () => {
  const { order } = useFoodSearchFilterStore()
  const { BottomSheet } = useBottomSheet()

  return (
    <div className="sticky top-0 z-10 bg-white pb-3">
      <Chip
        text={ORDER_TYPE[order].name}
        rightIcon={<Icon name="ChevronDown" size={16} strokeWidth={3} color={COLORS.gray400} />}
        onClick={() => BottomSheet({ title: '정렬', content: <FoodOrderListInBottomSheet /> })}
      />
    </div>
  )
}

export default FoodOrderFilter
