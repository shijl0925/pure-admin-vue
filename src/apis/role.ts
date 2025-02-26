import type { BasePageList } from '@/types/base'
import type { Role } from '@/types/role'

import { http } from '@/utils/http'

export function getRoleListApi(params: BasePageList<Role>): Promise<BasePageList<Role>> {
  return http.get('/role', { params })
}

export function getAllRoleApi(): Promise<Role[]> {
  return http.get('/role/all')
}

export function getRoleApi(id: number): Promise<Role> {
  return http.get(`/role/${id}`)
}

export function createRoleApi(data: Omit<Role, 'id'>): Promise<Role> {
  return http.post('/role', data)
}

export function updateRoleApi(id: number, data: Partial<Role>): Promise<Role> {
  return http.put(`/role/${id}`, data)
}

export function deleteRoleApi(id: number): Promise<void> {
  return http.delete(`/role/${id}`)
}

export function batchDeleteRoleApi(ids: number[]): Promise<void> {
  return http.delete('/role', { data: { ids } })
}
