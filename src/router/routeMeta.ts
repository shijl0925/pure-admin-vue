import type { EditableTreeNode } from 'unplugin-vue-router'

// 这里不能使用路径别名，因为要在 vite.config.ts 中使用
import { USER } from '../constants/permissions'
import { flattenTree } from '../utils/array'

const routeMetaConfig = [
  { name: '登录', route: '/login', meta: { public: true } },
  {
    name: '系统设置',
    children: [
      { name: '用户列表', route: '/system/user', meta: { permission: USER.LIST } },
    ],
  },
]

const flatMetaRoutes = flattenTree(routeMetaConfig).filter(item => item.route && item.meta)

export function setPermissionMeta(route: EditableTreeNode) {
  const routeItem = flatMetaRoutes.find(item => route.fullPath === item.route)
  if (routeItem && routeItem.meta) {
    route.addToMeta(routeItem.meta)
  }
}
