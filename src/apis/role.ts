import type { BasePageList } from '@/types/base'
import type { Role } from '@/types/role'

import { request } from '@/utils/request'

export function getRoleListApi(params: BasePageList<Role>): Promise<BasePageList<Role>> {
  return request.get('/api/v1/rbac/roles', { params })
}

export function getAllRoleApi(): Promise<Role[]> {
  return request.get('/api/v1/rbac/roles/all')
}

export function getRoleDetailApi(id: number): Promise<Role> {
  return request.get(`/api/v1/rbac/roles/${id}`)
}

export function createRoleApi(data: Omit<Role, 'id'>): Promise<Role> {
  return request.post('/api/v1/rbac/roles', data)
}

export function updateRoleApi(id: number, data: Partial<Role>): Promise<Role> {
  return request.put(`/api/v1/rbac/roles/${id}`, data)
}

export function deleteRoleApi(id: number): Promise<void> {
  return request.delete(`/api/v1/rbac/roles/${id}`)
}

export function batchDeleteRoleApi(ids: number[]): Promise<void> {
  return request.delete('/api/v1/rbac/roles', { data: { ids } })
}
