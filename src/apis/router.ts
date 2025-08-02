import type { Router } from '@/types/router'

import { request } from '@/utils/request'

export function getRouterApi(): Promise<Router[]> {
  return request.get('/api/v1/routers')
}
