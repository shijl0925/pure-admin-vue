import type { EditableTreeNode } from 'unplugin-vue-router'

// 这里不能使用路径别名，因为要在 vite.config.ts 中使用
import { API, LOG, MENU, ROLE, USER } from '../constants/permissions'
import { flattenTree } from '../utils/array'

interface RouteMeta {
  layout?: 'blank' | 'default'
  public?: boolean
  [key: string | symbol]: unknown
}

interface Route {
  name: string
  path?: string
  meta?: RouteMeta
  children?: Route[]
}

const routeMetaConfig: Route[] = [
  { name: '登录', path: '/login', meta: { public: true, layout: 'blank' } },
  {
    name: '异常',
    children: [
      { name: '403', path: '/exception/403', meta: { layout: 'blank' } },
      { name: '404', path: '/exception/404', meta: { layout: 'blank' } },
      { name: '500', path: '/exception/500', meta: { layout: 'blank' } },
    ],
  },
  {
    name: '系统设置',
    children: [
      { name: '用户管理', path: '/system/user', meta: { permission: USER.READ } },
      { name: '角色管理', path: '/system/role', meta: { permission: ROLE.READ } },
      { name: '菜单管理', path: '/system/menu', meta: { permission: MENU.READ } },
      { name: 'API管理', path: '/system/api', meta: { permission: API.READ } },
    ],
  },
  {
    name: '系统监控',
    children: [
      { name: '操作日志', path: '/monitor/log', meta: { permission: LOG.READ } },
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
