export interface Store {
  id: number
  name: string
  address: string
  rating: number
  imageMain: string
  category: string
  isOpen: boolean
  deliveryTime: string // 예: "30-40분"
  deliveryFee: number // 배달비
  deliveryDistance: number // 선택적 필드: 사용자 위치 기반 거리
  reviewCount: number
  ranking: number // 랭킹 순위
  orderCount: number // 주문 수
}
