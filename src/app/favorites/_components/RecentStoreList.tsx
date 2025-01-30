import FavoritesListItem from "./FavoritesListItem"

const RecentStoreList = () => {
    return (
        <div>
            <p className="flex items-center gap-2 px-mobile_safe text-base text-black font-bold py-3">최근 본 맛집 <span className="text-sm text-gray-500 font-medium">1개</span></p>
            <FavoritesListItem isRecent={true} isLast={true} />
            {/* <EmptyRecentStore /> */}
        </div>
    )
}

const EmptyRecentStore = () => {
    return (
        <div className="h-[400px] w-full flex justify-center items-center bg-white px-mobile_safe pt-7 pb-6">
            <p className="text-base text-gray-700 pb-4">최근 방문한 맛집들을 볼 수 있어요.</p>
        </div>
    )
}

export default RecentStoreList