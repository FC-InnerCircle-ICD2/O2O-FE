import BottomSheet from '@/components/BottomSheet'
import CommonLayout from '@/components/CommonLayout'
import Modal from '@/components/Modal'
import { NavigationTracker } from '@/components/NavigationTracker'
import { Toaster } from '@/components/Toaster'
import { MockProvider } from '@/providers/MockProvider'
import QueryProvider from '@/providers/QueryProvider'
import { bmjua, pretendard } from '@/styles/fonts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '개발의민족',
  description: '개발의민족',
  icons: {
    icon: '/favicon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'format-detection': 'telephone=no, address=no, email=no',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning={true}
      className={`${pretendard.className} ${bmjua.variable}`}
    >
      <body suppressHydrationWarning={true} className="bg-gray-100">
        <MockProvider>
          <QueryProvider>
            <CommonLayout>{children}</CommonLayout>
            <Modal />
            <BottomSheet />
            <NavigationTracker />
            <ReactQueryDevtools initialIsOpen />
          </QueryProvider>
        </MockProvider>
        <Toaster />
      </body>
    </html>
  )
}
