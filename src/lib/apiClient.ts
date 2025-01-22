import ky from 'ky'

export const kyClient = ky.create({
  prefixUrl: process.env.BASE_API_URL, // Base URL 설정
  timeout: 10000, // 타임아웃 설정
  retry: {
    limit: 3, // 재시도 횟수
    methods: ['get', 'post', 'put', 'delete'], // 재시도 허용 메서드
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // 예: Authorization 헤더 추가
        const token = localStorage.getItem('authToken') // 예시로 LocalStorage 사용
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        // 예: 로깅 처리
        console.log(`Response: ${response.status} ${response.url}`)
      },
    ],
    beforeError: [
      (error) => {
        console.error(error.message)
        return error
      },
    ],
  },
})

export const mockClient = kyClient.extend({
  prefixUrl: ``,
})
