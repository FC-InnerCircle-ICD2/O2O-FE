import { PendingReview } from '@/models/review'

export const PENDING_REVIEWS_MOCK_DATA: PendingReview[] = [
  {
    orderId: '1',
    storeId: '1',
    storeImageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    storeName: '매취랑',
    menus: [{ menuName: '뼈갈비찜', menuCount: 1 }],
  },
  {
    orderId: '2',
    storeId: '2',
    storeImageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
    storeName: '처갓집양념치킨-성내점',
    menus: [
      { menuName: '순살 꼬꼬뱅 슈프림양념치킨', menuCount: 1 },
      { menuName: '순살 꼬꼬뱅 매운 양념치킨', menuCount: 2 },
      { menuName: '감자튀김', menuCount: 1 },
      { menuName: '콜라', menuCount: 1 },
    ],
  },
  {
    orderId: '3',
    storeId: '3',
    storeImageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212',
    storeName: '봉구스밥버거',
    menus: [
      { menuName: '치즈닭갈비버거', menuCount: 2 },
      { menuName: '김치제육버거', menuCount: 1 },
      { menuName: '콜라', menuCount: 2 },
    ],
  },
  {
    orderId: '4',
    storeId: '4',
    storeImageUrl: 'https://images.unsplash.com/photo-1593504049359-74330189a345',
    storeName: '신전떡볶이',
    menus: [
      { menuName: '매운떡볶이', menuCount: 1 },
      { menuName: '모듬튀김', menuCount: 1 },
      { menuName: '순대', menuCount: 1 },
    ],
  },
  {
    orderId: '5',
    storeId: '5',
    storeImageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    storeName: '홍콩반점',
    menus: [
      { menuName: '짜장면', menuCount: 2 },
      { menuName: '탕수육', menuCount: 1 },
    ],
  },
  {
    orderId: '6',
    storeId: '6',
    storeImageUrl: 'https://images.unsplash.com/photo-1576749872435-ff88a71c1ae2',
    storeName: '서브웨이',
    menus: [
      { menuName: '이탈리안 비엠티', menuCount: 1 },
      { menuName: '에그마요', menuCount: 1 },
      { menuName: '쿠키', menuCount: 2 },
    ],
  },
  {
    orderId: '7',
    storeId: '7',
    storeImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    storeName: '교촌치킨',
    menus: [
      { menuName: '허니콤보', menuCount: 1 },
      { menuName: '레드콤보', menuCount: 1 },
      { menuName: '콜라', menuCount: 2 },
    ],
  },
  {
    orderId: '8',
    storeId: '8',
    storeImageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    storeName: '맥도날드',
    menus: [
      { menuName: '빅맥', menuCount: 2 },
      { menuName: '맥너겟', menuCount: 1 },
      { menuName: '후렌치 후라이', menuCount: 2 },
      { menuName: '코카콜라', menuCount: 2 },
    ],
  },
  {
    orderId: '9',
    storeId: '9',
    storeImageUrl: 'https://images.unsplash.com/photo-1584583570840-0a3d88497593',
    storeName: '본죽',
    menus: [
      { menuName: '진영닭죽', menuCount: 1 },
      { menuName: '전복죽', menuCount: 1 },
      { menuName: '김치', menuCount: 2 },
    ],
  },
]
