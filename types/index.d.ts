export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  nested?: NavItem[]
}


export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)


export type MarketingConfig = {
  mainNav: MainNavItem[]
}
