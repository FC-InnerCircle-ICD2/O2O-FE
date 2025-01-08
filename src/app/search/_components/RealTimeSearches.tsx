'use client'

import Icon from '@/components/Icon'
import { RealTimeSearch } from '@/models/realTimeSearches'
import { COLORS } from '@/styles/color'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

// Swiper 스타일 import
import 'swiper/css'
import 'swiper/css/pagination'

const REAL_TIME_SEARCHES: RealTimeSearch[] = [
  { id: 1, keyword: '교촌치킨', rankChange: 'up' },
  { id: 2, keyword: '굽네치킨', rankChange: 'down' },
  { id: 3, keyword: 'BBQ', rankChange: 'same' },
  { id: 4, keyword: '네네치킨', rankChange: 'up' },
  { id: 5, keyword: '푸라닭', rankChange: 'down' },
  { id: 6, keyword: '설빙', rankChange: 'down' },
]

// Icon 컴포넌트를 분리하여 코드 정리
const RankChangeIcon = ({ rankChange }: { rankChange: string }) => {
  switch (rankChange) {
    case 'up':
      return <Icon variant="arrowUp" width={16} height={16} fill="red" />
    case 'down':
      return <Icon variant="arrowDown" width={16} height={16} fill="blue" />
    default:
      return <Icon variant="dash" width={16} height={16} fill={COLORS.gray400} />
  }
}

const RealTimeSearchItem = ({
  order,
  realTimeSearch,
}: {
  order: number
  realTimeSearch: RealTimeSearch
}) => {
  // 현재 표시할 검색어만 상태로 관리
  const [currentSearch, setCurrentSearch] = useState<RealTimeSearch>(realTimeSearch)

  useEffect(() => {
    // realTimeSearch prop이 변경될 때마다 currentSearch 업데이트
    setCurrentSearch(realTimeSearch)
    console.log(realTimeSearch)
  }, [realTimeSearch])

  return (
    <div className="flex flex-1 gap-3">
      <span>{order}</span>
      <span>{currentSearch.keyword}</span>
      <RankChangeIcon rankChange={currentSearch.rankChange} />
    </div>
  )
}

const RealTimeSearches = () => {
  const [dummy, setDummy] = useState<RealTimeSearch[]>([])

  useEffect(() => {
    if (dummy.length === 0) return

    console.log(dummy)
  }, [dummy])

  useEffect(() => {
    const interval = setInterval(() => {
      // 배열을 복사하고 무작위로 섞기
      const shuffled = [...REAL_TIME_SEARCHES].sort(() => Math.random() - 0.5)
      setDummy(shuffled)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <div className="flex flex-col gap-[28px] px-mobile_safe">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">실시간 급상승 검색어</span>
        <span className="text-xs font-normal text-gray-400">내 주소 지역, 22:45 기준</span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-[20px]">
          {dummy.slice(0, 3).map((item, index) => (
            <div key={index} className="flex flex-1 gap-3">
              <span>{index + 1}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${crypto.randomUUID()}`}
                  className="flex flex-1 items-center justify-between"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={itemVariants}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <span>{item.keyword}</span>
                  <RankChangeIcon rankChange={item.rankChange || 'same'} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex flex-1 flex-col gap-[20px]">
          {dummy.slice(3, 6).map((item, index) => (
            <div key={index} className="flex flex-1 gap-3">
              <span>{index + 4}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${crypto.randomUUID()}`}
                  className="flex flex-1 items-center justify-between"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={itemVariants}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <span>{item.keyword}</span>
                  <RankChangeIcon rankChange={item.rankChange || 'same'} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealTimeSearches
