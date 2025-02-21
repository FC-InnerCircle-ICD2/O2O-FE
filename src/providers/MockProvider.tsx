'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const MockContext = createContext<boolean>(false)
export const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'

export const useMockReady = () => useContext(MockContext)

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (isMockingMode) {
        const initMsw = await import('../mocks/index').then((res) => res.initMsw)
        await initMsw()
        setMswReady(true)
      }
    }

    if (!mswReady) {
      init()
    }
  }, [mswReady])
  if (isMockingMode && !mswReady) return null

  return <MockContext.Provider value={mswReady}>{children}</MockContext.Provider>
}
