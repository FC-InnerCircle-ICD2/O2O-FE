'use client'

import Icon from '@/components/Icon'
import Input from '@/components/Input'
import React, { useState } from 'react'

interface OrderSearchProps {
  onSearch: (searchValue: string) => void
}

const OrderSearch: React.FC<OrderSearchProps> = ({ onSearch }) => {
  const [word, setWord] = useState('')

  const handleSearch = () => {
    onSearch(word)
  }

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="w-full bg-white">
        <Input
          placeholder="주문 내역을 검색하세요"
          value={word}
          inputSize="sm"
          onChange={(e) => setWord(e.target.value)}
          onReset={() => setWord('')}
          icon={<Icon name="Search" size={18} />}
          offOutline
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
      </div>
    </div>
  )
}

export default OrderSearch
