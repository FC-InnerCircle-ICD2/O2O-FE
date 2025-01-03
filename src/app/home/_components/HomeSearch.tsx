'use client'

import { useHomeSearchFilterStore } from '@/store/homeSearchFilter'
import { useEffect } from 'react'

const HomeSearch = () => {
  const { category, keyword } = useHomeSearchFilterStore()

  useEffect(() => {
    console.log(category, keyword)
  }, [])

  return <div>HomeSearch</div>
}

export default HomeSearch
