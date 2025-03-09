<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { createRoleApi, getRoleDetailApi, updateRoleApi } from '@/apis/role'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'

import ApiPermissionSelect from '../components/ApiPermissionSelect.vue'
import MenuPermissionSelect from '../components/MenuPermissionSelect.vue'

const { t } = useI18n()

const {
  title,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'role', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
  getApiFn: getRoleDetailApi, // 获取数据接口
  createApiFn: createRoleApi, // 创建数据接口
  updateApiFn: updateRoleApi, // 更新数据接口
  form: {
    name: null,
    code: null,
    description: null,
    menuPermissions: [],
    featurePermissions: [],
    apiPermissions: [],
  },
  rules: {
    name: [{ required: true, message: t('page.systemRole.rules.name') }],
    code: [{ required: true, message: t('page.systemRole.rules.code') }],
  },
})
</script>

<template>
  <FormContainer :title="title">
    <a-form v-bind="formProps">
      <a-form-item :label="t('page.systemRole.name')" name="name" autocomplete="off">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item :label="t('page.systemRole.code')" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item :label="t('page.systemRole.description')" name="description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item :label="t('page.systemRole.menuPermissions')">
        <MenuPermissionSelect v-model:value="formState.menuPermissions" :type="MENU_TYPE.MENU" />
      </a-form-item>
      <a-form-item :label="t('page.systemRole.featurePermissions')">
        <MenuPermissionSelect v-model:value="formState.featurePermissions" :type="MENU_TYPE.FEATURE" />
      </a-form-item>
      <a-form-item :label="t('page.systemRole.apiPermissions')">
        <ApiPermissionSelect v-model:value="formState.apiPermissions" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
