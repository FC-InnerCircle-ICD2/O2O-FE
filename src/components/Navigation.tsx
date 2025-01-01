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
    <nav className="flex items-center h-navigation border-b bg-white pt-3">
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
