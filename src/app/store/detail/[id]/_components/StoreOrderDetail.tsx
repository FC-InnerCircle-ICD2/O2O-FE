'use client'

import { useThrottle } from "@/hooks/useThrottle"
import { orderDetailStore } from "@/store/orderDetail"
import { motion } from "motion/react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { HEADER_HEIGHT } from "./StoreDetail"
import StoreHeader from "./StoreHeader"
import { IMAGE_HEIGHT } from "./StoreImage"

const StoreOrderDetail = () => {
    const { orderDetail, hideOrderDetail } = orderDetailStore()
    const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)

    const updateActiveCategory = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const scrollPosition = container.scrollTop
        const threshold = IMAGE_HEIGHT - HEADER_HEIGHT
        setIsHeaderOpaque(scrollPosition >= threshold)
    }, [])

    const handleScroll = useThrottle(updateActiveCategory, 50)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        container.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            container.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (!orderDetail) return null
    return (
        createPortal(
            <div className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300">
                <StoreHeader isHeaderOpaque={isHeaderOpaque} isOrderDetail={true} />
                <motion.div
                    initial={{
                        top: orderDetail.originY,
                        left: orderDetail.originX,
                        width: '100px',
                        height: '100px',
                        position: 'absolute',
                        borderRadius: '0.75rem',
                    }}
                    animate={{
                        top: 0,
                        left: 0,
                        width: '100dvw',
                        height: '100dvh',
                        x: 0,
                        y: 0,
                        borderRadius: '0px',
                        position: 'relative'
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeIn"
                    }}
                    className="overflow-auto bg-white"
                    ref={containerRef}
                >
                    <div className="bg-red-500 h-[1000px]">
                        <div className="relative w-full h-[200px]">
                            <Image
                                src={orderDetail.imageUrl}
                                alt="확대된 이미지"
                                className="object-cover"
                                fill
                            />
                        </div>
                    </div>
                </motion.div>
            </div>,
            document.body
        )
    )
}

export default StoreOrderDetail