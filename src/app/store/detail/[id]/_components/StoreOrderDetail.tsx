'use client'

import useGetStoreMenuOptions from "@/api/useGetStoreMenuOptions"
import Badge from "@/components/Badge"
import { Button } from "@/components/button"
import Icon from "@/components/Icon"
import { Skeleton } from "@/components/shadcn/skeleton"
import { useThrottle } from "@/hooks/useThrottle"
import { toast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { MenuGroupOption } from "@/models/menu"
import { orderDetailStore } from "@/store/orderDetail"
import { orderListStore } from "@/store/orderList"
import { COLORS } from "@/styles/color"
import { motion } from "motion/react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import MenuOption from "./MenuOption"
import MenuOptionSkeleton from "./MenuOptionSkeleton"
import { HEADER_HEIGHT } from "./StoreDetail"
import StoreHeader from "./StoreHeader"
import { IMAGE_HEIGHT } from "./StoreImage"

const StoreOrderDetail = () => {
    const { orderDetail, hideOrderDetail } = orderDetailStore()
    const { setOrderList } = orderListStore()

    const containerRef = useRef<HTMLDivElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const priceRef = useRef<number>(0)

    const [isTextOverflow, setIsTextOverflow] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [price, setPrice] = useState(0)
    const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, MenuGroupOption[]>>({})
    const [isValid, setIsValid] = useState(false)

    const { storeMenuOptions, isSuccess } = useGetStoreMenuOptions(orderDetail?.storeId ?? '', orderDetail?.menuId ?? '')

    const onChangeOption = (id: string, action: 'add' | 'remove' | 'change', option: MenuGroupOption) => {
        setSelectedOptions(prev => {
            const currentOptions = prev[id] || []

            if (action === 'add') {
                return {
                    ...prev,
                    [id]: [...currentOptions, option]
                }
            } else if (action === 'remove') {
                return {
                    ...prev,
                    [id]: currentOptions.filter(o => o.name !== option.name)
                }
            } else if (action === 'change') {
                return {
                    ...prev,
                    [id]: [option]
                }
            }
            return prev
        })
    }

    useEffect(() => {
        const totalOptionPrice = Object.values(selectedOptions).reduce((total, options) => {
            return total + options.reduce((sum, option) => sum + (option.price || 0), 0)
        }, 0)

        setPrice(priceRef.current + totalOptionPrice)
    }, [selectedOptions])

    const updateActiveCategory = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const scrollPosition = container.scrollTop
        const threshold = IMAGE_HEIGHT - HEADER_HEIGHT
        setIsHeaderOpaque(scrollPosition >= threshold)
    }, [])

    const handleScroll = useThrottle(updateActiveCategory, 50)

    const handleOrder = () => {
        if (!isValid) {
            toast({
                description: '필수 옵션을 선택해주세요.',
                position: 'center',
            })
            return
        }

        setOrderList({
            storeId: orderDetail?.storeId.toString() ?? 'aa',
            price: price,
            menu: {
                menuId: storeMenuOptions?.menuId ?? '',
                name: storeMenuOptions?.name ?? '',
                imgUrl: storeMenuOptions?.imgUrl ?? '',
                optionNames: Object.values(selectedOptions).map(options => options.map(option => option.name).join(', ')).join(', '),
                selectedOptions
            },
        })
    }

    useEffect(() => {
        const totalOptionPrice = Object.values(selectedOptions).reduce((total, options) => {
            return total + options.reduce((sum, option) => sum + (option.price || 0), 0)
        }, 0)

        setPrice(priceRef.current + totalOptionPrice)

        if (storeMenuOptions) {
            let isValid = true

            for (const menuOptionGroup of storeMenuOptions.menuOptionGroups) {
                if (menuOptionGroup.type === 'checkbox' && menuOptionGroup.minSel) {
                    if (!selectedOptions[menuOptionGroup.id] || selectedOptions[menuOptionGroup.id].length < menuOptionGroup.minSel) {
                        isValid = false
                        break
                    }
                }
            }

            setIsValid(isValid)
        }
    }, [selectedOptions])      

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        container.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            container.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const checkTextOverflow = () => {
            const element = descriptionRef.current
            if (!element) return

            setIsTextOverflow(element.scrollHeight > element.clientHeight)
        }

        checkTextOverflow()
        window.addEventListener('resize', checkTextOverflow)

        return () => {
            window.removeEventListener('resize', checkTextOverflow)
        }
    }, [storeMenuOptions])

    useEffect(() => {
        if (storeMenuOptions) {
            priceRef.current = Number(storeMenuOptions.price.replace(/,/g, ''))
            setPrice(Number(storeMenuOptions.price.replace(/,/g, '')))
        }
    }, [storeMenuOptions])

    if (!orderDetail) return null
    return (
        createPortal(
            <div className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.2, duration: 0,
                        ease: "easeIn",
                    }}
                >
                    <StoreHeader isHeaderOpaque={isHeaderOpaque} isOrderDetail={true} isSuccess={isSuccess} title={storeMenuOptions?.name ?? ''} />
                </motion.div>
                <motion.div
                    initial={{
                        top: orderDetail.originY,
                        left: orderDetail.originX,
                        width: '100px',
                        height: '100px',
                        position: 'absolute',
                        borderRadius: '0.75rem',
                        opacity: 0
                    }}
                    animate={{
                        top: 0,
                        left: 0,
                        width: '100dvw',
                        height: '100dvh',
                        x: 0,
                        y: 0,
                        borderRadius: '0px',
                        position: 'relative',
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeIn"
                    }}
                    className="overflow-auto bg-white"
                    ref={containerRef}
                >
                    <div className="pb-[7.5rem]">
                        <div className="relative w-full h-[200px]">
                            {!storeMenuOptions ? <Skeleton className="w-full h-full" /> : <Image
                                src={storeMenuOptions.imgUrl}
                                alt="대표 이미지"
                                className="object-cover"
                                fill
                            />}

                        </div>

                        <div className="px-mobile_safe pt-4 pb-5 border-b border-gray-200 border-solid">
                            <div className="flex gap-1 pb-2">
                                {!storeMenuOptions && <Skeleton className="w-[40px] h-[19px]" />}
                                {storeMenuOptions?.best && <Badge variant='default'>베스트</Badge>}
                                {storeMenuOptions?.manyOrder && <Badge variant='default'>재주문 많음</Badge>}
                            </div>
                            {!storeMenuOptions ? <Skeleton className="w-[150px] h-[28px] mb-1" /> : <p className="text-2xl font-bold">{storeMenuOptions.name}</p>}
                            {!storeMenuOptions ? <Skeleton className="w-[100px] h-[32px] mb-1" /> : <p className="text-xl font-semibold pb-2">{storeMenuOptions.price.toLocaleString()}원</p>}
                            <div
                                ref={descriptionRef}
                                className={cn('relative text-zinc-400 text-sm leading-[1.2] mb-2', !isExpanded && 'line-clamp-2')}
                            >
                                {!storeMenuOptions ? <Skeleton className="w-full h-[16px]" /> : <p>{storeMenuOptions.desc}</p>}
                                {isTextOverflow && !isExpanded && (
                                    <div className="absolute bottom-0 gap-[2px] right-0 flex items-center bg-gradient-to-r from-[0%] to-[50%] from-transparent via-white to-white text-sm font-medium pl-8">
                                        <button className="text-gray-500" onClick={() => setIsExpanded(!isExpanded)}>
                                            더보기
                                        </button>
                                        <Icon
                                            name="ChevronDown"
                                            size={16}
                                            color={COLORS.gray500}
                                            strokeWidth={2.8}
                                            className={cn(isExpanded && 'rotate-180')}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} color={COLORS.primary} fill={COLORS.primary} />
                                <p className="text-sm font-semibold">리뷰<span className="ml-1">1</span></p>
                                <Icon name="ChevronRight" size={16} />
                            </div> */}
                        </div>

                        <div>
                            {!storeMenuOptions ? new Array(2).fill(0).map((_, index) => <MenuOptionSkeleton key={index} />) : storeMenuOptions?.menuOptionGroups.map((menu, index) => <MenuOption key={menu.id} id={menu.id} title={menu.name} type={menu.type} minSel={menu.minSel} maxSel={menu.maxSel} options={menu.options} onChangeOption={onChangeOption} />)}
                        </div>

                        <div className="flex justify-between items-center px-mobile_safe py-4">
                            <span className="text-base font-semibold">총 주문금액</span>
                            <span className="text-lg font-semibold">{price.toLocaleString()}원</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="fixed bottom-0 h-[7rem] w-full bg-white rounded-tr-lg rounded-tl-lg shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)] px-mobile_safe"
                    initial={{
                        position: 'absolute',
                        borderRadius: '0',
                        opacity: 0
                    }}
                    animate={{
                        borderRadius: '0.75rem',
                        opacity: 1
                    }}
                    transition={{
                        duration: 0,
                        ease: "easeIn",
                        delay: 0.2
                    }}
                >
                    <p className="text-sm text-center text-red-600 font-bold py-4">18,000원부터 배달 가능해요</p>
                    <Button className={cn("text-base font-semibold", !isValid && "bg-gray-400 hover:bg-gray-400")} onClick={handleOrder} >{price.toLocaleString()}원 주문하기</Button>
                </motion.div>
            </div>,
            document.body
        )
    )
}

export default StoreOrderDetail