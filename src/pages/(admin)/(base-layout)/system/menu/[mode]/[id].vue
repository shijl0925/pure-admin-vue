<script setup lang="ts">
import type { FormInstance, FormProps, RadioGroupProps } from 'ant-design-vue'

import { computed, nextTick } from 'vue'

import { createMenuApi, getMenuApi, updateMenuApi } from '@/apis/menu'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { IconSelect } from '@/components/icon'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName.vue'

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
  key: 'menu',
  getApiFn: getMenuApi,
  createApiFn: createMenuApi,
  updateApiFn: updateMenuApi,
  form: {
    parentId: data?.id,
    title: null,
    type: null,
    icon: null,
    path: null,
    code: null,
    description: null,
    sort: 0,
    isShow: true,
  },
  rules: computed((): FormProps['rules'] => {
    return {
      title: {
        required: true,
        message: '请输入名称',
      },
      type: {
        required: true,
        message: '请选择类型',
      },
      ...(formState.value.type === MENU_TYPE.MENU
        ? {
            path: {
              required: true,
              message: '请输入路径',
            },
          }
        : {}),
    }
  }),
})

const parentId = computed(() => {
  return isCreateMode ? data?.id : formState.value.parentId
})

const menuTypeOptions = computed(() => {
  const allOptions = [
    { label: '目录', value: MENU_TYPE.DIRECTORY },
    { label: '菜单', value: MENU_TYPE.MENU },
    { label: '功能', value: MENU_TYPE.FEATURE },
  ]

  if (isCreateMode) {
    if (!data.id) {
      return allOptions.filter(option => option.value !== MENU_TYPE.FEATURE)
    }

    if (data.type === MENU_TYPE.DIRECTORY) {
      return allOptions.filter(option => option.value !== MENU_TYPE.FEATURE)
    }

    if (data.type === MENU_TYPE.MENU) {
      return allOptions.filter(option => option.value === MENU_TYPE.FEATURE)
    }

    return allOptions
  }
  else {
    return allOptions.filter(option => option.value === formState.value.type)
  }
})

const handleChangeType: RadioGroupProps['onChange'] = async (e) => {
  formState.value.icon = null
  formState.value.path = null
  formState.value.code = null
  await nextTick()
  if (e.target.value === MENU_TYPE.DIRECTORY || e.target.value === MENU_TYPE.FEATURE) {
    formRef.value?.clearValidate('path')
  }
}
</script>

<template>
  <FormContainer :title="title">
    <a-form :ref="(el: FormInstance) => formRef = el" v-bind="formProps" @finish="handleSubmit">
      <a-form-item label="上级菜单">
        <ParentName :value="parentId" />
      </a-form-item>
      <a-form-item label="名称" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="类型" name="type">
        <a-radio-group
          v-model:value="formState.type"
          option-type="button"
          :options="menuTypeOptions"
          :disabled="isEditMode"
          @change="handleChangeType"
        />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type !== MENU_TYPE.FEATURE" label="图标" name="icon">
        <IconSelect v-model:value="formState.icon" />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === MENU_TYPE.MENU" label="路径" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item v-if="formState.type && (formState.type === MENU_TYPE.MENU || formState.type === MENU_TYPE.FEATURE)" label="权限标识" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number v-model:value="formState.sort" :min="0" :precision="0" />
      </a-form-item>
      <a-form-item v-if="formState.type === MENU_TYPE.MENU" label="是否显示" name="isShow">
        <a-switch v-model:checked="formState.isShow" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
