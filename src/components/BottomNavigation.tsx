'use client'

import Icon from '@/components/Icon'
import { BottomNavigationMenu } from '@/models/BottomNavigationMenu'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MENU_ITEMS: BottomNavigationMenu[] = [
  { id: 'home', label: '홈', path: 'HOME', icon: 'home' },
  { id: 'search', label: '검색', path: 'SEARCH', icon: 'search' },
  { id: 'orders', label: '주문내역', path: 'ORDERS', icon: 'clipboard' },
  { id: 'favorites', label: '찜', path: 'FAVORITES', icon: 'heart' },
  { id: 'mypage', label: '마이개민', path: 'MYPAGE', icon: 'user' },
] as const

const BottomNavigation = () => {
  const pathname = usePathname()

  return (
    <nav className="border-t border-solid border-gray-400 bg-white p-4 pt-3 pb-[34px]">
      <ul className="flex h-bottom_navigation items-center justify-around max-w-[768px] mx-auto">
        {MENU_ITEMS.map(({ id, label, path, icon }) => {
          const isActive = pathname === ROUTE_PATHS[path]

          return (
            <li key={id} className="w-full cursor-pointer">
              <Link href={ROUTE_PATHS[path]}>
                <div className="flex w-full flex-col items-center gap-2">
                  <Icon
                    variant={icon}
                    width={24}
                    height={24}
                    fill={isActive ? '#000000' : '#9CA3AF'}
                  />
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
