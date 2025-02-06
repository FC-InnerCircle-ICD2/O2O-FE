import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

const initMocks = () => {
  if (process.env.NODE_ENV === 'development') {
    worker.start({
      onUnhandledRequest(request, { warning }) {
        const url = new URL(request.url)
        const pathname = decodeURIComponent(url.pathname)

        // Next.js 관련 요청은 경고 없이 bypass
        if (
          pathname.startsWith('/_next/') ||
          pathname.includes('/static/chunks/') ||
          request.url.includes('.hot-update.') ||
          request.url.includes('webpack') ||
          request.url.includes('on-demand-entries')
        ) {
          return
        }

        // 페이지 라우팅 요청은 bypass
        if (
          pathname.startsWith('/store/') ||
          pathname.startsWith('/home/') ||
          pathname.startsWith('/search/') ||
          url.searchParams.has('_rsc')
        ) {
          return
        }

        // 이미지 요청은 경고 없이 bypass
        if (
          url.hostname.includes('kakaocdn.net') ||
          pathname.startsWith('/images/') ||
          pathname.endsWith('.png') ||
          pathname.endsWith('.jpg') ||
          pathname.endsWith('.jpeg') ||
          pathname.endsWith('.gif') ||
          pathname.endsWith('.svg')
        ) {
          // kakaocdn.net 이미지는 MSW handler에서 처리
          if (!url.hostname.includes('kakaocdn.net')) {
            return
          }
        }

        // API 요청이 아닌 경우는 경고 없이 bypass
        if (!pathname.includes('/api/')) {
          return
        }

        // 그 외의 처리되지 않은 요청에 대해서만 경고 표시
        warning()
      },
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          scope: '/',
        },
      },
    })
  }
}

export default initMocks
