import type { AuthTokens, LoginData, UserInfo } from '@/types/user'

import { http } from '@/utils/http'

export function loginApi(data: LoginData): Promise<AuthTokens> {
  return http.post('/auth/login', data)
}

export function userInfoApi(): Promise<UserInfo> {
  return http.get('/user/info')
}
