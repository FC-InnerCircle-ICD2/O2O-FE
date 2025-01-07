import localFont from 'next/font/local'

export const pretendard = localFont({
  src: [
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

export const bmjua = localFont({
  src: [
    {
      path: '../fonts/BMJUA.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BMJUA.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BMJUA.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-bmjua',
  display: 'swap',
})
