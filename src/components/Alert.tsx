import { modalStore } from '@/store/modal'
import { Button } from './button'

interface AlertProps {
    title: string
    message: string
    onClick: () => void
    cancelText?: string
}

const Alert = ({ title, message, onClick, cancelText }: AlertProps) => {
    const { hideModal } = modalStore()

    const handleClick = () => {
        hideModal()
        onClick()
    }

    return (
      <div className="flex min-h-[150px] w-[70%] max-w-[440px] flex-col gap-6 rounded-xl bg-white p-5">
          <div className="flex flex-1 flex-col gap-2">
              <div className="text-center text-lg font-bold">{title}</div>
              <div className="text-center text-base">{message}</div>
          </div>
          <div>
              <Button onClick={handleClick}>{cancelText || '확인'}</Button>
          </div>
      </div>
  )
}

export default Alert
