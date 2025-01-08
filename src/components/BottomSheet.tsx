'use client'

import { bottomSheetStore } from '@/store/bottomSheet'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './shadcn/drawer'

const BottomSheet = () => {
  const { bottomSheet, hideBottomSheet } = bottomSheetStore()

  return (
    <Drawer open={bottomSheet.isOpen} onOpenChange={hideBottomSheet}>
      <DrawerContent className="max-h-3/5 min-h-fit rounded-t-2xl">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className={`py-1 text-xl font-bold ${bottomSheet.title ? '' : 'sr-only'}`}>
              {bottomSheet.title}
            </DrawerTitle>
          </DrawerHeader>
          <div>
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
