export interface Menu {
  id: number
  parentId: number | null
  icon: string
  title: string
  path?: string
  children?: Menu[]
}

export type MenuTree = Menu[]

export type FlatMenu = Omit<Menu, 'children'>
