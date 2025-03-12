import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { MENU_TYPE } from '@/constants/menu'
import { usePermission } from '@/hooks/usePermission'
import { Layout } from '@/layouts'
import { hideLoading } from '@/plugins'
// import type { RouteRecordInfo, ParamValue } from 'vue-router'
import { useUserStore } from '@/stores'

const rootRoutes = [
  {
    name: 'Root',
    path: '/',
    component: Layout,
    children: [
      ...routes,
      {
        name: '404',
        path: '/:pathMatch(.*)*',
        redirect: 'exception/404',
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: rootRoutes,
})

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  const { isLogin, userInfo } = storeToRefs(userStore)
  const { fetchUserInfo } = userStore

  const { hasPermission } = usePermission()

  // 如果是公共路由，则直接放行
  if (to.meta.public) {
    next()
    return
  }

  // 未登录时重定向到登录页
  if (!isLogin.value) {
    next({
      path: '/login',
      query: to.fullPath !== '/' && to.fullPath !== '/login' ? { redirect: to.fullPath } : undefined,
    })
    return
  }

  // 如果没有用户信息，获取用户信息
  if (userInfo.value === null) {
    await Promise.all([
      fetchUserInfo(),
    ])
  }

  // 权限检查
  if (to.meta.permission && !hasPermission({
    permission: to.meta.permission as string | string[],
    permissionType: MENU_TYPE.MENU,
  })) {
    next({
      path: '/exception/403',
    })

    return
  }

  next()
})

router.isReady().then(() => {
  hideLoading()
})

// let isFirstRoute = true
// router.afterEach(() => {
//   if (isFirstRoute) {
//     const loading = document.getElementById('Loading')
//     loading?.classList.add('is-hide')
//     setTimeout(() => {
//       loading?.remove()
//     }, 300)
//     isFirstRoute = false
//   }
// })

function addRedirects() {
  // router.addRoute({
  //   path: '/new-about',
  //   redirect: '/about?from=new-about',
  // })
}

if (import.meta.hot) {
  handleHotUpdate(router, (routes) => {
    console.log('🔥 HMR with', routes)
    addRedirects()
  })
}
else {
  // production
  addRedirects()
}

// manual extension of route types
// declare module 'vue-router/auto-routes' {
//   export interface RouteNamedMap {
//     'custom-dynamic-name': RouteRecordInfo<
//       'custom-dynamic-name',
//       '/added-during-runtime/[...path]',
//       { path: ParamValue<true> },
//       { path: ParamValue<false> }
//     >
//   }
// }
