import { cn } from '@/lib/utils'
import { Category } from '@/models/category'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
  onClick?: () => void
  isActive?: boolean
  useAnimation?: boolean
  isHide?: boolean
  isBorder?: boolean
}

const CategoryItem = ({
  category,
  onClick,
  isActive = false,
  useAnimation = true,
  isHide = false,
  isBorder = false,
}: CategoryItemProps) => {
  return (
    <div
      className={cn(
        'relative flex min-w-[58px] flex-col items-center',
        isActive && isBorder && 'border-b-[2px] border-solid border-primary',
      )}
      onClick={onClick}
      data-active={isActive}
    >
      <motion.div
        className="relative p-2"
        layout
        initial={{ height: isHide ? 0 : 'auto', opacity: isHide ? 0 : 1 }}
        animate={{ height: isHide ? 0 : 'auto', opacity: isHide ? 0 : 1 }}
        transition={{
          duration: 0.1,
        }}
        style={{ overflow: 'hidden' }}
      >
        {!isHide && isActive && (
          <div className="absolute left-[2px] top-[2px] -z-10 size-[42px] animate-[scaleIn_150ms_ease-out] rounded-full bg-primary-foreground/10 transition-transform duration-150 active:scale-90" />
        )}
        <AnimatePresence mode="wait">
          {!isHide && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{
                duration: 0.1,
              }}
            >
              <Image
                src={category.icon}
                alt={category.name}
                width={30}
                height={30}
                className={`${useAnimation ? 'transition-transform duration-150 active:scale-90' : ''}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <p
        className={cn(
          'pb-1 text-xs',
          isActive ? 'font-bold text-primary' : 'font-medium text-black',
        )}
      >
        {category.name}
      </p>
    </div>
  )
}

export default CategoryItem
