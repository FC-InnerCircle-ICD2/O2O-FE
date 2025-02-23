import { MenuOption } from '@/models/menu'

export const MENU_OPTIONS_MOCK_DATA: MenuOption = {
  menuId: '54e57531-ad59-47c4-b7b0-4258ef2c4d62',
  name: '뼈갈비찜',
  price: 34000,
  desc: '매취랑의 특급 간장소스로 단짠단짠의 맛을 즐기실수 있고, 추억의 그맛을 다시한번 느낄수 있는 자신만만 추천 메뉴 입니다. 주문 마니해주세요.',
  imgUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
  isSoldOut: false,
  isBest: true,
  isManyOrder: false,
  menuOptionGroups: [
    {
      id: '8f7e6d5c-4b3a-2d1e-9f8g-7h6i5j4k3l2m',
      name: '맵소디 부분육 선택',
      type: 'radio',
      options: [
        { id: '8f7e6d5c-4b3a-2d1e-9f8g-7h6zxcvdds', name: '한마리', price: 0, isSoldOut: false },
        {
          id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          name: '순살 변경(다리살 30%, 가슴살 70%)',
          price: 2000,
          isSoldOut: false,
        },
        {
          id: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
          name: '닭다리 변경(10개)',
          price: 3000,
          isSoldOut: false,
        },
        {
          id: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8',
          name: '윙&봉 변경',
          price: 3000,
          isSoldOut: false,
        },
        {
          id: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
          name: '콤보 변경(닭다리5&윙5,봉5)',
          price: 4000,
          isSoldOut: false,
        },
      ],
    },
    {
      id: '3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q',
      name: '맵기 선택',
      type: 'radio',
      options: [
        {
          id: 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0',
          name: '기본맵기',
          price: 0,
          isSoldOut: false,
        },
        {
          id: 'f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1',
          name: '매운맛',
          price: 1000,
          isSoldOut: true,
        },
        {
          id: 'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2',
          name: '아주매운맛',
          price: 1000,
          isSoldOut: false,
        },
      ],
    },
    {
      id: '2a1b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: '추가메뉴',
      type: 'checkbox',
      limit: 3,
      options: [
        {
          id: 'h8i9j0k1-l2m3-n4o5-p6q7-r8s9t0u1v2w3',
          name: 'BBQ 카레고로케(3개)',
          price: 4000,
          isSoldOut: false,
        },
        {
          id: 'i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4',
          name: 'BBQ 떡볶이',
          price: 7000,
          isSoldOut: false,
        },
        {
          id: 'j0k1l2m3-n4o5-p6q7-r8s9-t0u1v2w3x4y5',
          name: 'BBQ 소떡(땡초숯불양념맛)',
          price: 3000,
          isSoldOut: false,
        },
        {
          id: 'k1l2m3n4-o5p6-q7r8-s9t0-u1v2w3x4y5z6',
          name: 'BBQ 소떡(양념맛)',
          price: 3000,
          isSoldOut: false,
        },
        {
          id: 'l2m3n4o5-p6q7-r8s9-t0u1-v2w3x4y5z6a7',
          name: '치킨무 추가',
          price: 1000,
          isSoldOut: false,
        },
        {
          id: 'm3n4o5p6-q7r8-s9t0-u1v2-w3x4y5z6a7b8',
          name: '콜라 1.25L',
          price: 2500,
          isSoldOut: false,
        },
        {
          id: 'n4o5p6q7-r8s9-t0u1-v2w3-x4y5z6a7b8c9',
          name: '사이다 1.25L',
          price: 2500,
          isSoldOut: false,
        },
      ],
    },
    {
      id: '9q8p7o6n-5m4l-3k2j-1i0h-9g8f7e6d5c4b',
      name: '사이드 메뉴',
      type: 'checkbox',
      options: [
        {
          id: 'o5p6q7r8-s9t0-u1v2-w3x4-y5z6a7b8c9d0',
          name: '감자튀김',
          price: 3000,
          isSoldOut: true,
        },
        {
          id: 'p6q7r8s9-t0u1-v2w3-x4y5-z6a7b8c9d0e1',
          name: '치즈볼(3개)',
          price: 4000,
          isSoldOut: false,
        },
        {
          id: 'q7r8s9t0-u1v2-w3x4-y5z6-a7b8c9d0e1f2',
          name: '콜라 1.25L',
          price: 2500,
          isSoldOut: false,
        },
        {
          id: 'r8s9t0u1-v2w3-x4y5-z6a7-b8c9d0e1f2g3',
          name: '사이다 1.25L',
          price: 2500,
          isSoldOut: false,
        },
      ],
    },
  ],
}
