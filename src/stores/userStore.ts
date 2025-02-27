import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { LoginInfo, UserInfo } from '@/types/user'

import { getUserInfoApi, loginApi } from '@/apis/user'
import { flattenTree } from '@/utils/array'
import { projectSign } from '@/utils/string'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const route = useRoute()
  const token = useLocalStorage<string>(projectSign('token'), null)
  const refreshToken = useLocalStorage<string>(projectSign('refreshToken'), null)
  const isLogin = computed(() => !!token.value)

  const setAllToken = (newToken: string, newRefreshToken: string) => {
    token.value = newToken
    refreshToken.value = newRefreshToken
  }

  const clearAllToken = () => {
    token.value = null
    refreshToken.value = null
  }

  const userInfo = ref<UserInfo | null>(null)

  const userMenus = computed(() => {
    return userInfo.value?.menus ?? []
  })

  const menuPermissions = computed(() => {
    return userInfo.value?.menuPermissions ?? []
  })

  const featurePermissions = computed(() => {
    return userInfo.value?.featurePermissions ?? []
  })

  const flatUserMenus = computed(() => {
    return flattenTree(userMenus.value ?? [])
  })

  const matchedMenuPath = computed(() => {
    // 获取当前路由的所有可能父路径
    const possiblePaths = route.matched.map(item => item.path)
    // const possiblePaths = route.path.split('/').reduce((paths: string[], segment) => {
    //   const previousPath = paths[paths.length - 1] || ''
    //   const currentPath = `${previousPath}/${segment}`

    //   if (segment) {
    //     paths.push(currentPath)
    //   }

    //   return paths
    // }, [])

    // 找到最匹配的菜单路径
    const matchedPath = possiblePaths
      .reverse()
      .find(path => flatUserMenus.value.some(menu => menu.path === path))

    if (!matchedPath)
      return []

    return matchedPath
  })

  const fetchUserInfo = async () => {
    const userInfoRes = await getUserInfoApi()
    userInfo.value = userInfoRes
  }

  const clearUserInfo = () => {
    userInfo.value = null
  }

  const login = async (data: LoginInfo) => {
    const loginRes = await loginApi(data)

    token.value = loginRes.token
    refreshToken.value = loginRes.refreshToken

    await fetchUserInfo()

    if (route.query.redirect) {
      router.push(String(route.query.redirect))
    }
    else {
      router.push('/')
    }
  }

  const logout = () => {
    clearAllToken()
    clearUserInfo()
    router.push(route.fullPath !== '/' && route.fullPath !== '/login' ? `/login?redirect=${route.fullPath}` : '/login')
  }

  return {
    token,
    refreshToken,
    isLogin,
    setAllToken,
    clearAllToken,
    userInfo,
    userMenus,
    flatUserMenus,
    matchedMenuPath,
    menuPermissions,
    featurePermissions,
    fetchUserInfo,
    clearUserInfo,
    login,
    logout,
  }
})
