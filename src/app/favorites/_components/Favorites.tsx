'use client'

import FavoritesStoreList from "./FavoritesStoreList"
import RecentStoreList from "./RecentStoreList"


const Favorites = () => {
    return (
        <div className="bg-neutral-100 h-full">
            <FavoritesStoreList />
            <RecentStoreList />
        </div>
    )
}

export default Favorites