'use client'

import { modalStore } from '@/store/modal'
import { AnimatePresence, motion } from 'motion/react'

const Modal = () => {
  const { modals } = modalStore()

  if (modals.length === 0) return null
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" /> {/* 반투명한 검은색 배경 */}
        {modals.map((modal, index) => {
          return modal.useAnimation ? (
            <motion.div
              key={`modal-${index}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 80, stiffness: 1000 }}
              className="relative z-10 w-fit"
            >
              {modal.content}
            </motion.div>
          ) : (
            <div key={`modal-${index}`} className="relative z-10">
              {modal.content}
            </div>
          )
        })}
      </div>
    </AnimatePresence>
  )
}

export default Modal
