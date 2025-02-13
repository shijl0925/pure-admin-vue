export interface MenuItem {
  id: number
  icon: string
  label: string
  route?: string
  children?: MenuItem[]
}

export type MenuTreeData = MenuItem[]
