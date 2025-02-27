import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores'

// 权限验证模式：全部满足(all)或满足其一(any)
export type PermissionMode = 'all' | 'any'

export function usePermission() {
  const userStore = useUserStore()
  const { buttonPermissions } = storeToRefs(userStore)

  /**
   * 检查是否拥有权限
   * @param permission 单个权限字符串或权限字符串数组
   * @param mode 权限检查模式，默认为'all'(全部满足)
   * @returns 是否拥有权限
   */
  function hasPermission(permission: string | string[], mode: PermissionMode = 'all') {
    // 如果按钮权限只有一个，并且是 *，则表示拥有所有权限
    if (buttonPermissions.value.length === 1 && buttonPermissions.value[0] === '*') {
      return true
    }

    if (typeof permission === 'string') {
      return buttonPermissions.value.includes(permission)
    }

    // 如果是权限数组，则根据模式进行检查
    const hasPermission = mode === 'all'
      ? permission.every(p => buttonPermissions.value.includes(p))
      : permission.some(p => buttonPermissions.value.includes(p))

    return hasPermission
  }

  return {
    hasPermission,
  }
}
