import { modalStore } from '@/store/modal'
import React, { useCallback } from 'react'

const useModal = () => {
  const { modals, showModal, hideModal, allHideModal } = modalStore()

  const Modal = useCallback((content: React.ReactNode) => {
    showModal(content)
  }, [])

  const hide = useCallback(() => {
    hideModal()
  }, [])

  const allHide = useCallback(() => {
    allHideModal()
  }, [])

  return {
    Modal,
    hide,
    allHide,
  }
}

export default useModal
