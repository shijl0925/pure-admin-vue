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
