import { Category } from '@/models/category'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
  onClick?: () => void
  isActive?: boolean
  useAnimation?: boolean
}

const CategoryItem = ({
  category,
  onClick,
  isActive = false,
  useAnimation = true,
}: CategoryItemProps) => {
  return (
    <div
      className="relative flex min-w-[58px] flex-col items-center"
      onClick={onClick}
      data-active={isActive}
    >
      <div className={`relative p-2`}>
        {isActive && (
          <div className="absolute left-[2px] top-[2px] -z-10 size-[42px] animate-[scaleIn_150ms_ease-out] rounded-full bg-primary-foreground/10 transition-transform duration-150 active:scale-90" />
        )}
        <Image
          src={category.icon}
          alt={category.name}
          width={30}
          height={30}
          className={`${useAnimation ? 'transition-transform duration-150 active:scale-90' : ''}`}
        />
      </div>
      <p className={`text-xs ${isActive ? 'font-bold text-primary' : 'text-black'}`}>
        {category.name}
      </p>
    </div>
  )
}

export default CategoryItem
