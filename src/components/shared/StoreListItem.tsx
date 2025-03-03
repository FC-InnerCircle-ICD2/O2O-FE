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
  onBeforeNavigate?: () => void
}

const StoreListItem = ({ store, onBeforeNavigate }: StoreListItemProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const router = useRouter()

  const handleClick = () => {
    if (onBeforeNavigate) {
      onBeforeNavigate()
    }
    router.push(`${ROUTE_PATHS.STORE_DETAIL}/${store.id}`)
  }

  return (
    <div className="flex flex-1 cursor-pointer items-center gap-[10px]" onClick={handleClick}>
      <div className="relative size-[100px]">
        {isImageLoading && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gray-200" />
        )}
        {store.imageMain && (
          <Image
            className={`size-[100px] rounded-xl object-cover object-center ${
              isImageLoading ? 'invisible' : ''
            }`}
            src={store.imageMain}
            alt="음식점 대표 이미지"
            width={100}
            height={100}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            quality={60}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-[6px] overflow-x-hidden">
        <p className="truncate text-lg font-bold text-black">{store.name}</p>
        <div className="flex items-center gap-[4px]">
          <div className="flex items-center gap-[2px]">
            <Icon name="Star" size={14} color={COLORS.primary} fill={COLORS.primary} />
            <span className="text-sm font-bold text-black">{store.rating}</span>
            <span className="text-sm font-medium text-gray-400">
              ({store.reviewCount.toLocaleString()})
            </span>
          </div>
          <Dot />
          <span className="text-sm font-medium text-gray-600">
            {store.deliveryDistance ? formatDistance(store.deliveryDistance) : ''}
          </span>
          <Dot />
          <span className="text-sm font-medium text-gray-600">{store.deliveryTime}분</span>
        </div>
        <p className="text-sm font-medium text-gray-600">
          {!store.deliveryFee ? '배달비 무료' : store.deliveryFee.toLocaleString() + '원'}
        </p>
      </div>
    </div>
  )
}

export default StoreListItem
