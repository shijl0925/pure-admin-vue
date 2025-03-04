<script setup lang="ts">
import { createRoleApi, getRoleApi, updateRoleApi } from '@/apis/role'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'

import ApiPermissionSelect from '../components/ApiPermissionSelect.vue'
import MenuPermissionSelect from '../components/MenuPermissionSelect.vue'

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
    apiPermissions: [],
  },
  rules: {
    name: [{ required: true, message: '请输入角色名称' }],
    code: [{ required: true, message: '请输入角色编码' }],
  },
})
</script>

<template>
  <FormContainer :title="title">
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
        <MenuPermissionSelect v-model:value="formState.menuPermissions" :type="MENU_TYPE.MENU" />
      </a-form-item>
      <a-form-item label="功能权限">
        <MenuPermissionSelect v-model:value="formState.featurePermissions" :type="MENU_TYPE.FEATURE" />
      </a-form-item>
      <a-form-item label="API权限">
        <ApiPermissionSelect v-model:value="formState.apiPermissions" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
