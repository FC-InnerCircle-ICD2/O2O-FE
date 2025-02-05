import { StaticImageData } from 'next/image'

export interface Category {
  id: number
  name: string
  value: string
  icon: StaticImageData
}
