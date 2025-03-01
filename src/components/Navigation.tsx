'use client'

import { cn } from '@/lib/utils'
import addressStore from '@/store/addressStore'
import { useGeoLocationStore } from '@/store/geoLocation'
import { modalStore } from '@/store/modal'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import Icon from './Icon'
import LoginModal from './shared/LoginModal'

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
  const { member } = memberStore()
  const { address: addressStoreAddress } = addressStore()
  const { showModal } = modalStore()

  return (
    <nav
      className={`mt-3 flex h-navigation items-center justify-center gap-[8px] bg-white px-mobile_safe`}
    >
      <div className="flex h-full w-[24px] items-center justify-center">
        {hasBackButton && (
          <button
            onClick={() => {
              if (redirectPath) {
                router.push(redirectPath)
              } else {
                router.back()
              }
            }}
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
        )}
      </div>

      <div className="flex h-full flex-1 items-center justify-center">
        {centerElement ? (
          centerElement
        ) : (
          <>
            <h1
              className={cn(
                'max-w-[calc(min(480px,100dvw)-24px-24px-40px-16px-24px)] truncate text-lg font-semibold',
                useAddress && member && 'text-base'
              )}
              onClick={() => {
                if (useAddress && member) {
                  router.push(ROUTE_PATHS.ADDRESS)
                } else {
                  showModal({
                    content: <LoginModal />,
                    useAnimation: true,
                  })
                }
              }}
            >
              {useAddress
                ? addressStoreAddress
                  ? addressStoreAddress.defaultAddress?.roadAddress ||
                    addressStoreAddress.defaultAddress?.jibunAddress +
                      ' ' +
                      addressStoreAddress.defaultAddress?.detailAddress
                  : address?.roadAddress || address?.jibunAddress
                : title}
            </h1>
            {useAddress && member && <Icon name="ChevronDown" size={24} />}
          </>
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
