<script setup lang="ts">
import type { FormInstance, FormProps, RadioGroupProps } from 'ant-design-vue'

import { computed, nextTick } from 'vue'

import { createApiApi, getApiApi, updateApiApi } from '@/apis/api'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { API_TYPE, API_METHOD } from '@/constants/api'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName.vue'

const { getTransferredData } = usePageTransfer()

const data = getTransferredData()

const {
  title,
  isCreateMode,
  isEditMode,
  formRef,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'api',
  getApiFn: getApiApi,
  createApiFn: createApiApi,
  updateApiFn: updateApiApi,
  form: {
    parentId: data?.id,
    title: null,
    type: null,
    path: null,
    method: null,
    code: null,
    description: null,
    sort: 0,
  },
  rules: computed((): FormProps['rules'] => {
    return {
      title: {
        required: true,
        message: '请输入名称',
      },
      type: {
        required: true,
        message: '请选择类型',
      },
      ...(formState.value.type === API_TYPE.API
        ? {
            path: {
              required: true,
              message: '请输入路径',
            },
          }
        : {}),
    }
  }),
})

const parentId = computed(() => {
  return isCreateMode ? data?.id : formState.value.parentId
})

const apiTypeOptions = computed(() => {
  const allOptions = [
    { label: '目录', value: API_TYPE.DIRECTORY },
    { label: 'API', value: API_TYPE.API },
  ]

  return allOptions
})

const methodOptions = computed(() => {
  return [
    { label: 'GET', value: API_METHOD.GET },
    { label: 'POST', value: API_METHOD.POST },
    { label: 'PUT', value: API_METHOD.PUT },
    { label: 'PATCH', value: API_METHOD.PATCH },
    { label: 'DELETE', value: API_METHOD.DELETE },
  ]
})

const handleChangeType: RadioGroupProps['onChange'] = async () => {
  formState.value.method = null
  formState.value.path = null
  formState.value.code = null
  await nextTick()
  formRef.value?.clearValidate('path')
}
</script>

<template>
  <FormContainer :title="title">
    <a-form :ref="(el: FormInstance) => formRef = el" v-bind="formProps" @finish="handleSubmit">
      <a-form-item label="上级菜单">
        <ParentName :value="parentId" />
      </a-form-item>
      <a-form-item label="名称" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-radio-group
          v-model:value="formState.type"
          option-type="button"
          :options="apiTypeOptions"
          :disabled="isEditMode"
          @change="handleChangeType"
        />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" label="路径" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" label="请求方法" name="method">
        <a-select v-model:value="formState.method" :options="methodOptions" allow-clear />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" label="权限标识" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number v-model:value="formState.sort" :min="0" :precision="0" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
