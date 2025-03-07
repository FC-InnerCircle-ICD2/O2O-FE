'use client'

import useDeleteCart from '@/api/useDeleteCarts'
import useGetCarts from '@/api/useGetCarts'
import useGetStoreMenuOptions from '@/api/useGetStoreMenuOptions'
import usePostCarts from '@/api/usePostCarts'
import Badge from '@/components/Badge'
import { Button } from '@/components/button'
import Confirm from '@/components/Confirm'
import Icon from '@/components/Icon'
import { Skeleton } from '@/components/shadcn/skeleton'
import LoginModal from '@/components/shared/LoginModal'
import UpDownBtn from '@/components/UpDownBtn'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useThrottle } from '@/hooks/useThrottle'
import { toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { MenuGroupOption } from '@/models/menu'
import { modalStore } from '@/store/modal'
import { orderDetailStore } from '@/store/orderDetail'
import { COLORS } from '@/styles/color'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import MenuOption from './MenuOption'
import MenuOptionSkeleton from './MenuOptionSkeleton'
import { HEADER_HEIGHT } from './StoreDetail'
import StoreHeader from './StoreHeader'
import { IMAGE_HEIGHT } from './StoreImage'

const StoreOrderDetail = ({ minimumOrderAmount }: { minimumOrderAmount: number }) => {
  const { orderDetail, hideOrderDetail } = orderDetailStore()
  const { storedValue: accessToken } = useLocalStorage('accessToken')
  const { showModal, hideModal, modals } = modalStore()
  const { carts, resetCarts } = useGetCarts()
  const { mutate: addToCart } = usePostCarts()
  const { mutate: deleteCart } = useDeleteCart()
  const containerRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<number>(0)
  const textContentRef = useRef<HTMLParagraphElement>(null)

  const [isExpanded, setIsExpanded] = useState(false)
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, MenuGroupOption[]>>({})
  const [isValid, setIsValid] = useState(false)
  const [hasMoreContent, setHasMoreContent] = useState(false)

  const { storeMenuOptions, isSuccess } = useGetStoreMenuOptions(
    orderDetail?.storeId ?? '',
    orderDetail?.menuId ?? ''
  )

  const onChangeOption = (
    id: string,
    action: 'add' | 'remove' | 'change',
    option: MenuGroupOption
  ) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[id] || []

      if (action === 'add') {
        return {
          ...prev,
          [id]: [...currentOptions, option],
        }
      } else if (action === 'remove') {
        return {
          ...prev,
          [id]: currentOptions.filter((o) => o.name !== option.name),
        }
      } else if (action === 'change') {
        return {
          ...prev,
          [id]: [option],
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

  const handleAddToCart = () => {
    if (!isValid) {
      toast({
        description: '필수 옵션을 선택해주세요.',
        position: 'center',
      })
      return
    }
    if (!orderDetail || !storeMenuOptions) return
    if (!accessToken) {
      showModal({ content: <LoginModal />, useAnimation: true })
      return
    }
    const updateCart = () => {
      addToCart(
        {
          storeId: orderDetail.storeId.toString(),
          orderMenu: {
            menuId: storeMenuOptions.menuId,
            quantity,
            orderMenuOptionGroups: Object.entries(selectedOptions).map(([groupId, group]) => {
              return {
                id: groupId,
                orderMenuOptionIds: group.map((option) => option.id),
              }
            }),
          },
        },
        {
          onSuccess: () => {
            toast({
              description: '메뉴를 담았습니다',
              position: 'center',
            })
            hideOrderDetail()
            resetCarts()
          },
          onError: (error) => {
            toast({
              description: error.message,
              position: 'bottom',
            })
          },
        }
      )
    }
    const emptyCart = (onSuccess: () => void) => {
      if (!carts) return
      const cartIds = carts.orderMenus.map((menu) => menu.cartId)
      deleteCart({ cartIds }, { onSuccess })
    }

    if (carts && carts.orderMenus.length > 0 && carts.storeId !== orderDetail.storeId) {
      showModal({
        content: (
          <Confirm
            title="개발의 민족"
            message="장바구니에 담긴 메뉴를 취소하고 <br/>새로운 가게에서 주문하시겠어요?"
            confirmText="예"
            cancelText="아니요"
            onConfirmClick={() => {
              emptyCart(updateCart)
            }}
            onCancelClick={hideModal}
          />
        ),
      })
    } else {
      updateCart()
    }
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
          if (
            !selectedOptions[menuOptionGroup.id] ||
            selectedOptions[menuOptionGroup.id].length < menuOptionGroup.minSel
          ) {
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
    if (!textContentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      const element = textContentRef.current
      if (!element) return

      // 실제 스크롤 높이와 클라이언트 높이를 비교
      setHasMoreContent(element.scrollHeight > element.clientHeight)
    })

    resizeObserver.observe(textContentRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [storeMenuOptions])

  useEffect(() => {
    if (storeMenuOptions) {
      priceRef.current = Number(storeMenuOptions.price.replace(/,/g, ''))
      setPrice(Number(storeMenuOptions.price.replace(/,/g, '')))
    }
  }, [storeMenuOptions])

  if (!orderDetail) return null
  return createPortal(
    <div className="fixed inset-0 z-50 m-auto max-w-[480px] bg-black/50 transition-opacity duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0,
          ease: 'easeIn',
        }}
      >
        <StoreHeader
          isHeaderOpaque={isHeaderOpaque}
          isOrderDetail={true}
          isSuccess={isSuccess}
          title={storeMenuOptions?.name ?? ''}
          storeId={orderDetail.storeId}
        />
      </motion.div>
      <motion.div
        initial={{
          maxWidth: '480px',
          top: orderDetail.originY,
          left: orderDetail.originX,
          width: '100px',
          height: '100px',
          position: 'absolute',
          borderRadius: '0.75rem',
          opacity: 0,
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
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeIn',
        }}
        className="overflow-auto bg-white"
        ref={containerRef}
      >
        <div className="pb-[7.5rem]">
          <div className="relative h-[200px] w-full">
            {!storeMenuOptions || !storeMenuOptions.imgUrl ? (
              <Skeleton className="size-full" />
            ) : (
              <Image
                src={storeMenuOptions.imgUrl}
                alt="대표 이미지"
                className="object-cover"
                fill
              />
            )}
          </div>

          <div className="border-b border-solid border-gray-200 px-mobile_safe pb-5 pt-4">
            <div className="flex gap-1 pb-2">
              {!storeMenuOptions && <Skeleton className="h-[19px] w-detail_header" />}
              {storeMenuOptions?.best && <Badge variant="default">베스트</Badge>}
              {storeMenuOptions?.manyOrder && <Badge variant="default">재주문 많음</Badge>}
            </div>
            {!storeMenuOptions ? (
              <Skeleton className="mb-1 h-[28px] w-[150px]" />
            ) : (
              <p className="text-2xl font-bold">{storeMenuOptions.name}</p>
            )}
            {!storeMenuOptions ? (
              <Skeleton className="mb-1 h-[32px] w-[100px]" />
            ) : (
              <p className="pb-2 text-xl font-semibold">
                {storeMenuOptions.price.toLocaleString()}원
              </p>
            )}

            <div className="relative mb-2">
              {!storeMenuOptions ? (
                <Skeleton className="h-[16px] w-full" />
              ) : (
                <>
                  <p
                    ref={textContentRef}
                    className={cn('text-sm text-zinc-400', !isExpanded && 'line-clamp-2')}
                  >
                    {storeMenuOptions.desc}
                  </p>
                  {hasMoreContent && !isExpanded && (
                    <div className="absolute bottom-px right-0 flex items-center gap-[2px] bg-gradient-to-r from-transparent from-0% via-white to-white to-50% pl-8 text-sm font-medium">
                      <button className="text-gray-500" onClick={() => setIsExpanded(true)}>
                        더보기
                      </button>
                      <Icon name="ChevronDown" size={14} color={COLORS.gray500} strokeWidth={2.8} />
                    </div>
                  )}
                </>
              )}
            </div>
            {/* <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} color={COLORS.primary} fill={COLORS.primary} />
                                <p className="text-sm font-semibold">리뷰<span className="ml-1">1</span></p>
                                <Icon name="ChevronRight" size={16} />
                            </div> */}
          </div>

          <div>
            {!storeMenuOptions
              ? new Array(2).fill(0).map((_, index) => <MenuOptionSkeleton key={index} />)
              : storeMenuOptions?.menuOptionGroups.map((menu, index) => (
                  <MenuOption
                    key={menu.id}
                    id={menu.id}
                    title={menu.name}
                    type={menu.type}
                    minSel={menu.minSel}
                    maxSel={menu.maxSel}
                    options={menu.options}
                    onChangeOption={onChangeOption}
                  />
                ))}
          </div>

          <div className="flex items-center justify-between px-mobile_safe py-4">
            <span className="text-lg font-semibold">총 주문금액</span>
            <span className="text-xl font-semibold">{price.toLocaleString()}원</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="fixed bottom-0 h-28 w-full rounded-t-lg bg-white px-mobile_safe shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)]"
        initial={{
          position: 'absolute',
          borderRadius: '0',
          opacity: 0,
        }}
        animate={{
          borderRadius: '0.75rem',
          opacity: 1,
        }}
        transition={{
          duration: 0,
          ease: 'easeIn',
          delay: 0.2,
        }}
      >
        <p className="py-3 text-center text-sm font-semibold text-red-600">
          {minimumOrderAmount.toLocaleString()}원부터 주문 가능해요
        </p>
        <div className="flex items-center justify-between gap-2">
          <UpDownBtn size="md" value={quantity} onChange={setQuantity} />
          <Button
            size={'s'}
            className={cn('text-base font-bold', !isValid && 'bg-gray-400 hover:bg-gray-400')}
            onClick={handleAddToCart}
          >
            {(price * quantity).toLocaleString()}원 담기
          </Button>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

export default StoreOrderDetail
