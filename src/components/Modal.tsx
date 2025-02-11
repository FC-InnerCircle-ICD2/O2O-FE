'use client'

import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import { AnimatePresence, motion } from 'motion/react'

const Modal = () => {
  const { modals, hideModal } = modalStore()

  if (modals.length === 0) return null
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {modals.map((modal, index) => {
          return (
            <div key={`modal-${index}`} className="fixed z-10 size-full">
              <div
                className={cn('fixed inset-0', modal.useDimmed ? 'bg-black/50' : 'bg-transparent')}
                onClick={() => {
                  if (modal.useDimmedClickClose) {
                    hideModal()
                  }
                }}
              />
              {modal.useAnimation ? (
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 80, stiffness: 1000 }}
                  className="relative z-10 mx-auto h-full min-w-[320px] max-w-[480px]"
                >
                  {modal.content}
                </motion.div>
              ) : (
                <div className="relative z-10 mx-auto flex h-full min-w-[320px] max-w-[480px] items-center justify-center">
                  {modal.content}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </AnimatePresence>
  )
}

export default Modal
