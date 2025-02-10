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
            <div key={`modal-${index}`} className="fixed h-full w-full z-10">
              <div className={cn("fixed inset-0", modal.useDimmed ? 'bg-black/50' : 'bg-transparent')} onClick={() => {
                if (modal.useDimmedClickClose) {
                  hideModal()
                }
              }} />
              {modal.useAnimation ?
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 80, stiffness: 1000 }}
                  className="relative z-10 max-w-[480px] min-w-[320px] h-full mx-auto"
                >
                  {modal.content}
                </motion.div> 
                :
                <div className="relative z-10 max-w-[480px] min-w-[320px] h-full mx-auto flex items-center justify-center">
                  {modal.content}
                </div>
              }
            </div>
          )
        })}
      </div>
    </AnimatePresence>
  )
}

export default Modal
