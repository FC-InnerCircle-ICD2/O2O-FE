'use client'

import Icon, { IconName } from '@/components/Icon'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BottomNavigationMenu {
  id: string
  label: string
  path: keyof typeof ROUTE_PATHS
  icon: IconName
}

const MENU_ITEMS: BottomNavigationMenu[] = [
  { id: '/home', label: '홈', path: 'HOME', icon: 'House' },
  { id: '/search', label: '검색', path: 'SEARCH', icon: 'Search' },
  { id: '/orders', label: '주문내역', path: 'ORDERS', icon: 'ClipboardList' },
  { id: '/favorites', label: '찜', path: 'FAVORITES', icon: 'Heart' },
  { id: '/mypage', label: '마이개민', path: 'MYPAGE', icon: 'User' },
] as const

const BottomNavigation = () => {
  const pathname = usePathname()

  return (
    <nav className="bottom-navigation border-t border-solid border-gray-400 bg-white p-4 pt-3">
      <ul className="mx-auto flex h-bottom_navigation max-w-screen-md items-center justify-around">
        {MENU_ITEMS.map(({ id, label, path, icon }) => {
          const isActive = pathname.startsWith(ROUTE_PATHS[path])

          return (
            <li key={id} className="w-full cursor-pointer">
              <Link href={ROUTE_PATHS[path]}>
                <div className="flex w-full flex-col items-center gap-2">
                  <Icon name={icon} size={24} color={isActive ? COLORS.black : COLORS.gray400} />
                  <span className={`text-xs ${isActive ? 'text-black' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNavigation
