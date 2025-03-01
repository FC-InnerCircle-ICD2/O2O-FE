'use client'

import useGetFavorites from '@/api/useGetFavorites'
import FavoritesStoreList from './FavoritesStoreList'
import RecentStoreList from './RecentStoreList'

const Favorites = () => {
  const { data: favorites } = useGetFavorites()

  return (
    <div className="flex h-full flex-col bg-white">
      <FavoritesStoreList favorites={favorites} />
      <RecentStoreList favorites={favorites || []} />
    </div>
  )
}

export default Favorites
