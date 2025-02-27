<script setup lang="ts">
import { createRoleApi, getRoleApi, updateRoleApi } from '@/apis/role'
import { SaveButton } from '@/components/button'
import { FormLayout } from '@/components/container'
import { useForm } from '@/hooks/useForm'

import PermissionSelect from '../components/PermissionSelect.vue'

const {
  title,
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
    menuPermissions: [],
    featurePermissions: [],
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
      <a-form-item label="角色编码" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="菜单权限">
        <PermissionSelect v-model:value="formState.menuPermissions" type="MENU" />
      </a-form-item>
      <a-form-item label="功能权限">
        <PermissionSelect v-model:value="formState.featurePermissions" type="FEATURE" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormLayout>
</template>
