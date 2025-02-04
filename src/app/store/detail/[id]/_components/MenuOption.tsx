'use client'

import Badge from "@/components/Badge"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Label } from "@/components/shadcn/label"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group"
import { useToast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { MenuGroupOption } from "@/models/menu"
import { useEffect, useState } from "react"

interface MenuOptionProps {
    id: string
    title: string
    type: 'radio' | 'checkbox'
    limit?: number
    options: MenuGroupOption[]
    onChangeOption: (id: string, action: 'add' | 'remove' | 'change', option: MenuGroupOption) => void
}

const MenuOption = ({ id, title, type, limit, options, onChangeOption }: MenuOptionProps) => {
    const { toast } = useToast()
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

    const onChange = (value: MenuGroupOption, action: 'add' | 'remove' | 'change') => {
        onChangeOption(id, action, value)
    }

    const handleCheck = (checked: boolean, option: MenuGroupOption) => {
        if (limit) {
            const currentCheckedCount = Object.values(checkedItems).filter(Boolean).length

            // 이미 limit에 도달했고 새로운 항목을 체크하려고 할 때
            if (currentCheckedCount >= limit && checked && !checkedItems[option.name]) {
                toast({
                    description: '최대 선택 개수를 초과하였습니다.',
                    position: 'center',
                })
                return
            }
        }

        setCheckedItems(prev => ({
            ...prev,
            [option.name]: checked
        }))

        onChangeOption(id, checked ? 'add' : 'remove', option)
    }

    useEffect(() => {
        if (type === 'radio') {
            onChange(options[0], 'change')
        }
    }, [])

    return (
        <div className="px-mobile_safe border-b border-gray-200 border-solid pb-3">
            <div className="flex items-center justify-between py-5">
                <span className="flex gap-2 items-center text-lg font-bold">
                    {title}
                    {type === 'radio' && <Badge variant='essential'>필수</Badge>}
                </span>
                {type === 'checkbox' && limit && <span className="text-sm text-gray-500">최대 {limit}개 선택 가능</span>}
            </div>
            {type === 'radio' ? (
                <RadioGroup defaultValue={options[0].name} className="gap-6" onValueChange={(value) => {
                    const option = options.find(option => option.name === value);
                    if (option) onChange(option, 'change');
                }}>
                    {options.map((option, index) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem
                                id={`${id}-${index}`}
                                value={option.name}
                                className="h-5 w-5 border-solid data-[state=checked]:border-primary border-gray-300 text-primary"
                                disabled={option.isSoldOut}
                            />
                            <Label htmlFor={`${id}-${index}`} className={`w-full flex items-center justify-between ${option.isSoldOut ? 'line-through text-gray-400' : ''}`}>
                                <span className="text-base font-light">{option.name}</span>
                                {option.price > 0 && <span className={cn("text-sm text-gray-700", option.isSoldOut && "text-gray-400")}>+{option.price.toLocaleString()}원</span>}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                    <div className="flex flex-col gap-6">
                    {options.map((option, index) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${id}-${index}`}
                                className="h-5 w-5 border-solid data-[state=checked]:bg-white data-[state=checked]:border-primary border-gray-300 outline-none"
                                checked={checkedItems[option.name] || false}
                                onCheckedChange={(checked: boolean) => handleCheck(checked, option)}
                                disabled={option.isSoldOut}
                            />
                            <Label
                                htmlFor={`${id}-${index}`}
                                className={`w-full flex items-center justify-between ${option.isSoldOut ? 'line-through text-gray-400' : ''}`}
                            >
                                <span className="text-base font-light">{option.name}</span>
                                {option.price > 0 && <span className={cn("text-sm text-gray-700", option.isSoldOut && "text-gray-400")}>+{option.price.toLocaleString()}원</span>}
                            </Label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuOption