import type { EditableTreeNode } from 'unplugin-vue-router'

import { flattenTree } from '../utils/array'

const routes = [
  { name: '登录', route: '/login', meta: { public: true } },
  {
    name: '系统设置',
    children: [
      { name: '用户列表', route: '/system/user', meta: { permission: 'system:user:list' } },
    ],
  },
]

const flatRoutes = flattenTree(routes).filter(item => item.route && item.meta)

export function setPermissionMeta(route: EditableTreeNode) {
  const routeItem = flatRoutes.find(item => route.fullPath === item.route)
  if (routeItem && routeItem.meta) {
    route.addToMeta(routeItem.meta)
  }
}
