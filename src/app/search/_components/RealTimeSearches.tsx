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
      return <Icon name="MoveUp" size={16} strokeWidth={3} color="red" />
    case 'down':
      return <Icon name="MoveDown" size={16} strokeWidth={3} color="blue" />
    default:
      return <Icon name="Minus" size={16} strokeWidth={4} color={COLORS.gray400} />
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
  // 타임스탬프를 저장할 상태 추가
  useEffect(() => {
    setCurrentSearch(realTimeSearch)
  }, [realTimeSearch])

  return (
    <div className="flex h-[16px] grow gap-3 overflow-hidden">
      <span>{order}</span>
      <div className="flex grow flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            // 키값에 타임스탬프 추가
            key={`${currentSearch.id}-${currentSearch.timestamp}`}
            initial={{ y: 16, opacity: 0 }} // 아래에서 시작, 투명하게
            animate={{ y: 0, opacity: 1 }} // 원래 위치로, 불투명하게
            exit={{ y: -16, opacity: 0 }} // 위로 사라지면서 투명하게
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className="flex w-full items-center justify-between"
          >
            <span>{currentSearch.keyword}</span>
            <RankChangeIcon rankChange={currentSearch.rankChange} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const RealTimeSearches = () => {
  const [dummy, setDummy] = useState<RealTimeSearch[]>(REAL_TIME_SEARCHES)
  const [isUpdating, setIsUpdating] = useState(false)
  const [temp, setTemp] = useState<RealTimeSearch[]>([])

  useEffect(() => {
    if (!isUpdating) return

    const updateWithDelay = async () => {
      for (let i = 0; i < temp.length; i++) {
        setDummy((prev) => {
          const newArray = [...prev]
          newArray[i] = temp[i]
          return newArray
        })
        await new Promise((resolve) => setTimeout(resolve, 1500)) // 1초 대기
      }
      setIsUpdating(false)
    }

    updateWithDelay()
  }, [isUpdating])

  useEffect(() => {
    const interval = setInterval(() => {
      // 배열을 복사하고 무작위로 섞기
      const shuffled = [...REAL_TIME_SEARCHES]
        .sort(() => Math.random() - 0.5)
        .map((item) => ({
          ...item,
          timestamp: Date.now(),
        }))
      setTemp(shuffled)
      setIsUpdating(true)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-[28px] px-mobile_safe">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">실시간 급상승 검색어</span>
        <span className="text-xs font-normal text-gray-400">내 주소 지역, 22:45 기준</span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-[20px]">
          {dummy.slice(0, 3).map((item, index) => (
            <RealTimeSearchItem key={index} order={index + 1} realTimeSearch={item} />
          ))}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex flex-1 flex-col gap-[20px]">
          {dummy.slice(3).map((item, index) => (
            <RealTimeSearchItem key={index} order={index + 4} realTimeSearch={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealTimeSearches
