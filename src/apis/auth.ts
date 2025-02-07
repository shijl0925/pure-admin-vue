import type { LoginData, LoginResponse } from '@/types/auth'

import { http } from '@/utils/http'

export function loginApi(data: LoginData): Promise<LoginResponse> {
  return http.post('/auth/login', data)
}
