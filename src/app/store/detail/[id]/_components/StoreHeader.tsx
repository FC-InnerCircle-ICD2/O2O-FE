'use client'

import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

const StoreHeader = ({ isHeaderOpaque }: { isHeaderOpaque: boolean }) => {
  const router = useRouter()
  return (
    <div
      className={cn(
        'fixed top-0 z-20 flex h-[50px] w-full items-center justify-between pt-2 transition-all duration-200',
        isHeaderOpaque
          ? 'border-b border-solid border-gray-200 bg-white px-[10px]'
          : 'bg-transparent px-mobile_safe',
      )}
    >
      <div className="flex items-center gap-2">
        <button
          className="flex size-7 items-center justify-center rounded-full bg-white"
          onClick={() => router.back()}
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
        <button className="flex size-7 items-center justify-center rounded-full bg-white">
          <Icon name="Share2" size={18} />
        </button>
        <button className="flex size-7 items-center justify-center rounded-full bg-white">
          <Icon name="Heart" size={18} />
        </button>
        <button className="flex size-7 items-center justify-center rounded-full bg-white">
          <Icon name="Search" size={18} />
        </button>
      </div>
    </div>
  )
}

export default StoreHeader
