import type { MenuTree } from '@/types/menu'
import type { AuthTokens, LoginInfo, UserInfo } from '@/types/user'

import { http } from '@/utils/http'

export function loginApi(data: LoginInfo): Promise<AuthTokens> {
  return http.post('/user/login', data)
}

export function getUserInfoApi(): Promise<UserInfo> {
  return http.get('/user/info')
}

export function getUserMenuApi(): Promise<MenuTree> {
  return http.get('/menu/tree')
}
