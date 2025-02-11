'use client'

import FavoritesStoreList from './FavoritesStoreList'
import RecentStoreList from './RecentStoreList'

const Favorites = () => {
  return (
    <div className="h-full bg-neutral-100">
      <FavoritesStoreList />
      <RecentStoreList />
    </div>
  )
}

export default Favorites
