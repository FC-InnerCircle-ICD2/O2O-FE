import BANNER_MOCK_DATA from '@/constants/banners'
import { PENDING_REVIEWS_MOCK_DATA } from '@/constants/pendingReviews'
import STORE_MOCK_DATA from '@/constants/stores'
import { delay, http, HttpResponse, passthrough } from 'msw'

// API 엔드포인트 예시
export const handlers = [
  // Next.js 웹팩 핫 리로딩 요청 무시
  http.get('/_next/static/webpack/*', () => {
    return passthrough()
  }),

  // Next.js 정적 미디어 파일 요청 무시
  http.get('/_next/static/media/*', () => {
    return passthrough()
  }),

  // Next.js 청크 파일 요청 무시
  http.get('/_next/static/chunks/*', () => {
    return passthrough()
  }),

  // 카카오 이미지 요청 처리
  http.get('https://t1.kakaocdn.net/*', async ({ request }) => {
    try {
      const response = await fetch(request.url)
      const imageBuffer = await response.arrayBuffer()

      return new HttpResponse(imageBuffer, {
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } catch (error) {
      console.error('카카오 이미지 로딩 실패:', error)
      return passthrough()
    }
  }),

  // 카카오 이미지 요청 처리 (img1)
  http.get('https://img1.kakaocdn.net/*', async ({ request }) => {
    try {
      const response = await fetch(request.url)
      const imageBuffer = await response.arrayBuffer()

      return new HttpResponse(imageBuffer, {
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } catch (error) {
      console.error('카카오 이미지 로딩 실패:', error)
      return passthrough()
    }
  }),

  http.get('/_next/image', async ({ request }) => {
    const originalUrl = new URL(request.url)
    const imageUrl = originalUrl.searchParams.get('url')

    if (!imageUrl) {
      return new HttpResponse(null, { status: 400 })
    }

    // 외부 이미지 URL인 경우 passthrough
    if (imageUrl.startsWith('https://images.unsplash.com') || imageUrl.includes('kakaocdn.net')) {
      return passthrough()
    }

    try {
      const response = await fetch(decodeURIComponent(imageUrl))
      const imageBuffer = await response.arrayBuffer()

      return new HttpResponse(imageBuffer, {
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } catch (error) {
      return new HttpResponse(null, { status: 404 })
    }
  }),
  // Get Store
  http.get('*/api/v1/stores/list-cursor', async ({ request }) => {
    // 1초 지연 추가
    await delay(1000)

    const url = new URL(request.url)
    const offset = Number(url.searchParams.get('offset')) || 0
    const size = Number(url.searchParams.get('size')) || 10
    const category = url.searchParams.get('category')
    const order = url.searchParams.get('order')
    const keyword = url.searchParams.get('keyword')

    let filteredData = [...STORE_MOCK_DATA]

    // 검색어 필터링
    if (keyword) {
      filteredData = filteredData.filter((store) =>
        store.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    // 카테고리 필터링
    if (category) {
      filteredData = filteredData.filter((store) => store.category === category)
    }

    // order에 따른 정렬
    if (order) {
      switch (order) {
        case '랭킹순':
          filteredData.sort((a, b) => b.ranking - a.ranking)
          break
        case '리뷰 많은 순':
          filteredData.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        case '거리 가까운 순':
          filteredData.sort((a, b) => a.distance - b.distance)
          break
        case '별점 높은 순':
          filteredData.sort((a, b) => b.rating - a.rating)
          break
        case '주문 많은 순':
          filteredData.sort((a, b) => b.orderCount - a.orderCount)
          break
      }
    }

    // 페이지네이션
    const startIndex = (offset - 1) * size
    const endIndex = startIndex + size
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // 다음 페이지가 있는지 확인
    const hasNextPage = endIndex < filteredData.length

    return HttpResponse.json({
      status: 200,
      data: {
        data: paginatedData,
        nextCursor: hasNextPage ? offset + 1 : null,
      },
      message: 'success',
    })
  }),
  // Get Banners
  http.get('/api/v1/banners', async () => {
    await delay(500)
    return HttpResponse.json({
      status: 200,
      data: BANNER_MOCK_DATA,
      message: 'success',
    })
  }),

  // Get Menu
  http.get('*/api/v1/stores/:id/menus', () => {
    return passthrough()
  }),

  http.post('*/api/v1/members', () => {
    return passthrough()
  }),

  http.post('*/api/v1/orders', () => {
    return passthrough()
  }),

  // Get Menu Options
  http.get('*/api/v1/stores/:id/menus/:menuId/options', async ({ request }) => {
    return passthrough()

    // await delay(2000)
    // return HttpResponse.json({
    //   status: 200,
    //   message: 'success',
    //   data: MENU_OPTIONS_MOCK_DATA,
    // })
  }),

  // Get Pending Reviews
  http.get('/api/reviews/pending', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: PENDING_REVIEWS_MOCK_DATA,
    })
  }),

  // trend API는 실제 API로 통과
  http.get('*/api/v1/stores/trend', () => {
    return passthrough()
  }),

  // trend API는 실제 API로 통과
  http.get('*/api/v1/stores/:id', () => {
    return passthrough()
  }),
  http.get('*/api/v1/carts', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: {
        storeId: '26466355',
        orderMenus: [
          {
            cartId: 5,
            menuId: '9e15c3da-cae8-4c25-8b4e-ae21a926f072',
            name: '아메리카노',
            imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
            totalPrice: 10000, // 메뉴당 총합(옵션가격포함)
            quantity: 2,
            orderMenuOptionGroups: [
              {
                id: '62f5ab82-6f9f-4344-964c-9a09a568df62',
                name: '사이즈 선택',
                orderMenuOptionIds: [
                  {
                    id: 'c5d18e3d-e643-49d6-b089-3dbb5a148800',
                    name: '소',
                  },
                ],
              },
            ],
          },
          {
            cartId: 6,
            menuId: '~~~',
            name: '카페라떼',
            imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
            totalPrice: 5000,
            quantity: 1,
            orderMenuOptionGroups: [
              {
                id: '~~~',
                name: '사이즈 선택',
                orderMenuOptionIds: [
                  {
                    id: '~~~',
                    name: '중',
                  },
                ],
              },
            ],
          },
        ],
      },
    })
  }),
  http.post('*/api/v1/carts', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: null,
    })
  }),
  http.patch('*/api/v1/carts', async ({ request }) => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: {
        cartId: 1,
        quantity: 2,
      },
    })
  }),
  http.delete('*/api/v1/carts', async () => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: null,
    })
  }),
]
