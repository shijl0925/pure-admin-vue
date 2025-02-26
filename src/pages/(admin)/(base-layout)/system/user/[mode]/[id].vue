<script setup lang="ts">
import { createUserApi, getUserApi, updateUserApi } from '@/apis/user'
import { SaveButton } from '@/components/button'
import { FormLayout } from '@/components/container'
import { useForm } from '@/hooks/useForm'

import RoleSelect from '../components/RoleSelect.vue'

const {
  title,
  isCreateMode,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'user',
  getApiFn: getUserApi,
  createApiFn: createUserApi,
  updateApiFn: updateUserApi,
  form: {
    username: null,
    password: null,
    nickName: null,
    email: null,
    phone: null,
    isFrozen: false,
    roles: [],
  },
  rules: {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    nickName: [{ required: true, message: '请输入昵称' }],
    email: [{ required: true, message: '请输入邮箱' }],
    phone: [{ required: true, message: '请输入手机号' }],
  },
})
</script>

<template>
  <FormLayout :title="title">
    <a-form v-bind="formProps">
      <a-form-item label="用户名" name="username" autocomplete="off">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item v-if="isCreateMode" label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="昵称" name="nickName">
        <a-input v-model:value="formState.nickName" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="是否冻结" name="isFrozen">
        <a-switch v-model:checked="formState.isFrozen" />
      </a-form-item>
      <a-form-item label="角色" name="roles">
        <RoleSelect v-model:value="formState.roles" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormLayout>
</template>
