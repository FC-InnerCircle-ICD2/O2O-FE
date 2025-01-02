import { bottomSheetStore } from '@/store/bottomSheet'
import React, { useCallback } from 'react'

const useBottomSheet = () => {
  const { bottomSheet, showBottomSheet, hideBottomSheet } = bottomSheetStore()

  const BottomSheet = useCallback((content: React.ReactNode) => {
    showBottomSheet(content)
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
