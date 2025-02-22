import type { BasePageList } from '@/types/base'
import type { MenuTree } from '@/types/menu'
import type { AuthTokens, LoginInfo, User, UserInfo, UserListParams } from '@/types/user'

import { http } from '@/utils/http'

export function loginApi(data: LoginInfo): Promise<AuthTokens> {
  return http.post('/users/login', data)
}

export function getUserInfoApi(): Promise<UserInfo> {
  return http.get('/users/info')
}

export function getUserMenuApi(): Promise<MenuTree> {
  return http.get('/menu/tree')
}

export function getUserListApi(params: UserListParams = { page: 1, pageSize: 10 }): Promise<BasePageList<User>> {
  return http.get('/users/list', { params })
}

export function getUserApi(id: number): Promise<User> {
  return http.get(`/users/${id}`)
}

export function createUserApi(data: Omit<User, 'id'>): Promise<User> {
  return http.post('/users', data)
}

export function updateUserApi(id: number, data: Partial<User>): Promise<User> {
  return http.put(`/users/${id}`, data)
}

export function deleteUserApi(id: number): Promise<void> {
  return http.delete(`/users/${id}`)
}

export function batchDeleteUserApi(ids: number[]): Promise<void> {
  return http.delete('/users', { data: { ids } })
}
