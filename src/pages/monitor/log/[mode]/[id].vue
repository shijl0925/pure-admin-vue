<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { useForm } from '@/hooks/useForm'

const { t } = useI18n()

const {
  title,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'log', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
  getApiFn: () => Promise.resolve(), // 获取日志接口
  createApiFn: () => Promise.resolve(), // 创建日志接口
  updateApiFn: () => Promise.resolve(), // 更新日志接口
  form: {
    name: null,
    code: null,
    description: null,
    menuPermissions: [],
    featurePermissions: [],
    apiPermissions: [],
  },
  rules: {
    status_code: [{ required: true, message: t('page.operationLog.rules.status_code') }],
    method: [{ required: true, message: t('page.operationLog.rules.method') }],
    path: [{ required: true, message: t('page.operationLog.rules.path') }],
  },
})
</script>

<template>
  <FormContainer :title="title">
    <a-form v-bind="formProps">
      <a-form-item :label="t('page.operationLog.status_code')" name="status_code">
        <a-input v-model:value="formState.status_code" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.method')" name="method">
        <a-input v-model:value="formState.method" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.path')" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.message')" name="message">
        <a-input v-model:value="formState.message" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.latency')" name="latency">
        <a-input v-model:value="formState.latency" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.user_agent')" name="user_agent">
        <a-input v-model:value="formState.user_agent" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.ip')" name="ip">
        <a-input v-model:value="formState.ip" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.user_id')" name="user_id">
        <a-input v-model:value="formState.user_id" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.user_name')" name="user_name">
        <a-input v-model:value="formState.user_name" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.createTime')" name="createTime">
        <a-input v-model:value="formState.createTime" />
      </a-form-item>
      <a-form-item :label="t('page.operationLog.updateTime')" name="updateTime">
        <a-input v-model:value="formState.updateTime" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
