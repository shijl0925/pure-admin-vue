<script setup lang="ts">
import { computed } from 'vue'

import { createMenuApi, getMenuApi, updateMenuApi } from '@/apis/menu'
import { SaveButton } from '@/components/button'
import { FormLayout } from '@/components/container'
import { IconSelect } from '@/components/icon'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'

const {
  title,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'menu',
  getApiFn: getMenuApi,
  createApiFn: createMenuApi,
  updateApiFn: updateMenuApi,
  form: {
    title: null,
    type: null,
    path: null,
    icon: null,
  },
})

const typeOptions = computed(() => {
  return Object.values(MENU_TYPE).map(type => ({
    label: type,
    value: type,
  }))
})
</script>

<template>
  <FormLayout :title="title">
    <a-form v-bind="formProps">
      <a-form-item label="名称" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-radio-group v-model:value="formState.type" option-type="button" :options="typeOptions" />
      </a-form-item>
      <a-form-item label="上级菜单" name="parentId">
        <a-input v-model:value="formState.parentId" />
      </a-form-item>
      <a-form-item label="图标" name="icon">
        <IconSelect v-model:value="formState.icon" />
      </a-form-item>
      <a-form-item label="路径" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item label="权限标识" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" @click="handleSubmit" />
      </a-form-item>
    </a-form>
  </FormLayout>
</template>
