import type { FormProps, TableProps } from 'ant-design-vue'
import type { Ref } from 'vue'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, isRef, ref, unref } from 'vue'
import { useRoute } from 'vue-router'

import type { ApiResponse, BasePageList } from '@/types/base'

import { usePageTransfer } from '@/hooks/usePageTransfer'

interface UseTableOptions<TItem> {
  listApiFn: (params: any) => Promise<ApiResponse<TItem>>
  deleteApiFn?: (id: number) => Promise<void>
  batchDeleteApiFn?: (ids: number[]) => Promise<void>
  key: string
  idKey?: string
  cacheEnabled?: boolean
  dataStaleTime?: number
  pagination?: boolean
  selectable?: boolean
  form?: Record<string, any>
  rules?: FormProps['rules']
  columns: Ref<TableProps['columns']> | TableProps['columns']
  scrollX?: string
  scrollY?: Ref<number | undefined> | number | undefined
  pageCreatePath?: string
  pageEditPath?: string
}

// 辅助函数：判断是否为分页响应
function isPageResponse<T>(data: ApiResponse<T>): data is BasePageList<T> {
  return !Array.isArray(data) && 'total' in data && 'list' in data
}

export function useTable<TItem>({
  listApiFn,
  deleteApiFn,
  batchDeleteApiFn,
  key,
  idKey = 'id',
  cacheEnabled = true, // 是否启用缓存，默认启用
  dataStaleTime = 1000 * 60 * 10, // 默认 10 分钟内数据保持新鲜
  pagination = true,
  selectable = false,
  form = {} as const,
  rules = {},
  columns,
  scrollX = '100%',
  scrollY = undefined,
  pageCreatePath,
  pageEditPath,
}: UseTableOptions<TItem>) {
  type InferredParams = typeof form

  interface QueryState {
    params: InferredParams
    page: number
    pageSize: number
  }

  const route = useRoute()
  const listQueryKey = `${key}-list`
  const stateQueryKey = `${key}-list-state`

  // -------------------- State Management --------------------
  // 分页状态
  const page = ref(1)
  const pageSize = ref(10)

  // 表单状态
  const formRef = ref()
  const formState = ref<InferredParams>({ ...unref(form) })
  const queryState = ref<InferredParams>({ ...unref(form) })
  const formRules = rules

  // -------------------- Selected State --------------------
  const selectedState = ref<number[]>([])
  const selectedCount = computed(() => selectedState.value.length)
  const selectedIsEmpty = computed(() => selectedCount.value === 0)

  function setSelectedState(keys: number[]) {
    selectedState.value = keys
  }

  function resetSelectedState() {
    selectedState.value = []
  }

  // -------------------- Cache Management --------------------
  const queryClient = useQueryClient()

  // 保存查询状态
  function saveQueryState() {
    if (cacheEnabled) {
      const state: QueryState = {
        params: { ...formState.value },
        page: page.value,
        pageSize: pageSize.value,
      }
      queryClient.setQueryData([stateQueryKey], state)
    }
  }

  // 清除保存的查询状态
  function clearSavedState() {
    if (cacheEnabled) {
      queryClient.removeQueries({ queryKey: [stateQueryKey] })
    }
  }

  if (cacheEnabled) {
    // 初始化状态
    const initialState = queryClient.getQueryData<QueryState>([stateQueryKey])

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
    queryKey: [listQueryKey],
    queryFn: () => {
      // 如果没有查询参数，直接调用
      if (Object.keys(queryState.value).length === 0) {
        return (listApiFn as () => Promise<ApiResponse<TItem>>)()
      }

      // 有查询参数并且分页
      if (pagination) {
        const params = {
          ...queryState.value,
          page: page.value,
          pageSize: pageSize.value,
        } as QueryState
        return (listApiFn as (params: QueryState) => Promise<ApiResponse<TItem>>)(params)
      }

      // 有查询参数但不分页
      return (listApiFn as (params: QueryState) => Promise<ApiResponse<TItem>>)(
        queryState.value as QueryState,
      )
    },
    staleTime: cacheEnabled ? dataStaleTime : 0,
    gcTime: cacheEnabled ? dataStaleTime : 0,
  })

  // -------------------- Mutation --------------------
  const { mutateAsync: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
    },
  })

  const { mutateAsync: batchDeleteMutation, isPending: isBatchDeleting } = useMutation({
    mutationFn: batchDeleteApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      resetSelectedState()
    },
  })

  // -------------------- Actions --------------------
  async function handleSearch() {
    queryState.value = { ...formState.value }
    if (pagination) {
      page.value = 1
    }
    saveQueryState()
    await refetch()
    resetSelectedState()
  }

  async function handleReset() {
    formRef.value?.resetFields?.()
    formState.value = { ...unref(form) }
    queryState.value = { ...formState.value }
    if (pagination) {
      page.value = 1
      pageSize.value = 10
    }
    saveQueryState()
    await refetch()
    resetSelectedState()
  }

  async function handleCreate(transferData = null, query = {}) {
    const { navigateWithData } = usePageTransfer()
    if (pageCreatePath) {
      navigateWithData(
        {
          path: pageCreatePath,
          query,
        },
        transferData,
      )
    }
    else {
      navigateWithData(
        {
          path: `${route.path}/create/new`,
          query,
        },
        transferData,
      )
    }
  }

  async function handleEdit(data: TItem, transferData = null, query = {}) {
    const { navigateWithData } = usePageTransfer()
    if (pageEditPath) {
      navigateWithData(
        {
          path: pageEditPath,
          query,
        },
        transferData,
      )
    }
    else {
      navigateWithData(
        { path: `${route.path}/edit/${(data as Record<string, any>)[idKey]}`, query },
        transferData,
      )
    }
  }

  async function handleDelete(id: number) {
    await deleteMutation(id)
  }

  async function handleBatchDelete() {
    await batchDeleteMutation(selectedState.value)
  }

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

  // -------------------- Table Props --------------------
  const tableProps = computed(() => ({
    rowKey: idKey,
    columns: isRef(columns) ? columns.value : columns,
    dataSource: list.value,
    loading: isFetching.value,
    sticky: true,
    ...(selectable
      ? {
          rowSelection: {
            type: 'checkbox',
            selectedRowKeys: selectedState.value,
            onChange: (keys: number[]) => setSelectedState(keys),
          },
        }
      : {}),
    scroll: {
      x: scrollX,
      y: isRef(scrollY) ? scrollY.value : scrollY,
    },
    pagination: pagination
      ? {
          current: page.value,
          pageSize: pageSize.value,
          total: total.value,
          onChange: async (newPage: number, newPageSize: number) => {
            page.value = newPage
            pageSize.value = newPageSize
            await refetch()
            saveQueryState()
            resetSelectedState()
          },
        }
      : false,
  }))

  return {
    // 表单
    formRef,
    formState,
    formRules,

    // 表格
    tableProps,

    // 状态
    isLoading: isFetching,
    isDeleting,
    isBatchDeleting,

    // 数据
    data,
    list,
    total,

    // 事件
    handleSearch,
    handleReset,
    handleCreate,
    handleEdit,
    handleDelete,
    handleBatchDelete,

    // 选中状态
    selectedState,
    selectedCount,
    selectedIsEmpty,
    setSelectedState,
    resetSelectedState,

    // 清除缓存状态
    clearSavedState,

    // 分页状态
    ...(pagination
      ? {
          currentPage: page,
          currentPageSize: pageSize,
        }
      : {}),
  }
}
