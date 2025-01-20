import { Store } from '@/models/store'

const STORE_MOCK_DATA: Store[] = [
  {
    id: 1,
    name: '맛있는 치킨',
    address: '서울시 강남구 역삼동 123-45',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 0,
    distance: 1234,
    reviewCount: 2584,
    ranking: 3,
    orderCount: 15478,
  },
  {
    id: 2,
    name: '프리미엄 피자',
    address: '서울시 강남구 삼성동 234-56',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 2500,
    distance: 847,
    reviewCount: 1987,
    ranking: 2,
    orderCount: 12893,
  },
  {
    id: 3,
    name: '든든한 김밥',
    address: '서울시 강남구 대치동 345-67',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: '분식',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2000,
    distance: 523,
    reviewCount: 3421,
    ranking: 3,
    orderCount: 10234,
  },
  {
    id: 4,
    name: '왕가네 중화요리',
    address: '서울시 강남구 역삼동 456-78',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 4000,
    distance: 1567,
    reviewCount: 1245,
    ranking: 4,
    orderCount: 8567,
  },
  {
    id: 5,
    name: '돈까스 파라다이스',
    address: '서울시 강남구 청담동 567-89',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: false,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 2123,
    reviewCount: 987,
    ranking: 5,
    orderCount: 7321,
  },
  {
    id: 6,
    name: '매운맛 떡볶이',
    address: '서울시 강남구 역삼동 678-90',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d',
    category: '분식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 678,
    reviewCount: 4521,
    ranking: 1,
    orderCount: 6789,
  },
  {
    id: 7,
    name: '건강한 샐러드',
    address: '서울시 강남구 삼성동 789-01',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 3000,
    distance: 1123,
    reviewCount: 856,
    ranking: 7,
    orderCount: 5432,
  },
  {
    id: 8,
    name: '수제버거 하우스',
    address: '서울시 강남구 청담동 890-12',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 1843,
    reviewCount: 2341,
    ranking: 8,
    orderCount: 4987,
  },
  {
    id: 9,
    name: '아시안 누들',
    address: '서울시 강남구 대치동 901-23',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    category: '아시안',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 1678,
    reviewCount: 1678,
    ranking: 9,
    orderCount: 3654,
  },
  {
    id: 10,
    name: '든든한 도시락',
    address: '서울시 강남구 역삼동 012-34',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 923,
    reviewCount: 2156,
    ranking: 10,
    orderCount: 3211,
  },
  {
    id: 11,
    name: '사계절 찜닭',
    address: '서울시 강남구 역삼동 123-67',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    category: '찜/탕',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 3500,
    distance: 1347,
    reviewCount: 1876,
    ranking: 11,
    orderCount: 2876,
  },
  {
    id: 12,
    name: '스시 명가',
    address: '서울시 강남구 청담동 234-89',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 5000,
    distance: 2234,
    reviewCount: 3245,
    ranking: 12,
    orderCount: 2543,
  },
  {
    id: 13,
    name: '왕족발',
    address: '서울시 강남구 삼성동 345-12',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '족발/보쌈',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1523,
    reviewCount: 2156,
    ranking: 13,
    orderCount: 1987,
  },
  {
    id: 14,
    name: '프리미엄 샌드위치',
    address: '서울시 강남구 역삼동 456-34',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
    category: '샌드위치',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 834,
    reviewCount: 1543,
    ranking: 14,
    orderCount: 1765,
  },
  {
    id: 15,
    name: '스테이크 하우스',
    address: '서울시 강남구 청담동 567-45',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 5000,
    distance: 2478,
    reviewCount: 2876,
    ranking: 15,
    orderCount: 1654,
  },
  {
    id: 16,
    name: '카페 드림',
    address: '서울시 강남구 역삼동 678-23',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 623,
    reviewCount: 3421,
    ranking: 16,
    orderCount: 4321,
  },
  {
    id: 17,
    name: '돈까스 천국',
    address: '서울시 강남구 대치동 789-56',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1167,
    reviewCount: 1987,
    ranking: 17,
    orderCount: 3456,
  },
  {
    id: 18,
    name: '비빔밥 한그릇',
    address: '서울시 강남구 삼성동 890-78',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: '한식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 934,
    reviewCount: 2345,
    ranking: 18,
    orderCount: 2789,
  },
  {
    id: 19,
    name: '베트남 쌀국수',
    address: '서울시 강남구 역삼동 901-34',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1432,
    reviewCount: 1678,
    ranking: 19,
    orderCount: 2345,
  },
  {
    id: 20,
    name: '치킨 플러스',
    address: '서울시 강남구 청담동 012-67',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1623,
    reviewCount: 3567,
    ranking: 20,
    orderCount: 1876,
  },
  {
    id: 21,
    name: '죽이야기',
    address: '서울시 강남구 역삼동 123-89',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 723,
    reviewCount: 1234,
    ranking: 21,
    orderCount: 1234,
  },
  {
    id: 22,
    name: '중화반점',
    address: '서울시 강남구 대치동 234-12',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1823,
    reviewCount: 2156,
    ranking: 22,
    orderCount: 1789,
  },
  {
    id: 23,
    name: '샐러드 팩토리',
    address: '서울시 강남구 삼성동 345-34',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 534,
    reviewCount: 1876,
    ranking: 23,
    orderCount: 1432,
  },
  {
    id: 24,
    name: '수제버거 킹',
    address: '서울시 강남구 역삼동 456-56',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 1267,
    reviewCount: 2987,
    ranking: 24,
    orderCount: 987,
  },
  {
    id: 25,
    name: '피자 러버',
    address: '서울시 강남구 청담동 567-78',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 2089,
    reviewCount: 1654,
    ranking: 25,
    orderCount: 876,
  },
  {
    id: 26,
    name: '떡볶이 천국',
    address: '서울시 강남구 역삼동 678-90',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d',
    category: '분식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 645,
    reviewCount: 3421,
    ranking: 26,
    orderCount: 1543,
  },
  {
    id: 27,
    name: '일품 찜닭',
    address: '서울시 강남구 대치동 789-12',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    category: '찜/탕',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 4000,
    distance: 1923,
    reviewCount: 1987,
    ranking: 27,
    orderCount: 1678,
  },
  {
    id: 28,
    name: '스시 오마카세',
    address: '서울시 강남구 삼성동 890-34',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 5000,
    distance: 2345,
    reviewCount: 876,
    ranking: 1,
    orderCount: 1234,
  },
  {
    id: 29,
    name: '족발 명가',
    address: '서울시 강남구 역삼동 901-56',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '족발/보쌈',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 1534,
    reviewCount: 2345,
    ranking: 29,
    orderCount: 1345,
  },
  {
    id: 30,
    name: '샌드위치 카페',
    address: '서울시 강남구 청담동 012-78',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
    category: '샌드위치',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 823,
    reviewCount: 1432,
    ranking: 30,
    orderCount: 876,
  },
  {
    id: 31,
    name: '프리미엄 스테이크',
    address: '서울시 강남구 역삼동 123-90',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 5000,
    distance: 2156,
    reviewCount: 1876,
    ranking: 31,
    orderCount: 765,
  },
  {
    id: 32,
    name: '디저트 카페',
    address: '서울시 강남구 대치동 234-12',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 734,
    reviewCount: 3210,
    ranking: 32,
    orderCount: 1432,
  },
  {
    id: 33,
    name: '한식 대가',
    address: '서울시 강남구 삼성동 345-34',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: '한식',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1145,
    reviewCount: 2567,
    ranking: 33,
    orderCount: 1654,
  },
  {
    id: 34,
    name: '태국 음식점',
    address: '서울시 강남구 역삼동 456-56',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1634,
    reviewCount: 1432,
    ranking: 34,
    orderCount: 1234,
  },
  {
    id: 35,
    name: '치킨 마스터',
    address: '서울시 강남구 청담동 567-78',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1423,
    reviewCount: 2987,
    ranking: 35,
    orderCount: 1567,
  },
  {
    id: 36,
    name: '건강한 도시락',
    address: '서울시 강남구 역삼동 678-90',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 845,
    reviewCount: 1654,
    ranking: 36,
    orderCount: 876,
  },
  {
    id: 37,
    name: '짜장면 맛집',
    address: '서울시 강남구 대치동 789-12',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3000,
    distance: 1378,
    reviewCount: 2345,
    ranking: 37,
    orderCount: 1234,
  },
  {
    id: 38,
    name: '샐러드 마켓',
    address: '서울시 강남구 삼성동 890-34',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 645,
    reviewCount: 1876,
    ranking: 38,
    orderCount: 765,
  },
  {
    id: 39,
    name: '수제버거 팩토리',
    address: '서울시 강남구 역삼동 901-56',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 1723,
    reviewCount: 2156,
    ranking: 39,
    orderCount: 1432,
  },
  {
    id: 40,
    name: '이탈리안 피자',
    address: '서울시 강남구 청담동 012-78',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 4000,
    distance: 2078,
    reviewCount: 1987,
    ranking: 40,
    orderCount: 1345,
  },
  {
    id: 41,
    name: '한우 명가',
    address: '서울시 강남구 역삼동 123-45',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 5000,
    distance: 1876,
    reviewCount: 2345,
    ranking: 41,
    orderCount: 1234,
  },
  {
    id: 42,
    name: '베트남 쌀국수 천국',
    address: '서울시 강남구 삼성동 234-56',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1234,
    reviewCount: 1567,
    ranking: 42,
    orderCount: 876,
  },
  {
    id: 43,
    name: '돈까스 맛집',
    address: '서울시 강남구 청담동 345-67',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 2123,
    reviewCount: 1987,
    ranking: 43,
    orderCount: 1123,
  },
  {
    id: 44,
    name: '홍콩반점',
    address: '서울시 강남구 대치동 456-78',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1456,
    reviewCount: 2234,
    ranking: 44,
    orderCount: 1432,
  },
  {
    id: 45,
    name: '브런치 카페',
    address: '서울시 강남구 역삼동 567-89',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 567,
    reviewCount: 1876,
    ranking: 45,
    orderCount: 876,
  },
  {
    id: 46,
    name: '양념치킨 전문점',
    address: '서울시 강남구 삼성동 678-90',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1789,
    reviewCount: 3456,
    ranking: 46,
    orderCount: 1234,
  },
  {
    id: 47,
    name: '해물찜 전문점',
    address: '서울시 강남구 청담동 789-12',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    category: '찜/탕',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 4000,
    distance: 2345,
    reviewCount: 1543,
    ranking: 47,
    orderCount: 1123,
  },
  {
    id: 48,
    name: '프리미엄 초밥',
    address: '서울시 강남구 대치동 890-23',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 5000,
    distance: 1987,
    reviewCount: 2678,
    ranking: 48,
    orderCount: 1345,
  },
  {
    id: 49,
    name: '수제 샌드위치',
    address: '서울시 강남구 역삼동 901-34',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
    category: '샌드위치',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 678,
    reviewCount: 1234,
    ranking: 49,
    orderCount: 765,
  },
  {
    id: 50,
    name: '웰빙 샐러드',
    address: '서울시 강남구 삼성동 012-45',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 890,
    reviewCount: 1765,
    ranking: 50,
    orderCount: 876,
  },
  {
    id: 51,
    name: '족발의 신',
    address: '서울시 강남구 청담동 123-56',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '족발/보쌈',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 1654,
    reviewCount: 2987,
    ranking: 51,
    orderCount: 1234,
  },
  {
    id: 52,
    name: '분식 천국',
    address: '서울시 강남구 대치동 234-67',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d',
    category: '분식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 745,
    reviewCount: 3210,
    ranking: 52,
    orderCount: 876,
  },
  {
    id: 53,
    name: '한식 대첩',
    address: '서울시 강남구 역삼동 345-78',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: '한식',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1234,
    reviewCount: 2345,
    ranking: 53,
    orderCount: 1123,
  },
  {
    id: 54,
    name: '수제버거 클래식',
    address: '서울시 강남구 삼성동 456-89',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 1567,
    reviewCount: 1987,
    ranking: 54,
    orderCount: 765,
  },
  {
    id: 55,
    name: '이탈리안 레스토랑',
    address: '서울시 강남구 청담동 567-90',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 4000,
    distance: 2234,
    reviewCount: 2456,
    ranking: 55,
    orderCount: 1234,
  },
  {
    id: 56,
    name: '건강한 도시락 카페',
    address: '서울시 강남구 대치동 678-12',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 876,
    reviewCount: 1543,
    ranking: 56,
    orderCount: 876,
  },
  {
    id: 57,
    name: '마라탕 전문점',
    address: '서울시 강남구 역삼동 789-23',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3000,
    distance: 1432,
    reviewCount: 2134,
    ranking: 57,
    orderCount: 1123,
  },
  {
    id: 58,
    name: '디저트 파라다이스',
    address: '서울시 강남구 삼성동 890-34',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 654,
    reviewCount: 2876,
    ranking: 58,
    orderCount: 765,
  },
  {
    id: 59,
    name: '치킨 공장',
    address: '서울시 강남구 청담동 901-45',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1876,
    reviewCount: 3123,
    ranking: 59,
    orderCount: 1234,
  },
  {
    id: 60,
    name: '태국 스트리트 푸드',
    address: '서울시 강남구 대치동 012-56',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1543,
    reviewCount: 1876,
    ranking: 3,
    orderCount: 1123,
  },
  {
    id: 61,
    name: '오마카세 스시바',
    address: '서울시 강남구 청담동 123-78',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 5000,
    distance: 1876,
    reviewCount: 2345,
    ranking: 1,
    orderCount: 16789,
  },
  {
    id: 62,
    name: '양대창 구이',
    address: '서울시 강남구 역삼동 234-89',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 1234,
    reviewCount: 3456,
    ranking: 2,
    orderCount: 13456,
  },
  {
    id: 63,
    name: '베이커리 카페',
    address: '서울시 강남구 삼성동 345-90',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 567,
    reviewCount: 2987,
    ranking: 3,
    orderCount: 11234,
  },
  {
    id: 64,
    name: '마라탕 마라상',
    address: '서울시 강남구 대치동 456-12',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 890,
    reviewCount: 1876,
    ranking: 2,
    orderCount: 9876,
  },
  {
    id: 65,
    name: '수제 파스타',
    address: '서울시 강남구 청담동 567-23',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 1432,
    reviewCount: 2345,
    ranking: 1,
    orderCount: 8765,
  },
  {
    id: 66,
    name: '치즈닭갈비',
    address: '서울시 강남구 역삼동 678-34',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 2134,
    reviewCount: 1987,
    ranking: 2,
    orderCount: 7654,
  },
  {
    id: 67,
    name: '프리미엄 도시락',
    address: '서울시 강남구 삼성동 789-45',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 765,
    reviewCount: 1543,
    ranking: 3,
    orderCount: 6543,
  },
  {
    id: 68,
    name: '홍콩 딤섬',
    address: '서울시 강남구 대치동 890-56',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1654,
    reviewCount: 2876,
    ranking: 2,
    orderCount: 5432,
  },
  {
    id: 69,
    name: '샐러드 바',
    address: '서울시 강남구 청담동 901-67',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2000,
    distance: 987,
    reviewCount: 1234,
    ranking: 3,
    orderCount: 4321,
  },
  {
    id: 70,
    name: '수제버거 앤 프라이즈',
    address: '서울시 강남구 역삼동 012-78',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1876,
    reviewCount: 3210,
    ranking: 1,
    orderCount: 3987,
  },
  {
    id: 71,
    name: '돈까스 명가',
    address: '서울시 강남구 삼성동 123-89',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1234,
    reviewCount: 2567,
    ranking: 2,
    orderCount: 3456,
  },
  {
    id: 72,
    name: '베트남 쌀국수 하우스',
    address: '서울시 강남구 대치동 234-90',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 876,
    reviewCount: 1987,
    ranking: 3,
    orderCount: 2987,
  },
  {
    id: 73,
    name: '양념치킨 킹',
    address: '서울시 강남구 청담동 345-12',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 1543,
    reviewCount: 3456,
    ranking: 2,
    orderCount: 2765,
  },
  {
    id: 74,
    name: '한우곱창 전문점',
    address: '서울시 강남구 역삼동 456-23',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 4000,
    distance: 2134,
    reviewCount: 2345,
    ranking: 1,
    orderCount: 2543,
  },
  {
    id: 75,
    name: '분식 맛집',
    address: '서울시 강남구 삼성동 567-34',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d',
    category: '분식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 765,
    reviewCount: 1654,
    ranking: 3,
    orderCount: 2321,
  },
  {
    id: 76,
    name: '프리미엄 초밥 오마카세',
    address: '서울시 강남구 대치동 678-45',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 5000,
    distance: 1987,
    reviewCount: 2987,
    ranking: 1,
    orderCount: 2198,
  },
  {
    id: 77,
    name: '족발 맛집',
    address: '서울시 강남구 청담동 789-56',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '족발/보쌈',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 1234,
    reviewCount: 1876,
    ranking: 2,
    orderCount: 1987,
  },
  {
    id: 78,
    name: '샌드위치 하우스',
    address: '서울시 강남구 역삼동 890-67',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
    category: '샌드위치',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2500,
    distance: 876,
    reviewCount: 1543,
    ranking: 3,
    orderCount: 1876,
  },
  {
    id: 79,
    name: '이탈리안 레스토랑 2호점',
    address: '서울시 강남구 삼성동 901-78',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 1654,
    reviewCount: 2876,
    ranking: 2,
    orderCount: 1765,
  },
  {
    id: 80,
    name: '브런치 카페 2호점',
    address: '서울시 강남구 대치동 012-89',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 987,
    reviewCount: 1987,
    ranking: 3,
    orderCount: 1654,
  },
  {
    id: 81,
    name: '짜장면 맛집 2호점',
    address: '서울시 강남구 청담동 123-90',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3000,
    distance: 1432,
    reviewCount: 2345,
    ranking: 2,
    orderCount: 1543,
  },
  {
    id: 82,
    name: '샐러드 하우스',
    address: '서울시 강남구 역삼동 234-12',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2000,
    distance: 765,
    reviewCount: 1654,
    ranking: 3,
    orderCount: 1432,
  },
  {
    id: 83,
    name: '수제버거 앤 쉐이크',
    address: '서울시 강남구 삼성동 345-23',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 1876,
    reviewCount: 2987,
    ranking: 2,
    orderCount: 1321,
  },
  {
    id: 84,
    name: '돈까스 앤 우동',
    address: '서울시 강남구 대치동 456-34',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1234,
    reviewCount: 1876,
    ranking: 3,
    orderCount: 1234,
  },
  {
    id: 85,
    name: '태국 음식 전문점 2호점',
    address: '서울시 강남구 청담동 567-45',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1543,
    reviewCount: 2345,
    ranking: 2,
    orderCount: 1123,
  },
  {
    id: 86,
    name: '치킨 앤 맥주',
    address: '서울시 강남구 역삼동 678-56',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 987,
    reviewCount: 3456,
    ranking: 1,
    orderCount: 1098,
  },
  {
    id: 87,
    name: '한우 구이 전문점',
    address: '서울시 강남구 삼성동 789-67',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 5000,
    distance: 2134,
    reviewCount: 2987,
    ranking: 1,
    orderCount: 987,
  },
  {
    id: 88,
    name: '떡볶이 앤 튀김',
    address: '서울시 강남구 대치동 890-78',
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1533640924469-f04e06f8898d',
    category: '분식',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2000,
    distance: 765,
    reviewCount: 1654,
    ranking: 3,
    orderCount: 876,
  },
  {
    id: 89,
    name: '프리미엄 스시',
    address: '서울시 강남구 청담동 901-89',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 5000,
    distance: 1987,
    reviewCount: 2876,
    ranking: 1,
    orderCount: 765,
  },
  {
    id: 90,
    name: '족발 앤 보쌈',
    address: '서울시 강남구 역삼동 012-90',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '족발/보쌈',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3500,
    distance: 1234,
    reviewCount: 1987,
    ranking: 3,
    orderCount: 654,
  },
  {
    id: 91,
    name: '스시 오마카세 2호점',
    address: '서울시 강남구 청담동 123-91',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: '회/초밥',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 5000,
    distance: 2134,
    reviewCount: 2876,
    ranking: 1,
    orderCount: 17654,
  },
  {
    id: 92,
    name: '숯불 고기구이',
    address: '서울시 강남구 역삼동 234-91',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 4000,
    distance: 1765,
    reviewCount: 3123,
    ranking: 1,
    orderCount: 14321,
  },
  {
    id: 93,
    name: '마카롱 전문점',
    address: '서울시 강남구 삼성동 345-91',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '카페/디저트',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 876,
    reviewCount: 2987,
    ranking: 2,
    orderCount: 12876,
  },
  {
    id: 94,
    name: '중화요리 대가',
    address: '서울시 강남구 대치동 456-91',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3000,
    distance: 1432,
    reviewCount: 2345,
    ranking: 2,
    orderCount: 10987,
  },
  {
    id: 95,
    name: '수제 피자',
    address: '서울시 강남구 청담동 567-91',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: '피자/양식',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 4000,
    distance: 1987,
    reviewCount: 3456,
    ranking: 1,
    orderCount: 9876,
  },
  {
    id: 96,
    name: '치킨 명가',
    address: '서울시 강남구 역삼동 678-91',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 876,
    reviewCount: 2987,
    ranking: 2,
    orderCount: 8765,
  },
  {
    id: 97,
    name: '죽 전문점',
    address: '서울시 강남구 삼성동 789-91',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    category: '도시락/죽',
    isOpen: true,
    deliveryTime: '25-35분',
    deliveryFee: 2500,
    distance: 654,
    reviewCount: 1876,
    ranking: 3,
    orderCount: 7654,
  },
  {
    id: 98,
    name: '마라탕 천국',
    address: '서울시 강남구 대치동 890-91',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040',
    category: '중국집',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1234,
    reviewCount: 2567,
    ranking: 2,
    orderCount: 6543,
  },
  {
    id: 99,
    name: '웰빙 샐러드 2호점',
    address: '서울시 강남구 청담동 901-91',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    category: '샐러드',
    isOpen: true,
    deliveryTime: '20-30분',
    deliveryFee: 2000,
    distance: 765,
    reviewCount: 1543,
    ranking: 3,
    orderCount: 5432,
  },
  {
    id: 100,
    name: '수제버거 프리미엄',
    address: '서울시 강남구 역삼동 012-91',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: '버거',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3500,
    distance: 987,
    reviewCount: 3210,
    ranking: 1,
    orderCount: 4321,
  },
  {
    id: 101,
    name: '돈까스 전문점',
    address: '서울시 강남구 삼성동 123-92',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
    category: '일식/돈까스',
    isOpen: true,
    deliveryTime: '30-40분',
    deliveryFee: 3000,
    distance: 1432,
    reviewCount: 2345,
    ranking: 2,
    orderCount: 3987,
  },
  {
    id: 102,
    name: '태국 음식 전문점',
    address: '서울시 강남구 대치동 234-92',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: '아시안',
    isOpen: true,
    deliveryTime: '35-45분',
    deliveryFee: 3500,
    distance: 1765,
    reviewCount: 2876,
    ranking: 2,
    orderCount: 3654,
  },
  {
    id: 103,
    name: '양념치킨 전문점 2호점',
    address: '서울시 강남구 청담동 345-92',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    category: '치킨',
    isOpen: true,
    deliveryTime: '40-50분',
    deliveryFee: 3000,
    distance: 876,
    reviewCount: 1987,
    ranking: 2,
    orderCount: 3321,
  },
  {
    id: 104,
    name: '한우 전문점',
    address: '서울시 강남구 역삼동 456-92',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
    category: '고기/구이',
    isOpen: true,
    deliveryTime: '45-55분',
    deliveryFee: 5000,
    distance: 2134,
    reviewCount: 3456,
    ranking: 1,
    orderCount: 2987,
  },
]

export default STORE_MOCK_DATA
