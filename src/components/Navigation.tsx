'use client'

import { useRouter } from 'next/navigation'
import Icon from './Icon'

interface NavigationProps {
  hasBackButton?: boolean
  title: string
  rightElement?: React.ReactNode
}

const Navigation = ({ hasBackButton, title, rightElement }: NavigationProps) => {
  const router = useRouter()

  return (
    <nav className="top-navigation flex items-center h-10 border-b fixed top-0 left-0 right-0 bg-white z-10 pt-3 px-4">
      <div className="flex-1 flex items-center">
        {hasBackButton && (
          <button onClick={() => router.back()}>
            <Icon variant="arrowLeft" width={24} height={24} />
          </button>
        )}
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg-semibold">{title}</h1>

      {rightElement && <div className="flex-1 flex justify-end">{rightElement}</div>}
    </nav>
  )
}

export default Navigation
