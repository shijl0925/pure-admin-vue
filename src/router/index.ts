import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import { hideLoading } from '@/plugins'
// import type { RouteRecordInfo, ParamValue } from 'vue-router'
import { useUserStore } from '@/stores'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const { isLogin, userInfo } = storeToRefs(userStore)
  const { fetchUserInfo } = userStore

  console.log('🔥 meta', to.meta)

  if (to.meta.public) {
    next()
  }
  else {
    if (isLogin.value) {
      if (from.path !== '/login' && userInfo.value === null) {
        await Promise.all([
          fetchUserInfo(),
        ])
      }

      if (to.meta.permission) {
        // TODO 检查权限
        next()
      }
      else {
        next()
      }
    }
    else {
      next({
        path: '/login',
        query: to.fullPath !== '/' && to.fullPath !== '/login' ? { redirect: to.fullPath } : undefined,
      })
    }
  }
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
