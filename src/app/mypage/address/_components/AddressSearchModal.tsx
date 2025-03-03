import Icon from '@/components/Icon'
import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const AddressSearchModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[calc(100dvw-40px)] rounded bg-white p-4 shadow-lg">
        <div className="mb-2 flex justify-end">
          <Icon name="X" size={24} onClick={onClose} className="stroke-2" />
        </div>
        {children}
      </div>
    </div>
  )
}

export default AddressSearchModal
