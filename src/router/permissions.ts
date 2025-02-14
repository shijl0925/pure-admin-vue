import type { EditableTreeNode } from 'unplugin-vue-router'

export const permissions = [
  { name: 'system:user:list', route: '/system/user', description: '用户列表' },
]

export function setPermissionMeta(route: EditableTreeNode) {
  const permission = permissions.find(permission => route.fullPath === permission.route)
  if (permission) {
    route.addToMeta({
      permission: permission.name,
    })
  }
}
