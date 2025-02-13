import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

// import type { RouteRecordInfo, ParamValue } from 'vue-router'
import { useUserStore } from '@/stores'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const { isLogin } = storeToRefs(userStore)
  const { fetchUserInfo } = userStore

  console.log('🔥 to', to)
  console.log('🔥 from', from)
  if (to.meta.public) {
    console.log('🔥 public route')
    next()
  }
  else {
    if (isLogin.value) {
      if (from.path !== '/login') {
        await Promise.all([
          fetchUserInfo(),
        ])
      }

      console.log('🔥 private route')
      console.log('🔥 request user info')
      next()
    }
    else {
      console.log('🔥 redirect to login')
      next({
        path: '/login',
        query: to.fullPath !== '/' ? { redirect: to.fullPath } : undefined,
      })
    }
  }
})

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
