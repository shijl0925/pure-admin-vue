import type { LoginData } from '@/types/auth'

import { loginApi } from '@/apis/auth'
import { useAuthStore } from '@/stores'

export function isLogin() {
  const authStore = useAuthStore()

  return !!authStore.token
}

export async function login(data: LoginData) {
  const res = await loginApi(data)

  const authStore = useAuthStore()

  authStore.token = res.token
  authStore.refreshToken = res.refreshToken
}

export function logout() {

}
