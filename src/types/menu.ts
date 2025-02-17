export interface MenuItem {
  id: number
  parentId?: number | null
  icon: string
  title: string
  path?: string
  children?: MenuItem[]
}

export type MenuTree = MenuItem[]
