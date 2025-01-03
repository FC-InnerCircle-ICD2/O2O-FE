import { Category } from '@/models/category'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
  onClick?: () => void
  isActive?: boolean
}

const CategoryItem = ({ category, onClick, isActive = false }: CategoryItemProps) => {
  return (
    <div className="relative flex flex-col items-center min-w-[56px]" onClick={onClick}>
      <div className={`relative p-2`}>
        {isActive && (
          <div className="absolute w-[42px] h-[42px] bg-primary-foreground/10 rounded-full -z-10 top-[2px] left-[2px] animate-[scaleIn_150ms_ease-out] active:scale-90 transition-transform duration-150" />
        )}
        <Image
          src={category.icon}
          alt={category.name}
          width={30}
          height={30}
          className="active:scale-90 transition-transform duration-150"
        />
      </div>
      <p className={`text-xs ${isActive ? 'text-primary font-bold' : 'text-black'}`}>
        {category.name}
      </p>
    </div>
  )
}

export default CategoryItem
