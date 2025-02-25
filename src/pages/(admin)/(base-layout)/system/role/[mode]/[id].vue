<script setup lang="ts">
import { createRoleApi, getRoleApi, updateRoleApi } from '@/apis/role'
import { SaveButton } from '@/components/button'
import { FormLayout } from '@/components/container'
import { useForm } from '@/hooks/useForm'

const {
  title,
  isCreateMode,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'role',
  getApiFn: getRoleApi,
  createApiFn: createRoleApi,
  updateApiFn: updateRoleApi,
  form: {
    name: null,
    code: null,
    description: null,
  },
  rules: {
    name: [{ required: true, message: '请输入角色名称' }],
    code: [{ required: true, message: '请输入角色编码' }],
  },
})
</script>

<template>
  <FormLayout :title="title">
    <a-form v-bind="formProps">
      <a-form-item label="角色名称" name="name" autocomplete="off">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item v-if="isCreateMode" label="角色编码" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormLayout>
</template>
