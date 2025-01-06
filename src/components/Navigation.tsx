'use client'

import { useGeoLocationStore } from '@/store/geoLocation'
import { useRouter } from 'next/navigation'
import Icon from './Icon'

interface NavigationProps {
  hasBackButton?: boolean
  title?: string
  centerElement?: React.ReactNode
  rightElement?: React.ReactNode
  useAddress?: boolean
}

const Navigation = ({
  hasBackButton,
  title,
  centerElement,
  rightElement,
  useAddress = false,
}: NavigationProps) => {
  const router = useRouter()
  const { address } = useGeoLocationStore()

  return (
    <nav className="flex h-navigation items-center justify-center border-b bg-white px-mobile_safe">
      <div className="flex h-full w-[24px] items-center justify-center">
        {hasBackButton && (
          <button onClick={() => router.back()}>
            <Icon variant="arrowLeft" width={24} height={24} />
          </button>
        )}
      </div>

      <div className="flex h-full flex-1 items-center justify-center">
        {centerElement ? (
          centerElement
        ) : (
          <h1 className="text-lg font-semibold">
            {useAddress && address?.addressName ? address?.addressName : title}
          </h1>
        )}
      </div>
      <div className="flex h-full w-[24px] items-center justify-center">
        {rightElement && rightElement}
      </div>
    </nav>
  )
}

export default Navigation
