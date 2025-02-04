import SearchInput from '@/app/search/_components/SearchInput'
import Icon from '@/components/Icon'
import { NavigationProps } from '@/components/Navigation'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'

const NAVIGATION_PROPS: Record<string, NavigationProps> = {
  [ROUTE_PATHS.HOME]: {
    hasBackButton: false,
    useAddress: false,
    title: '홈',
    rightElement: (
      <Link href={ROUTE_PATHS.SEARCH}>
        <Icon name="Search" size={24} color={COLORS.black} />
      </Link>
    ),
  },
  [ROUTE_PATHS.HOME_LIST]: {
    hasBackButton: true,
    useAddress: true,
    title: '홈',
    rightElement: (
      <Link href={ROUTE_PATHS.SEARCH}>
        <Icon name="Search" size={24} color={COLORS.black} />
      </Link>
    ),
  },
  [ROUTE_PATHS.SEARCH]: {
    hasBackButton: true,
    centerElement: <SearchInput />,
    isSearch: true,
  },
  [ROUTE_PATHS.SEARCH_RESULT]: {
    hasBackButton: true,
    centerElement: <SearchInput />,
    isSearch: true,
  },
  [ROUTE_PATHS.ORDERS]: {
    title: '주문내역',
  },
  [ROUTE_PATHS.ORDER_DETAIL]: {
    title: '주문상세',
  },
  [ROUTE_PATHS.FAVORITES]: {
    title: '찜',
  },
  [ROUTE_PATHS.MYPAGE]: {
    title: '마이페이지',
  },
  [ROUTE_PATHS.PAY]: {
    title: '주문하기',
  },
  [ROUTE_PATHS.MYPAGE_EDIT_PROFILE]: {
    title: '내 정보 수정',
    hasBackButton: true,
  },
}

export const getNavigationProps = (pathname: string): NavigationProps => {
  return NAVIGATION_PROPS[pathname] || NAVIGATION_PROPS[ROUTE_PATHS.HOME]
}

export default NAVIGATION_PROPS
