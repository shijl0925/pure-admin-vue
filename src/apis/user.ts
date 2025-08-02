import type { BasePageList } from '@/types/base'
import type { AuthTokens, LoginInfo, User, UserInfo, UserListParams } from '@/types/user'

import { request } from '@/utils/request'

export function loginApi(data: LoginInfo): Promise<AuthTokens> {
  return request.post('/api/v1/auth/login', data)
}

export function refreshTokenApi(refreshToken: string): Promise<AuthTokens> {
  return request.get('/api/v1/auth/refresh-token', { params: { refreshToken } })
}

export function getUserInfoApi(): Promise<UserInfo> {
  return request.get('/api/v1/auth/user/info')
}

export function getUserListApi(params: UserListParams = { page: 1, pageSize: 10 }): Promise<BasePageList<User>> {
  return request.get('/api/v1/auth/users', { params })
}

export function getUserDetailApi(id: number): Promise<User> {
  return request.get(`/api/v1/auth/users/${id}`)
}

export function createUserApi(data: Omit<User, 'id'>): Promise<User> {
  return request.post('/api/v1/auth/users', data)
}

export function updateUserApi(id: number, data: Partial<User>): Promise<User> {
  return request.put(`/api/v1/auth/users/${id}`, data)
}

export function updateUserPasswordApi(data: { oldPassword: string, newPassword: string }): Promise<void> {
  return request.post('/api/v1/auth/users/password', data)
}

export function deleteUserApi(id: number): Promise<void> {
  return request.delete(`/api/v1/auth/users/${id}`)
}

export function batchDeleteUserApi(ids: number[]): Promise<void> {
  return request.delete('/api/v1/auth/users', { data: { ids } })
}
