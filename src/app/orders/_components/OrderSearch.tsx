'use client'

import Input from '@/components/input'
import Icon from '@/components/Icon'
import { useState } from 'react'

const OrderSearch = () => {
  const [word, setWord] = useState('')

  return (
    <div className="mb-6 flex w-full flex-col gap-7">
      <div className="w-full bg-white">
        <Input
          placeholder="주문 내역을 검색하세요"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onReset={() => setWord('')}
          icon={<Icon name="Search" size={18} />}
          offOutline
        />
      </div>
    </div>
  )
}

export default OrderSearch
