import Chip from '@/components/Chip'
import Icon from '@/components/Icon'
import useBottomSheet from '@/hooks/useBottomSheet'
import { COLORS } from '@/styles/color'
import React from 'react'

const ChipWrapper = () => {
  const { BottomSheet } = useBottomSheet()

  return (
    <div className="px-mobile_safe">
      <Chip
        text="랭킹순"
        rightIcon={<Icon variant="arrowDown" width={14} height={14} fill={COLORS.gray600} />}
        onClick={() => BottomSheet({ content: <div>test</div>, title: '배달 카테고리' })}
      />
    </div>
  )
}

export default ChipWrapper
