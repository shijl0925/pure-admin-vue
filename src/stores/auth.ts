import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { projectSign } from '@/utils/string'

export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage<string>(projectSign('token'), null)
  const refreshToken = useLocalStorage<string>(projectSign('refreshToken'), null)

  const setAllToken = (newToken: string, newRefreshToken: string) => {
    token.value = newToken
    refreshToken.value = newRefreshToken
  }

  const clearAllToken = () => {
    token.value = null
    refreshToken.value = null
  }

  return {
    token,
    refreshToken,
    setAllToken,
    clearAllToken,
  }
})
