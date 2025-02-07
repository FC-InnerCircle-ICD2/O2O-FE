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
        <div className='w-[70%] max-w-[440px] min-h-[150px] flex flex-col gap-6 bg-white rounded-xl p-5'>
            <div className='flex flex-col flex-1 gap-2'>
                <div className='text-lg font-bold text-center'>{title}</div>
                <div className='text-base text-center'>{message}</div>
            </div>
            <div>
                <Button onClick={handleClick}>{cancelText || '확인'}</Button>
            </div>
        </div>
    )
}

export default Alert