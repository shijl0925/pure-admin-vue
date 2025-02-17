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

  const flatUserMenus = computed(() => {
    return flattenTree(userMenus.value ?? [])
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
    router.push(route.fullPath !== '/' ? `/login?redirect=${route.fullPath}` : '/login')
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
    fetchUserInfo,
    clearUserInfo,
    login,
    logout,
  }
})
