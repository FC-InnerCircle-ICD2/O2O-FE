'use client'

import useGetFavorites from '@/api/useGetFavorites'
import usePostFavorites from '@/api/usePostFavorites'
import Icon from '@/components/Icon'
import { Skeleton } from '@/components/shadcn/skeleton'
import LoginModal from '@/components/shared/LoginModal'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import { orderDetailStore } from '@/store/orderDetail'
import { ROUTE_PATHS } from '@/utils/routes'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface StoreHeaderProps {
  isHeaderOpaque: boolean
  isSuccess: boolean
  title: string
  storeId: string
  isOrderDetail?: boolean
}

const StoreHeader = ({
  isHeaderOpaque,
  isSuccess,
  title,
  storeId,
  isOrderDetail = false,
}: StoreHeaderProps) => {
  const router = useRouter()
  const { hideOrderDetail } = orderDetailStore()
  const { data: favorites } = useGetFavorites()
  const { postFavorites, deleteFavorites } = usePostFavorites()
  const { setValue } = useLocalStorage<string[]>('recentStore', [])
  const { storedValue: accessToken } = useLocalStorage('accessToken')
  const { showModal } = modalStore()

  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    // 임시 textarea 엘리먼트 생성
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)

    try {
      // 텍스트 선택 및 복사
      textarea.select()
      document.execCommand('copy')
      toast({
        description: 'URL이 복사되었습니다.',
        position: 'center',
      })
    } catch (err) {
      console.error('클립보드 복사 실패:', err)
      toast({
        description: 'URL 복사에 실패했습니다.',
        position: 'center',
        variant: 'destructive',
      })
    } finally {
      // 임시 textarea 제거
      document.body.removeChild(textarea)
    }
  }

  const handleShare = async () => {
    try {
      if (!navigator.share) {
        // Web Share API가 지원되지 않는 경우 클립보드 복사로 폴백
        copyToClipboard(window.location.href)
        return
      }

      await navigator.share({
        title: title,
        text: `${title} - O2O`,
        url: window.location.href,
      })
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === 'AbortError' || error.name === 'InvalidStateError')
      ) {
        // 사용자가 공유를 취소한 경우 토스트를 표시하지 않음
        return
      }

      copyToClipboard(window.location.href)
    }
  }

  const handleFavorite = () => {
    if (!accessToken) {
      toast({
        description: '로그인이 필요한 기능이에요.',
        position: 'center',
      })

      showModal({ content: <LoginModal />, useAnimation: true })
      return
    }

    if (favorites?.some((favorite) => favorite.id === storeId)) {
      deleteFavorites(storeId)
    } else {
      postFavorites(storeId)
    }
  }

  useEffect(() => {
    if (!storeId) return
    const accessToken = localStorage.getItem('accessToken')
    const recentStores = JSON.parse(localStorage.getItem('recentStore') || '[]')

    if (!accessToken) {
      const filteredStores = recentStores.filter((id: string) => id !== storeId)
      // 현재 storeId를 배열 맨 앞에 추가
      setValue([storeId, ...filteredStores].slice(0, 10))
      return
    } else if (favorites) {
      if (!favorites?.some((favorite) => favorite.id === storeId)) {
        // 현재 storeId를 제외한 기존 배열 생성
        const filteredStores = recentStores.filter((id: string) => id !== storeId)
        // 현재 storeId를 배열 맨 앞에 추가
        setValue([storeId, ...filteredStores].slice(0, 10))
      }
    }
  }, [favorites])

  return (
    <div
      className={cn(
        'fixed top-0 z-20 flex w-full min-w-[320px] max-w-[480px] items-center justify-between px-mobile_safe',
        isHeaderOpaque ? 'border-b border-solid border-gray-200 bg-white' : 'bg-transparent'
      )}
    >
      <div className="mt-3 flex h-detail_header items-center gap-2">
        <button
          className={cn(
            'flex size-8 items-center justify-center rounded-full bg-white transition-all duration-200',
            isHeaderOpaque && 'size-6'
          )}
          onClick={() => {
            if (isOrderDetail) {
              hideOrderDetail()
            } else {
              const previousPath = sessionStorage.getItem('previousPath')

              if (previousPath) {
                router.back()
              } else {
                router.push(ROUTE_PATHS.HOME)
              }
            }
          }}
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        <AnimatePresence>
          {isHeaderOpaque && (
            <motion.span
              className="max-w-[200px] truncate text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!isSuccess ? <Skeleton className="h-[28px] w-[150px]" /> : title}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          'mt-3 flex items-center gap-2 transition-all duration-200',
          isHeaderOpaque && 'gap-3'
        )}
      >
        <button
          className={cn(
            'flex size-8 items-center justify-center rounded-full bg-white transition-all duration-200',
            isHeaderOpaque && 'size-6'
          )}
          onClick={handleShare}
        >
          <Icon name="Share2" size={20} />
        </button>
        {!isOrderDetail && (
          <button
            className={cn(
              'flex size-8 items-center justify-center rounded-full bg-white transition-all duration-200',
              isHeaderOpaque && 'size-6'
            )}
            onClick={handleFavorite}
          >
            <Icon
              className={cn(
                favorites?.some((favorite) => favorite.id === storeId) &&
                  'fill-red-500 text-red-500'
              )}
              name="Heart"
              size={20}
            />
          </button>
        )}
        {!isOrderDetail && (
          <button
            className={cn(
              'flex size-8 items-center justify-center rounded-full bg-white transition-all duration-200',
              isHeaderOpaque && 'size-6'
            )}
            onClick={() => {
              toast({
                description: '준비중입니다.',
                position: 'center',
              })
            }}
          >
            <Icon name="Search" size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default StoreHeader
