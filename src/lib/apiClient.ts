import ky from 'ky';

export const kyClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // Base URL 설정
  timeout: 10000, // 타임아웃 설정
  retry: {
    limit: 3, // 재시도 횟수
    methods: ['get', 'post', 'put', 'delete'], // 재시도 허용 메서드
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            request.headers.set('Authorization', accessToken);
        }
      },  
    ],
    afterResponse: [
      (_request, _options, response) => {
        // 예: 로깅 처리
        console.log(`Response: ${response.status} ${response.url}`)
      },
    ],
    // beforeError: [
    //   (error) => {
    //     console.error(error.message)
    //     return error
    //   },
    // ],
  },
})

export const mockClient = kyClient.extend({
  prefixUrl: `http://localhost:3000/api/v1`,
})
