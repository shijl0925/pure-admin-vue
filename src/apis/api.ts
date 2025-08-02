import type { Api, ApiTree } from '@/types/api'

import { request } from '@/utils/request'

export function getApiTreeApi(): Promise<ApiTree> {
  return request.get('/api/v1/rbac/resources')
}

export function getFlatApiApi(): Promise<Omit<Api, 'children'>[]> {
  return request.get('/api/v1/rbac/resources/flat')
}

export function getApiDetailApi(id: number): Promise<Omit<Api, 'children'>> {
  return request.get(`/api/v1/rbac/resources/${id}`)
}

export function getApiPermissionApi(): Promise<Omit<Api, 'children'>[]> {
  return request.get('/api/v1/rbac/resources/permission')
}

export function createApiApi(data: Omit<Api, 'id' | 'children'>): Promise<Api> {
  return request.post('/api/v1/rbac/resources', data)
}

export function updateApiApi(id: number, data: Partial<Omit<Api, 'children'>>): Promise<Api> {
  return request.put(`/api/v1/rbac/resources/${id}`, data)
}

export function deleteApiApi(id: number): Promise<void> {
  return request.delete(`/api/v1/rbac/resources/${id}`)
}
