import Bento from '@/assets/images/foodCategories/bento.png'
import Bibimbap from '@/assets/images/foodCategories/bibimbap.png'
import Cup from '@/assets/images/foodCategories/cup.png'
import Dish from '@/assets/images/foodCategories/dish.png'
import FriedChicken from '@/assets/images/foodCategories/fried-chicken.png'
import Hamburger from '@/assets/images/foodCategories/hamburger.png'
import Jokbal from '@/assets/images/foodCategories/jokbal.png'
import Nigiri from '@/assets/images/foodCategories/nigiri.png'
import Pho from '@/assets/images/foodCategories/pho.png'
import Pizza from '@/assets/images/foodCategories/pizza.png'
import Salad from '@/assets/images/foodCategories/salad.png'
import Samgyetang from '@/assets/images/foodCategories/samgyetang.png'
import Sandwich from '@/assets/images/foodCategories/sandwich.png'
import Steak from '@/assets/images/foodCategories/steak.png'
import Tendon from '@/assets/images/foodCategories/tendon.png'
import Tteokbokki from '@/assets/images/foodCategories/tteokbokki.png'
import ZhaJiangMian from '@/assets/images/foodCategories/zha-jiang-mian.png'
import { Category } from '@/models/category'

const CATEGORY_LIST: Category[] = [
  { id: 1, name: '전체', icon: Dish },
  { id: 2, name: '카페/디저트', icon: Cup },
  { id: 3, name: '치킨', icon: FriedChicken },
  { id: 4, name: '한식', icon: Bibimbap },
  { id: 5, name: '중국집', icon: ZhaJiangMian },
  { id: 6, name: '분식', icon: Tteokbokki },
  { id: 7, name: '피자/양식', icon: Pizza },
  { id: 8, name: '버거', icon: Hamburger },
  { id: 9, name: '일식/돈까스', icon: Tendon },
  { id: 10, name: '찜/탕', icon: Samgyetang },
  { id: 11, name: '회/초밥', icon: Nigiri },
  { id: 12, name: '족발/보쌈', icon: Jokbal },
  { id: 13, name: '고기/구이', icon: Steak },
  { id: 14, name: '샌드위치', icon: Sandwich },
  { id: 15, name: '샐러드', icon: Salad },
  { id: 16, name: '도시락/죽', icon: Bento },
  { id: 17, name: '아시안', icon: Pho },
]

export default CATEGORY_LIST
