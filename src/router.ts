import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
// import type { RouteRecordInfo, ParamValue } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  console.log('🔥 to', to)
  if (to.meta.isPublic) {
    console.log('🔥 public route')
    next()
  }
  else {
    console.log('🔥 private route')
    console.log('🔥 request user info')
    next()
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
