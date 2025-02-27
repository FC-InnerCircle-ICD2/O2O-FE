'use client'

import useGetFavorites from '@/api/useGetFavorites'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import memberStore from '@/store/user'
import FavoritesStoreList from './FavoritesStoreList'
import RecentStoreList from './RecentStoreList'

const Favorites = () => {
  const { member } = memberStore()
  const { data: favorites } = useGetFavorites()

  return (
    <div className="flex h-full flex-col bg-neutral-100">
      {member && favorites ? (
        <FavoritesStoreList favorites={favorites} />
      ) : (
        <div className="px-mobile_safe pb-4 pt-[calc(20px+1rem)]">
          <LoginButtonSection
            text={`찜한 맛집을 확인하려면 로그인이 필요해요.\n 지금 가입하고 행복에 가까워지세요!`}
          />
        </div>
      )}

      <RecentStoreList favorites={favorites} />
    </div>
  )
}

export default Favorites
