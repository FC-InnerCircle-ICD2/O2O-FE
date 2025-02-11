import FavoritesListItem from './FavoritesListItem'

const RecentStoreList = () => {
  return (
    <div>
      <p className="flex items-center gap-2 px-mobile_safe py-3 text-base font-bold text-black">
        최근 본 맛집 <span className="text-sm font-medium text-gray-500">1개</span>
      </p>
      <FavoritesListItem isRecent={true} isLast={true} />
      {/* <EmptyRecentStore /> */}
    </div>
  )
}

const EmptyRecentStore = () => {
  return (
    <div className="flex h-[400px] w-full items-center justify-center bg-white px-mobile_safe pb-6 pt-7">
      <p className="pb-4 text-base text-gray-700">최근 방문한 맛집들을 볼 수 있어요.</p>
    </div>
  )
}

export default RecentStoreList
