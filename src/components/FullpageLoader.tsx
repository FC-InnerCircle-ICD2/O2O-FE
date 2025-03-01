import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'

interface FullpageLoaderProps {
  useNavigation?: boolean
  useBottomNavigation?: boolean
  className?: string
}

const FullpageLoader = ({
  useNavigation = false,
  useBottomNavigation = false,
  className,
}: FullpageLoaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        className,
        useNavigation && !useBottomNavigation && 'h-[calc(100dvh-40px)]',
        useNavigation && useBottomNavigation && 'h-[calc(100dvh-40px-85px)]'
      )}
    >
      <div className="-mt-detail_header">
        <Icon className={cn('animate-spin text-primary')} name="Loader" size={40} />
      </div>
    </div>
  )
}

export default FullpageLoader
