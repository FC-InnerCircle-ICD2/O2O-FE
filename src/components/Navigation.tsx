'use client'

import { useGeoLocationStore } from '@/store/geoLocation'
import { usePathname, useRouter } from 'next/navigation'
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
  const pathname = usePathname()

  return (
    <nav className="flex px-mobile_safe items-center justify-center h-navigation border-b bg-white">
      <div className="absolute left-[16px] flex">
        {hasBackButton && (
          <button onClick={() => router.back()}>
            <Icon variant="arrowLeft" width={24} height={24} />
          </button>
        )}
      </div>

      {centerElement ? (
        centerElement
      ) : (
        <h1 className="text-lg font-semibold">
          {useAddress && address?.addressName ? address?.addressName : title}
        </h1>
      )}

      {rightElement && <div className="absolute right-[16px] flex">{rightElement}</div>}
    </nav>
  )
}

export default Navigation
