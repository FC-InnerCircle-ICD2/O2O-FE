'use client'

import Input from '@/components/Input'
import { useState } from 'react'
import Icon from '@/components/Icon'
import { Button } from '@/components/button'

const MapInfo = () => {
  const [word, setWord] = useState('')

  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <div className="flex flex-col gap-2">
        <div>서울특별시 강동구 풍성로 87-3</div>
        <div className="text-xs text-gray-500">[지번] 성내동 111-42</div>
      </div>
      <Input
        placeholder="상세주소를 입력하세요 (건물명, 동/호수 등)"
        value={word}
        inputSize="sm"
        onChange={(e) => setWord(e.target.value)}
        onReset={() => setWord('')}
        offOutline
      />
      <div className="flex flex-row gap-2">
        <div className="flex w-1/3 flex-col items-center justify-center rounded-md border border-solid border-gray-500 py-3">
          <Icon name="Home" size={20} />
          <div className="text-sm">집</div>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center rounded-md border border-solid border-gray-500 py-3">
          <Icon name="Briefcase" size={20} />
          <div className="text-sm">회사</div>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center rounded-md border border-solid border-gray-500 py-3">
          <Icon name="MapPin" size={20} />
          <div className="text-sm">기타</div>
        </div>
      </div>
      <Input
        placeholder="주소와 별명을 지어주세요"
        value={word}
        inputSize="sm"
        onChange={(e) => setWord(e.target.value)}
        onReset={() => setWord('')}
        offOutline
      />
      <Button>요기로 배달</Button>
    </div>
  )
}

export default MapInfo
