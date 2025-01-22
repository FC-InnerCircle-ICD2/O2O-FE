'use client'

import Sample from '@/assets/images/sample.jpg'
import Badge from '@/components/Badge'
import Image from 'next/image'

const StoreDetailMenuItem = () => {
    return (
        <div className='flex py-4 gap-2 border-b border-gray-200 border-solid'>
            <div className='flex-1 flex flex-col gap-1'>
                <Badge variant='default'>베스트</Badge>
                <div className='text-base font-bold'>
                    <p className=''>1인치떡 세트</p>
                    <p className=''>16,900원</p>
                </div>
                <div>
                    <p className='text-sm text-gray-500 max-w-[calc(100dvw-100px-0.5rem)] truncate'>혼자서도 즐기는 치킨&떡볶이</p>
                    <p className='text-sm text-gray-600'>리뷰 4</p>
                </div>
            </div>
            <div className='relative size-[100px] rounded-xl overflow-hidden'>
                <Image src={Sample} alt='sample' className='object-cover' fill />
            </div>
        </div>
    )
}

export default StoreDetailMenuItem