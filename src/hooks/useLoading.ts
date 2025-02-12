import { ref } from 'vue'

// 定义异步函数类型
type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>
// 定义普通函数类型
type SyncFunction<T extends any[], R> = (...args: T) => R

export function useLoading() {
  const loading = ref(false)

  const start = (): void => {
    loading.value = true
  }

  const end = (): void => {
    loading.value = false
  }

  /**
   * 包装函数，为异步函数添加 loading 状态控制
   * @template T - 函数参数类型数组
   * @template R - 函数返回值类型
   * @param fn - 要包装的异步或同步函数
   * @returns 包装后的异步函数
   */
  const wrapper = <T extends any[], R>(
    fn: AsyncFunction<T, R> | SyncFunction<T, R> = () => Promise.resolve() as any,
  ): AsyncFunction<T, R> => {
    return async (...args: T): Promise<R> => {
      start()
      try {
        // 执行函数并等待结果
        const result = await Promise.resolve(fn(...args))
        return result
      }
      finally {
        end()
      }
    }
  }

  return {
    loading,
    loadingStart: start,
    loadingEnd: end,
    loadingFnWrapper: wrapper,
  }
}

// 定义返回值类型
export type UseLoadingReturn = ReturnType<typeof useLoading>
