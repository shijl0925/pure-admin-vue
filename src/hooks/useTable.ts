import type { TableProps } from 'ant-design-vue'
import type { Ref } from 'vue'

import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, isRef, ref, unref } from 'vue'

import type { BasePageList, BasePageParams } from '@/types/base'

interface UseTableOptions<TData, TParams extends BasePageParams> {
  apiFn: (params?: TParams) => Promise<TData>
  key: string
  cacheEnabled?: boolean
  dataStaleTime?: number
  form: Omit<TParams, 'page' | 'pageSize'>
  rules?: Record<string, any>
  columns: Ref<TableProps['columns']> | TableProps['columns']
  scrollX?: string
  scrollY?: Ref<number | undefined> | number | undefined
}

// 定义查询参数的类型
interface QueryState<TParams> {
  params: TParams
  page: number
  pageSize: number
}

export function useTable<TItem, TParams extends BasePageParams>({
  key,
  cacheEnabled = true, // 是否启用缓存，默认启用
  dataStaleTime = 1000 * 60 * 10, // 默认 10 分钟内数据保持新鲜
  apiFn,
  form = {} as Omit<TParams, 'page' | 'pageSize'>,
  rules = {},
  columns,
  scrollX = '100%',
  scrollY = undefined,
}: UseTableOptions<BasePageList<TItem>, TParams>) {
  // -------------------- Pagination --------------------
  const page = ref(1)
  const pageSize = ref(10)

  // -------------------- Form --------------------
  const formState = ref({
    ...unref(form),
  })
  const formRules = rules

  function formSubmit() {
    queryState.value = { ...formState.value }
    page.value = 1
    saveQueryState() // 保存查询状态
    refetch()
  }

  function formReset() {
    const defaultForm = unref(form)
    formState.value = { ...defaultForm }
    queryState.value = { ...defaultForm }
    page.value = 1
    pageSize.value = 10
    saveQueryState() // 保存查询状态
    refetch()
  }

  // -------------------- @tanstack/vue-query --------------------
  const { data, isPending, refetch } = useQuery({
    queryKey: [key],
    queryFn: () => apiFn({
      ...queryState.value,
      page: page.value,
      pageSize: pageSize.value,
    } as TParams),
    staleTime: cacheEnabled ? dataStaleTime : 0,
    gcTime: cacheEnabled ? dataStaleTime : 0,
  })

  const queryClient = useQueryClient()

  // 状态持久化的 key
  const stateKey = `${key}-state`

  // 查询状态 - 用于实际查询
  const queryState = ref({
    ...unref(form),
  })

  if (cacheEnabled) {
    // 初始化状态
    const initialState = queryClient.getQueryData<QueryState<TParams>>([stateKey])

    if (initialState) {
      formState.value = { ...initialState.params }
      queryState.value = { ...initialState.params }
      page.value = initialState.page
      pageSize.value = initialState.pageSize
    }
  }

  // 保存查询状态
  function saveQueryState() {
    if (cacheEnabled) {
      const state: QueryState<TParams> = {
        params: { ...formState.value },
        page: page.value,
        pageSize: pageSize.value,
      }
      queryClient.setQueryData([stateKey], state)
    }
  }

  // 清除保存的查询状态
  function clearSavedState() {
    if (cacheEnabled) {
      queryClient.removeQueries({ queryKey: [stateKey] })
    }
  }

  // -------------------- Table --------------------
  const tableProps = computed(() => ({
    columns: isRef(columns) ? columns.value : columns,
    dataSource: data.value?.list,
    scroll: {
      x: scrollX,
      y: isRef(scrollY) ? scrollY.value : scrollY,
    },
    loading: isPending.value,
    sticky: true,
    pagination: {
      current: page.value,
      pageSize: pageSize.value,
      total: data.value?.total || 0,
      onChange: (newPage: number, newPageSize: number) => {
        page.value = newPage
        pageSize.value = newPageSize
        refetch()
        saveQueryState() // 保存分页状态
      },
    },
  }))

  return {
    formState,
    formRules,
    formSubmit,
    formReset,
    tableProps,
    data,
    isLoading: isPending.value,
    clearSavedState,
  }
}
