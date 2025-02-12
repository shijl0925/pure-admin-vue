import { storeToRefs } from 'pinia'

import type { LoginData } from '@/types/user'

import { loginApi } from '@/apis/user'
import { useUserStore } from '@/stores'

export function isLogin() {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  return !!token.value
}

export async function login(data: LoginData) {
  const res = await loginApi(data)

  const userStore = useUserStore()
  const { token, refreshToken } = storeToRefs(userStore)

  token.value = res.token
  refreshToken.value = res.refreshToken
}

export function logout() {

}
