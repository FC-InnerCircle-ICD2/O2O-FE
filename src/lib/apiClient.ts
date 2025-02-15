import { RefreshResponse } from '@/models/auth'
import ky from 'ky'

// 리프레시 토큰용 별도 클라이언트 생성
const refreshClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

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
          console.log('토큰 만료 감지, 리프레시 토큰 요청 시작')

          const accessToken = localStorage.getItem('accessToken')
          const refreshToken = localStorage.getItem('refreshToken')

          try {
            // refreshClient를 사용하여 리프레시 토큰 요청
            const response = await refreshClient
              .post('auth/refresh', {
                headers: {
                  'Content-Type': 'application/json',
                },
                json: { accessToken, refreshToken },
              })
              .json<RefreshResponse>()

            // 새로운 액세스 토큰 저장
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)

            // 원래 요청을 새 토큰으로 재시도
            return ky(request, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: response.data.accessToken,
              },
            })
          } catch (error) {
            console.error('리프레시 토큰 갱신 실패:', error)
            // 로컬 스토리지의 토큰 제거
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
