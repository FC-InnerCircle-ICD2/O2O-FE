'use client'

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
    <div className="px-mobile_safe">
      <Chip
        text={order}
        rightIcon={<Icon name="ChevronDown" size={14} strokeWidth={3} color={COLORS.gray400} />}
        onClick={() => BottomSheet({ title: '정렬', content: <FoodOrderListInBottomSheet /> })}
      />
    </div>
  )
}

export default FoodOrderFilter
