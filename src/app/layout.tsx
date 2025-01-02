import CalcGeolocation from '@/components/CalcGeolocation'
import CommonLayout from '@/components/CommonLayout'
import Modal from '@/components/Modal'
import type { Metadata } from 'next'
import './globals.css'
import BottomSheet from '@/components/BottomSheet'

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
    <html lang="en">
      <body>
        <CommonLayout>{children}</CommonLayout>
        <Modal />
        <BottomSheet />
      </body>
    </html>
  )
}
