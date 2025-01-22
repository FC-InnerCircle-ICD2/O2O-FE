'use client'

import Icon from '@/components/Icon'
import { useState } from 'react'

interface UpDownProps {
  value?: number
}

const UpDownBtn = ({ value = 0 }: UpDownProps) => {
  const [counter, setCount] = useState<number>(value)

  const onMinus = (counter: number) => {
    if (counter <= 0) {
      return counter
    } else {
      return counter - 1
    }
  }

  return (
    <div className="flex flex-row items-center rounded border border-solid border-gray-400 px-2">
      <button onClick={() => setCount(onMinus(counter))}>
        <Icon name="Minus" size={20} className="text-gray-400" />
      </button>
      <div className="px-3">{counter}</div>
      <button onClick={() => setCount(counter + 1)}>
        <Icon name="Plus" size={20} />
      </button>
    </div>
  )
}

export default UpDownBtn
