<script setup lang="ts">
import { computed } from 'vue'

import type { User } from '@/types/user'

import { createUserApi, getUserApi, updateUserApi } from '@/apis/user'
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
} = useForm<Omit<User, 'id'>, User>({
  key: 'user',
  getApiFn: getUserApi,
  createApiFn: createUserApi,
  updateApiFn: updateUserApi,
  form: {
    username: null,
    password: null,
    nickName: null,
    email: null,
    phoneNumber: null,
    isFrozen: false,
  },
  rules: {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    nickName: [{ required: true, message: '请输入昵称' }],
    email: [{ required: true, message: '请输入邮箱' }],
    phoneNumber: [{ required: true, message: '请输入手机号' }],
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
      <a-form-item label="手机号" name="phoneNumber">
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="是否冻结" name="isFrozen">
        <a-switch v-model:checked="formState.isFrozen" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormLayout>
</template>
