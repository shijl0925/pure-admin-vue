<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { createUserApi, getUserDetailApi, updateUserApi } from '@/apis/user'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { useForm } from '@/hooks/useForm'

import RoleSelect from '../components/RoleSelect.vue'

const { t } = useI18n()

const {
  title,
  isCreateMode,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'user', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
  getApiFn: getUserDetailApi, // 获取数据接口
  createApiFn: createUserApi, // 创建数据接口
  updateApiFn: updateUserApi, // 更新数据接口
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
    username: [{ required: true, message: t('page.systemUser.rules.username') }],
    password: [{ required: true, message: t('page.systemUser.rules.password') }],
    nickName: [{ required: true, message: t('page.systemUser.rules.nickName') }],
    email: [{ required: true, message: t('page.systemUser.rules.email') }],
    phone: [{ required: true, message: t('page.systemUser.rules.phone') }],
  },
})
</script>

<template>
  <FormContainer :title="title">
    <a-form v-bind="formProps">
      <a-form-item :label="t('page.systemUser.username')" name="username" autocomplete="off">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item v-if="isCreateMode" :label="t('page.systemUser.password')" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :label="t('page.systemUser.nickName')" name="nickName">
        <a-input v-model:value="formState.nickName" />
      </a-form-item>
      <a-form-item :label="t('page.systemUser.email')" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item :label="t('page.systemUser.phone')" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item :label="t('page.systemUser.isFrozen')" name="isFrozen">
        <a-switch v-model:checked="formState.isFrozen" />
      </a-form-item>
      <a-form-item :label="t('page.systemUser.roles')" name="roles">
        <RoleSelect v-model:value="formState.roles" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
