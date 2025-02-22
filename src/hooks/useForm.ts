import { useRoute, useRouter } from 'vue-router'
import { ref, unref, computed ,isRef } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

import type { FormProps } from 'ant-design-vue'
import type { Ref } from 'vue'

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
}

export function useForm<TFormData, TApiData>({
  key,
  getApiFn,
  createApiFn,
  updateApiFn,
  form,
  rules = {},
}: UseFormOptions<TFormData, TApiData>) {
  const route = useRoute()
  const router = useRouter()
  const listQueryKey = `${key}-list`
  const detailQueryKey = `${key}-detail`

  // -------------------- Mode --------------------
  const { mode, id } = route.params as { mode: string; id: string }
  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'

  // -------------------- Form --------------------
  const formRef = ref()
  const formState = ref({ ...unref(form) })
  const formRules = isRef(rules) ? rules : computed(() => rules)

  // -------------------- Props --------------------
  const formProps = computed(() => ({
    model: formState.value,
    rules: formRules.value,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    autocomplete: 'off'
  }))

  return {
    id,
    isCreateMode,
    isEditMode,
    formRef,
    formState,
    formRules,
    formProps,
  }
}
