import type { BasePageParams } from '@/types/base'
import type { MenuTree } from '@/types/menu'

export interface LoginInfo {
  username: string
  password: string
}

export interface AuthTokens {
  token: string
  refreshToken: string
}

export interface UserInfo {
  id: number
  username: string
  nickName: string
  headPic: string
  menus: MenuTree
}

export interface User {
  id: number
  username: string
  nickName?: string
  email?: string
  phoneNumber?: string
  headPic?: string
  isFrozen: boolean
  createTime: string
  updateTime: string
}

export interface UserListParams extends BasePageParams {
  username?: string | null
  nickName?: string | null
  email?: string | null
  phoneNumber?: string | null
}

export interface UserList {
  total: number
  list: User[]
}
