import type { TableProps } from 'ant-design-vue'
import type { Ref } from 'vue'

import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { createEventHook } from '@vueuse/core'
import { computed, isRef, ref, unref } from 'vue'

import type { ApiResponse, BasePageList, BasePageParams } from '@/types/base'

interface UseTableOptions<TData, TParams extends BasePageParams> {
  apiFn: (params?: TParams) => Promise<TData>
  pagination?: boolean
  key: string
  cacheEnabled?: boolean
  dataStaleTime?: number
  form: Omit<TParams, 'page' | 'pageSize'>
  rules?: Record<string, any>
  columns: Ref<TableProps['columns']> | TableProps['columns']
  idKey?: string
  scrollX?: string
  scrollY?: Ref<number | undefined> | number | undefined
}

// 定义查询参数的类型
interface QueryState<TParams> {
  params: TParams
  page: number
  pageSize: number
}

// 辅助函数：判断是否为分页响应
function isPageResponse<T>(data: ApiResponse<T>): data is BasePageList<T> {
  return !Array.isArray(data) && 'total' in data && 'list' in data
}

export function useTable<TItem, TParams extends BasePageParams>({
  key,
  cacheEnabled = true, // 是否启用缓存，默认启用
  dataStaleTime = 1000 * 60 * 10, // 默认 10 分钟内数据保持新鲜
  apiFn,
  pagination = true,
  form = {} as Omit<TParams, 'page' | 'pageSize'>,
  idKey = 'id',
  rules = {},
  columns,
  scrollX = '100%',
  scrollY = undefined,
}: UseTableOptions<ApiResponse<TItem>, TParams>) {
  // -------------------- Types & Hooks --------------------
  const beforeRequestHook = createEventHook<[Omit<TParams, 'page' | 'pageSize'>]>()
  const afterRequestHook = createEventHook<[TItem[]]>()

  // -------------------- State Management --------------------
  // 分页状态
  const page = ref(1)
  const pageSize = ref(10)

  // 表单状态
  const formState = ref({ ...unref(form) })
  const formRules = rules
  const queryState = ref({ ...unref(form) })

  // -------------------- Data Transformation --------------------
  // 处理表单数据转换
  async function transformForm() {
    const transformedForm = { ...queryState.value }
    // const hookResults = await beforeRequestHook.trigger(transformedForm as Omit<TParams, 'page' | 'pageSize'>)
    const hookResults = await beforeRequestHook.trigger(transformedForm)

    return hookResults?.length ? hookResults[hookResults.length - 1] : transformedForm
  }

  // 处理响应数据转换
  async function transformResponse(data: TItem[]) {
    const hookResults = await afterRequestHook.trigger(data)

    return hookResults?.length ? hookResults[hookResults.length - 1] : data
  }

  // -------------------- Cache Management --------------------
  const queryClient = useQueryClient()
  const stateKey = `${key}-state`

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

  if (cacheEnabled) {
    // 初始化状态
    const initialState = queryClient.getQueryData<QueryState<TParams>>([stateKey])

    if (initialState) {
      formState.value = { ...initialState.params }
      queryState.value = { ...initialState.params }
      if (pagination) {
        page.value = initialState.page
        pageSize.value = initialState.pageSize
      }
    }
  }

  // -------------------- Query & Data Fetching --------------------
  const { data, refetch, isFetching } = useQuery<ApiResponse<TItem>, Error>({
    queryKey: [key],
    queryFn: async () => {
      const transformedForm = await transformForm()
      const params = {
        ...transformedForm,
        ...(pagination ? { page: page.value, pageSize: pageSize.value } : {}),
      } as TParams
      const response = await apiFn(params)

      if (isPageResponse(response)) {
        const processedList = await transformResponse(response.list)
        return {
          total: response.total,
          list: processedList,
        } as BasePageList<TItem>
      }
      return transformResponse(response) as Promise<TItem[]>
    },
    staleTime: cacheEnabled ? dataStaleTime : 0,
    gcTime: cacheEnabled ? dataStaleTime : 0,
  })

  // -------------------- Computed Properties --------------------
  const list = computed(() => {
    if (!data.value)
      return []
    return isPageResponse(data.value) ? data.value.list : data.value
  })

  const total = computed(() => {
    if (!data.value)
      return 0
    return isPageResponse(data.value) ? data.value.total : data.value.length
  })

  // -------------------- Actions --------------------
  function handleSearch() {
    queryState.value = { ...formState.value }
    if (pagination) {
      page.value = 1
    }
    saveQueryState()
    refetch()
  }

  function handleReset() {
    const defaultForm = unref(form)
    formState.value = { ...defaultForm }
    queryState.value = { ...defaultForm }
    if (pagination) {
      page.value = 1
      pageSize.value = 10
    }
    saveQueryState()
    refetch()
  }

  async function handleCreate() {}

  async function handleEdit() {}

  async function handleDelete() {}

  // -------------------- Table Props --------------------
  const tableProps = computed(() => ({
    columns: isRef(columns) ? columns.value : columns,
    dataSource: list.value,
    scroll: {
      x: scrollX,
      y: isRef(scrollY) ? scrollY.value : scrollY,
    },
    rowKey: idKey,
    loading: isFetching.value,
    sticky: true,
    pagination: pagination
      ? {
          current: page.value,
          pageSize: pageSize.value,
          total: total.value,
          onChange: (newPage: number, newPageSize: number) => {
            page.value = newPage
            pageSize.value = newPageSize
            refetch()
            saveQueryState()
          },
        }
      : false,
  }))

  return {
    // 表单
    formState,
    formRules,

    // 事件
    handleSearch,
    handleReset,

    // 表格
    tableProps,

    // 数据
    isLoading: isFetching,
    data,
    list,
    total,

    // 清除状态
    clearSavedState,

    // Hooks
    onBeforeRequest: beforeRequestHook.on,
    onAfterRequest: afterRequestHook.on,

    // 分页状态
    ...(pagination
      ? {
          currentPage: page,
          currentPageSize: pageSize,
        }
      : {}),
  }
}
