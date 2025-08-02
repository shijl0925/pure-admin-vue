import type { Menu, MenuTree } from '@/types/menu'

import { request } from '@/utils/request'

export function getMenuTreeApi(): Promise<MenuTree> {
  return request.get('/api/v1/rbac/menus')
}

export function getFlatMenuApi(): Promise<Omit<Menu, 'children'>[]> {
  return request.get('/api/v1/rbac/menus/flat')
}

export function getMenuDetailApi(id: number): Promise<Omit<Menu, 'children'>> {
  return request.get(`/api/v1/rbac/menus/${id}`)
}

export function getMenuPermissionApi(type: 'MENU' | 'FEATURE'): Promise<Omit<Menu, 'children'>[]> {
  return request.get(`/api/v1/rbac/menus/permission?type=${type}`)
}

export function createMenuApi(data: Omit<Menu, 'id' | 'children'>): Promise<Menu> {
  return request.post('/api/v1/rbac/menus', data)
}

export function updateMenuApi(id: number, data: Partial<Omit<Menu, 'children'>>): Promise<Menu> {
  return request.put(`/api/v1/rbac/menus/${id}`, data)
}

export function deleteMenuApi(id: number): Promise<void> {
  return request.delete(`/api/v1/rbac/menus/${id}`)
}
