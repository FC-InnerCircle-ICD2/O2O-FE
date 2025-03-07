import SearchInput from '@/app/search/_components/SearchInput'
import Icon from '@/components/Icon'
import { NavigationProps } from '@/components/Navigation'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'

const NAVIGATION_PROPS: Record<string, NavigationProps> = {
  [ROUTE_PATHS.HOME]: {
    hasBackButton: false,
    useAddress: true,
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
  [ROUTE_PATHS.FAVORITES]: {
    title: '찜',
  },
  [ROUTE_PATHS.MYPAGE]: {
    title: '마이페이지',
  },
  [ROUTE_PATHS.PAY]: {
    title: '주문하기',
    hasBackButton: true,
  },
  [ROUTE_PATHS.MYPAGE_EDIT_PROFILE]: {
    hasBackButton: true,
    title: '내 정보 수정',
  },
  [ROUTE_PATHS.REVIEW]: {
    title: '리뷰관리',
    hasBackButton: true,
  },
  [ROUTE_PATHS.ORDERS_DETAIL]: {
    title: '주문상세',
    hasBackButton: true,
    redirectPath: ROUTE_PATHS.ORDERS,
  },
  [ROUTE_PATHS.ADDRESS]: {
    title: '주소 설정',
    hasBackButton: true,
  },
  [ROUTE_PATHS.ADDRESS_DETAIL]: {
    title: '주소 상세 정보 입력',
    hasBackButton: true,
  },
}

export const getNavigationProps = (pathname: string): NavigationProps => {
  // UUID나 숫자 등 동적 라우팅 패턴 처리
  const normalizedPath = pathname.replace(
    /\/detail\/[^/]+|\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\/\d+/g,
    '/detail'
  )

  return NAVIGATION_PROPS[normalizedPath] || null
}

export default NAVIGATION_PROPS
