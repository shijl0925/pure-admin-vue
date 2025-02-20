import type { EditableTreeNode } from 'unplugin-vue-router'

// 这里不能使用路径别名，因为要在 vite.config.ts 中使用
import { MENU, USER } from '../constants/permissions'
import { flattenTree } from '../utils/array'

const routeMetaConfig = [
  { name: '登录', path: '/login', meta: { public: true } },
  {
    name: '系统设置',
    children: [
      { name: '用户管理', path: '/system/user', meta: { permission: USER.READ } },
      { name: '菜单管理', path: '/system/menu', meta: { permission: MENU.READ } },
    ],
  },
]

const flatMetaRoutes = flattenTree(routeMetaConfig).filter(item => item.path && item.meta)

export function setPermissionMeta(route: EditableTreeNode) {
  const routeItem = flatMetaRoutes.find(item => route.fullPath === item.path)
  if (routeItem && routeItem.meta) {
    route.addToMeta(routeItem.meta)
  }
}
