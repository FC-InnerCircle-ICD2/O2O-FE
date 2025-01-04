'use client'

import useBottomSheet from '@/hooks/useBottomSheet'
import { useHomeSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import Chip from '../Chip'
import Icon from '../Icon'
import FoodOrderListInBottomSheet from './FoodOrderListInBottomSheet'

const FoodOrderFilter = () => {
  const { order } = useHomeSearchFilterStore()
  const { BottomSheet } = useBottomSheet()

  return (
    <div className="px-mobile_safe pb-3">
      <Chip
        text={order}
        rightIcon={<Icon variant="arrowDown" width={14} height={14} fill={COLORS.gray400} />}
        onClick={() => BottomSheet({ title: '정렬', content: <FoodOrderListInBottomSheet /> })}
      />
    </div>
  )
}

export default FoodOrderFilter
