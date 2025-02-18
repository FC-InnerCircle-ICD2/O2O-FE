import { RefreshResponse } from '@/models/auth'
import ky from 'ky'

// 리프레시 토큰용 별도 클라이언트 생성
const refreshClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

// 토큰 갱신 중임을 나타내는 Promise를 저장
let refreshTokenPromise: Promise<RefreshResponse['data']> | null = null

export const kyClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // Base URL 설정
  timeout: 10000, // 타임아웃 설정
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          request.headers.set('Authorization', accessToken)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 511) {
          try {
            // 이미 진행 중인 토큰 갱신이 있다면 그 Promise를 재사용
            if (!refreshTokenPromise) {
              refreshTokenPromise = (async () => {
                const accessToken = localStorage.getItem('accessToken')
                const refreshToken = localStorage.getItem('refreshToken')

                const response = await refreshClient
                  .post('auth/refresh', {
                    json: { accessToken, refreshToken },
                  })
                  .json<RefreshResponse>()

                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)

                return response.data
              })()
            }

            // 토큰 갱신 완료 대기
            const newTokens = await refreshTokenPromise
            refreshTokenPromise = null // 갱신 완료 후 초기화

            // 원래 요청을 새 토큰으로 재시도
            return ky(request, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: newTokens.accessToken,
              },
            })
          } catch (error) {
            refreshTokenPromise = null // 에러 발생 시에도 초기화
            console.error('리프레시 토큰 갱신 실패:', error)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            throw new Error('리프레시 토큰 만료')
          }
        }
      },
    ],
  },
})

export const mockClient = kyClient.extend({
  prefixUrl:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/api/v1`
      : process.env.NEXT_PUBLIC_API_URL,
})
