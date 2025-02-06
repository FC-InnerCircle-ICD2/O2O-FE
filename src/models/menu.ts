export interface Menu {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  soldout: boolean
  best: boolean
  manyOrder: boolean
}

export interface MenuCategory {
  categoryId: string
  categoryName: string
  menus: Menu[]
}

export interface MenuOption {
  menuId: string
  name: string
  price: string
  desc: string
  imgUrl: string
  soldOut: boolean
  best: boolean
  manyOrder: boolean
  menuOptionGroups: MenuOptionGroup[]
}

export interface MenuOptionGroup {
  id: string
  name: string
  type: 'radio' | 'checkbox'
  maxSel?: number
  minSel?: number
  options: MenuGroupOption[]
}

export interface MenuGroupOption {
  id: string
  name: string
  price: number
  soldOut: boolean
}