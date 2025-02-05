import FavoritesListItem from "./FavoritesListItem"

const FavoritesStoreList = () => {
    return (
        <div>
            <p className="flex items-center gap-2 text-base text-black font-bold px-mobile_safe py-3">찜한 맛집 <span className="text-sm text-gray-500 font-medium">2개</span></p>
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
            <div className="bg-white px-mobile_safe rounded-md pt-7 pb-6">
                <p className="text-center text-base text-gray-400 pb-4">
                    즐겨찾는 맛집이 없어요. <br />
                    좋아하는 맛집을 '찜'하고 <br />
                    빠르게 찾아보세요.
                </p>
                <button className="w-full h-[44px] border border-solid border-gray-400 rounded-md px-4 py-2 text-gray-700">맛집 구경하러 가기</button>
            </div>
        </div>
    )
}

export default FavoritesStoreList