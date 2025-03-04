import type { Api, ApiTree } from '@/types/api'

import { http } from '@/utils/http'

export function getApiTreeApi(): Promise<ApiTree> {
  return http.get('/api')
}

export function getFlatApiApi(): Promise<Omit<Api, 'children'>[]> {
  return http.get('/api/flat')
}

export function getApiApi(id: number): Promise<Omit<Api, 'children'>> {
  return http.get(`/api/${id}`)
}

export function getApiPermissionApi(): Promise<Omit<Api, 'children'>[]> {
  return http.get('/api/permission')
}

export function createApiApi(data: Omit<Api, 'id' | 'children'>): Promise<Api> {
  return http.post('/api', data)
}

export function updateApiApi(id: number, data: Partial<Omit<Api, 'children'>>): Promise<Api> {
  return http.put(`/api/${id}`, data)
}

export function deleteApiApi(id: number): Promise<void> {
  return http.delete(`/api/${id}`)
}
