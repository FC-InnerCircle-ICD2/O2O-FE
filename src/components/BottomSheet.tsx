'use client'

import { bottomSheetStore } from '@/store/bottomSheet'
import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useEffect } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'

const BottomSheet = () => {
  const { bottomSheet, hideBottomSheet } = bottomSheetStore()

  // if (!bottomSheet.isOpen) return null
  return (
    <Drawer open={bottomSheet.isOpen} onOpenChange={hideBottomSheet}>
      <DrawerContent className="h-[60%] rounded-t-2xl">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className={`py-3 ${bottomSheet.title ? '' : 'sr-only'}`}>
              {bottomSheet.title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4">
            <DrawerDescription asChild>
              <span className="sr-only">바텀 시트 컨텐츠입니다</span>
            </DrawerDescription>
            {bottomSheet.content}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default BottomSheet
