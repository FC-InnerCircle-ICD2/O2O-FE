'use client'

import Input from '@/components/Input'
import { useCallback, useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import { Button } from '@/components/button'
import { useSearchParams } from 'next/navigation'
import usePostAddress, { Address } from '@/api/usePostAddress'

const MapInfo = ({ address, roadAddr, lng, lat }) => {
  const [word, setWord] = useState('')
  const searchParams = useSearchParams()
  const { mutate: addressApi, data: addressResponse } = usePostAddress()
  const [flag, setFlag] = useState(true)

  const handleAddress = () => {
    const addressData: Address = {
      address: {
        addressType: searchParams.get('type')?.toString(),
        roadAddress: roadAddr,
        jibunAddress: address,
        detailAddress: word,
        alias: '대표주소',
        latitude: lat,
        longitude: lng,
      },
    }

    addressApi(addressData)
  }

  useEffect(() => {
    if (searchParams.get('flag') === 'false') {
      setFlag(false)
    } else {
      setFlag(true)
    }
  }, [searchParams.get('flag')])

  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <div className="flex flex-col gap-2">
        <div>{roadAddr}</div>
        <div className="text-xs text-gray-500">[지번] {address}</div>
      </div>
      <Input
        placeholder="상세주소를 입력하세요 (건물명, 동/호수 등)"
        value={word}
        inputSize="sm"
        onChange={(e) => setWord(e.target.value)}
        onReset={() => setWord('')}
        offOutline
      />
      {flag && (
        <div>
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
            placeholder="별명을 지어주세요"
            value={word}
            inputSize="sm"
            onChange={(e) => setWord(e.target.value)}
            onReset={() => setWord('')}
            offOutline
          />
        </div>
      )}

      <Button onClick={handleAddress}>요기로 배달</Button>
    </div>
  )
}

export default MapInfo
