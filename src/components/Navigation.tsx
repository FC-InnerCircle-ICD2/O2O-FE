'use client'

import { useGeoLocationStore } from '@/store/geoLocation'
import { useRouter } from 'next/navigation'
import Icon from './Icon'

export interface NavigationProps {
  hasBackButton?: boolean
  redirectPath?: string
  title?: string
  centerElement?: React.ReactNode
  rightElement?: React.ReactNode
  useAddress?: boolean
  isSearch?: boolean
}

const Navigation = ({
  hasBackButton,
  redirectPath,
  title,
  centerElement,
  rightElement,
  useAddress = false,
  isSearch = false,
}: NavigationProps) => {
  const router = useRouter()
  const { address } = useGeoLocationStore()

  return (
    <nav className={`mt-3 flex h-navigation items-center justify-center gap-[8px] bg-white px-mobile_safe`}>
      <div className="flex h-full w-[24px] items-center justify-center">
        {hasBackButton && (
          <button onClick={() => {
            if (redirectPath) {
              router.push(redirectPath)
            } else {
              router.back()
            }
          }}>
            <Icon name="ChevronLeft" size={24} />
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

      {!isSearch && (
        <div className="flex h-full w-[24px] items-center justify-center">
          {rightElement && rightElement}
        </div>
      )}
    </nav>
  )
}

export default Navigation
