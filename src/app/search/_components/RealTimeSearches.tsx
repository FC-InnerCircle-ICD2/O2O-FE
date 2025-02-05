'use client'

import useGetStoreTrend from '@/api/useGetStoreTrend'
import Icon from '@/components/Icon'
import { RealTimeSearch } from '@/models/realTimeSearches'
import { COLORS } from '@/styles/color'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

// Swiper 스타일 import
import 'swiper/css'
import 'swiper/css/pagination'

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
  const [timestamp, setTimestamp] = useState(Date.now())

  useEffect(() => {
    setCurrentSearch(realTimeSearch)
    setTimestamp(Date.now())
  }, [realTimeSearch])

  return (
    <div className="flex h-[16px] grow gap-3 overflow-hidden">
      <span className='min-w-[10px]'>{order}</span>
      <div className="flex grow flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            // 키값에 타임스탬프 추가
            key={`${currentSearch.keyword}-${timestamp}`}
            data-key={`${currentSearch.keyword}-${timestamp}`}
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
  const [trends, setTrends] = useState<RealTimeSearch[]>([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [temp, setTemp] = useState<RealTimeSearch[]>([])
  const [isFirst, setIsFirst] = useState(true)
  const [currentTime, setCurrentTime] = useState<string>()

  const { realTimeSearches } = useGetStoreTrend()

  useEffect(() => {
    if (!isUpdating) return

    const updateWithDelay = async () => {
      const prevTrends = [...trends]

      for (let i = 0; i < temp.length; i++) {
        setTrends((prev) => {
          const newArray = [...prev]
          // 기존 trends에서 같은 키워드를 찾습니다
          const existingItem = prevTrends.find(item => item.keyword === temp[i].keyword)

          if (existingItem) {
            // 기존 아이템이 있는 경우 순위를 비교합니다
            const rankChange =
              temp[i].order < existingItem.order ? 'up' :
                temp[i].order === existingItem.order ? 'same' : 'down'

            newArray[i] = { ...temp[i], rankChange }
          } else {
            // 기존 아이템이 없는 경우 새로운 항목으로 취급하여 'up'을 설정합니다
            newArray[i] = { ...temp[i], rankChange: 'up' }
          }

          return newArray
        })
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
      setIsUpdating(false)
    }

    updateWithDelay()
  }, [isUpdating])

  useEffect(() => {
    if (!realTimeSearches) return

    // 현재 시간을 HH:mm 형식으로 포맷팅
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    setCurrentTime(`${hours}:${minutes}`)

    if (isFirst) {
      setIsFirst(false)
      setTrends(realTimeSearches.map((item) => ({ ...item, rankChange: 'same' })))
    } else {
      setTemp(realTimeSearches.map((item) => ({ ...item, rankChange: 'up' })))
      setIsUpdating(true)
    }
  }, [realTimeSearches])

  if (!realTimeSearches) return null
  return (
    <div className="flex flex-col gap-[28px] px-mobile_safe">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">실시간 급상승 검색어</span>
        <span className="text-xs font-normal text-gray-400">내 주소 지역, {currentTime} 기준</span>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-[20px]">
          {trends.slice(0, 3).map((item, index) => (
            <RealTimeSearchItem key={index} order={index + 1} realTimeSearch={item} />
          ))}
        </div>

        {/* 오른쪽 컬럼 */}
        <div className="flex flex-1 flex-col gap-[20px]">
          {trends.slice(3).map((item, index) => (
            <RealTimeSearchItem key={index} order={index + 4} realTimeSearch={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealTimeSearches
