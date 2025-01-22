'use client'

import useBottomSheet from "@/hooks/useBottomSheet"
import MenuCategory from "./MenuCategory"

interface MenuBottomSheetProps {
    menuList: string[]
    activeCategoryIndex: number
    setActiveCategoryIndex: (index: number) => void
    callback: (index: number) => void
}

const MenuBottomSheet = ({ menuList, activeCategoryIndex, setActiveCategoryIndex, callback }: MenuBottomSheetProps) => {
    const { hide } = useBottomSheet()

    return (
        <div className="flex gap-2 px-mobile_safe flex-wrap pb-10">
            {menuList.map((menu, index) => (
                <MenuCategory key={menu} category={menu} index={index} isActive={index === activeCategoryIndex} onClick={() => {
                    setActiveCategoryIndex(index)
                    callback(index)
                    hide()
                }} />
            ))}
        </div>
    )
}

export default MenuBottomSheet