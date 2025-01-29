export interface Menu {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  soldout: boolean
  isBest?: boolean
  isManyOrder?: boolean
}

export interface MenuCategory {
  categoryId: string
  categoryName: string
  menus: Menu[]
}

export interface MenuOption {
  menuId: string
  name: string
  price: number
  desc: string
  imgUrl: string
  isSoldOut: boolean
  isBest: boolean
  isManyOrder: boolean
  menuOptionGroups: MenuOptionGroup[]
}

export interface MenuOptionGroup {
  id: string
  name: string
  type: 'radio' | 'checkbox'
  limit?: number
  options: MenuGroupOption[]
}

export interface MenuGroupOption {
  name: string
  price: number
  isSoldOut: boolean
}