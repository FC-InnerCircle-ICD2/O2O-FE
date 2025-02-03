import BANNER_MOCK_DATA from '@/constants/banners'
import { MENU_MOCK_DATA } from '@/constants/menu'
import { MENU_OPTIONS_MOCK_DATA } from '@/constants/menuOptions'
import STORE_MOCK_DATA from '@/constants/stores'
import { delay, http, HttpResponse, passthrough } from 'msw'

// API 엔드포인트 예시
export const handlers = [
  http.get('/_next/image', async ({ request }) => {
    const originalUrl = new URL(request.url)
    const imageUrl = originalUrl.searchParams.get('url')

    if (!imageUrl) {
      return new HttpResponse(null, { status: 400 })
    }

    // 외부 이미지 URL인 경우 (예: unsplash) passthrough
    if (imageUrl.startsWith('https://images.unsplash.com')) {
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
  http.get('/api/stores', async ({ request }) => {
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
  http.get('/api/stores/:id/menus', async ({ request }) => {
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: MENU_MOCK_DATA,
    })
  }),

  // Get Menu Options
  http.get('/api/stores/:id/menus/:menuId/options', async ({ request }) => {
    await delay(2000)
    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: MENU_OPTIONS_MOCK_DATA,
    })
  }),
]
