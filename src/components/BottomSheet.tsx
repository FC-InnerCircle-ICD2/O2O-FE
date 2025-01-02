'use client'

import { bottomSheetStore } from '@/store/bottomSheet'
import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useEffect } from 'react'

const BottomSheet = () => {
  const { bottomSheet, hideBottomSheet } = bottomSheetStore()
  const height = useMotionValue('50%')

  useEffect(() => {
    height.set('50%')
  }, [bottomSheet])

  if (!bottomSheet.isOpen) return null
  return (
    <AnimatePresence>
      <div className="fixed flex items-end inset-0 z-50">
        <div className="fixed inset-0 bg-black/50" onClick={hideBottomSheet} />
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragDirectionLock
          dragElastic={false}
          onDrag={(event, info) => {
            // 위로 드래그할 때는 움직임을 제한
            if (info.offset.y < 0) {
              event.preventDefault()
              return false
            }

            // 아래로 드래그할 때는 높이 조절
            const newHeight = Math.max(50 - info.offset.y * 0.1, 0)
            height.set(`${newHeight}%`)
          }}
          onDragEnd={(event, info) => {
            if (info.offset.y > 100) {
              hideBottomSheet()
            } else {
              animate(height, '50%', {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              })
            }
          }}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          style={{ height }}
          transition={{ type: 'spring', damping: 80, stiffness: 1000 }}
          className="relative z-10 w-full h-[50%] bg-white rounded-t-3xl px-4 py-2"
        >
          <div className="flex justify-center w-full h-[4px] mb-8">
            <div className="bg-gray-400 w-[50px] h-full rounded-full" />
          </div>
          {bottomSheet.content}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default BottomSheet
