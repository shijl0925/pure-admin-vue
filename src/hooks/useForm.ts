import type { FormProps } from 'ant-design-vue'
import type { Ref } from 'vue'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, isRef, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { i18n } from '@/locales'

export const formLabelCol = {
  xs: { span: 24 },
  sm: { span: 6 },
  md: { span: 6 },
  lg: { span: 6 },
  xl: { span: 6 },
  xxl: { span: 6 },
}

export const formWrapperCol = {
  xs: { span: 24 },
  sm: { span: 18 },
  md: { span: 18 },
  lg: { span: 16 },
  xl: { span: 14 },
  xxl: { span: 12 },
}

interface UseFormOptions<TFormData, TApiData> {
  key: string
  getApiFn?: (id: string) => Promise<TApiData>
  createApiFn: (data: Omit<TApiData, 'id'>) => Promise<TApiData>
  updateApiFn: (data: Partial<TApiData>) => Promise<TApiData>
  form: TFormData
  rules?: FormProps['rules'] | Ref<FormProps['rules']>
  backAfterSuccess?: boolean
}

export function useForm<TFormData, TApiData>({
  key,
  getApiFn,
  createApiFn,
  updateApiFn,
  form,
  rules = {},
  backAfterSuccess = true,
}: UseFormOptions<TFormData, TApiData>) {
  const route = useRoute()
  const router = useRouter()
  const listQueryKey = `${key}-list`
  const detailQueryKey = `${key}-detail`

  // -------------------- Mode --------------------
  const { mode, id } = route.params as { mode: string, id: string }
  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'

  // -------------------- Title --------------------
  const title = computed(() => {
    if (isCreateMode)
      return i18n.global.t('common.create')

    if (isEditMode)
      return i18n.global.t('common.edit')
  })

  // -------------------- Form --------------------
  const formRef = ref()
  const formState = ref({ ...unref(form) })
  const formRules = isRef(rules) ? rules : computed(() => rules)

  // -------------------- Detail --------------------
  const { data: detailData, isLoading: isLoadingDetail } = useQuery({
    queryKey: [detailQueryKey, id],
    queryFn: () => getApiFn?.(id),
    enabled: isEditMode && !!getApiFn,
    select: (data) => {
      if (data) {
        formState.value = { ...formState.value, ...data }
      }
    },
  })

  // -------------------- Props --------------------
  const formProps = computed(() => ({
    model: formState.value,
    rules: formRules.value,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    autocomplete: 'off',
  }))

  // -------------------- Mutation --------------------
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      if (backAfterSuccess)
        router.back()
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      queryClient.invalidateQueries({ queryKey: [detailQueryKey, id] })
      if (backAfterSuccess)
        router.back()
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  // -------------------- Actions --------------------
  function handleSubmit() {
    if (isCreateMode) {
      createMutation.mutate(formState.value as Omit<TApiData, 'id'>)
    }
    else if (isEditMode) {
      updateMutation.mutate({ ...formState.value, id } as Partial<TApiData>)
    }
  }

  return {
    id,
    title,
    isCreateMode,
    isEditMode,
    formRef,
    formState,
    formRules,
    formProps,
    detailData,
    isLoading: createMutation.isPending || updateMutation.isPending || isLoadingDetail,
    handleSubmit,
  }
}
