import BottomSheet from '@/components/BottomSheet'
import CommonLayout from '@/components/CommonLayout'
import Modal from '@/components/Modal'

import { Toaster } from '@/components/Toaster'
import { MockProvider } from '@/providers/MockProvider'
import QueryProvider from '@/providers/QueryProvider'
import { bmjua, pretendard } from '@/styles/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '개발의민족',
  description: '개발의민족',
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
          </QueryProvider>
        </MockProvider>
        <Toaster />
      </body>
    </html>
  )
}
