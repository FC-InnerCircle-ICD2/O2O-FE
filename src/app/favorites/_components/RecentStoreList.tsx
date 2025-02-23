import { Favorites } from '@/api/useGetFavorites'
import useGetRecentStores from '@/api/useGetRecentStores'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useEffect } from 'react'
import FavoritesListItem from './FavoritesListItem'

const RecentStoreList = ({ favorites }: { favorites?: Favorites[] }) => {
  const { storedValue: recentStoreIds, setValue } = useLocalStorage<string[]>('recentStore', [])
  const { data: recentStores } = useGetRecentStores()

  useEffect(() => {
    if (favorites) {
      const ids = recentStoreIds?.filter((id) => !favorites.some((favorite) => favorite.id === id))

      if (ids) {
        setValue(ids)
      }
    }
  }, [favorites])

  return (
    <div className="flex flex-1 flex-col">
      <p className="flex items-center gap-2 bg-neutral-100 px-mobile_safe py-3 text-base font-bold text-black">
        최근 본 맛집{' '}
        <span className="text-sm font-medium text-gray-500">
          {recentStores ? recentStores.length : 0}개
        </span>
      </p>
      {recentStores && recentStores.length > 0 ? (
        recentStores.map((store, index) => (
          <FavoritesListItem
            key={store.id}
            store={store}
            isRecent={true}
            isLast={index === recentStores.length - 1}
          />
        ))
      ) : (
        <EmptyRecentStore />
      )}
    </div>
  )
}

const EmptyRecentStore = () => {
  return (
    <div className="flex min-h-[112px] w-full flex-1 items-center justify-center bg-white px-mobile_safe pb-6 pt-7">
      <p className="text-base text-gray-700">최근 방문한 맛집들을 볼 수 있어요.</p>
    </div>
  )
}

export default RecentStoreList
