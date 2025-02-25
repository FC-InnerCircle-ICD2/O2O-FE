import { modalStore } from '@/store/modal'
import { Button } from './button'

interface ConfirmProps {
  title: string
  message: string
  onConfirmClick: () => void
  onCancelClick?: () => void
  cancelText?: string
  confirmText?: string
}

const Confirm = ({
  title,
  message,
  onConfirmClick,
  onCancelClick,
  cancelText,
  confirmText,
}: ConfirmProps) => {
  const { hideModal } = modalStore()

  const handleConfirmClick = () => {
    hideModal()
    console.log({onConfirmClick})
    onConfirmClick()
  }

  const handleCancelClick = () => {
    onCancelClick?.()
    hideModal()
  }

  return (
    <div className="flex min-h-[150px] w-[70%] max-w-[440px] flex-col gap-6 rounded-xl bg-white p-5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-center text-lg font-bold">{title}</div>
        <div className="text-center text-base" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
      <div className="flex flex-row gap-2">
        <Button className="w-[50%]" onClick={handleConfirmClick}>
          {confirmText || '확인'}
        </Button>
        <Button className="w-[50%]" variant="grayFit" onClick={handleCancelClick}>
          {cancelText || '취소'}
        </Button>
      </div>
    </div>
  )
}

export default Confirm
