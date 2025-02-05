import { MenuGroupOption, MenuOption } from "@/models/menu";
import { create } from "zustand";

interface Order {
    storeId: string
    price: number
    menu: Pick<MenuOption, 'menuId' | 'name' | 'imgUrl'> & { optionNames: string, selectedOptions: Record<string, MenuGroupOption[]>}
}

interface OrderList {
    orderList: Order | undefined
    setOrderList: (orderList: Order) => void
}

export const orderListStore = create<OrderList>((set) => ({
    orderList: undefined,
    setOrderList: (orderList) => set({ orderList }),
}))
