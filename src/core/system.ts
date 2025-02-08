import { storeToRefs } from 'pinia'

import type { LoginData } from '@/types/auth'

import { loginApi } from '@/apis/auth'
import { useAuthStore } from '@/stores'

export function isLogin() {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  return !!token.value
}

export async function login(data: LoginData) {
  const res = await loginApi(data)

  const authStore = useAuthStore()
  const { token, refreshToken } = storeToRefs(authStore)

  token.value = res.token
  refreshToken.value = res.refreshToken
}

export function logout() {

}
