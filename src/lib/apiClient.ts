import ky from 'ky';

export const kyClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // Base URL 설정
  timeout: 10000, // 타임아웃 설정
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
  prefixUrl: process.env.NODE_ENV === 'development' 
    ? `http://localhost:3000/api/v1`
    : process.env.NEXT_PUBLIC_API_URL,
})
