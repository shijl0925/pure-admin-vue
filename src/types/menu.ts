export interface MenuItem {
  id: number
  parentId?: number | null
  icon: string
  label: string
  route?: string
  children?: MenuItem[]
}

export type MenuTreeData = MenuItem[]
