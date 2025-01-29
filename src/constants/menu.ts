import { MenuCategory } from "@/models/menu";

export const MENU_MOCK_DATA: MenuCategory[] = [
    {
      categoryId: 'cdea9bf5-b951-4f80-b4d3-9154112796ef',
      categoryName: '신메뉴',
      menus: [
        {
          id: '54e57531-ad59-47c4-b7b0-4258ef2c4d62',
          name: '맵소디',
          description: 'BBQ의 전통 간장소스로 맛을 낸 매콤 달콤 짭짤의 하모니',
          price: 24500,
          imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
          soldout: false,
          isBest: true,
        },
        {
          id: '6d5a2735-1359-4e78-8a1c-c3c069e7d23b',
          name: '황금올리브 닭다리',
          description: '특제 올리브유로 튀겨낸 바삭하고 촉촉한 닭다리 치킨',
          price: 23000,
          imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
          soldout: true,
          
        },
        {
          id: '9d8c7b6a-5e4d-3c2b-1a0z-9y8x7w6v5u4t',
          name: '트러플크림치킨',
          description: '고급스러운 트러플 향과 부드러운 크림소스의 만남',
          price: 25000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
          isManyOrder: true,
        }
      ]
    },
    {
      categoryId: '7d8f3a92-e260-4bf1-a41d-9e0a3c33c738',
      categoryName: '시그니처',
      menus: [
        {
          id: 'b2f3d4e5-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
          name: '황금올리브치킨',
          description: 'BBQ만의 특별한 올리브유로 튀겨낸 바삭하고 담백한 치킨',
          price: 20000,
          imageUrl: 'https://images.unsplash.com/photo-1565799557186-1dc93e2329b8',
          soldout: false,
        },
        {
          id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
          name: '자메이카 통다리구이',
          description: '스모키한 향과 함께 즐기는 특제 양념의 통다리구이',
          price: 22000,
          imageUrl: 'https://images.unsplash.com/photo-1588767768106-1b20e51d9a21',
          soldout: false,
        },
        {
          id: 'k9j8h7g6-f5e4-d3c2-b1a0-z9y8x7w6v5u4',
          name: '크런치 양념치킨',
          description: '바삭한 튀김옷에 특제 양념을 입힌 치킨',
          price: 21000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: '9e8d7c6b-5a4f-3e2d-1m9n-8k7l6j5h4g3f',
      categoryName: '양념류',
      menus: [
        {
          id: 'f1e2d3c4-b5a6-9876-5432-109876fedcba',
          name: '핫황금올리브',
          description: '매콤한 양념과 올리브유의 완벽한 조화',
          price: 21000,
          imageUrl: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599',
          soldout: false,
        },
        {
          id: 'c4n3m2b1-v9c8-7x6z-5432-qawsedrftgyh',
          name: '극한왕갈비치킨',
          description: '달콤 짭짤한 갈비맛 소스를 입힌 치킨',
          price: 23000,
          imageUrl: 'https://images.unsplash.com/photo-1609522147150-3c9a1faabac5',
          soldout: false,
        },
        {
          id: 't5s4r3q2-p1o0-n9m8-l7k6-j5h4g3f2e1d0',
          name: '맵스터치킨',
          description: '화끈한 매운맛이 특징인 양념치킨',
          price: 22000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: 'h4g3f2e1-d0c9-b8a7-6543-z9y8x7w6v5u4',
      categoryName: '후라이드',
      menus: [
        {
          id: 'm2n3o4p5-q6r7-s8t9-u0v1-w2x3y4z5a6b7',
          name: '후라이드치킨',
          description: '담백하고 바삭한 클래식 후라이드',
          price: 18000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'c8d9e0f1-g2h3-i4j5-k6l7-m8n9o0p1q2r3',
          name: '반반치킨',
          description: '후라이드와 양념을 한번에 즐기는 치킨',
          price: 19000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 's4t5u6v7-w8x9-y0z1-a2b3-c4d5e6f7g8h9',
          name: '순살치킨',
          description: '뼈 없이 편하게 즐기는 담백한 치킨',
          price: 20000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: 'i5j6k7l8-m9n0-o1p2-q3r4-s5t6u7v8w9x0',
      categoryName: '사이드메뉴',
      menus: [
        {
          id: 'y1z2a3b4-c5d6-e7f8-g9h0-i1j2k3l4m5n6',
          name: '치즈볼',
          description: '녹진한 치즈가 가득한 바삭한 치즈볼',
          price: 8000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'o7p8q9r0-s1t2-u3v4-w5x6-y7z8a9b0c1d2',
          name: '감자튀김',
          description: '바삭하고 담백한 감자튀김',
          price: 6000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'e3f4g5h6-i7j8-k9l0-m1n2-o3p4q5r6s7t8',
          name: '콜슬로',
          description: '신선한 채소로 만든 콜슬로 샐러드',
          price: 5000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: 'u9v0w1x2-y3z4-a5b6-c7d8-e9f0g1h2i3j4',
      categoryName: '음료',
      menus: [
        {
          id: 'k5l6m7n8-o9p0-q1r2-s3t4-u5v6w7x8y9z0',
          name: '콜라',
          description: '시원한 탄산음료',
          price: 2000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          name: '사이다',
          description: '청량한 사이다',
          price: 2000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'q7r8s9t0-u1v2-w3x4-y5z6-a7b8c9d0e1f2',
          name: '맥주',
          description: '치킨과 잘 어울리는 시원한 맥주',
          price: 4000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: 'g3h4i5j6-k7l8-m9n0-o1p2-q3r4s5t6u7v8',
      categoryName: '세트메뉴',
      menus: [
        {
          id: 'w9x0y1z2-a3b4-c5d6-e7f8-g9h0i1j2k3l4',
          name: '패밀리세트',
          description: '치킨 2마리와 사이드 2종, 음료 2개',
          price: 45000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'm5n6o7p8-q9r0-s1t2-u3v4-w5x6y7z8a9b0',
          name: '커플세트',
          description: '치킨 1마리와 사이드 1종, 음료 2개',
          price: 28000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6',
          name: '파티세트',
          description: '치킨 3마리와 사이드 3종, 음료 4개',
          price: 65000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    },
    {
      categoryId: 's7t8u9v0-w1x2-y3z4-a5b6-c7d8e9f0g1h2',
      categoryName: '시즌한정',
      menus: [
        {
          id: 'i3j4k5l6-m7n8-o9p0-q1r2-s3t4u5v6w7x8',
          name: '눈꽃치즈치킨',
          description: '눈꽃처럼 내린 파마산 치즈가 듬뿍',
          price: 23000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'y9z0a1b2-c3d4-e5f6-g7h8-i9j0k1l2m3n4',
          name: '달달마늘치킨',
          description: '달콤한 마늘소스를 입힌 시즌한정 메뉴',
          price: 22000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        },
        {
          id: 'o5p6q7r8-s9t0-u1v2-w3x4-y5z6a7b8c9d0',
          name: '허니버터치킨',
          description: '달콤한 허니버터 소스의 환상적인 조화',
          price: 24000,
          imageUrl: 'https://images.unsplash.com/photo-1585703900468-13c7a978ad86',
          soldout: false,
        }
      ]
    }
]
  