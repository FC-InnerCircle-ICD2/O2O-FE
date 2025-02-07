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

const Confirm = ({ title, message, onConfirmClick, onCancelClick, cancelText, confirmText }: ConfirmProps) => {
    const { hideModal } = modalStore()

    const handleConfirmClick = () => {
        hideModal()
        onConfirmClick()
    }

    const handleCancelClick = () => {
        onCancelClick?.()
        hideModal()
    }

    return (
        <div className='w-[70%] max-w-[440px] min-h-[150px] flex flex-col gap-6 bg-white rounded-xl p-5'>
            <div className='flex flex-col flex-1 gap-2'>
                <div className='text-lg font-bold text-center'>{title}</div>
                <div
                    className='text-base text-center'
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            </div>
            <div className='flex flex-row gap-2'>
                <Button className='w-[50%]' onClick={handleConfirmClick}>{confirmText || '확인'}</Button>
                <Button className='w-[50%]' variant='grayFit' onClick={handleCancelClick}>{cancelText || '취소'}</Button>
            </div>
        </div>
    )
}

export default Confirm 