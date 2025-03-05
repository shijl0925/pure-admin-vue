import type { BasePageList } from '@/types/base'
import type { MenuTree } from '@/types/menu'
import type { AuthTokens, LoginInfo, User, UserInfo, UserListParams } from '@/types/user'

import { http } from '@/utils/http'

export function loginApi(data: LoginInfo): Promise<AuthTokens> {
  return http.post('/user/login', data)
}

export function refreshTokenApi(refreshToken: string): Promise<AuthTokens> {
  return http.get('/user/refresh', { params: { refreshToken } })
}

export function getUserInfoApi(): Promise<UserInfo> {
  return http.get('/user/info')
}

export function getUserMenuApi(): Promise<MenuTree> {
  return http.get('/menu/tree')
}

export function getUserListApi(params: UserListParams = { page: 1, pageSize: 10 }): Promise<BasePageList<User>> {
  return http.get('/user', { params })
}

export function getUserApi(id: number): Promise<User> {
  return http.get(`/user/${id}`)
}

export function createUserApi(data: Omit<User, 'id'>): Promise<User> {
  return http.post('/user', data)
}

export function updateUserApi(id: number, data: Partial<User>): Promise<User> {
  return http.put(`/user/${id}`, data)
}

export function updateUserPasswordApi(data: { oldPassword: string, newPassword: string }): Promise<void> {
  return http.post('/user/password', data)
}

export function deleteUserApi(id: number): Promise<void> {
  return http.delete(`/user/${id}`)
}

export function batchDeleteUserApi(ids: number[]): Promise<void> {
  return http.delete('/user', { data: { ids } })
}
