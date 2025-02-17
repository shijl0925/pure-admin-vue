import type { MenuTree } from '@/types/menu'

import { http } from '@/utils/http'

export function getMenuTreeApi(): Promise<MenuTree> {
  return http.get('/menu/tree')
}
