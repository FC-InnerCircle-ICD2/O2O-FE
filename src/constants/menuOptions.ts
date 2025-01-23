import { MenuSelectOption } from "@/app/store/detail/[id]/_components/MenuOption";

export const MENU_OPTIONS: {
    title: string
    type: 'radio' | 'checkbox'
    options: MenuSelectOption[]
}[] = [
    {
        title: '맵소디 부분육 선택',
        type: 'radio',
        options: [
            { title: '한마리', price: 0 },
            { title: '순살 변경(다리살 30%, 가슴살 70%)', price: 2000 },
            { title: '닭다리 변경(10개)', price: 3000 },
            { title: '윙&봉 변경', price: 3000 },
            { title: '콤보 변경(닭다리5&윙5,봉5)', price: 4000 }
        ]
    },
    {
        title: '추가메뉴',
        type: 'checkbox',
        options: [
            { title: 'BBQ 카레고로케(3개)', price: 4000 },
            { title: 'BBQ 떡볶이', price: 7000 },
            { title: 'BBQ 소떡(땡초숯불양념맛)', price: 3000 },
            { title: 'BBQ 소떡(양념맛)', price: 3000 },
            { title: '치킨무 추가', price: 1000 },
            { title: '콜라 1.25L', price: 2500 },
            { title: '사이다 1.25L', price: 2500 },
        ]
    },
    {
        title: '추가메뉴',
        type: 'checkbox',
        options: [
            { title: 'BBQ 카레고로케(3개)', price: 4000 },
            { title: 'BBQ 떡볶이', price: 7000 },
            { title: 'BBQ 소떡(땡초숯불양념맛)', price: 3000 },
            { title: 'BBQ 소떡(양념맛)', price: 3000 },
            { title: '치킨무 추가', price: 1000 },
            { title: '콜라 1.25L', price: 2500 },
            { title: '사이다 1.25L', price: 2500 },
        ]
    }
]