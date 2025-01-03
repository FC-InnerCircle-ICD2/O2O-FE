import { BottomSheet } from '@/store/bottomSheet'
import { bottomSheetStore } from '@/store/bottomSheet'
import React, { useCallback } from 'react'

const useBottomSheet = () => {
  const { bottomSheet, showBottomSheet, hideBottomSheet } = bottomSheetStore()

  const BottomSheet = useCallback((options: Pick<BottomSheet, 'content' | 'title'>) => {
    showBottomSheet(options)
  }, [])

  const hide = useCallback(() => {
    hideBottomSheet()
  }, [])

  return {
    BottomSheet,
    hide,
  }
}

export default useBottomSheet
