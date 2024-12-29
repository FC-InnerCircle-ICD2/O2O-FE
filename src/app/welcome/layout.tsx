import { ReactNode } from 'react'

interface WelcomeLayoutProps {
  children: ReactNode
}

export default function WelcomeLayout({ children }: WelcomeLayoutProps) {
  return <>{children}</>
}
