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
  const accessToken = useLocalStorage<string>(projectSign('accessToken'), null)
  const refreshToken = useLocalStorage<string>(projectSign('refreshToken'), null)
  const isLogin = computed(() => !!accessToken.value)

  const setAllToken = (newAccessToken: string, newRefreshToken: string) => {
    accessToken.value = newAccessToken
    refreshToken.value = newRefreshToken
  }

  const clearAllToken = () => {
    accessToken.value = null
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

    // 找到最匹配的菜单路径
    const matchedPath = possiblePaths
      .reverse()
      .find(path => flatUserMenus.value.some(menu => menu.path === path))

    if (!matchedPath)
      return []

    if (matchedPath === '/' && route.path !== '/') {
      return []
    }

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

    accessToken.value = loginRes.accessToken
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
    accessToken,
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
