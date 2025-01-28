export interface Menu {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  soldout: boolean
}

export interface MenuCategory {
  categoryId: string
  categoryName: string
  menus: Menu[]
}
