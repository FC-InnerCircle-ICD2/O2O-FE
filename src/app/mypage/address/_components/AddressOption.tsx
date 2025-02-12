'use client'

import Input from '@/components/Input'
import { useState } from 'react'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'

const AddressOption = () => {
  const [word, setWord] = useState('')

  return (
    <div className="flex w-full flex-col gap-4 px-mobile_safe">
      <div className="w-full bg-white">
        <Input
          placeholder="건물명, 도로명 또는 지번으로 검색"
          value={word}
          inputSize="sm"
          onChange={(e) => setWord(e.target.value)}
          onReset={() => setWord('')}
          icon={<Icon name="Search" size={18} />}
          offOutline
        />
      </div>
      <div>현재 위치로 주소 찾기</div>
      <Separator ignoreMobileSafe className="h-2" />
      <div>
        <div>풍성로 115-8</div>
        <div>[지번]서울특별시 강동구 성내동</div>
      </div>
      <Separator ignoreMobileSafe className="h-2" />
      <Link href={ROUTE_PATHS.ADDRESS_DETAIL}>
        <div>집 추가</div>
      </Link>

      <Separator />
      <Link href={ROUTE_PATHS.ADDRESS_DETAIL}>
        <div>회사 추가</div>
      </Link>
    </div>
  )
}

export default AddressOption
