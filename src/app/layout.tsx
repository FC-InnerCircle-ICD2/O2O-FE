import BottomSheet from '@/components/BottomSheet'
import CommonLayout from '@/components/CommonLayout'
import Modal from '@/components/Modal'
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
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <CommonLayout>{children}</CommonLayout>
        <Modal />
        <BottomSheet />
      </body>
    </html>
  )
}
