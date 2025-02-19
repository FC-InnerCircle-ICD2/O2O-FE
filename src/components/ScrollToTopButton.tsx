import { cn } from '@/lib/utils'
import Icon from './Icon'
interface ScrollToTopButtonProps {
  onClick: () => void
  hasBottomNavigation?: boolean
  className?: string
}

const ScrollToTopButton = ({
  className = '',
  onClick,
  hasBottomNavigation = true,
}: ScrollToTopButtonProps) => {
  return (
    <div
      className={cn(
        'fixed bottom-[7rem] right-5 z-50 cursor-pointer rounded-full border border-solid border-gray-300 bg-white p-[12px] transition-colors hover:bg-gray-50',
        hasBottomNavigation && 'bottom-[10rem]',
        className
      )}
      onClick={onClick}
    >
      <Icon name="ChevronUp" size={20} />
    </div>
  )
}
export default ScrollToTopButton
