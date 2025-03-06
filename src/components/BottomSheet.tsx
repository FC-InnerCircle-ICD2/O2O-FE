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
      <DrawerContent className="max-h-3/5 mx-auto min-h-fit max-w-[480px] rounded-t-3xl">
        <div className="mx-auto w-full">
          <DrawerHeader className="sm:text-center">
            <DrawerTitle className={`py-1 text-xl font-bold ${bottomSheet.title ? '' : 'sr-only'}`}>
              {bottomSheet.title}
            </DrawerTitle>
          </DrawerHeader>
          <div className={'border-b border-solid border-gray-200 pb-10'}>
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
