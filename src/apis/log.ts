import type { BasePageList } from '@/types/base'
import type { OperationLog } from '@/types/log'

import { request } from '@/utils/request'

export function getLogListApi(params: BasePageList<OperationLog>): Promise<BasePageList<OperationLog>> {
  return request.get('/api/v1/operation_logs', { params })
}
