'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const MockContext = createContext<boolean>(false)

export const useMockReady = () => useContext(MockContext)

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const initMsw = await import('../mocks/index').then((res) => res.initMsw)
      await initMsw()
      setMswReady(true)
    }

    if (!mswReady) {
      init()
    }
  }, [mswReady])

  return <MockContext.Provider value={mswReady}>{children}</MockContext.Provider>
}
