'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const NavigationTracker = () => {
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = sessionStorage.getItem('currentPath')
      if (currentPath) {
        sessionStorage.setItem('previousPath', currentPath)
      }
      sessionStorage.setItem('currentPath', pathname)
    }

    handleRouteChange()
  }, [pathname])

  return null
}
