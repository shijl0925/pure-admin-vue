import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { LoginData, UserInfo } from '@/types/user'

import { loginApi, userInfoApi } from '@/apis/user'
import { projectSign } from '@/utils/string'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const route = useRoute()
  const token = useLocalStorage<string>(projectSign('token'), null)
  const refreshToken = useLocalStorage<string>(projectSign('refreshToken'), null)
  const isLogin = computed(() => !!token.value)
  const userInfo = ref<UserInfo | null>(null)

  const setAllToken = (newToken: string, newRefreshToken: string) => {
    token.value = newToken
    refreshToken.value = newRefreshToken
  }

  const clearAllToken = () => {
    token.value = null
    refreshToken.value = null
  }

  const getUserInfo = async () => {
    const userInfoRes = await userInfoApi()
    userInfo.value = userInfoRes
    console.log('🔥 userInfo', userInfoRes)
  }

  const clearUserInfo = () => {
    userInfo.value = null
  }

  const login = async (data: LoginData) => {
    const loginRes = await loginApi(data)

    token.value = loginRes.token
    refreshToken.value = loginRes.refreshToken

    await getUserInfo()

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
    getUserInfo,
    clearUserInfo,
    login,
    logout,
  }
})
