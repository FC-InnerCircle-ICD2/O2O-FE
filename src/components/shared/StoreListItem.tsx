import { formatDistance } from '@/lib/format'
import { Store } from '@/models/store'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Dot from '../Dot'
import Icon from '../Icon'

interface StoreListItemProps {
  store: Store
}

const StoreListItem = ({ store }: StoreListItemProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const router = useRouter()

  return (
    <div
      className="flex flex-1 items-center gap-[10px]"
      onClick={() => router.push(`${ROUTE_PATHS.STORE_DETAIL}/${store.id}`)}
    >
      <div className="relative size-[100px]">
        {isImageLoading && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gray-200" />
        )}
        <Image
          className={`size-[100px] rounded-xl object-cover object-center ${
            isImageLoading ? 'invisible' : ''
          }`}
          src={store.imageUrl}
          alt="음식점 대표 이미지"
          width={100}
          height={100}
          loading="lazy"
          onLoad={() => setIsImageLoading(false)}
          quality={60}
        />
      </div>
      <div className="flex flex-1 flex-col gap-[6px] overflow-x-hidden">
        <p className="truncate text-base font-bold text-black">{store.name}</p>
        <div className="flex items-center gap-[4px]">
          <div className="flex items-center gap-[2px]">
            <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
            <span className="text-xs font-bold text-black">{store.rating}</span>
            <span className="text-xs font-medium text-gray-400">
              ({store.reviewCount.toLocaleString()})
            </span>
          </div>
          <Dot />
          <span className="text-xs font-medium text-gray-600">
            {store.distance ? formatDistance(store.distance) : ''}
          </span>
          <Dot />
          <span className="text-xs font-medium text-gray-600">{store.deliveryTime}</span>
        </div>
        <p className="text-xs font-medium text-gray-600">
          {!store.deliveryFee ? '배달비 무료' : store.deliveryFee.toLocaleString() + '원'}
        </p>
      </div>
    </div>
  )
}

export default StoreListItem
