export interface MenuItem {
  id: number
  parentId?: number | null
  icon: string
  label: string
  path?: string
  children?: MenuItem[]
}

export type MenuTree = MenuItem[]
