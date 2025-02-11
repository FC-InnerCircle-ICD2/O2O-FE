import FavoritesListItem from './FavoritesListItem'

const FavoritesStoreList = () => {
  return (
    <div>
      <p className="flex items-center gap-2 px-mobile_safe py-3 text-base font-bold text-black">
        찜한 맛집 <span className="text-sm font-medium text-gray-500">2개</span>
      </p>
      {new Array(2).fill(0).map((_, index) => (
        <FavoritesListItem key={index} isLast={index === 1} />
      ))}
      {/* <EmptyFavorites /> */}
    </div>
  )
}

const EmptyFavorites = () => {
  return (
    <div className="px-mobile_safe">
      <div className="rounded-md bg-white px-mobile_safe pb-6 pt-7">
        <p className="pb-4 text-center text-base text-gray-400">
          즐겨찾는 맛집이 없어요. <br />
          좋아하는 맛집을 '찜'하고 <br />
          빠르게 찾아보세요.
        </p>
        <button className="h-[44px] w-full rounded-md border border-solid border-gray-400 px-4 py-2 text-gray-700">
          맛집 구경하러 가기
        </button>
      </div>
    </div>
  )
}

export default FavoritesStoreList
