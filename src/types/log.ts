export interface OperationLog {
  id: number
  user_id: number | null
  user_name: string | null
  ip: string | null
  path: string | null
  method: string | null
  user_agent: string | null
  latency: number | null
  status_code: number | null
  message: string | null
  createTime: string | null
  updateTime: string | null
}
