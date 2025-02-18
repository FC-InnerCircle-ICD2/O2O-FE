'use client'

import Input from '@/components/Input'
import { useState } from 'react'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import Badge from '@/components/Badge'

const AddressOption = () => {
  const [word, setWord] = useState('')

  return (
    <div className="flex w-full flex-col gap-4 px-mobile_safe pt-5">
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
      <div className="flex flex-row justify-center gap-2">
        <Icon name="LocateFixed" size={20} />
        <Link href={ROUTE_PATHS.ADDRESS_DETAIL}>
          <div className="content-center">현재 위치로 주소 찾기</div>
        </Link>
      </div>

      <Separator ignoreMobileSafe className="h-2" />
      <div className="flex flex-row gap-2">
        <Icon name="MapPin" size={20} />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="content-center">풍성로 115-8</div>
            <Badge variant="essential">현재</Badge>
          </div>
          <div className="text-xs text-gray-500">[지번] 서울특별시 강동구 성내동</div>
        </div>
      </div>

      <Separator ignoreMobileSafe className="h-2" />
      <Link href={ROUTE_PATHS.ADDRESS_DETAIL}>
        <div className="flex flex-row gap-2">
          <Icon name="Home" size={20} />
          <div className="content-center">집 추가</div>
        </div>
      </Link>

      <Separator />
      <Link href={ROUTE_PATHS.ADDRESS_DETAIL}>
        <div className="flex flex-row gap-2">
          <Icon name="Briefcase" size={20} />
          <div className="content-center">회사 추가</div>
        </div>
      </Link>
    </div>
  )
}

export default AddressOption
