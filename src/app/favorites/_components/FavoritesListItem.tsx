'use client'

import { Favorites } from '@/api/useGetFavorites'
import usePostFavorites from '@/api/usePostFavorites'
import Icon from '@/components/Icon'
import { Skeleton } from '@/components/shadcn/skeleton'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { cn } from '@/lib/utils'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface FavoritesListItemProps {
  store: Favorites
  isRecent?: boolean
  isLast?: boolean
}

const FavoritesListItem = ({ store, isRecent, isLast }: FavoritesListItemProps) => {
  const router = useRouter()
  const { deleteFavorites } = usePostFavorites()
  const { storedValue: recentStoreIds, setValue } = useLocalStorage<string[]>('recentStore', [])
  const queryClient = useQueryClient()

  const handleRecentStoreDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!recentStoreIds) return

    setValue(recentStoreIds.filter((id) => id !== store.id))
    queryClient.invalidateQueries({ queryKey: ['recentStores'] })
  }

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    deleteFavorites(store.id)
  }

  if (!store) return null
  return (
    <div
      className={cn(
        'flex gap-2 border-b border-solid bg-white px-mobile_safe py-4',
        isLast ? 'border-b-0' : 'border-b-gray-200'
      )}
      onClick={() => router.push(`${ROUTE_PATHS.STORE_DETAIL}/${store.id}`)}
    >
      <div className="relative size-[80px] overflow-hidden rounded-md">
        {store.imageMain ? (
          <Image src={store.imageMain} className="object-cover" alt="sample" fill sizes="80px" />
        ) : (
          <Skeleton className="size-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <p className="max-w-[calc(100dvw-40px-80px-1rem-22px)] truncate text-base font-semibold text-black">
          {store.name}
        </p>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="flex items-center gap-[2px]">
              <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
              <span className="font-bold text-black">{store.rating}</span>
            </div>
            <span>({store.reviewCount})</span>
          </div>
          {/* <Dot />
                  <span className="text-xs text-gray-500">포장가능</span> */}
        </div>
        <p className="text-sm text-gray-500">
          최소 주문{' '}
          <span className="font-medium text-black">
            {store.minimumOrderAmount.toLocaleString()}원
          </span>
        </p>
      </div>
      <div className={cn('flex flex-col gap-1', isRecent ? 'justify-between' : 'justify-center')}>
        {isRecent ? (
          <Icon className="text-gray-600" name="X" size={22} onClick={handleRecentStoreDelete} />
        ) : (
          <Icon
            className="fill-red-500 text-red-500"
            name="Heart"
            size={24}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default FavoritesListItem
