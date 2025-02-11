'use client'

import SampleImage from '@/assets/images/sample.jpg'
import Dot from '@/components/Dot'
import Icon from '@/components/Icon'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { COLORS } from '@/styles/color'
import Image from 'next/image'

interface FavoritesListItemProps {
  isRecent?: boolean
  isLast?: boolean
}

const FavoritesListItem = ({ isRecent, isLast }: FavoritesListItemProps) => {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      description: '준비중입니다.',
      position: 'center',
    })
  }

  return (
    <div
      className={cn(
        'flex gap-2 border-b border-solid bg-white px-mobile_safe py-4',
        isLast ? 'border-b-0' : 'border-b-gray-200'
      )}
      onClick={handleClick}
    >
      <div className="relative size-[80px] overflow-hidden rounded-md">
        <Image src={SampleImage} className="object-cover" alt="sample" fill />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <p className="text-base font-semibold text-black">컴포즈커피-관악신사교차로점</p>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="flex items-center gap-[2px]">
              <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
              <span className="font-bold text-black">4.5</span>
            </div>
            <span>(9)</span>
          </div>
          <Dot />
          <span className="text-xs text-gray-500">포장가능</span>
        </div>
        <p className="text-sm text-gray-500">
          최소 주문 <span className="font-medium text-black">6,000원</span>
        </p>
      </div>
      <div className={cn('flex flex-col gap-1', isRecent ? 'justify-between' : 'justify-center')}>
        {isRecent && <Icon className="text-gray-600" name="X" size={22} />}
        {isRecent ? (
          <Icon className="mb-2" name="Heart" size={24} />
        ) : (
          <Icon name="Heart" size={24} color={COLORS.primary} fill={COLORS.primary} />
        )}
      </div>
    </div>
  )
}

export default FavoritesListItem
