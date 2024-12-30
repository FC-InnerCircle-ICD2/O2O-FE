import { ICONS } from '@/components/Icon'
import { ROUTE_PATHS } from '@/utils/routes'

export interface BottomNavigationMenu {
  id: string
  label: string
  path: keyof typeof ROUTE_PATHS
  icon: keyof typeof ICONS
}
