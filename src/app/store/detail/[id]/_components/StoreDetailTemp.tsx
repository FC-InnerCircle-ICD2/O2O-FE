'use client'

import useGetCarts from '@/api/useGetCarts'
import useGetStoreDetail from '@/api/useGetStoreDetail'
import useGetStoreMenuCategory from '@/api/useGetStoreMenuCategory'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useToast } from '@/hooks/useToast'
import { modalStore } from '@/store/modal'
import { useMemo, useRef, useState } from 'react'

const MAX_PULL_HEIGHT = 160
const BLUE_BOX_MAX_PULL = 300
const STICKY_HEADER_HEIGHT = 50 // 메뉴 카테고리 헤더의 높이
export const HEADER_HEIGHT = 50

const StoreDetailTemp = () => {
  const storeId = '892003660'
  const [pullHeight, setPullHeight] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const menuRefs = useRef<(HTMLDivElement | null)[]>([])

  const { storeDetail, resetStoreDetail, isSuccess, isError } = useGetStoreDetail(storeId)
  const { storeMenuCategory } = useGetStoreMenuCategory(storeId)
  const { carts } = useGetCarts()
  const { showModal } = modalStore()

  const isCartEmpty = useMemo(() => {
    return carts?.orderMenus.length === 0
  }, [carts])
  const isSameStoreForCart = useMemo(() => {
    return carts ? carts.storeId === storeId : false
  }, [carts, storeId])

  //   const { orderDetail } = orderDetailStore()
  const { BottomSheet } = useBottomSheet()
  const { toast } = useToast()
  //   const { topRef, scrollToTop, showScrollButton } = useScrollToTop<HTMLDivElement>({
  //     callBack: () => {
  //       containerRef.current?.scrollTo({
  //         top: (topRef.current?.offsetTop || 0) + STICKY_HEADER_HEIGHT + HEADER_HEIGHT,
  //         behavior: 'smooth',
  //       })
  //     },
  //     dependencies: [storeMenuCategory],
  //   })

  //   const router = useRouter()

  return (
    <div>
      <div>StoreDetailTemp</div>
    </div>
  )
}

export default StoreDetailTemp
