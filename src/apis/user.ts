import type { MenuTree } from '@/types/menu'
import type { AuthTokens, LoginInfo, UserInfo, User, UserListParams } from '@/types/user'
import type { BasePageList } from '@/types/base'

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

export function getUserListApi(params: UserListParams = { page: 1, pageSize: 10 }): Promise<BasePageList<User>> {
  return http.get('/user/list', { params })
}
