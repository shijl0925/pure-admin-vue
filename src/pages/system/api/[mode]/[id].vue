<script setup lang="ts">
import type { FormInstance, FormProps, RadioGroupProps } from 'ant-design-vue'

import { computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

import { createApiApi, getApiDetailApi, updateApiApi } from '@/apis/api'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { API_METHOD, API_TYPE } from '@/constants/api'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName.vue'

const { t } = useI18n()

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
  key: 'api', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
  getApiFn: getApiDetailApi, // 获取数据接口
  createApiFn: createApiApi, // 创建数据接口
  updateApiFn: updateApiApi, // 更新数据接口
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
        message: t('page.systemApi.rules.title'),
      },
      type: {
        required: true,
        message: t('page.systemApi.rules.type'),
      },
      ...(formState.value.type === API_TYPE.API
        ? {
            path: {
              required: true,
              message: t('page.systemApi.rules.path'),
            },
            method: {
              required: true,
              message: t('page.systemApi.rules.method'),
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
    { label: t('page.systemApi.directory'), value: API_TYPE.DIRECTORY },
    { label: t('page.systemApi.api'), value: API_TYPE.API },
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
      <a-form-item :label="t('page.systemApi.parentApi')">
        <ParentName :value="parentId" />
      </a-form-item>
      <a-form-item :label="t('page.systemApi.title')" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item :label="t('page.systemApi.description')" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item :label="t('page.systemApi.type')" name="type">
        <a-radio-group
          v-model:value="formState.type"
          option-type="button"
          :options="apiTypeOptions"
          :disabled="isEditMode"
          @change="handleChangeType"
        />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" :label="t('page.systemApi.path')" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" :label="t('page.systemApi.method')" name="method">
        <a-select v-model:value="formState.method" :options="methodOptions" allow-clear />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === API_TYPE.API" :label="t('page.systemApi.code')" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item :label="t('page.systemApi.sort')" name="sort">
        <a-input-number v-model:value="formState.sort" :min="0" :precision="0" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
