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
  { id: 1, name: '전체', value: '', icon: Dish },
  { id: 2, name: '카페/디저트', value: 'CAFE', icon: Cup },
  { id: 3, name: '치킨', value: 'CHICHEN', icon: FriedChicken },
  { id: 4, name: '한식', value: 'KOREAN_CUISINE', icon: Bibimbap },
  { id: 5, name: '중국집', value: 'CHINESE_CUISINE', icon: ZhaJiangMian },
  { id: 6, name: '분식', value: 'SNACK_FOOD', icon: Tteokbokki },
  { id: 7, name: '피자/양식', value: 'PIZZA_WESTERN', icon: Pizza },
  { id: 8, name: '버거', value: 'BURGER', icon: Hamburger },
  { id: 9, name: '일식/돈까스', value: 'JAPANESE_CUISINE', icon: Tendon },
  { id: 10, name: '찜/탕', value: 'KOREAN_STEW', icon: Samgyetang },
  { id: 11, name: '회/초밥', value: 'SUSHI', icon: Nigiri },
  { id: 12, name: '족발/보쌈', value: 'PORK_DISHES', icon: Jokbal },
  { id: 13, name: '고기/구이', value: 'BBQ', icon: Steak },
  { id: 14, name: '샌드위치', value: 'SANDWICH', icon: Sandwich },
  { id: 15, name: '샐러드', value: 'SALAD', icon: Salad },
  { id: 16, name: '도시락/죽', value: 'LUNCH_BOX', icon: Bento },
  { id: 17, name: '아시안', value: 'ASIAN_CUISINE', icon: Pho },
]

export default CATEGORY_LIST
