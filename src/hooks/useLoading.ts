import { ref } from 'vue'

// Define async function type
type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>
// Define sync function type
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
   * Wrapper function to add loading state control for async functions
   * @template T - Array of function parameter types
   * @template R - Function return type
   * @param fn - Async or sync function to be wrapped
   * @returns Wrapped async function
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

// Define return type
export type UseLoadingReturn = ReturnType<typeof useLoading>
