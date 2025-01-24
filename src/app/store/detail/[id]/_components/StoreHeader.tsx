'use client'

import Icon from '@/components/Icon'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { orderDetailStore } from '@/store/orderDetail'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

const StoreHeader = ({ isHeaderOpaque, isOrderDetail = false }: { isHeaderOpaque: boolean, isOrderDetail?: boolean }) => {
  const router = useRouter()
  const { hideOrderDetail } = orderDetailStore()
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        description: 'URL이 복사되었습니다.',
        position: 'center'
      })
    } catch (error) {
      toast({
        description: 'URL 복사에 실패했습니다.',
        position: 'center',
        variant: 'destructive'
      })
    }
  }

  return (
    <div
      className={cn(
        'h-detail_header fixed top-0 z-20 flex w-full items-center justify-between pt-2 transition-all duration-200',
        isHeaderOpaque
          ? 'border-b border-solid border-gray-200 bg-white px-[10px]'
          : 'bg-transparent px-mobile_safe',
      )}
    >
      <div className="flex items-center gap-2">
        <button
          className="flex size-8 items-center justify-center rounded-full bg-white"
          onClick={() => {
            if (isOrderDetail) {
              hideOrderDetail()
            } else {
              router.back()
            }
          }}
        >
          <Icon name="ChevronLeft" size={22} />
        </button>
        <AnimatePresence>
          {isHeaderOpaque && (
            <motion.span
              className="text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              비비큐치킨
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex size-8 items-center justify-center rounded-full bg-white" onClick={handleShare}>
          <Icon name="Share2" size={18} />
        </button>
        {!isOrderDetail && (
          <button className="flex size-8 items-center justify-center rounded-full bg-white">
            <Icon name="Heart" size={18} />
          </button>
        )}
        {!isOrderDetail && (
          <button className="flex size-8 items-center justify-center rounded-full bg-white">
            <Icon name="Search" size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

export default StoreHeader
