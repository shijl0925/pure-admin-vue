import type { RouteLocationRaw } from 'vue-router'

import { router } from '@/router'
import { usePageDataStore } from '@/stores'

export function usePageTransfer() {
  const pageDataStore = usePageDataStore()

  /**
   * 获取路由的唯一标识
   */
  function getRouteKey(route: RouteLocationRaw): string {
    if (typeof route === 'string') {
      return route
    }

    // 处理对象形式的路由
    if ('path' in route && route.path) {
      return route.path
    }

    if ('name' in route && route.name) {
      return route.name.toString()
    }

    // 如果都没有，使用当前路径
    return router.currentRoute.value.path
  }

  /**
   * 跳转到指定页面并携带数据
   * @param options 路由配置对象或路径字符串
   * @param data 要传递的数据
   * @param key 数据的唯一标识（默认使用目标路径）
   */
  function navigateWithData(
    options: RouteLocationRaw | string,
    data: any,
    key?: string,
  ) {
    // 确定数据存储的 key
    const dataKey = key || getRouteKey(options)

    // 存储数据
    pageDataStore.setData(dataKey, data)

    // 跳转页面
    router.push(options)
  }

  /**
   * 获取传递的数据
   * @param key 数据的唯一标识（默认使用当前路径）
   */
  function getTransferredData(key?: string) {
    const dataKey = key || router.currentRoute.value.path
    return pageDataStore.getData(dataKey)
  }

  /**
   * 清除数据
   * @param key 数据的唯一标识（默认使用当前路径）
   */
  function clearTransferredData(key?: string) {
    const dataKey = key || router.currentRoute.value.path
    pageDataStore.clearData(dataKey)
  }

  return {
    navigateWithData,
    getTransferredData,
    clearTransferredData,
  }
}
